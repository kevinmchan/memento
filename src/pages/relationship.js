import React, { useState, useEffect } from "react";
import axios from "axios";

import Nav from "../component/nav";
import EventSlide from "../component/eventslide";
import Calendar from "../component/calendar";
import NewEvent from "../component/newevent";
import EditEvent from "../component/editevent";

import { processEventList } from "../dataprocessing";

const Relationship = ({ match }) => {
  const date = new Date();
  const relationshipName = match.params.relationshipName;
  date.setHours(0, 0, 0, 0);
  const [activeDate, setActiveDate] = useState(date);
  const [brand, setBrand] = useState();
  const [relationshipId, setRelationshipId] = useState();
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({});

  useEffect(() => {
    axios
      .get(`/api/relationships/${relationshipName}`)
      .then((resp) => {
        setBrand(resp.data.relationship);
        setRelationshipId(resp.data._id);
      })
      .catch(console.error);
  }, [relationshipName]);

  useEffect(() => {
    axios
      .get(`/api/events/${relationshipId}`)
      .then((resp) => {
        setEvents(processEventList(resp.data));
      })
      .catch(console.error);
  }, [relationshipId]);

  return (
    <>
      <Nav brand={brand} />
      <EventSlide events={events} activeDate={activeDate} editEventHandler={setCurrentEvent} />
      <NewEvent activeDate={activeDate} setEvents={setEvents} relationshipId={relationshipId} />
      <EditEvent currentEvent={currentEvent} />
      <Calendar
        events={events}
        activeDate={activeDate}
        setActiveDate={setActiveDate}
      />
    </>
  );
};

export default Relationship;