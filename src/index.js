import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Nav from "./component/nav";
import EventSlide from "./component/eventslide";
import Calendar from "./component/calendar";
import NewEvent from "./component/newevent";

import { processEventList } from "./dataprocessing";

const App = () => {
  const date = new Date();
  const relationship_id = "5f5d3e95d751c816f817af96";
  date.setHours(0, 0, 0, 0);
  const [activeDate, setActiveDate] = useState(date);
  const [brand, setBrand] = useState();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/relationships/${relationship_id}`)
      .then((resp) => {
        setBrand(resp.data.relationship);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    axios
      .get("/api/events")
      .then((resp) => {
        setEvents(processEventList(resp.data));
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <Nav brand={brand} />
      <EventSlide events={events} activeDate={activeDate} />
      <Calendar
        events={events}
        activeDate={activeDate}
        setActiveDate={setActiveDate}
      />
      <NewEvent activeDate={activeDate} setEvents={setEvents} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
