import React from "react";
import {
  addDays,
  firstDayOfWeeksInMonth,
  daysOfWeek,
  months,
} from "../dateutils";

const CalendarHeader = () => (
  <thead className="uk-text-center">
    <tr>
      {daysOfWeek.map((day) => (
        <th key={`${day}-header`}> {day} </th>
      ))}
    </tr>
  </thead>
);

const CalendarDate = ({
  date,
  hasEvent,
  isInMonth,
  isActive,
  setActiveDate,
}) => {
  const classes =
    "calendar-date uk-text-center " +
    (isInMonth ? "uk-text-secondary " : "uk-text-muted ") +
    (isActive ? "uk-background-primary" : "uk-background-default");

  return (
    <td className={classes} onClick={() => setActiveDate(date)}>
      <a className="uk-link-reset">{date.getDate()}</a>
      {hasEvent ? <strong>&#729;</strong> : ""}
    </td>
  );
};

const CalendarRow = ({ first, activeDate, setActiveDate }) => {
  const offsets = [0, 1, 2, 3, 4, 5, 6];
  return (
    <tr>
      {offsets.map((offset) => {
        const date = addDays(first, offset);
        return (
          <CalendarDate
            key={`date-${date}`}
            date={date}
            isInMonth={date.getMonth() === activeDate.getMonth()}
            isActive={date.valueOf() === activeDate.valueOf()}
            setActiveDate={setActiveDate}
          />
        );
      })}
    </tr>
  );
};

const CalendarBody = ({ activeDate, setActiveDate }) => {
  const firstDays = Array.from(firstDayOfWeeksInMonth(activeDate));

  return (
    <tbody>
      {firstDays.map((date) => (
        <CalendarRow
          key={`row-${date}`}
          first={date}
          activeDate={activeDate}
          setActiveDate={setActiveDate}
        />
      ))}
    </tbody>
  );
};

const Today = ({ setActiveDate }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return (
    <a className="uk-link-muted" onClick={() => setActiveDate(today)}>
      Today
    </a>
  );
};

const MonthSelector = ({ activeDate, setActiveDate }) => {
  return (
    <div className="uk-flex uk-flex-center uk-flex-middle uk-width-2xlarge uk-margin-auto uk-inline">
      <div className="uk-overlay uk-position-center-right">
        <Today setActiveDate={setActiveDate} />
      </div>
      <div>
        <div className="uk-botton-group">
          <button className="uk-button uk-button-text">
            <span data-uk-icon="chevron-double-left" />
          </button>
          <button className="uk-button uk-button-default" type="button">
            {months[activeDate.getMonth()]}
          </button>
          <button className="uk-button uk-button-text">
            <span data-uk-icon="chevron-double-right" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Calendar = ({ events, activeDate, setActiveDate }) => {
  //TODO: populate body with events
  //TODO: change month based on month selection
  return (
    <div className="uk-section">
      <div className="uk-container">
        <MonthSelector activeDate={activeDate} setActiveDate={setActiveDate} />
        <div className="uk-overflow-auto uk-width-2xlarge uk-align-center uk-card-default">
          <table className="uk-table uk-table-small uk-table-divider">
            <CalendarHeader />
            <CalendarBody
              activeDate={activeDate}
              setActiveDate={setActiveDate}
            />
          </table>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
