import React from 'react';
import ReactDOM from 'react-dom';

const relationship = 'Michelle & Kevin'

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

const App = () => (
    <>
        <Nav brand={relationship} />
    </>
);

ReactDOM.render(
    <App />,
    document.getElementById('root')
);