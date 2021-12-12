import React from "react";
import { withRouter } from "react-router";
import Logo from "../../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { fetchCurrentUserAsync } from "../../../redux/user/user.thunk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

function AdminNavbar({ currentUser, history }) {
  const handleLogOut = () => {
    localStorage.removeItem("token");
    axios.post("logout").then(() => {
      // console.log(localStorage.getItem('token'))
    });
    history.push("/");
  };

  return (
    <nav class="navbar navbar-expand-lg navbar-white bg-primary">
      <div class="d-flex align-items-center">
        <button type="button" id="sidebarCollapse" class="btn btn-light mr-4">
          <img src="/assets/admin/images/menu-bar.svg" alt="" />
        </button>
        <h4 class="app-title mb-0 text-white">
          MINISTERE DE LA SANTE ET DE L'ACTION SOCIALE
        </h4>
      </div>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="nav navbar-nav ml-auto">
          <li class="nav-item dropdown notifications">
            <div class="nav-dropdown">
              <a
                href=""
                class="nav-item nav-link dropdown-toggle"
                data-toggle="dropdown"
              >
                <FontAwesomeIcon icon={faBell} className="ml-1" />
                <span class="nb-notif">3</span>
              </a>
              <div class="dropdown-menu dropdown-menu-right nav-link-menu dropdown-notif">
                <ul class="nav-list">
                  <li>
                    <a href="#" class="dropdown-item">
                      <div class="avatar">
                        <span class="etat enligne"></span>
                        <img src="/assets/admin/images/avatar2.jpg" alt="" />
                      </div>
                      <div>
                        <p class="titre">Modou FALL</p>
                        <p class="texte">Lorem ipsum dolor sit amet</p>
                        <p class="date">
                          {" "}
                          <img src="/assets/admin/images/time.svg" alt="" /> il
                          y a 5mn
                        </p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="dropdown-item">
                      <div class="avatar">
                        <span class="etat enligne"></span>
                        <img src="/assets/admin/images/avatar2.jpg" alt="" />
                      </div>
                      <div>
                        <p class="titre">Modou FALL</p>
                        <p class="texte">Lorem ipsum dolor sit amet</p>
                        <p class="date">
                          {" "}
                          <img src="/assets/admin/images/time.svg" alt="" /> il
                          y a 35mn
                        </p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="dropdown-item">
                      <div class="avatar">
                        <span class="etat enligne"></span>
                        <img src="/assets/admin/images/avatar2.jpg" alt="" />
                      </div>
                      <div>
                        <p class="titre">Modou FALL</p>
                        <p class="texte">Lorem ipsum dolor sit amet</p>
                        <p class="date">
                          {" "}
                          <img src="/assets/admin/images/time.svg" alt="" /> il
                          y a 1h
                        </p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="dropdown-item">
                      <div class="avatar">
                        <span class="etat enligne"></span>
                        <img src="/assets/admin/images/avatar2.jpg" alt="" />
                      </div>
                      <div>
                        <p class="titre">Modou FALL</p>
                        <p class="texte">Lorem ipsum dolor sit amet</p>
                        <p class="date">
                          {" "}
                          <img src="/assets/admin/images/time.svg" alt="" /> il
                          y a 6h
                        </p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="dropdown-item">
                      <div class="avatar">
                        <span class="etat enligne"></span>
                        <img src="/assets/admin/images/avatar2.jpg" alt="" />
                      </div>
                      <div>
                        <p class="titre">Modou FALL</p>
                        <p class="texte">Lorem ipsum dolor sit amet</p>
                        <p class="date">
                          {" "}
                          <img src="/assets/admin/images/time.svg" alt="" /> il
                          y a 1j
                        </p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="dropdown-item text-primary justify-content-center font-weight-bold"
                    >
                      Voir toutes
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="nav-item dropdown">
            <div class="nav-dropdown">
              <a
                href=""
                class="nav-item nav-link dropdown-toggle user-profile"
                data-toggle="dropdown"
              >
                <div class="nom-role">
                  <span class="username">
                    {currentUser &&
                      `${currentUser?.prenom} ${currentUser?.nom}`}
                  </span>
                  <span class="role">
                    {currentUser?.roles.length > 0
                      ? currentUser?.roles[0]
                      : "Piont focal"}
                  </span>
                </div>
                <div class="avatar">
                  <img
                    src={
                      currentUser && currentUser?.photo
                        ? `${currentUser?.photo}`
                        : "/assets/images/faces/avatar.png"
                    }
                    alt="Profile"
                  />
                </div>
              </a>
              <div class="dropdown-menu dropdown-menu-right nav-link-menu">
                <ul class="nav-list">
                  <li>
                    <a
                      role="button"
                      class="dropdown-item"
                      onClick={() =>
                        history.push("/admin/utilisateurs/profile")
                      }
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a href="#" class="dropdown-item">
                      Messages
                    </a>
                  </li>
                  <li>
                    <a href="#" class="dropdown-item">
                      Paramètres
                    </a>
                  </li>
                  <div class="dropdown-divider"></div>
                  <li>
                    <a
                      role="button"
                      onClick={handleLogOut}
                      class="dropdown-item"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
      {/* <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <a className="navbar-brand brand-logo" href="#">
          <img src={Logo} alt="logo" />
        </a>
        <a className="navbar-brand brand-logo-mini" href="#">
          <img src="/assets/images/logo-mini.svg" alt="logo" />
        </a>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-stretch">
        <button
          className="navbar-toggler navbar-toggler align-self-center"
          type="button"
          data-toggle="minimize"
        >
          <span className="mdi mdi-menu"></span>
        </button>
        <div className="search-field d-none d-md-block">
          <form className="d-flex align-items-center h-100" action="#">
            <div className="input-group">
              <div className="input-group-prepend bg-transparent">
                <i className="input-group-text border-0 mdi mdi-magnify"></i>
              </div>
              <input
                type="text"
                className="form-control bg-transparent border-0"
                placeholder="Rechercher"
              />
            </div>
          </form>
        </div>
        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item nav-profile dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="profileDropdown"
              href="#"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              <div className="nav-profile-img">
                <img
                  src={
                    currentUser && currentUser?.photo
                      ? `${currentUser?.photo}`
                      : "/assets/images/faces/avatar.png"
                  }
                  alt="image"
                />
                <span className="availability-status online"></span>
              </div>
              <div className="nav-profile-text">
                <p className="mb-1 text-black">
                  {currentUser && `${currentUser?.prenom} ${currentUser?.nom}`}
                </p>
              </div>
            </a>
            <div
              className="dropdown-menu navbar-dropdown"
              aria-labelledby="profileDropdown"
            >
              <Link to="/admin/utilisateurs/profile" className="dropdown-item">
                <i className="mdi mdi-settings mr-2 text-success"></i>{" "}
                Paramètres
              </Link>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#" onClick={handleLogOut}>
                <i className="mdi mdi-logout mr-2 text-primary"></i> Deconnexion{" "}
              </a>
            </div>
          </li>
          <li className="nav-item d-none d-lg-block full-screen-link">
            <a className="nav-link">
              <i className="mdi mdi-fullscreen" id="fullscreen-button"></i>
            </a>
          </li>
          <li
            className="nav-item nav-logout d-none d-lg-block"
            onClick={handleLogOut}
          >
            <a className="nav-link" href="#">
              <i className="mdi mdi-power"></i>
            </a>
          </li>
          <li className="nav-item nav-settings d-none d-lg-block">
            <a className="nav-link" href="#">
              <i className="mdi mdi-format-line-spacing"></i>
            </a>
          </li>
        </ul>
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          data-toggle="offcanvas"
        >
          <span className="mdi mdi-menu"></span>
        </button>
      </div>
    </nav> */}
    </nav>
  );
}
/* const mapStateToProps = state => ({
    currentUser: state.user.currentUser
  }); */

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: () => dispatch(fetchCurrentUserAsync()),
});

export default withRouter(connect(null, mapDispatchToProps)(AdminNavbar));
