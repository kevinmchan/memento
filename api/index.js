import express from "express";
import { MongoClient, ObjectID } from "mongodb";
import config from "../config";
import multer from "multer";
import getStream from "into-stream";
import { BlobServiceClient, StorageSharedKeyCredential, newPipeline } from "@azure/storage-blob";

const router = express.Router();
const uri = config.mongo_connection;

const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single("image");
const containerName = "images";

const ONE_MEGABYTE = 1024 * 1024;
const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 };

const sharedKeyCredential = new StorageSharedKeyCredential(
  config.storage_account,
  config.storage_key
);
const pipeline = newPipeline(sharedKeyCredential);

const blobServiceClient = new BlobServiceClient(
  `https://${config.storage_account}.blob.core.windows.net`,
  pipeline
);

const getBlobName = originalName => {
  // Use a random number to generate a unique file name, 
  // removing "0." from the start of the string.
  const identifier = Math.random().toString().replace(/0\./, '');
  return `${identifier}-${originalName}`;
};

router.post('/upload', async (req, res) => {
  uploadStrategy(req, res, async (err) => {
    // upload photo
    const blobName = req.file ? getBlobName(req.file.originalname) : "default-event-background.jpg"
    if (req.file) {
      const stream = getStream(req.file.buffer);
      const containerClient = blobServiceClient.getContainerClient(containerName);;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      try {
        await blockBlobClient.uploadStream(stream,
          uploadOptions.bufferSize, uploadOptions.maxBuffers,
          { blobHTTPHeaders: { blobContentType: "image/jpeg" } });
      } catch (err) {
        console.error(err);
      }
    }

    // upsert event with key: relationship_id, name, date
    const filename = `https://mementos.blob.core.windows.net/images/${blobName}`
    const data = {
      name: req.body.name,
      relationship_id: req.body.relationshipId,
      description: req.body.description,
      date: { month: req.body.month, day: req.body.day, year: req.body.year },
      img: filename
    }
    console.log(data)

    try {
      const client = new MongoClient(uri, { useNewUrlParser: true });
      client.connect((err, db) => {
        if (err) throw err;
        db.db("memento")
          .collection("events")
          .updateOne(
            { "relationship_id": data.relationship_id, "name": data.name, "date": data.date },  //TODO: broken - doesn't match events
            { $set: data },
            { upsert: true }
          );
        db.close();
      });
    } catch (err) {
      console.error(err);
      res.status(404).send("Bad Request");
    }
  })
});

router.get("/relationships/:relationshipID", (req, res) => {
  try {
    const relationshipID = ObjectID(req.params.relationshipID);
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect((err, db) => {
      if (err) throw err;
      db.db("memento")
        .collection("relationships")
        .findOne({ _id: relationshipID })
        .then((result) => res.send(result))
        .catch((err) => {
          console.error(err);
          res.status(404).send("Bad Request");
        });
      db.close();
    });
  } catch (err) {
    console.error(err);
    res.status(404).send("Bad Request");
  }
});

router.get("/events", (req, res) => {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect((err, db) => {
      if (err) throw err;
      db.db("memento")
        .collection("events")
        .find({})
        .toArray((err, result) => {
          if (err) throw err;
          res.send(result);
        });
      db.close();
    });
  } catch (err) {
    console.error(err);
    res.status(404).send("Bad Request");
  }
});

router.get("/events/:eventID", (req, res) => {
  try {
    const eventID = ObjectID(req.params.eventID);
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect((err, db) => {
      if (err) throw err;
      db.db("memento")
        .collection("events")
        .findOne({ _id: eventID })
        .then((result) => res.send(result));
      db.close();
    });
  } catch (err) {
    console.error(err);
    res.status(404).send("Bad Request");
  }
});

export default router;
