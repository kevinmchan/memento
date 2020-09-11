import React, { useState } from "react";
import ReactDOM from "react-dom";

import Nav from "./component/nav";
import EventSlide from "./component/eventslide";
import Calendar from "./component/calendar";
import NewEvent from "./component/newevent";

import mockData from "./mockdata";

const App = () => {
  const relationship = mockData.relationship;
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  const [activeDate, setActiveDate] = useState(date);
  const [events, setEvents] = useState(mockData.events);
  return (
    <>
      <Nav brand={relationship} />
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
