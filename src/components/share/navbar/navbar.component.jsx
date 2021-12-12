import React, { useEffect, useState } from "react";
//import {ReactComponent as Logo} from '../../../assets/images/logo.svg';
import { Link, useLocation } from "react-router-dom";
import "./navbar.style.scss";

function Navbar() {
  const location = useLocation();

  return (
    <div className="nav-content">
      <nav className="navbar navbar-public navbar-expand-lg   navbar-light">
        <div className="row">
          <button
            className="navbar-toggler ml-2"
            id="colaps-nav-button"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav  mt-2 mt-lg-0 custom-nav">
            <li className="nav-item ">
              <Link
                to="/"
                class={`nav-link ${
                  location.pathname === "/" ? "active-link" : ""
                }`}
              >
                Accueil
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/financement"
                class={`nav-link ${
                  location.pathname === "/financement" ? "active-link" : ""
                }`}
              >
                Financement
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/execution"
                class={`nav-link ${
                  location.pathname === "/execution" ? "active-link" : ""
                }`}
              >
                Niveau d'execution
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/vigilance"
                class={`nav-link ${
                  location.pathname === "/vigilance" ? "active-link" : ""
                }`}
              >
                Point de vigilances
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/documentation"
                class={`nav-link ${
                  location.pathname === "/documentation" ? "active-link" : ""
                }`}
              >
                Documentation
              </Link>
            </li>
          </ul>
          <div className="auth-buttons my-2 my-lg-0">
            <Link /* to="/sign-up" */>
              <button className="auth-btn sign-up">S'INSCRIRE</button>
            </Link>
            <Link to="/sign-in">
              <button className="auth-btn sign-in">SE CONNECTER</button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
