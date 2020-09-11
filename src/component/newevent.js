import React from "react";

const NewEvent = ({ activeDate }) => {
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
                <legend className="uk-legend">New memento</legend>

                <div className="uk-margin">
                  <input
                    className="uk-input"
                    type="text"
                    placeholder="Event name"
                  />
                </div>

                <div className="uk-margin">
                  <textarea
                    className="uk-textarea"
                    rows="5"
                    placeholder="Event description"
                  />
                </div>

                <div className="uk-margin">
                  <input
                    type="text"
                    data-role="calendarpicker"
                    data-dialog-mode="true"
                    data-input-format="%y-%m-%d"
                    defaultValue={activeDate.toISOString().substring(0, 10)}
                  />
                </div>

                <div className="js-upload" data-uk-form-custom>
                  <input type="file" />
                  <button className="uk-button uk-button-default" type="button">
                    Upload photo
                  </button>
                </div>
              </fieldset>
            </form>
            <p className="uk-text-right">
              <button
                className="uk-button uk-button-primary"
                type="button"
                data-uk-toggle="target: .new-event-toggle; cls: uk-hidden"
              >
                Create
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEvent;
