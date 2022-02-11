import {
  faBuilding,
  faCoffee,
  faDonate,
  faTachometerAlt,
  faUserCog,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../../assets/images/logo.svg";
import Lamine from "../../../assets/images/lamine.png";

function AdminSideBar({ currentUser }) {
  const location = useLocation();
  return (
    <nav id="sidebar" class="">
      <div class="sidebar-header bg-default">
        <img src={Logo} alt="logo" alt="MSAS" class="app-logo" />
      </div>
      <div class="photo">
          <div class="m-5 mb-1">
            <img class="avatar" src={Lamine}  alt=""/>
          </div>
          <p class="text-center mb-1 text-secondary">
              Lamine NDIAYE
          </p>
          <p class="text-center mb-4 text-small"><span>Citoyen</span></p>
          
        </div>
      <ul class="list-unstyled components">
        <li>
          <Link
            className={`nav-link ${location.pathname === "/admin/dashboard" ? "active" : ""}`}
            to="/admin/dashboard"
          >
            <FontAwesomeIcon icon={faTachometerAlt} />
            <span className="menu-title">Tableau de Bord</span>
          </Link>
        </li>
        {currentUser?.roles.includes("Admin") && (
          <>
            <li>
              <Link
                className={`nav-link ${
                  location.pathname === "/admin/utilisateurs" ? "active" : ""
                }`}
                to="/admin/utilisateurs"
              >
                <FontAwesomeIcon icon={faUsers} />
                <span className="menu-title">Utilisateurs</span>
              </Link>
            </li>
            <li>
              <Link
                className={`nav-link ${
                  location.pathname === "/admin/roles" ? "active" : ""
                }`}
                to="/admin/roles"
              >
                <FontAwesomeIcon icon={faUserCog} />
                <span className="menu-title">Rôles</span>
              </Link>
            </li>
            <li>
              <Link
                className={`nav-link ${
                  location.pathname === "/admin/structures" ? "active" : ""
                }`}
                to="/admin/structures"
              >
                <FontAwesomeIcon icon={faBuilding} />
                <span className="menu-title">Structures</span>
              </Link>
            </li>
            <li>
              <Link
                className={`nav-link ${
                  location.pathname === "/admin/investissements" ? "active" : ""
                }`}
                to="/admin/investissements"
              >
                <FontAwesomeIcon icon={faDonate} />
                <span className="menu-title">Investissements</span>
              </Link>
            </li>
          </>
        )}

        {!currentUser?.roles.includes("Admin") && (
          <li>
            <Link
              className={`nav-link ${
                location.pathname === "/admin/structures/prive" ? "active" : ""
              }`}
              to="/admin/structures/prive"
            >
              <FontAwesomeIcon icon={faDonate} />
              <span className="menu-title">Investissement</span>
            </Link>
          </li>
        )}
      </ul>
      <p class="copyright mt-auto">Powered by @IP3-Conseil - 2021</p>

      {/* <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item nav-profile">
          <a href="#" className="nav-link">
            <div className="nav-profile-image">
              <img
                src={
                  currentUser && currentUser?.photo
                    ? `${currentUser?.photo}`
                    : "/assets/images/faces/avatar.png"
                }
                alt="profile"
              />
              <span className="login-status online"></span>
            </div>
            <div className="nav-profile-text d-flex flex-column">
              <span className="font-weight-bold mb-2">
                {currentUser && `${currentUser?.prenom} ${currentUser?.nom}`}
              </span>
              <span className="text-secondary text-small">
                {currentUser && currentUser?.roles[0]?.toUpperCase()}
              </span>
            </div>
            <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
          </a>
        </li>
        {currentUser?.roles.includes("Admin") ? (
          <>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/admin/roles" ? "active" : ""
                }`}
                to="/admin/roles"
              >
                <span className="menu-title">Role</span>
                <i className="mdi mdi-home menu-icon"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/admin/utilisateurs" ? "active" : ""
                }`}
                to="/admin/utilisateurs"
              >
                <span className="menu-title">Utilisateurs</span>
                <i className="mdi mdi-account menu-icon"></i>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/admin/structures" ? "active" : ""
                }`}
                to="/admin/structures"
              >
                <span className="menu-title">Structures</span>
                <i className=" mdi mdi-houzz  menu-icon"></i>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/admin/structures" ? "active" : ""
                }`}
                to="/admin/structures"
              >
                <span className="menu-title">Financements</span>
                <i className=" mdi mdi-houzz  menu-icon"></i>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav> */}
    </nav>
  );
}

export default AdminSideBar;
