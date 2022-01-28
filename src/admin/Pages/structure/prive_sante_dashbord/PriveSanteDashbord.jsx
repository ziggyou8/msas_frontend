import React, { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "react-toastify/dist/ReactToastify.css";
import { selectStructureById } from "../../../../redux/structure/structure.selector";
import {
  selectCurrentUser,
  isLoading,
} from "../../../../redux/user/user.selector";
import {
  fetchStructureByIdAsync,
  storeStructureAsync,
} from "../../../../redux/structure/structurethunk";
import ActeurPriveForm from "./PriveSanteForm";
import PriveSanteTable from "./table";
import { useDeepCompareEffect } from "react-use";
import {
  fetchInvestissementsByStructureAsync,
  fetchInvestissementByIdAsync,
} from "../../../../redux/investissement/investissement.thunk";
import {
  selectIsLoading,
  selectListInvestissementByStructure,
  selectInvestissementById,
} from "../../../../redux/investissement/investissement.selector";
import { fetchCurrentUserAsync } from "../../../../redux/user/user.thunk";
import {
  faBusinessTime,
  faCoins,
  faDonate,
  faMoneyBillWaveAlt,
  faMoneyCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SpsEpsEditForm from "./SpsEpsEditForm";

function PriveSanteDashbord(props) {
  const {
    history,
    currentUser,
    fetchInvestissement,
    fetchInvestissementById,
    investissementsById,
    investissements,
    getCurrentUser,
    isLoading,
    ...otherProps
  } = props;

  useEffect(() => {
    fetchInvestissement();
  }, []);

  const editInvestisement = (id) => {
    fetchInvestissementById(id);
  };

  return (
    <div class="content Title">
      <div class="container-fluid bg-title">
        <div class="page-title d-flex align-items-center justify-content-between">
          <h3>
            <FontAwesomeIcon icon={faDonate} className="mr-1 mb-1" />
            GESTION DES INVESTISSEMENTS
          </h3>
          <button
            className="btn btn-primary btn-sm text-white display1 btn-bar"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            <FontAwesomeIcon icon={faDonate} className="mr-1" />
            Ajouter un investissement
          </button>
        </div>
      </div>

      <div class="container-fluid dash-content">
        <div class="row mb-4">
          <div class="col-md-12 col-lg-12">
            <ActeurPriveForm
              {...otherProps}
              fetchInvestissement={fetchInvestissement}
              currentUser={currentUser}
            />
            <SpsEpsEditForm
              {...otherProps}
              fetchInvestissement={fetchInvestissement}
              currentUser={currentUser}
              investissementsById={investissementsById}
              isLoading={isLoading}
            />

            <PriveSanteTable
              currentUser={currentUser}
              storeStructure={props.storeStructure}
              investissements={investissements}
              getCurrentUser={getCurrentUser}
              editInvestisement={editInvestisement}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
      
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchInvestissement: () => dispatch(fetchInvestissementsByStructureAsync()),
  fetchInvestissementById: (id) => dispatch(fetchInvestissementByIdAsync(id)),
  getCurrentUser: () => dispatch(fetchCurrentUserAsync()),
  storeStructure: (subUrl, data) => dispatch(storeStructureAsync(subUrl, data)),
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  investissementsById: selectInvestissementById,
  investissements: selectListInvestissementByStructure,
  isLoading: selectIsLoading,
});
/* const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  structure: state.structure.structureById,
}); */
export default connect(mapStateToProps, mapDispatchToProps)(PriveSanteDashbord);
