import React from 'react';
import { addDays, firstDayOfWeeksInMonth } from '../dateutils';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
];

const CalendarHeader = () => (
    <thead className="uk-text-center">
        <tr>
            {daysOfWeek.map((day) => <th key={`${day}-header`}> {day} </th>)}
        </tr>
    </thead>
);

const CalendarDate = ({ date, events, inMonth, isActive }) => {
    return (
        <td className="uk-text-center">{date.getDate()}</td>
    );
};

const CalendarRow = ({ first }) => {
    const offsets = [0, 1, 2, 3, 4, 5, 6];
    return (
        <tr>
            {
                offsets.map((offset) => {
                    const date = addDays(first, offset);
                    return <CalendarDate key={`date-${date}`} date={date} />;
                })
            }
        </tr>
    );
};

const CalendarBody = ({ activeDate }) => {

    const firstDays = Array.from(firstDayOfWeeksInMonth(activeDate));

    return (
        < tbody >
            {firstDays.map((date) => <CalendarRow key={`row-${date}`} first={date} />)}
        </tbody >
    );
};

const MonthSelector = ({ activeDate }) => {
    return (
        <div className="uk-flex uk-flex-center uk-flex-middle uk-width-2xlarge uk-margin-auto uk-inline">
            <div className="uk-overlay uk-position-center-right"><a className="uk-link-muted" href="#">Today</a></div>
            <div>
                <div className="uk-botton-group">
                    <button className="uk-button uk-button-text"><span data-uk-icon="chevron-double-left"/></button>
                    <button className="uk-button uk-button-default" type="button">
                        {months[activeDate.getMonth()]}
                    </button>
                    <button className="uk-button uk-button-text"><span data-uk-icon="chevron-double-right"/></button>
                </div>
            </div>
        </div>
    );
};

const Calendar = ({ activeDate }) => {
    return (
        <div className="uk-section">
            <div className="uk-container">
                <MonthSelector activeDate={activeDate} />
                <div className="uk-overflow-auto uk-width-2xlarge uk-align-center uk-card-default">
                    <table className="uk-table uk-table-small uk-table-divider">
                        <CalendarHeader />
                        <CalendarBody activeDate={activeDate} />
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Calendar;