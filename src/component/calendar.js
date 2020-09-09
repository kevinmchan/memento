import React from 'react';
import { addDays, firstDayOfWeeksInMonth } from '../dateutils';

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarHeader = () => (
    <thead className="uk-text-center">
        <tr>
            {daysOfWeek.map((day) => <th key={`${day}-header`}> {day} </th>)}
        </tr>
    </thead>
);

const CalendarDate = ({ date, events, inMonth, isActive }) => {
    return (
        <td>{date.getDate()}</td>
    )
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
    )
};

const CalendarBody = ({ activeDate }) => {

    const firstDays = Array.from(firstDayOfWeeksInMonth(activeDate));

    return (
        < tbody >
            {firstDays.map((date) => <CalendarRow key={`row-${date}`} first={date} />)}
        </tbody >
    );
};

const Calendar = ({ activeDate }) => {
    return (
        <div className="uk-section">
            <div className="uk-container">
                <div className="uk-overflow-auto">
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