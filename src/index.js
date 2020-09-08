import React from 'react';
import ReactDOM from 'react-dom';

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
                    <div class="uk-position-top-right uk-overlay uk-overlay-default uk-padding-small">{date}<br />{year}</div>
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
                <ul class="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>
            </div>
        </div>
    </div>
);

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
        </>
    );
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
);