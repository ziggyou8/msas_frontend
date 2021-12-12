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
import { storeStructureAsync } from "../../../../redux/structure/structurethunk";
import ActeurPriveForm from "./PriveSanteForm";
import PriveSanteTable from "./table";
import { useDeepCompareEffect } from "react-use";
import { fetchInvestissementsByStructureAsync } from "../../../../redux/investissement/investissement.thunk";
import {
  selectIsLoading,
  selectListInvestissementByStructure,
} from "../../../../redux/investissement/investissement.selector";
import { fetchCurrentUserAsync } from "../../../../redux/user/user.thunk";
import { faDonate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function RseDashbord(props) {
  const {
    history,
    currentUser,
    fetchInvestissement,
    investissements,
    getCurrentUser,
    isLoading,
    ...otherProps
  } = props;

  useEffect(() => {
    fetchInvestissement();
  }, []);

  return (
    <div class="content">
      <div class="container-fluid">
        <div class="page-title d-flex align-items-center justify-content-between">
          <h3>
            <FontAwesomeIcon icon={faDonate} className="mr-1 mb-1" />
            ESPACE RSE
          </h3>
          <button
            className="btn btn-primary btn-sm text-white display1"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            <FontAwesomeIcon icon={faDonate} className="mr-1" />
            {(() => {
              switch (currentUser?.structure?.type_acteur) {
                case "Ministère":
                case "Structure de santé":
                case "Collectivité locale":
                  return "Faire une demande";
                  break;
                case "Entreprise":
                  return "Faire une offre";
                  break;
                default:
                  break;
              }
            })()}
          </button>
        </div>

        <div class="row mb-4">
          <div class="col-md-12 col-lg-12">
            <ActeurPriveForm
              {...otherProps}
              fetchInvestissement={fetchInvestissement}
              currentUser={currentUser}
            />

            <PriveSanteTable
              currentUser={currentUser}
              storeStructure={props.storeStructure}
              investissements={investissements}
              getCurrentUser={getCurrentUser}
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
  getCurrentUser: () => dispatch(fetchCurrentUserAsync()),
  storeStructure: (subUrl, data) => dispatch(storeStructureAsync(subUrl, data)),
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  investissements: selectListInvestissementByStructure,
  isLoading: selectIsLoading,
});
/* const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  structure: state.structure.structureById,
}); */
export default connect(mapStateToProps, mapDispatchToProps)(RseDashbord);
