import React from "react";
import { months } from "../dateutils";

const EventCard = ({ name, description, date, img }) => (
  <li>
    <div className="uk-card uk-card-default">
      <div className="uk-card-media-top">
        <div className="uk-inline">
          <img src={img} alt={name} />
          <div className="uk-position-top-right uk-overlay uk-overlay-default uk-padding-small">
            {months[date.getMonth()].slice(0, 3)} {date.getDate()}
            <br />
            {date.getFullYear()}
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

const EventSlide = ({ events }) => (
  <div className="uk-section">
    <div className="uk-container">
      <div data-uk-slider="center: true">
        <div
          className="uk-position-relative uk-visible-toggle uk-light"
          tabIndex="-1"
        >
          <ul className="uk-slider-items uk-child-width-1-2@s uk-grid">
            {events.map((event) => (
              <EventCard key={event.id} {...event} />
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
        <ul className="uk-slider-nav uk-dotnav uk-flex-center uk-margin" />
      </div>
    </div>
  </div>
);

export default EventSlide;
