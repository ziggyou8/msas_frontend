import {
  faCheck,
  faEye,
  faPen,
  faPowerOff,
  faPenAlt,
  faPencilRuler,
  faTimes,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useGeolocation } from "react-use";
import Pagination from "../../../components/pagination/Pagination";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { isLoading } from "../../../../redux/user/user.selector";
import { withRouter } from "react-router-dom";
import Structure from "../../../../assets/images/structure1.png";

let PageSize = 8;
const PriveSanteTable = ({
  currentUser,
  storeStructure,
  getCurrentUser,
  investissements,
  validate,
  reject,
  editInvestisement,
  isLoading,
  history,
}) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  const $ = window.$;
  const [isCurrentGeolocalisation, setIsCurrentGeolocalisation] =
    useState(false);
  const [isStructureUpdated, setIsStructureUpdated] = useState(false);
  const [AdminstructureListe, setAdminstructureListe] = useState(false);
  const [PointfocalListe, setPointfocalListe] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = React.useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return investissements?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, investissements]);

  const myGeo = useGeolocation();

  const currentPositionHandler = (e) => {
    e.target.checked
      ? setIsCurrentGeolocalisation(true)
      : setIsCurrentGeolocalisation(false);

    if (e.target.checked) {
      setValue("latitude", "14.7510199");
      setValue("longitude", "-17.4535678");
      setValue("altitude", "16.142");
    }
  };

  const displayForm = React.useCallback(() => {
    setIsStructureUpdated(true);
  }, [isStructureUpdated]);

  
  const HandleListeInvestissement = () => {
    if (currentUser?.roles[0]=== "Admin structure"){
      setAdminstructureListe(true); 
      return currentTableData;
    }else 
      if(currentUser?.roles[0]=== "Point Focal") {
      setPointfocalListe(true)
      return currentTableData;
       
    }
  } 

  useEffect(() => {
    HandleListeInvestissement();
    }, [HandleListeInvestissement])

  const submitForm = async (data, e) => {
    if (isCurrentGeolocalisation) {
      data.latitude = "14.7510199";
      data.longitude = "-17.4535678";
      data.altitude = "16.142";
    }

    const formData = new FormData();
    for (let formField in data) {
      if (data[formField]) {
        Array.isArray(data[formField])
          ? data[formField].forEach((val) =>
              formData.append(formField + "[]", val)
            )
          : formData.append(formField, data[formField]);
      }
    }

    storeStructure("update_basic_info", formData);
    setIsStructureUpdated(false);
    setIsCurrentGeolocalisation(false);
    getCurrentUser();
  };


  return (
    <div>
      <div class="row mb-4">
            <div class="col-md-12">
                <div class="card stats un-stat-2">
                  {!isStructureUpdated ? (
                    <div class="content">
                      {isLoading ? (
                        <Skeleton count={1} height="120px" />
                      ) : (
                        <div class="row">
                            <div class="col-md-6 col-lg-2 no-border">
                                <div class="un-stat">
                                    <div class="shadow-2 struture-logo un-stat-img">
                                    <img width={150} src={Structure} alt="" class="app-logo struture-logo ml-1"/>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-lg-4">
                                <div class="un-stat">
                                  <div className="col-md-12 mb-1">
                                    <label className="text-muted">
                                      Source de fiancement :
                                    </label>{" "}
                                    {currentUser?.structure?.source_financement}<br/>
                                  </div>
                                  <div className="col-md-12 mb-1">
                                    <label className="text-muted">
                                      Adresse :
                                    </label>{" "}
                                    {currentUser?.structure?.adresse_siege}<br/>
                                  </div>
                                  <div className="col-md-12 mb-1">
                                    <label className="text-muted">
                                      Type acteur :
                                    </label>{" "}
                                    {currentUser?.structure?.type_acteur}
                                  </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-lg-4 no-border">
                                <div class="un-stat">
                                  <div className="col-md-12 mb-1">
                                    <label className="text-muted">Sp??cialisation :</label>{" "}
                                    {currentUser?.structure?.type_acteur}
                                  </div>
                                  <div className="col-md-12 mb-1">
                                    <label className="text-muted">Email :</label>{" "}
                                    {currentUser?.structure?.email_siege}
                                  </div>
                                  <div className="col-md-12 mb-1">
                                    <label className="text-muted">T??l??phone :</label>{" "}
                                    {currentUser?.structure?.telephone_siege}
                                  </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-lg-2">
                                    <button onClick={() => displayForm()} type="submit" className="float-right btn btn-sm btn-primary btn-style mt-4"
                                    >
                                      <FontAwesomeIcon
                                        className="mr-2"
                                        icon={faPen}
                                        size="lg"
                                        color="white"
                                        role="button"
                                      />
                                      <strong className="text-white">Modifier</strong>
                                    </button>
                            </div>
                        </div>
                      )}
                    </div>
                  ) : (
                  <div className="card-body" style={{ marginTop: "-20px" }}>
                    <form onSubmit={handleSubmit(submitForm)}>
                      <div className="">
                        <fieldset className="scheduler-border border">
                          <legend className="scheduler-border text-muted">
                            Infos structure
                          </legend>
                          <div className="row bg-white mx-1">
                            <div className="row ml-3">
                              <div className="form-group col-md-4">
                                <label htmlFor="longitude">Adresse</label>
                                <input
                                  type="text"
                                  {...register("adresse_siege", {
                                    required: {
                                      value: true,
                                      message: "Veuillez saisir l'adresse",
                                    },
                                  })}
                                  className="form-control"
                                  id="longitude"
                                  defaultValue={
                                    currentUser?.structure?.adresse_siege
                                  }
                                />
                                {errors.adresse_siege && (
                                  <p className="text-danger mb-0">
                                    {errors.adresse_siege.message}
                                  </p>
                                )}
                              </div>
                              <div className="form-group col-md-4">
                                <label htmlFor="longitude">Email</label>
                                <input
                                  type="text"
                                  defaultValue={
                                    currentUser?.structure?.email_siege
                                  }
                                  {...register("email_siege", {
                                    required: {
                                      value: true,
                                      message: "Veuillez saisir l'email",
                                    },
                                  })}
                                  className="form-control"
                                  id="longitude"
                                />
                                {errors.email_siege && (
                                  <p className="text-danger mb-0">
                                    {errors.email_siege.message}
                                  </p>
                                )}
                              </div>
                              <div className="form-group col-md-4">
                                <label htmlFor="longitude">T??l??phone</label>
                                <input
                                  type="text"
                                  defaultValue={
                                    currentUser?.structure?.telephone_siege
                                  }
                                  {...register("telephone_siege", {
                                    required: {
                                      value: true,
                                      message: "Veuillez saisir le t??l??phone",
                                    },
                                  })}
                                  className="form-control"
                                  id="longitude"
                                />
                                {errors.telephone_siege && (
                                  <p className="text-danger mb-0">
                                    {errors.telephone_siege.message}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </fieldset>

                        <fieldset className="scheduler-border border">
                          <legend className="scheduler-border text-muted">
                            G??olocalisation
                          </legend>
                          <div className="row bg-white ">
                            <div className="d-flex ">
                              <div className="col-md-4  form-check-inline  d-flex">
                                <input
                                  className="form-check big-input"
                                  onChange={currentPositionHandler}
                                  value="1"
                                  type="checkbox"
                                />
                                <label className="form-check-label">
                                  R??cup??rer ma position actuelle ?
                                </label>
                              </div>
                              <div className="form-group  col-md-2">
                                <label htmlFor="latitude">Latitude</label>
                                <input
                                  type="text"
                                  defaultValue={
                                    currentUser?.structure?.latitude
                                  }
                                  {...register("latitude", {
                                    required: {
                                      value: true,
                                      message: "Veuillez saisir la latitude",
                                    },
                                  })}
                                  className="form-control input-group-sm latitude"
                                  disabled={isCurrentGeolocalisation}
                                />
                                {errors.latitude && (
                                  <p className="text-danger mb-0">
                                    {errors.latitude.message}
                                  </p>
                                )}
                              </div>
                              <div className="form-group  col-md-2">
                                <label htmlFor="longitude">Longitude</label>
                                <input
                                  type="text"
                                  defaultValue={
                                    currentUser?.structure?.longitude
                                  }
                                  {...register("longitude", {
                                    required: {
                                      value: true,
                                      message: "Veuillez saisir la longitude",
                                    },
                                  })}
                                  className="form-control input-group-sm longitude"
                                  disabled={isCurrentGeolocalisation}
                                  id="longitude"
                                />
                                {errors.longitude && (
                                  <p className="text-danger mb-0">
                                    {errors.longitude.message}
                                  </p>
                                )}
                              </div>
                              <div className="form-group  col-md-2">
                                <label htmlFor="altitude">Altitude</label>
                                <input
                                  type="text"
                                  defaultValue={
                                    currentUser?.structure?.altitude
                                  }
                                  {...register("altitude", {
                                    required: {
                                      value: true,
                                      message: "Veuillez saisir l'altitude",
                                    },
                                  })}
                                  className="form-control input-group-sm altitude"
                                  disabled={isCurrentGeolocalisation}
                                  id="altitude"
                                />
                                {errors.altitude && (
                                  <p className="text-danger mb-0">
                                    {errors.altitude.message}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </fieldset>
                        <div className="d-flex  justify-content-between mt-3">
                          <button
                            type="button"
                            className="float-right btn btn-sm btn-light "
                            onClick={() => setIsStructureUpdated(false)}
                          >
                            <FontAwesomeIcon
                              className="mr-2"
                              icon={faTimes}
                              size="lg"
                              color="grey"
                              role="button"
                            />

                            <strong className="text-default">Annuler</strong>
                          </button>
                          <button
                            type="submit"
                            className="float-right btn btn-sm btn-success"
                          >
                            <FontAwesomeIcon
                              className="mr-2"
                              icon={faCheck}
                              size="lg"
                              color="white"
                              role="button"
                            />
                            <strong>Valider</strong>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
                </div>
            </div>
        </div>

      

      {!isStructureUpdated && (
        <div class="card un-stat-2">
          <div class="card-header">
            <h5 class="mb-0 table-title">{currentUser?.structure?.denomination}</h5>
            <div class="dropdown exporter"></div>
          </div>
          <div class="card-body">
            <p class="card-title"></p>
            <div>
              {isLoading ? (
                <div className="">
                  <Skeleton count={7} height="40px" />
                </div>
              ) : (
                <div
                  className="mt-1"
                  style={{ height: "auto", background: "white" }}
                >
                  <table
                    class="table table-hover table-bordered tab-beneficiaires"
                    /* id="dataTables-example" */
                    width="100%"
                  >
                    <thead>
                      <tr>
                        <th>Ann??</th>
                        <th>MONNAIE</th>
                        <th>MODE FINANCEMENT</th>
                        {/* <th>PILIER</th> */}
                        <th>STATUT</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {AdminstructureListe && ((currentTableData?.filter(investissement=> investissement.statut === "En attente de validation" || investissement.statut === "Pr??valider"))).map((item) => {
                        return (
                          <tr key={item.id}>
                            <td>{item.annee}</td>
                            <td>{item.monnaie}</td>
                            <td>
                              <div className="d-flex">
                                {item.mode_financement.map(
                                  (mode) =>
                                    mode.montant && (
                                      <span className="actif mr-1">
                                        {mode.libelle}
                                      </span>
                                    )
                                )}
                              </div>
                            </td>
                            {/* <td>
                              <div className="d-flex">
                                {item.piliers?.map((pl) => (
                                  <span className="actif mr-1">
                                    {pl.libelle}
                                  </span>
                                ))}
                              </div>
                            </td> */}
                            <td><p style={{background:"yellow", padding:"3px 2px", marginBottom:-2, textAlign:"center"}}>{item.statut}</p></td>
                            <td>
                              <span style={{display:"inline-block", justifyContent:"space-between", width:"100%"}}>
                              { ((currentUser?.roles[0]=== "Point Focal" && item?.statut === "Enregistrer") || (currentUser?.roles[0]=== "Admin structure" && item?.statut !== "Pr??valider")) &&
                                <FontAwesomeIcon
                                    className="mr-2"
                                    icon={faCheck}
                                    title="Prevalider"
                                    color="grey"
                                    role="button"
                                    // data-toggle="modal"
                                    // data-target="#editModal"
                                    //TODO : Validation action
                                    onClick={() => validate(item.id)}
                                  />
                              }
                              { ((currentUser?.roles[0]!== "Point Focal" && item?.statut === "Enregistrer") || (currentUser?.roles[0]=== "Admin structure" && item?.statut !== "Pr??valider")) &&
                                  <FontAwesomeIcon
                                  className="mr-2"
                                  icon={faPowerOff}
                                  title="Rejeter"
                                  color="red"
                                  role="button"
                                  onClick={() => reject(item.id)}
                                />
                              }
                                <FontAwesomeIcon
                                  className="mr-2"
                                  icon={faEye}
                                  title="Details"
                                  color="grey"
                                  role="button"
                                  onClick={() =>
                                    history.push(
                                      `/acteur/investissements/${item.id}`
                                    )
                                  }
                                />
                                <FontAwesomeIcon
                                  className="mr-2"
                                  icon={faPen}
                                  title="Modifier"
                                  color="grey"
                                  role="button"
                                  data-toggle="modal"
                                  data-target="#editModal"
                                  onClick={() => editInvestisement(item.id)}
                                />
                              </span>
                            </td>
                          </tr>
                        );
                      })}

                      {PointfocalListe && (currentTableData?.filter(investissement=> investissement.statut === "Enregistrer" || investissement.statut === "En attente de validation")).map((item) => {
                        return (
                          <tr key={item.id}>
                            <td>{item.annee}</td>
                            <td>{item.monnaie}</td>
                            <td>
                              <div className="d-flex">
                                {item.mode_financement.map(
                                  (mode) =>
                                    mode.montant && (
                                      <span className="actif mr-1">
                                        {mode.libelle}
                                      </span>
                                    )
                                )}
                              </div>
                            </td>
                            {/* <td>
                              <div className="d-flex">
                                {item.piliers?.map((pl) => (
                                  <span className="actif mr-1">
                                    {pl.libelle}
                                  </span>
                                ))}
                              </div>
                            </td> */}
                            <td><p style={{background:"yellow", padding:"3px 2px", marginBottom:-2, textAlign:"center"}}>{item.statut}</p></td>
                            <td>
                              <span style={{display:"inline-block", justifyContent:"space-between", width:"100%"}}>
                              { ((currentUser?.roles[0]=== "Point Focal" && item?.statut === "Enregistrer") || (currentUser?.roles[0]=== "Admin structure" && item?.statut !== "Pr??valider")) &&
                                <FontAwesomeIcon
                                    className="mr-2"
                                    icon={faCheck}
                                    title="Prevalider"
                                    color="grey"
                                    role="button"
                                    // data-toggle="modal"
                                    // data-target="#editModal"
                                    //TODO : Validation action
                                    onClick={() => validate(item.id)}
                                  />
                              }
                                <FontAwesomeIcon
                                  className="mr-2"
                                  icon={faEye}
                                  title="Details"
                                  color="grey"
                                  role="button"
                                  onClick={() =>
                                    history.push(
                                      `/acteur/investissements/${item.id}`
                                    )
                                  }
                                />
                                <FontAwesomeIcon
                                  className="mr-2"
                                  icon={faPen}
                                  title="Modifier"
                                  color="grey"
                                  role="button"
                                  data-toggle="modal"
                                  data-target="#editModal"
                                  onClick={() => editInvestisement(item.id)}
                                />
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <Pagination
                    className="pagination-bar mt-2 mx-auto"
                    currentPage={currentPage}
                    totalCount={investissements?.length}
                    pageSize={PageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* const mapDispatchToProps = (dispatch) => ({
  storeStructure: (subUrl, data) => dispatch(storeStructureAsync(subUrl, data)),
  getStructureById: (id) => dispatch(fetchStructureByIdAsync(id)),
});

const mapStateToProps = createStructuredSelector({
  structure: selectStructureById,
}); */

export default withRouter(PriveSanteTable);
