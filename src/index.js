import React from 'react';
import ReactDOM from 'react-dom';
import regeneratorRuntime from "regenerator-runtime";

const mockData = {
    relationship: 'Michelle & Kevin',
    cardList: [
        {
            id: 1,
            name: "Event name #1",
            description: "Event description #1",
            date: "Jan 4",
            year: 2018,
            img: "https://cnet3.cbsistatic.com/img/-qQkzFVyOPEoBRS7K5kKS0GFDvk=/940x0/2020/04/16/7d6d8ed2-e10c-4f91-b2dd-74fae951c6d8/bazaart-edit-app.jpg",
        },
        {
            id: 2,
            name: "Event name #2",
            description: "Event description #2",
            date: "Jan 9",
            year: 2019,
            img: "https://cnet3.cbsistatic.com/img/-qQkzFVyOPEoBRS7K5kKS0GFDvk=/940x0/2020/04/16/7d6d8ed2-e10c-4f91-b2dd-74fae951c6d8/bazaart-edit-app.jpg",
        },
        {
            id: 3,
            name: "Event name #2",
            description: "Event description #2",
            date: "Jan 14",
            year: 2019,
            img: "https://cnet3.cbsistatic.com/img/-qQkzFVyOPEoBRS7K5kKS0GFDvk=/940x0/2020/04/16/7d6d8ed2-e10c-4f91-b2dd-74fae951c6d8/bazaart-edit-app.jpg",
        },
    ]
}

const EventCard = ({ name, description, date, year, img }) => (
    <li>
        <div className="uk-card uk-card-default">
            <div className="uk-card-media-top">
                <div className="uk-inline">
                    <img src={img} alt={name} />
                    <div className="uk-position-top-right uk-overlay uk-overlay-default uk-padding-small">{date}<br />{year}</div>
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
                <div className="uk-position-relative uk-visible-toggle uk-light" tabIndex="-1">
                    <ul className="uk-slider-items uk-child-width-1-2@s uk-grid">
                        {events.map((event) => <EventCard key={event.id} {...event} />)}
                    </ul>
                    <a className="uk-position-center-left uk-position-small uk-hidden-hover" href="#" data-uk-slidenav-previous
                        data-uk-slider-item="previous"></a>
                    <a className="uk-position-center-right uk-position-small uk-hidden-hover" href="#" data-uk-slidenav-next
                        data-uk-slider-item="next"></a>
                </div>
                <ul className="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>
            </div>
        </div>
    </div>
);

const addDays = (date, days) => (
    new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + days,
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    )
)

const firstDateInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1);
};

const firstDateOfFirstWeek = (date) => {
    const firstDate = firstDateInMonth(date);
    const day = firstDate.getDay();
    return addDays(firstDate, -day);
};

const firstDayOfWeeksInMonth = function* (date) {
    const month = date.getMonth();
    let nextDay = firstDateOfFirstWeek(date);
    while (nextDay.getMonth() <= month) {
        yield nextDay;
        nextDay = addDays(nextDay, 7);
    }
};

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
    const firstInMonth = firstDateInMonth(activeDate);
    const firstDayInMonth = firstInMonth.getDay();
    const firstDays =
        Array.from(firstDayOfWeeksInMonth(activeDate)).map(date => date.toString())

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

const Nav = ({ brand }) => (
    <nav className="uk-navbar-container" data-uk-navbar>
        <div className="uk-navbar-left">
            <ul className="uk-navbar-nav">
                <li className="uk-active"><a href="#">Memento</a></li>
            </ul>
        </div>
        <div className="uk-navbar-center">
            <h3 className="uk-margin-remove">{brand}</h3>
        </div>
        <div className="uk-navbar-right">
            <ul className="uk-navbar-nav">
                <li className="uk-active"><a href="#"><span uk-icon="user"></span></a></li>
            </ul>
        </div>
    </nav>
);

const App = () => {
    const relationship = mockData.relationship;
    const cardList = mockData.cardList;
    return (
        <>
            <Nav brand={relationship} />
            <EventSlide events={cardList} />
            <Calendar activeDate={new Date()} />
        </>
    );
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
);