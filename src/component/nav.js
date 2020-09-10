import React from "react";

const Nav = ({ brand }) => (
  <nav
    className="uk-navbar-container"
    data-uk-navbar
    data-uk-sticky="bottom: 200"
  >
    <div className="uk-navbar-left">
      <ul className="uk-navbar-nav">
        <li className="uk-active">
          <a href="#">Memento</a>
        </li>
      </ul>
    </div>
    <div className="uk-navbar-center">
      <h3 className="uk-margin-remove">{brand}</h3>
    </div>
    <div className="uk-navbar-right">
      <ul className="uk-navbar-nav">
        <li className="uk-active">
          <a href="#">
            <span uk-icon="user" />
          </a>
        </li>
      </ul>
    </div>
  </nav>
);

export default Nav;
