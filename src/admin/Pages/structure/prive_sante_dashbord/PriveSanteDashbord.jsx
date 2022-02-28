import React, { useState } from "react";
import swal from "sweetalert";
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
  validationInvestissementAsync,
  rejectInvestissementAsync,
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
    validationInvestissement,
    rejectInvestissement,
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
    fetchInvestissement();
  };

  const validate = (id) => {
    return swal({
      title: `Etes vous sûr de voulour passer a la validation?`,
      text: "Assurez-vous que les informations saisis sont exactes.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Valider avec succées", {
          icon: "success",
        });
        validationInvestissement(id);
        fetchInvestissement();
        return true;
      } else {
        swal("Validation Annulée!");
        return false;
      }
    });
  };

  const reject = (id) => {
    return swal({
      title: `Etes vous sûr de voulour rejeter l'investissement?`,
      text: "Assurez-vous que les informations saisis sont exactes.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Rejeter avec succées", {
          icon: "success",
        });
        rejectInvestissement(id);
        fetchInvestissement();
         return true;
      } else {
        swal("Rejet Annulé!");
        return false;
      }
    });
  };

  return (
    <div class="content Title">
      <div class="container-fluid bg-title">
        <div class="page-title d-flex align-items-center justify-content-between">
          <h3>
            {/* <FontAwesomeIcon icon={faDonate} className="mr-1 mb-1" /> */}
            Gestion des investissements
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
              validate={validate}
              reject={reject}
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
  validationInvestissement: (id) => dispatch(validationInvestissementAsync(id)),
  rejectInvestissement: (id) => dispatch(rejectInvestissementAsync(id)),
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
