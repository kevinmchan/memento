import React, { useState, useEffect } from "react";

const NewEvent = ({ activeDate }) => {
  const [eventDate, setEventDate] = useState(activeDate);
  const [eventName, setEventName] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    setEventDate(activeDate);
  }, [activeDate]);

  return (
    <div className="uk-section-xsmall">
      <div className="uk-container uk-width-2xlarge">
        <div className="uk-width-expand">
          <button
            id="new-event-button"
            className="uk-button uk-button-default uk-align-right new-event-toggle"
            type="button"
            data-uk-toggle="target: .new-event-toggle; cls: uk-hidden"
          >
            create memento
          </button>
        </div>
        <div id="new-event-form" className="uk-hidden new-event-toggle">
          <div className="uk-card-default uk-padding uk-align-center">
            <button
              className="uk-align-right"
              type="button"
              data-uk-toggle="target: .new-event-toggle; cls: uk-hidden"
              data-uk-close
            />
            <form className="uk-margin">
              <fieldset className="uk-fieldset">
                <legend className="uk-legend">
                  {eventName ? "New: " + eventName : "New memento"}
                </legend>

                <div className="uk-margin">
                  <input
                    className="uk-input"
                    type="text"
                    placeholder="Event name"
                    onChange={(event) => setEventName(event.target.value)}
                  />
                </div>

                <div className="uk-margin">
                  <textarea
                    className="uk-textarea"
                    rows="5"
                    placeholder="Event description"
                    onChange={(event) => setEventDesc(event.target.value)}
                  />
                </div>

                <div className="uk-margin">
                  <input
                    type="date"
                    value={eventDate.toISOString().substring(0, 10)}
                    onChange={(event) =>
                      setEventDate(new Date(event.target.value))
                    }
                  />
                </div>

                <div className="js-upload" data-uk-form-custom>
                  <input
                    type="file"
                    onChange={(event) => {
                      setSelectedFile(event.target.files[0]);
                    }}
                  />
                  <button className="uk-button uk-button-default" type="button">
                    {selectedFile ? "Change Photo" : "Select photo"}
                  </button>
                </div>
              </fieldset>
            </form>
            <div className="uk-text-right">
              <button
                className="uk-button uk-button-primary"
                type="button"
                data-uk-toggle="target: .new-event-toggle; cls: uk-hidden"
                onClick={() => {}}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEvent;
