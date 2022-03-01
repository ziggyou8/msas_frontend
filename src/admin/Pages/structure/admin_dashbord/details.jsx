import React, { useState } from "react";
import { useEffect } from "react";
import "./structure.style.scss";
import { connect } from "react-redux";
import { selectStructureById } from "../../../../redux/structure/structure.selector";
import {
  selectCurrentUser
} from "../../../../redux/user/user.selector";
import { createStructuredSelector } from "reselect";
import { fetchStructureByIdAsync } from "../../../../redux/structure/structurethunk";
import Pagination from "../../../components/pagination/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";

let PageSize = 1;
function DetailStructure({
  match: { params },
  structureById,
  getStructureById,
}) {
  useEffect(() => {
    getStructureById(params[1]);
  }, []);
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = React.useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return structureById?.investissements?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, structureById?.investissements]);

  const totalFinance = React.useCallback((array) => {
    return array.reduce(
      (accumulator, current) => accumulator + parseInt(current.id),
      0
    );
  }, []);

  return (
    <div class="content ">
      <div class="container-fluid">
        <div class="page-title d-flex align-items-center justify-content-between">
          <h3>
            {" "}
            <FontAwesomeIcon icon={faBuilding} className="mr-1" />
            GESTION DES STRUCTURES / DETAILS
          </h3>
        </div>

        <div class="row mb-4">
          <div class="col-md-12 col-lg-12 ">
            <div class="card">
              <div class="card-header">
                <h5 class="mb-0">{structureById?.denomination}</h5>
              </div>
              <div class="card-body ">
                <p class="card-title"></p>

                <div className="row justify-content-between">
                  <fieldset className="scheduler-border border">
                    <legend className="scheduler-border text-muted">
                      Informations sur la structure
                    </legend>
                    <div className="row pt-2">
                      <div className="col-md-6 d-flex mb-1">
                        <span className="text-muted font-weight-bold mr-3">
                          Source de financement :
                        </span>{" "}
                        <p>{structureById?.source_financement}</p>
                      </div>
                      <div className="col-md-6 d-flex mb-1">
                        <span className="text-muted font-weight-bold mr-3">
                          Type :
                        </span>{" "}
                        <p>{structureById?.type_acteur}</p>
                      </div>
                      <div className="col-md-6 d-flex mb-1">
                        <span className="text-muted font-weight-bold mr-3">
                          Adresse :
                        </span>{" "}
                        <p>{structureById?.adresse_siege}</p>
                      </div>
                      <div className="col-md-6 d-flex mb-1">
                        <span className="text-muted font-weight-bold mr-3">
                          Email :
                        </span>{" "}
                        <p>{structureById?.email_siege}</p>
                      </div>
                      <div className="col-md-6 d-flex mb-1">
                        <span className="text-muted font-weight-bold mr-3">
                          Téléphone :
                        </span>{" "}
                        <p>{structureById?.telephone_siege}</p>
                      </div>
                      {structureById?.specialite ||
                        (structureById?.autre_specialite && (
                          <div className="col-md-6 d-flex mb-1">
                            <span className="text-muted font-weight-bold mr-3">
                              Sp :
                            </span>{" "}
                            <p>{structureById?.specialite}</p>
                          </div>
                        ))}

                      <div className="col-md-6 d-flex mb-1">
                        <span className="text-muted font-weight-bold mr-3 mt-1">
                          Dimension :
                        </span>{" "}
                        <p>
                          {structureById?.mobilisation_ressource && (
                            <span className="badge badge-primary mr-1 ">
                              Mobilisation
                            </span>
                          )}
                          {structureById?.mis_en_commun_ressource && (
                            <span className="badge badge-primary mr-1">
                              Mis en commun
                            </span>
                          )}
                          {structureById?.achat_service && (
                            <span className="badge badge-primary mr-1">
                              Achat de service
                            </span>
                          )}
                        </p>
                      </div>

                      <div className="col-md-6 d-flex mb-1">
                        <span className="text-muted font-weight-bold mr-3">
                          Latitude :
                        </span>{" "}
                        <p>{structureById?.latitude}</p>
                      </div>
                      <div className="col-md-6 d-flex mb-1">
                        <span className="text-muted font-weight-bold mr-3">
                          Longitude :
                        </span>{" "}
                        <p>{structureById?.longitude}</p>
                      </div>
                      <div className="col-md-6 d-flex mb-1">
                        <span className="text-muted font-weight-bold mr-3">
                          Altitude :
                        </span>{" "}
                        <p>{structureById?.altitude}</p>
                      </div>
                    </div>
                  </fieldset>

                  <fieldset className="scheduler-border border">
                    <legend className="scheduler-border text-muted">
                      Personne résponsable
                    </legend>
                    <div className="row">
                      <div className="col-md-4 d-flex my-2">
                        <span className="text-muted font-weight-bold mr-3">
                          Prénom :
                        </span>{" "}
                        <p>{structureById?.prenom_responsable}</p>
                      </div>
                      <div className="col-md-4 d-flex my-2">
                        <span className="text-muted font-weight-bold mr-3">
                          Nom :
                        </span>{" "}
                        <p>{structureById?.nom_responsable}</p>
                      </div>
                      <div className="col-md-4 d-flex my-2">
                        <span className="text-muted font-weight-bold mr-3">
                          Email :
                        </span>{" "}
                        <p>{structureById?.email_responsable}</p>
                      </div>
                      <div className="col-md-4 d-flex my-2">
                        <span className="text-muted font-weight-bold mr-3">
                          Téléphone :
                        </span>{" "}
                        <p>{structureById?.telephone_responsable}</p>
                      </div>
                      <div className="col-md-4 d-flex mt-1">
                        <span className="text-muted font-weight-bold mr-3">
                          Fonction :
                        </span>{" "}
                        <p>{structureById?.fonction_responsable}</p>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset className="scheduler-border border">
                    <legend className="scheduler-border text-muted">
                      Interventions
                    </legend>

                    {structureById?.interventions.map((region) => (
                      <div className="row" key={region.id}>
                        <div className="col-md-6 d-flex my-3">
                          <span className="text-muted font-weight-bold mr-3">
                            Région :
                          </span>{" "}
                          <span className="badge badge-primary bg-primary-75 mr-1">
                            {region.nom}
                          </span>
                        </div>
                        <div className="col-md-6 d-flex my-3">
                          <span className="text-muted font-weight-bold mr-3">
                            District(s) :
                          </span>{" "}
                          {region.districts_interventions.map((district) => (
                            <span
                              className="badge badge-primary bg-primary-75 mr-1"
                              key={district.id}
                            >
                              {district.nom}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </fieldset>

                  {currentTableData?.length > 0 ? (
                    <fieldset className="scheduler-border border">
                      <legend className="scheduler-border text-muted">
                        Investissements
                      </legend>
                      {currentTableData?.map((inv) => (
                        <div key={inv.id} className=" mr-4 mb-2">
                          <h6>Année {inv.annee}</h6>
                          <div className="border row pt-2">
                            <div className="col-md-6 d-flex mt-1">
                              <span className="text-muted font-weight-bold mr-3">
                                Monnaie :
                              </span>{" "}
                              <p>{inv?.monnaie}</p>
                            </div>

                            <div className="col-md-6 d-flex mt-1">
                              <span className="text-muted font-weight-bold mr-3">
                                Total financement :
                              </span>{" "}
                              <p>{`${totalFinance(inv.mode_financement)}`}</p>
                            </div>
                            <br />

                            <div className="col-md-6 d-flex mb-1">
                              <span className="text-muted font-weight-bold mr-3 mt-1">
                                Mode de Financemnt :
                              </span>{" "}
                              {inv.mode_financement.map((mode) => (
                                <p key={mode.id}>
                                  {mode.montant && (
                                    <span className="badge badge-primary mr-1">
                                      {mode.libelle}
                                    </span>
                                  )}
                                </p>
                              ))}
                            </div>

                            <div className="col-md-6 d-flex mb-1">
                              <span className="text-muted font-weight-bold mr-3 mt-1">
                                Piliers :
                              </span>{" "}
                              {inv.piliers.map((pilier) => (
                                <p key={pilier.id}>
                                  <span className="badge badge-primary mr-1">
                                    {pilier.libelle}
                                  </span>
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                      <Pagination
                        className="pagination-bar mt-2 mx-auto"
                        currentPage={currentPage}
                        totalCount={
                          structureById?.investissements
                            ? structureById?.investissements?.length
                            : 0
                        }
                        pageSize={PageSize}
                        onPageChange={(page) => setCurrentPage(page)}
                      />
                    </fieldset>
                  ) : (
                    ""
                  )}
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
  getStructureById: (id) => dispatch(fetchStructureByIdAsync(id)),
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  structureById: selectStructureById,
});
export default connect(mapStateToProps, mapDispatchToProps)(DetailStructure);
