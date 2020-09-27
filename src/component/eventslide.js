import React from "react";
import { months } from "../dateutils";

const EventCard = ({ _id, relationship_id, name, description, date, img, editEventHandler }) => (
  //TODO: Create way to edit/delete event
  <li>
    <div className="uk-card uk-card-default">
      <div className="uk-card-media-top">
        <div className="uk-inline">
          <img src={img ? img : "https://mementos.blob.core.windows.net/images/default-event-background.jpg"} alt={name} />
          <div className="uk-position-top-right uk-overlay uk-overlay-default uk-padding-small">
            {months[date.getMonth()].slice(0, 3)} {date.getDate()}
            <br />
            {date.getFullYear()}
          </div>
          <div className="uk-position-top-left uk-padding-small">
            <a href="#" data-uk-toggle="target: .edit-event-toggle; cls: uk-hidden" onClick={() => editEventHandler({ _id, relationship_id, name, description, date })}>
              <span uk-icon="pencil" />
            </a>
          </div>
        </div>
      </div>
      <div className="uk-card-body">
        <h3 className="uk-card-title">{name}</h3>
        <p>{description}</p>
      </div>
    </div>
  </li>
);

const closestEvent = (date, events) => {
  //TODO: Fix - Account for wrapping across years e.g. distance between Jan and December is 1 not 12
  let result = 0;
  let dist = 1e10;
  for (let [event, index] of events.map((e, i) => [e.date, i])) {
    let newDist =
      Math.abs(date.getMonth() - event.getMonth()) * 100 +
      Math.abs(date.getDate() - event.getDate());
    if (newDist < dist) {
      result = index;
      dist = newDist;
    }
  }
  return result;
};

const EventSlide = ({ activeDate, events, editEventHandler }) => {
  const closestIndex = closestEvent(activeDate, events);
  return (
    <div className="uk-section-xsmall">
      <div className="uk-container">
        <div data-uk-slider="center: true" data-index={closestIndex}>
          <div
            className="uk-position-relative uk-visible-toggle uk-light"
            tabIndex="-1"
          >
            <ul className="uk-slider-items uk-child-width-1-2@s uk-grid">
              {events.map((event, id) => (
                <EventCard key={id} {...event} editEventHandler={editEventHandler} />
              ))}
            </ul>
            <a
              className="uk-position-center-left uk-position-small uk-hidden-hover"
              href="#"
              data-uk-slidenav-previous
              data-uk-slider-item="previous"
            />
            <a
              className="uk-position-center-right uk-position-small uk-hidden-hover"
              href="#"
              data-uk-slidenav-next
              data-uk-slider-item="next"
            />
          </div>
          {events.length < 10 ? <ul className="uk-slider-nav uk-dotnav uk-flex-center uk-margin" /> : ""}
        </div>
      </div>
    </div>
  );
};

export default EventSlide;
