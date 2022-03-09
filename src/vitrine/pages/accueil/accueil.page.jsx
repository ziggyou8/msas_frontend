import React from "react";
//import "./accueil.style.css";
import { ReactComponent as LinkedInLightIcon } from "../../../assets/icons/linkedIn.svg";
import { ReactComponent as TwiterLightIcon } from "../../../assets/icons/twiter.svg";
import { ReactComponent as FaceBookLightIcon } from "../../../assets/icons/facebook.svg";
import { ReactComponent as InfoIcon } from "../../../assets/icons/information.svg";
import logo from "../../../assets/vitrine/Assets/images/logo.svg";
import source from "../../../assets/vitrine/Assets/icon/mobil ressource.svg";
import sourceCommun from "../../../assets/vitrine/Assets/icon/ressource en commun.svg";
import service from "../../../assets/vitrine/Assets/icon/services.svg";
import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "../../../components/ChangingProgressProvider";

function AccueilPage() {
  // const percentage = 66;

  // const BarData = {
  //   labels: [
  //     "Etat",
  //     "Collectivités  territoriales",
  //     "Secteurs privés Sanitaires",
  //     "Secteurs privés non Sanitaires",
  //     "ONG et association",
  //     "PTF",
  //     "Société civile",
  //   ],
  //   datasets: [
  //     {
  //       label:
  //         "Evolution Mobilisation Engagement pour le financement de la santé au senegal",
  //       backgroundColor: "rgb(23, 125, 255)",
  //       borderColor: "rgb(23, 125, 255)",
  //       data: [140, 175, 50, 100, 75, 150, 175],
  //     },
  //   ],
  // };

  // const chartOptions = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   scales: {
  //     xAxes: [
  //       {
  //         // maxBarThickness:80,
  //         ticks: {
  //           beginAtZero: true,
  //         },
  //       },
  //     ],
  //   },
  // };

  // const doughnutData = {
  //   labels: ["50%", "45%"],
  //   datasets: [
  //     {
  //       label: "My First Dataset",
  //       data: [50, 45, 40],
  //       backgroundColor: [
  //         "rgb(255, 132, 75)",
  //         "rgb(111, 150, 170)",
  //         "rgb(225, 232, 238)",
  //       ],
  //       hoverOffset: 4,
  //     },
  //   ],
  // };

  // const chartData2 = {
  //   labels: ["", "", "", "", ""],
  //   datasets: [
  //     {
  //       label: "# of Votes",
  //       data: [19, 5, 12, 23, 9],
  //       backgroundColor: [
  //         "rgb(255, 132, 75)",
  //         "rgb(255, 132, 75)",
  //         "rgb(255, 132, 75)",
  //         "rgb(255, 132, 75)",
  //         "rgb(255, 132, 75)",
  //       ],
  //       borderColor: [
  //         "rgb(255, 132, 75)",
  //         "rgb(255, 132, 75)",
  //         "rgb(255, 132, 75)",
  //         "rgb(255, 132, 75)",
  //         "rgb(255, 132, 75)",
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };
  // const chart2options = {
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //     },
  //   },
  // };

  // // const labels2 = [10, 30, 39, 20, 25, 34, 0];
  // const lineData = {
  //   labels: labels2,
  //   datasets: [
  //     {
  //       label: "Dataset 1",
  //       data: [10, 30, 39, 20, 25, 34, 0],
  //       borderColor: "rgb(255, 132, 75)",
  //       backgroundColor: "rgb(255, 132, 75)",
  //     },
  //     {
  //       label: "Dataset 2",
  //       data: [18, 33, 22, 19, 11, 39, 30],
  //       borderColor: "rgb(111, 150, 170)",
  //       backgroundColor: "rgb(111, 150, 170)",
  //     },
  //   ],
  // };
  // const lineOptions = {
  //   responsive: true,
  //   plugins: {
  //     title: {
  //       display: true,
  //       text: "",
  //     },
  //   },
  //   scales: {
  //     y: {
  //       // the data minimum used for determining the ticks is Math.min(dataMin, suggestedMin)
  //       suggestedMin: 30,

  //       // the data maximum used for determining the ticks is Math.max(dataMax, suggestedMax)
  //       suggestedMax: 50,
  //     },
  //   },
  // };

  return (
    <div>
      <div className="header">
        <div className="header-content row d-flex  align-items-center ">
          <div className="col-md-7 col-sm-12 px-0">
            <p className="title fw-bold" style={{ fontSize: "2vh" }}>
              PLATEFORME NUMERIQUE DE SUIVI DU FINANCEMENT DE LA SANTE AU
              SENEGAL
            </p>
          </div>
          <div className="col-md-5 col-sm-12  rs reseaux-sociaux ">
            <ul className="d-flex" style={{ marginRight: "-1rem" }}>
              <p className="title">Nous suivre sur :</p>
              <li>
                <Link to="">
                  <LinkedInLightIcon />
                </Link>
              </li>
              <span className="ligne"></span>
              <li>
                <Link>
                  <TwiterLightIcon />
                </Link>
              </li>
              <span className="ligne"></span>
              <li>
                <Link>
                  <FaceBookLightIcon />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white sticky-md-top ">
        <nav
          id="navbar-example2"
          className="navbar navbar-expand-lg navbar-light  bg-white   bg-body  max "
        >
          <Link className="navbar-brand" to="">
            <img
              style={{ marginBottom: "10px" }}
              className="logo"
              src={logo}
            ></img>
          </Link>
          {/* <a  href="#"><img className="logo" src="./Assets/images/minist.png" alt="" /></a> */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="nav">
              <li className="nav-item ps-3 ">
                <a className="nav-link " href="#scrollspyAccueil">
                  Accueil
                </a>
              </li>
              <li className="nav-item ps-3">
                <a className="nav-link" href="#scrollspyFinancement">
                  Financement
                </a>
              </li>
              <li className="nav-item ps-3">
                <a className="nav-link" href="#scrollspyIndicateurs">
                  Indicateurs
                </a>
              </li>
            </ul>
          </div>
          <div className="mx-auto d-flex justify-content-end">
            <li className="nav-item navbar-nav ps-3 pe-3 ms-auto">
              <a className="btn  btn btn-sm btn-order " href="#">
                DEMANDE D'INFORMATION
              </a>
            </li>
            <li className="nav-item navbar-nav">
              <Link
                to="/sign-in"
                className="btn text-white text-decoration-none  btn btn-sm btn-order2 "
              >
                SE CONNECTER
              </Link>
            </li>
          </div>
        </nav>
      </div>
      <div
        data-bs-spy="scroll"
        data-bs-target="#navbar-example2"
        data-bs-offset="0"
        className="scrollspy-example"
        tabindex="0"
      >
        <h4 className="text-center" id="scrollspyAccueil"></h4>
        <div className=" ">
          <div className="card ">
            <div className="row g-0">
              <div className="col-md-5 col-sm-12 bg-blue-img ">
                <div className="card-body text-light ms-5 ps-3 px-0 pt-5 m-5 max">
                  <div className="d-flex flex-column pb-4">
                    <h5 className="card-title slide-texxt text-white pt-5">
                      Le Financemet de la santé, une priorité pour les
                      acteurs...
                    </h5>
                    <div className="divider"></div>
                  </div>
                  <p
                    className="card-text text-white pb-3"
                    style={{ textAlign: "justify", width: "95%" }}
                  >
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Temporibus explicabo assumenda nisi nostrum natus suscipit
                    vero quo quia sint ipsum aut, doloribus molestias quaerat
                    atque totam. Ratione quasi assumenda cumque!
                  </p>
                  <div className="pb-5">
                    <a className="btn btn btn-sm bouton" href="#">
                      EN SAVOIR PLUS
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-7 col-sm-12 bg-image1"></div>
            </div>
          </div>
          <div className="bg-grand-section">
            <h4 id="scrollspyFinancement"> </h4>
            <div className="d-flex flex-column max pb-4">
              <p className="card-title text-blue fs-3 pt-5 col-md-9">
                Le Financement de la santé
              </p>
              <div className="divider-financement"></div>
            </div>
            <div className="container-fluid g-0 px-0 max">
              <div className="card mb-3 " style={{ maxWidth: "100%" }}>
                <div className="row  g-0">
                  <div className="col-md-8  ">
                    <div className="card-body mb-5 p-0 pt-5  max">
                      <div className=" trick4 d-flex  justify-content-start mb-5  ">
                        <div>
                          {" "}
                          <img
                            className="icon-fin  pe-4 "
                            src={source}
                            alt=""
                          />
                        </div>
                        <div className="d-flex flex-column">
                          <div className="financement ps-3 pb-1">
                            Mobilisation de ressources
                          </div>
                          <p className="ps-3 text-financement">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Necessitatibus, similique? Lorem ipsum dolor
                            sit amet. Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit. Obcaecati, quos.{" "}
                          </p>
                        </div>
                      </div>
                      <div className=" trick4 d-flex  justify-content-start mb-5    ">
                        <div>
                          {" "}
                          <img
                            className="icon-fin  pe-4 "
                            src={sourceCommun}
                            alt=""
                          />
                        </div>
                        <div className="d-flex flex-column">
                          <div className="ps-3 pb-1 financement-Mise-en-commun">
                            Mise en commun des ressources
                          </div>
                          <p className="ps-3 text-financement">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Necessitatibus, similique? Lorem ipsum dolor
                            sit amet. Lorem ipsum dolor sit, amet consectetur
                            adipisicing elit. Adipisci, alias.
                          </p>
                        </div>
                      </div>
                      <div className="  d-flex align-items-center justify-content-start   ">
                        <div>
                          {" "}
                          <img
                            className="icon-fin  pe-4 "
                            src={service}
                            alt=""
                          />
                        </div>
                        <div className="d-flex flex-column">
                          <div className="ps-3 financement">
                            Achat des services
                          </div>
                          <p className="ps-3 text-financement">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Necessitatibus, similique? Lorem ipsum dolor
                            sit amet Lorem ipsum dolor sit, amet consectetur
                            adipisicing elit. Nostrum?.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 bg-image2 "></div>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column max pb-5">
              <p className="card-title text-blue fs-4  pt-5 col-md-9">
                Le Volume du Financement de la santé par sources
              </p>
              <div className="divider-financement"></div>
            </div>
            <div className="container-fluid max ">
              <div className="row ">
                <div className="card   px-0 mb-3">
                  <div className="row  mx-auto g-0">
                    <div className="col-md-2 text-light bg-blue">
                      <Link to="/mobilisation">
                        <InfoIcon className="icon-info" />
                      </Link>
                      <p className=" mob-mise-en-commun-achat text-white  ">
                        MOBILISATION DES RESSOURCES
                      </p>
                    </div>
                    <div className="col text-financement">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center align-items-center">
                          <p className="card-title categorie-volume-financement">
                            Niveau d'execution
                          </p>
                          <p>
                            <img
                              className="icon2"
                              src="./Assets/icon/niv-execution.svg"
                              alt=""
                            />
                          </p>
                        </div>

                        <div>
                          <div id="task-complete" style={{ margin: "20px" }}>
                            <ChangingProgressProvider values={[0, 60]}>
                              {(percentage) => (
                                <CircularProgressbar
                                  strokeWidth={5}
                                  value={percentage}
                                  text={`${60}%`}
                                  styles={buildStyles({
                                    pathTransition:
                                      percentage === 0
                                        ? "none"
                                        : "stroke-dashoffset 0.5s ease 0s",
                                    pathColor: "#F2913D",
                                    textColor: "Black",
                                    trailColor: "#d6d6d6",
                                    backgroundColor: "#3e98c7",
                                  })}
                                />
                              )}
                            </ChangingProgressProvider>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col text-financement">
                      <div className="card-body trait-vertical-gauche">
                        <div className="d-flex  justify-content-between align-items-center">
                          <p className="card-title categorie-volume-financement">
                            Engagement
                          </p>
                          <p>
                            <img
                              className="icon2"
                              src="./Assets/icon/engagement.svg"
                              alt=""
                            />
                          </p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">Etat</p>
                          <p className="chiffres">100 000 000 F CFA</p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">
                            Collectivités Territoriales (CT)
                          </p>
                          <p className="chiffres">200 000 000 F CFA</p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">Secteurs privés Sanitaires</p>
                          <p className="chiffres"> 600 000 F CFA</p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">
                            Secteurs privés non Sanitaires
                          </p>
                          <p className="chiffres">100 000 000 F CFA</p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">
                            Secteurs privés non Sanitaires
                          </p>
                          <p className="chiffres"> 13000 000 F CFA</p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">ONG et associations</p>
                          <p className="chiffres">20 000 000 F CFA</p>
                        </div>
                        <div className="">
                          <p className="secteur">
                            Partenaires Techniques Financiers (PTF)
                          </p>
                          <p className="chiffres">9 000 000 F CFA</p>
                        </div>
                      </div>
                    </div>
                    <div className="col text-financement">
                      <div className="card-body trait-vertical-gauche trait-vertical-droite">
                        <div className="d-flex  justify-content-between align-items-center">
                          <p className="card-title categorie-volume-financement">
                            Mobilisation
                          </p>
                          <p>
                            <img
                              className="icon2"
                              src="./Assets/icon/mobilisation.svg"
                              alt=""
                            />
                          </p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">Etat</p>
                          <p className="chiffres">20 000 000 F CFA</p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">
                            Collectivités Territoriales (CT)
                          </p>
                          <p className="chiffres">20 000 000 F CFA</p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">Secteurs privés Sanitaires</p>
                          <p className="chiffres"> 20 000 000 F CFA</p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">
                            Secteurs privés non Sanitaires
                          </p>
                          <p className="chiffres">20 000 000 F CFA</p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">
                            Secteurs privés non Sanitaires
                          </p>
                          <p className="chiffres"> 20 000 000 F CFA</p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">ONG et associations</p>
                          <p className="chiffres">20 000 000 F CFA</p>
                        </div>
                        <div className="">
                          <p className="secteur">
                            Partenaires Techniques Financiers (PTF)
                          </p>
                          <p className="chiffres">20 000 000 F CFA</p>
                        </div>
                      </div>
                    </div>
                    <div className="col text-financement">
                      <div className="card-body">
                        <div className="d-flex  justify-content-between align-items-center">
                          <p className="card-title categorie-volume-financement">
                            Besoins exprimés
                          </p>
                          <p>
                            <img
                              className="icon2"
                              src="./Assets/icon/besoin.svg"
                              alt=""
                            />
                          </p>
                        </div>

                        <div>
                          <p style={{ fontSize: "35px", fontWeight: "800" }}>
                            {" "}
                            15 M FCFA
                          </p>
                          <div className="progress mb-4 mt-4">
                            <div
                              className="progress-bar "
                              role="progressbar"
                              style={{
                                width: "40%",
                                backgroundColor: "#ff9100",
                              }}
                              aria-valuenow="25"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              40%
                            </div>
                          </div>
                        </div>
                        <p className="card-text">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Qui laborum aliquam, itaque blanditiis
                          repellendus dicta excepturi culpa porro vel vero
                          eligendi commodi ratione velit aspernatur, illo est
                          nihil quam. Ipsam.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid max ">
              <div className="row ">
                <div
                  style={{ borderRadius: "15px !important" }}
                  className="card   px-0 mb-3"
                >
                  <div className="row  mx-auto g-0">
                    <div className="col-md-2 text-light bg-blue">
                      <p className="mob-mise-en-commun-achat text-white">
                        MISE EN COMMUN DES RESSOURCES
                      </p>
                    </div>
                    <div className="col text-financement">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="card-title categorie-volume-financement">
                            Niveau d'execution
                          </p>
                          <p>
                            <img
                              className="icon2"
                              src="./Assets/icon/niv-execution.svg"
                              alt=""
                            />
                          </p>
                        </div>
                        <div>
                          <div
                            id="execution-mise-en-commun"
                            style={{ margin: "20px" }}
                          >
                            <ChangingProgressProvider values={[0, 85]}>
                              {(percentage) => (
                                <CircularProgressbar
                                  strokeWidth={5}
                                  value={percentage}
                                  text={`${85}%`}
                                  styles={buildStyles({
                                    pathTransition:
                                      percentage === 0
                                        ? "none"
                                        : "stroke-dashoffset 0.5s ease 0s",
                                    pathColor: "#39811D",
                                    textColor: "Black",
                                    trailColor: "#d6d6d6",
                                    backgroundColor: "#3e98c7",
                                  })}
                                />
                              )}
                            </ChangingProgressProvider>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col text-financement">
                      <div className="card-body trait-vertical-gauche ">
                        <div className="d-flex  justify-content-between align-items-center">
                          <p className="card-title categorie-volume-financement ">
                            Engagement
                          </p>
                          <p>
                            <img
                              className="icon2"
                              src="./Assets/icon/engagement.svg"
                              alt=""
                            />
                          </p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">Etat</p>
                          <p className="chiffres">100 000 000 F CFA</p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">
                            Collectivités Territoriales (CT)
                          </p>
                          <p className="chiffres">200 000 000 F CFA</p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">Secteurs privés Sanitaires</p>
                          <p className="chiffres"> 600 000 F CFA</p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">
                            Secteurs privés non Sanitaires
                          </p>
                          <p className="chiffres">100 000 000 F CFA</p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">
                            Secteurs privés non Sanitaires
                          </p>
                          <p className="chiffres"> 13000 000 F CFA</p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">ONG et associations</p>
                          <p className="chiffres">20 000 000 F CFA</p>
                        </div>
                        <div className="">
                          <p className="secteur">
                            Partenaires Techniques Financiers (PTF)
                          </p>
                          <p className="chiffres">9 000 000 F CFA</p>
                        </div>
                      </div>
                    </div>
                    <div className="col text-financement">
                      <div className="card-body trait-vertical-gauche trait-vertical-droite">
                        <div className="d-flex  justify-content-between align-items-center">
                          <p className="card-title categorie-volume-financement">
                            Mobilisation
                          </p>
                          <p>
                            <img
                              className="icon2"
                              src="./Assets/icon/mobilisation.svg"
                              alt=""
                            />
                          </p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">Etat</p>
                          <p className="chiffres">20 000 000 F CFA</p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">
                            Collectivités Territoriales (CT)
                          </p>
                          <p className="chiffres">20 000 000 F CFA</p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">Secteurs privés Sanitaires</p>
                          <p className="chiffres"> 20 000 000 F CFA</p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">
                            Secteurs privés non Sanitaires
                          </p>
                          <p className="chiffres">20 000 000 F CFA</p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">
                            Secteurs privés non Sanitaires
                          </p>
                          <p className="chiffres"> 20 000 000 F CFA</p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">ONG et associations</p>
                          <p className="chiffres">20 000 000 F CFA</p>
                        </div>
                        <div className="">
                          <p className="secteur">
                            Partenaires Techniques Financiers (PTF)
                          </p>
                          <p className="chiffres">20 000 000 F CFA</p>
                        </div>
                      </div>
                    </div>
                    <div className="col text-financement">
                      <div className="card-body">
                        <div className="d-flex  justify-content-between align-items-center">
                          <p className="card-title categorie-volume-financement">
                            Besoins exprimés
                          </p>
                          <p>
                            <img
                              className="icon2"
                              src="./Assets/icon/besoin.svg"
                              alt=""
                            />
                          </p>
                        </div>
                        <div>
                          <p style={{ fontSize: "35px", fontWeight: "800" }}>
                            {" "}
                            1 M FCFA
                          </p>
                          <div className="progress mb-4 mt-4">
                            <div
                              className="progress-bar "
                              role="progressbar"
                              style={{ width: "80%", backgroundColor: "green" }}
                              aria-valuenow="25"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              80%
                            </div>
                          </div>
                        </div>
                        <p className="card-text">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Qui laborum aliquam, itaque blanditiis
                          repellendus dicta excepturi culpa porro vel vero
                          eligendi commodi ratione velit aspernatur, illo est
                          nihil quam. Ipsam.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid max ">
              <div className="row ">
                <div
                  style={{ borderRadius: "15px !important" }}
                  className="card    px-0 mb-3"
                >
                  <div className="row  mx-auto g-0">
                    <div className="col-md-2 text-light bg-blue">
                      <p className=" mob-mise-en-commun-achat text-white">
                        ACHAT DE SERVICES
                      </p>
                    </div>
                    <div className="col text-financement">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="card-title categorie-volume-financement">
                            Niveau d'execution
                          </p>
                          <p>
                            <img
                              className="icon2"
                              src="./Assets/icon/niv-execution.svg"
                              alt=""
                            />
                          </p>
                        </div>
                        <div>
                          <div
                            id="execution-achat-service"
                            style={{ margin: "20px" }}
                          >
                            <ChangingProgressProvider values={[0, 10]}>
                              {(percentage) => (
                                <CircularProgressbar
                                  strokeWidth={5}
                                  value={percentage}
                                  text={`${10}%`}
                                  styles={buildStyles({
                                    pathTransition:
                                      percentage === 0
                                        ? "none"
                                        : "stroke-dashoffset 0.5s ease 0s",
                                    pathColor: "#ED3833",
                                    textColor: "Black",
                                    trailColor: "#d6d6d6",
                                    backgroundColor: "#3e98c7",
                                  })}
                                />
                              )}
                            </ChangingProgressProvider>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col text-financement">
                      <div className="card-body trait-vertical-gauche">
                        <div className="d-flex  justify-content-between align-items-center">
                          <p className="card-title categorie-volume-financement">
                            Engagement
                          </p>
                          <p>
                            <img
                              className="icon2"
                              src="./Assets/icon/engagement.svg"
                              alt=""
                            />
                          </p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">Etat</p>
                          <p className="chiffres">100 000 000 F CFA</p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">
                            Collectivités Territoriales (CT)
                          </p>
                          <p className="chiffres">200 000 000 F CFA</p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">Secteurs privés Sanitaires</p>
                          <p className="chiffres"> 600 000 F CFA</p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">
                            Secteurs privés non Sanitaires
                          </p>
                          <p className="chiffres">100 000 000 F CFA</p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">
                            Secteurs privés non Sanitaires
                          </p>
                          <p className="chiffres"> 13000 000 F CFA</p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">ONG et associations</p>
                          <p className="chiffres">20 000 000 F CFA</p>
                        </div>
                        <div className="">
                          <p className="secteur">
                            Partenaires Techniques Financiers (PTF)
                          </p>
                          <p className="chiffres">9 000 000 F CFA</p>
                        </div>
                      </div>
                    </div>
                    <div className="col text-financement">
                      <div className="card-body trait-vertical-gauche trait-vertical-droite">
                        <div className="d-flex  justify-content-between align-items-center">
                          <p className="card-title categorie-volume-financement">
                            Mobilisation
                          </p>
                          <p>
                            <img
                              className="icon2"
                              src="./Assets/icon/mobilisation.svg"
                              alt=""
                            />
                          </p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">Etat</p>
                          <p className="chiffres">20 000 000 F CFA</p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">
                            Collectivités Territoriales (CT)
                          </p>
                          <p className="chiffres">20 000 000 F CFA</p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">Secteurs privés Sanitaires</p>
                          <p className="chiffres"> 20 000 000 F CFA</p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">
                            Secteurs privés non Sanitaires
                          </p>
                          <p className="chiffres">20 000 000 F CFA</p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">
                            Secteurs privés non Sanitaires
                          </p>
                          <p className="chiffres"> 20 000 000 F CFA</p>
                        </div>
                        <div className="sous-ligne">
                          <p className="secteur">ONG et associations</p>
                          <p className="chiffres">20 000 000 F CFA</p>
                        </div>
                        <div className="">
                          <p className="secteur">
                            Partenaires Techniques Financiers (PTF)
                          </p>
                          <p className="chiffres">20 000 000 F CFA</p>
                        </div>
                      </div>
                    </div>
                    <div className="col text-financement">
                      <div className="card-body">
                        <div className="d-flex  justify-content-between align-items-center">
                          <p className="card-title categorie-volume-financement">
                            Besoins exprimés
                          </p>
                          <p>
                            <img
                              className="icon2"
                              src="./Assets/icon/besoin.svg"
                              alt=""
                            />
                          </p>
                        </div>

                        <div>
                          <p style={{ fontSize: "35px", fontWeight: "800" }}>
                            {" "}
                            22 M FCFA
                          </p>
                          <div className="progress mb-4 mt-4">
                            <div
                              className="progress-bar "
                              role="progressbar"
                              style={{ width: "12%", backgroundColor: "red" }}
                              aria-valuenow="25"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              12%
                            </div>
                          </div>
                        </div>
                        <p className="card-text">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Qui laborum aliquam, itaque blanditiis
                          repellendus dicta excepturi culpa porro vel vero
                          eligendi commodi ratione velit aspernatur, illo est
                          nihil quam. Ipsam.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h4 id="scrollspyIndicateurs"></h4>
            {/* <div className="d-flex flex-column max pb-4">
              <p className="card-title text-blue fs-3  pt-5 col-md-9">
                Les indicateurs du financement de la Santé
              </p>
              <div className="divider-financement"></div>
            </div>
            <div className="card mb-5  max">
              <div className="card-body">
                <div
                  style={{ height: "300px" }}
                     id="chart-container"
                >
                  <div id="barChart" style={{ height: "100%" }}>
                    <Bar data={BarData} options={chartOptions} />
                  </div>
                </div>
              </div>
            </div>

            <div className="max row ">
              <div className="col ps-0">
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="bande">
                      <div className=" fw-bold  ps-2 pt-2 text-bande">
                        {" "}
                        Etat
                      </div>
                    </div>
                    <div className="text-center mt-3">12 000 000 000 F.CFA</div>
                    <div>
                      <div className="progress mt-4 height-progress  ">
                        <div
                          className="progress-bar orange-progress "
                          role="progressbar"
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="mobilisation fw-bold">Mobilisation</div>
                        <div className="pourcentage">54%</div>
                      </div>
                    </div>
                    <div>
                      <div className="progress height-progress   mt-4">
                        <div
                          className="progress-bar vert-progress "
                          role="progressbar"
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="mobilisation fw-bold">Engagement</div>
                        <div className="pourcentage">90%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col ps-0">
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="bande">
                      <div className=" fw-bold text-bande ps-2  ">
                        {" "}
                        Collectivités Territoriales (CT)
                      </div>
                    </div>
                    <div className="text-center mt-3">6 000 000 000 F.CFA</div>
                    <div>
                      <div className="progress height-progress   mt-4">
                        <div
                          className="progress-bar bleu-progress "
                          role="progressbar"
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="mobilisation fw-bold">Mobilisation</div>
                        <div className="pourcentage">64%</div>
                      </div>
                    </div>
                    <div>
                      <div className="progress height-progress   mt-4">
                        <div
                          className="progress-bar vert-progress2 "
                          role="progressbar"
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="mobilisation fw-bold">Engagement</div>
                        <div className="pourcentage">91%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col ps-0">
                <div className="card mb-3 ">
                  <div className="card-body">
                    <div className="bande">
                      <div className=" fw-bold text-bande ps-2 pt-2 ">
                        {" "}
                        Secteurs privés
                      </div>
                    </div>
                    <div className="text-center mt-3">3 000 000 000 F.CFA</div>
                    <div>
                      <div className="progress height-progress   mt-4">
                        <div
                          className="progress-bar meuve-progress "
                          role="progressbar"
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="mobilisation fw-bold">Mobilisation</div>
                        <div className="pourcentage">64%</div>
                      </div>
                    </div>
                    <div>
                      <div className="progress height-progress   mt-4">
                        <div
                          className="progress-bar rouge-progress "
                          role="progressbar"
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="mobilisation fw-bold">Engagement</div>
                        <div className="pourcentage">34%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col ps-0">
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="bande">
                      <div className=" fw-bold text-bande ps-2 pt-2 ">
                        {" "}
                        ONG et associations
                      </div>
                    </div>
                    <div className="text-center mt-3"> 2 500 000 000 F.CFA</div>
                    <div>
                      <div className="progress height-progress  mt-4">
                        <div
                          className="progress-bar rose-progress "
                          role="progressbar"
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div
                          style={{ color: "#6f96aa" }}
                          className="mobilisation fw-bold"
                        >
                          Mobilisation
                        </div>
                        <div className="pourcentage">74%</div>
                      </div>
                    </div>
                    <div>
                      <div className="progress height-progress  mt-4">
                        <div
                          className="progress-bar vert-progress2 "
                          role="progressbar"
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="mobilisation fw-bold">Engagement</div>
                        <div className="pourcentage">92%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col ps-0 pe-0">
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="bande">
                      <div className=" fw-bold text-bande ps-2">
                        {" "}
                        Partenaires Techniques Financiers (PTF)
                      </div>
                    </div>
                    <div className="text-center mt-3">9 600 000 000 F.CFA</div>
                    <div>
                      <div className="progress height-progress  mt-4">
                        <div
                          className="progress-bar rouge-progess2"
                          role="progressbar"
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="mobilisation fw-bold">Mobilisation</div>
                        <div className="pourcentage">14%</div>
                      </div>
                    </div>
                    <div>
                      <div className="progress height-progress  mt-4">
                        <div
                          className="progress-bar jaune-progess "
                          role="progressbar"
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="mobilisation fw-bold">Engagement</div>
                        <div className="pourcentage">10%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row max">
              <div className="col-md-4 ps-0">
                <div className="card card-stat mb-3 ">
                  <p className="fw-bold mobilisation ps-3 pt-3">Statistique</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="mt-3 canvas">
                      <div id="myChart">
                        <Doughnut data={doughnutData} />
                      </div>
                    </div>
                    <div className="pourcent-stat pe-2">
                      <p className="text-center fw-bold fs-3">75%</p>
                      <p>
                        {" "}
                        Lorem, ipsum. <span>50%</span>
                      </p>
                      <p>
                        {" "}
                        Lorem, ipsum. <span>45%</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5 ps-0">
                <div className="card mb-3 card-stat ">
                  <p className="fw-bold mobilisation ps-3 pt-3">Statistique</p>
                  <div className="ps-3 pe-3">
                    <div id="myChart2" style={{ height: "100%" }}>
                      <Line data={lineData} options={lineOptions} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 ps-0 pe-0">
                <div className="card mb-3 card-stat ">
                  <p className="fw-bold mobilisation ps-3 pt-3">Statistique</p>
                  <div className="">
                    <div className="ps-3 pe-3" id="myChart3" width="">
                      <Bar data={chartData2} options={chart2options} />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center pt-4">
                    <p className="fw-bold mobilisation ps-3">
                      21 600 000 000 F.CFA
                    </p>
                    <p className="fw-bold mobilisation pe-3">2021</p>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="header">
        <div className="header-content row max  d-flex  justify-content-between align-items-center ">
          <div className="col-md-7 col-sm-12 px-0">
            <p className="title " style={{ fontSize: "2vh" }}>
              DIRECTION DE LA PLANIFICATION DE LA RECHERCHE ET DES STATISTIQUES
            </p>
          </div>
          <div className="col-md-4 col-sm-12  rs reseaux-sociaux ">
            <ul className="d-flex" style={{ marginRight: "-1rem" }}>
              <p className="">Nous suivre sur :</p>
              <li>
                <Link to="">
                  <LinkedInLightIcon />
                </Link>
              </li>
              <span className="ligne"></span>
              <li>
                <Link>
                  <TwiterLightIcon />
                </Link>
              </li>
              <span className="ligne"></span>
              <li>
                <Link>
                  <FaceBookLightIcon />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccueilPage;
