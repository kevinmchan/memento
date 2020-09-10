import React, { useState } from "react";
import ReactDOM from "react-dom";

import Nav from "./component/nav";
import EventSlide from "./component/eventslide";
import Calendar from "./component/calendar";

import mockData from "./mockdata";

const App = () => {
  const relationship = mockData.relationship;
  const events = mockData.events;
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  const [activeDate, setActiveDate] = useState(date);
  return (
    <>
      <Nav brand={relationship} />
      <EventSlide events={events} />
      <Calendar
        events={events}
        activeDate={activeDate}
        setActiveDate={setActiveDate}
      />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
