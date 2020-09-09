import React from 'react';
import ReactDOM from 'react-dom';

import Nav from './component/nav';
import EventSlide from './component/eventslide';
import Calendar from './component/calendar';

import mockData from './mockdata';

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