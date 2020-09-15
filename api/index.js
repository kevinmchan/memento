import express from "express";
import { MongoClient, ObjectID } from "mongodb";
import config from "../config";

const router = express.Router();

const uri = config.mongo_connection;

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
