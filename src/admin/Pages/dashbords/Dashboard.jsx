import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import {
  faEye,
  faPlus,
  faTrash,
  faTrashAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Exclamation from "../../../assets/images/exclamation.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Dashboard = () => {

  const doughnutData = {
    labels: ["50%", "45%"],
    datasets: [
      {
        label: "My First Dataset",
        data: [50, 45, 40],
        backgroundColor: [
          "rgb(255, 132, 75)",
          "rgb(111, 150, 170)",
          "rgb(225, 232, 238)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  const labels2 = [10, 30, 39, 20, 25, 34, 0];
  const lineData = {
    labels: labels2,
    datasets: [
      {
        label: "Dataset 1",
        data: [10, 30, 39, 20, 25, 34, 0],
        borderColor: "rgb(255, 132, 75)",
        backgroundColor: "rgb(255, 132, 75)",
      },
      {
        label: "Dataset 2",
        data: [18, 33, 22, 19, 11, 39, 30],
        borderColor: "rgb(111, 150, 170)",
        backgroundColor: "rgb(111, 150, 170)",
      },
    ],
  };
  const lineOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "",
      },
    },
    scales: {
      y: {
        // the data minimum used for determining the ticks is Math.min(dataMin, suggestedMin)
        suggestedMin: 30,

        // the data maximum used for determining the ticks is Math.max(dataMax, suggestedMax)
        suggestedMax: 50,
      },
    },
  };

  

  const chartData2 = {
    labels: ["", "", "", "", ""],
    datasets: [
      {
        label: "# of Votes",
        data: [19, 5, 12, 23, 9],
        backgroundColor: [
          "rgb(255, 132, 75)",
          "rgb(255, 132, 75)",
          "rgb(255, 132, 75)",
          "rgb(255, 132, 75)",
          "rgb(255, 132, 75)",
        ],
        borderColor: [
          "rgb(255, 132, 75)",
          "rgb(255, 132, 75)",
          "rgb(255, 132, 75)",
          "rgb(255, 132, 75)",
          "rgb(255, 132, 75)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // const chart2options = {
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //     },
  //   },
  // };

    return (
    <div class="content Title">
      <div class="container-fluid bg-title">
        <div class="page-title d-flex align-items-center justify-content-between">
          <h3>
            {" "}
            Tableau de bord
          </h3>
          {/* <button
            className="btn btn-primary btn-sm text-white display btn-bar"
            data-toggle="modal"
            data-target="#exampleModal"
        
          >
            <span>
              <FontAwesomeIcon icon={faUser} className="mr-1" />
            </span>
            Ajouter un utilisateur
          </button> */}
        </div>
      </div>
      <div class="container-fluid dash-content">
        <div class="row mb-4">
            <div class="col-md-6 col-lg-4 mb-3">
                <div class="un-stat-2 bg-light-primary p-3">
                    <p class="mb-3">Montant total investi</p>
                    <div class="d-flex flex-wrap align-items-end justify-content-between">
                        <span class="number mb-2 d-block text-uppercase">21 600 000 000 F.CFA</span>
                        <img src="assets/images/credit-octroye.svg" alt="" class="icone"/>
                    </div>    
                    <a href="#" class="d-flex align-items-center text-muted">
                        <img src={Exclamation} alt="" class="mr-2"/>
                        <span class="details">Voir détails</span>
                    </a>
                </div>
            </div>
            <div class="col-md-6 col-lg-4 mb-3">
                <div class="un-stat-2 bg-light-primary p-3">
                    <p class="mb-3">Lorem ipsum</p>
                    <div class="d-flex flex-wrap align-items-end justify-content-between">
                        <span class="number mb-2 d-block text-uppercase">1 300 000 000 F.CFA</span>
                        <img src="assets/images/credit-octroye.svg" alt="" class="icone"/>
                    </div> 
                    <a href="#" class="d-flex align-items-center text-muted">
                        <img src={Exclamation} alt="" class="mr-2"/>
                        <span class="details">Voir détails</span>
                    </a>
                </div>
            </div>
            <div class="col-md-6 col-lg-4 mb-3">
                <div class="un-stat-2 bg-light-primary p-3">
                    <p class="mb-3">Lorem ipsum</p>
                    <div class="d-flex flex-wrap align-items-end justify-content-between">
                        <span class="number mb-2 d-block text-uppercase">1 300 000 000 F.CFA</span>
                        <img src="assets/images/credit-octroye.svg" alt="" class="icone"/>
                    </div> 
                    <a href="#" class="d-flex align-items-center text-muted">
                        <img src={Exclamation} alt="" class="mr-2"/>
                        <span class="details">Voir détails</span>
                    </a>
                </div>
            </div>
        </div>

        <div className="row max-dash">
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
                      <Bar data={chartData2}  />
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
        </div>
      </div>
    </div>
    
    );
};


export default Dashboard;
