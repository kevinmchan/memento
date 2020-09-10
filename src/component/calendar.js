import React from "react";
import {
  addDays,
  firstDayOfWeeksInMonth,
  daysOfWeek,
  months,
} from "../dateutils";

const eventsContainsDate = (events, date) => {
  for (let e of events) {
    if (
      date.getDate() === e.date.getDate() &&
      date.getMonth() === e.date.getMonth()
    ) {
      return true;
    }
  }
  return false;
};

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

const CalendarRow = ({ first, events, activeDate, setActiveDate }) => {
  const offsets = [0, 1, 2, 3, 4, 5, 6];
  return (
    <tr>
      {offsets.map((offset) => {
        const date = addDays(first, offset);
        return (
          <CalendarDate
            key={`date-${date}`}
            date={date}
            hasEvent={eventsContainsDate(events, date)}
            isInMonth={date.getMonth() === activeDate.getMonth()}
            isActive={date.valueOf() === activeDate.valueOf()}
            setActiveDate={setActiveDate}
          />
        );
      })}
    </tr>
  );
};

const CalendarBody = ({ events, activeDate, setActiveDate }) => {
  const firstDays = Array.from(firstDayOfWeeksInMonth(activeDate));

  return (
    <tbody>
      {firstDays.map((date) => (
        <CalendarRow
          key={`row-${date}`}
          first={date}
          events={events}
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
  const prevMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() - 1, 1);

  const nextMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 1);

  return (
    <div className="uk-flex uk-flex-center uk-flex-middle uk-width-2xlarge uk-margin-auto uk-inline">
      <div className="uk-overlay uk-position-center-right">
        <Today setActiveDate={setActiveDate} />
      </div>
      <div>
        <div>
          <a
            className="uk-link-muted"
            onClick={() => setActiveDate(prevMonth(activeDate))}
          >
            <span data-uk-icon="chevron-double-left" />
          </a>
          <span>
            {months[activeDate.getMonth()].slice(0, 3)}{" "}
            {activeDate.getFullYear()}
          </span>
          <a
            className="uk-link-muted"
            onClick={() => setActiveDate(nextMonth(activeDate))}
          >
            <span data-uk-icon="chevron-double-right" />
          </a>
        </div>
      </div>
    </div>
  );
};

const Calendar = ({ events, activeDate, setActiveDate }) => {
  return (
    <div className="uk-section">
      <div className="uk-container">
        <MonthSelector activeDate={activeDate} setActiveDate={setActiveDate} />
        <div className="uk-overflow-auto uk-width-2xlarge uk-align-center uk-card-default">
          <table className="uk-table uk-table-small uk-table-divider">
            <CalendarHeader />
            <CalendarBody
              events={events}
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
