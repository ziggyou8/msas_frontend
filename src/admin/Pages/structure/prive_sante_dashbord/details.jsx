import React, { useState } from "react";
import { useEffect } from "react";
//import "./structure.style.scss";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Pagination from "../../../components/pagination/Pagination";
import { fetchCollectiviteByIdAsync } from "../../../../redux/collectivite/collectivite.thunk";
import { selectInvestissementById } from "../../../../redux/investissement/investissement.selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { fetchInvestissementByIdAsync } from "../../../../redux/investissement/investissement.thunk";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import { faDonate } from "@fortawesome/free-solid-svg-icons";

function DetailInvestissement({
  match: { params },
  investissementById,
  getInvestissementById,
  history,
}) {
  console.log("🔥", investissementById);
  useEffect(() => {
    getInvestissementById(params.id);
  }, []);

  return (
    <div class="content ">
      <div class="container-fluid">
        <div class="page-title d-flex align-items-center justify-content-between">
          <h3>
            {" "}
            <FontAwesomeIcon icon={faDonate} className="mr-1" />
            <span
              role="button"
              onClick={() => history.push("/admin/structures/prive")}
            >
              GESTION INVESTISSEMENTS /
            </span>
            <span className="text-primary ml-1">DETAILS</span>
          </h3>
          <button
            className="btn btn-secondary btn-sm text-white display1"
            onClick={() => history.goBack()}
          >
            <span>
              <FontAwesomeIcon icon={faAngleDoubleLeft} className="mr-1" />
            </span>
            Retour
          </button>
        </div>

        <div class="row mb-4">
          <div class="col-md-12 col-lg-12 ">
            <div class="card">
              <div class="card-header">
                <h5 class="mb-0">
                  Investissement année {investissementById?.annee}
                </h5>
              </div>
              <div class="card-body ">
                <p class="card-title"></p>

                <div className=" justify-content-between">
                <fieldset className="scheduler-border border">
                    <legend className="scheduler-border text-muted">
                      Infos primaires
                    </legend>
                    <div className="row pt-2">
                      <div className="col-md-6 d-flex mb-1">
                        <span className="text-muted font-weight-bold mr-3">
                          Monnaie :
                        </span>{" "}
                        <p>{investissementById?.monnaie}</p>
                      </div>

                      <div className="col-md-6 d-flex mb-1">
                        <span className="text-muted font-weight-bold mr-3">
                          Dimension :
                        </span>{" "}
                        {investissementById?.structure
                          ?.mobilisation_ressource && (
                          <p className="badge badge-primary mx-1">
                            Mobilisation
                          </p>
                        )}
                        {investissementById?.structure
                          ?.mis_en_commun_ressource && (
                          <p className="badge badge-primary mx-1">
                            Mise en commun
                          </p>
                        )}
                        {investissementById?.structure?.achat_service && (
                          <p className="badge badge-primary mx-1">
                            Achat de service
                          </p>
                        )}
                      </div>
                    </div>
                  </fieldset>
                  <fieldset className="scheduler-border border">
                    <legend className="scheduler-border text-muted">
                      Mode de financement
                    </legend>
                    <div className="row pt-2">
                      {investissementById?.mode_financement?.map((finance) => (
                        <div className="col-md-6 d-flex mb-1">
                          <span className="text-muted font-weight-bold mr-3">
                            {finance.libelle} :
                          </span>{" "}
                          <p>{finance.montant}</p>
                        </div>
                      ))}

                      {investissementById?.specialite ||
                        (investissementById?.autre_specialite && (
                          <div className="col-md-6 d-flex mb-1">
                            <span className="text-muted font-weight-bold mr-3">
                              Spécialité :
                            </span>{" "}
                            <p>
                              {investissementById?.specialite
                                ? investissementById?.specialite
                                : investissementById?.autre_specialite}
                            </p>
                          </div>
                        ))}
                    </div>
                  </fieldset>
                  {investissementById?.piliers.map((pilier, index) => (
                    <fieldset
                      key={pilier.id}
                      className="scheduler-border border"
                    >
                      <legend className="scheduler-border text-muted">
                        <p>
                          <p className="badge badge-primary mr-2 mt-3">
                            Pilier {index + 1} :
                          </p>
                          {`${pilier.libelle}`}
                        </p>
                      </legend>

                      <div className="row mx-1 mb-3 mr-1">
                        {pilier.axes.map((axe, i) => (
                          <div className="col-md-6">
                            <fieldset className="scheduler-border border">
                              <legend className="scheduler-border text-muted">
                                {`Axe:  ${axe.libelle}`}
                              </legend>
                              <div className="row">
                                {axe.nature.map((natureInvest) => (
                                  <div
                                    key={natureInvest.id}
                                    className="col-md-6"
                                  >
                                    <p className="text-muted">
                                      {natureInvest.libelle}
                                    </p>
                                    <div>
                                      <p>
                                        Montant prévu :{" "}
                                        <span className="bold">
                                          {natureInvest.montant_prevu}
                                        </span>
                                      </p>
                                      <p>
                                        Montant mobilisé :{" "}
                                        <span className="bold">
                                          {natureInvest.montant_mobilise}
                                        </span>
                                      </p>
                                      <p>
                                        Montant exécuté :{" "}
                                        <span className="bold">
                                          {natureInvest.montant_execute}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </fieldset>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getInvestissementById: (id) => dispatch(fetchInvestissementByIdAsync(id)),
});

const mapStateToProps = createStructuredSelector({
  investissementById: selectInvestissementById,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailInvestissement);
