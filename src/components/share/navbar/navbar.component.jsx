import React, { useEffect, useState } from 'react';
import {ReactComponent as Logo} from '../../../assets/images/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import './navbar.style.scss';


function Navbar (){
  const location = useLocation();
  
    return(
      <div class="nav-content">
        <nav class="navbar navbar-expand-lg   navbar-light">
            <Link /* class="m-5" */  to="/" className="navbar-brand"><Logo/></Link>
            <button class="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>          
            <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
              <ul class="navbar-nav  mt-2 mt-lg-0 custom-nav">
                <li class="nav-item ">
                    <Link to="/" class={`nav-link ${location.pathname ==="/" ? 'active-link' : ''}`}>Accueil</Link>
                </li>
                <li class="nav-item">
                    <Link to="/financement" class={`nav-link ${location.pathname ==="/financement" ? 'active-link' : ''}`}>Financement</Link>
                </li>
                <li class="nav-item">
                    <Link to="/execution" class={`nav-link ${location.pathname ==="/execution" ? 'active-link' : ''}`}>Niveau d'execution</Link>
                </li>
                <li class="nav-item">
                    <Link to="/vigilance" class={`nav-link ${location.pathname ==="/vigilance" ? 'active-link' : ''}`}>Point de vigilances</Link>
                </li>
                <li class="nav-item">
                    <Link to="/documentation" class={`nav-link ${location.pathname ==="/documentation" ? 'active-link' : ''}`}>Documentation</Link>
                </li>
              </ul>
              <div class="auth-buttons my-2 my-lg-0">
                <Link to="/sign-up">
                  <button class="auth-btn sign-up">
                      S'INSCRIRE
                  </button>
                </Link>
                <Link to="/sign-in">
                  <button class="auth-btn sign-in">
                      SE CONNECTER
                  </button>
                </Link>
              </div>
            </div>
          </nav>
      </div>
    )
};

export default Navbar;