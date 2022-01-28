import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useGeolocation } from "react-use";
import Pagination from "../../components/pagination/Pagination";
let PageSize = 8;
const ActeurPrive = ({
  currentUser,
  storeStructure,
  structure,
  getStructureById,
}) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });
  const $ = window.$;
  const [isCurrentGeolocalisation, setIsCurrentGeolocalisation] =
    useState(false);
  const [isStructureUpdated, setIsStructureUpdated] = useState(false);
  const [structudeEditInfos, setStructudeEditInfos] = useState({
    adresse_siege: currentUser?.structure?.adresse_siege,
    email_siege: currentUser?.structure?.email_siege,
    telephone_siege: currentUser?.structure?.telephone_siege,
  });

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = React.useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return structure?.investissements.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, structure]);

  const myGeo = useGeolocation();
  let pointgeo;

  const currentPositionHandler = (e) => {
    e.target.checked
      ? setIsCurrentGeolocalisation(true)
      : setIsCurrentGeolocalisation(false);

    if (e.target.checked) {
      $(".latitude").val(/* `${myGeo.latitude}` */ "14.7510199");
      $(".longitude").val(/* `${myGeo.longitude}` */ "-17.4535678");
      $(".altitude").val(/* `${myGeo.accuracy}` */ "16.142");
    } else {
      $(".latitude").val("");
      $(".longitude").val("");
      $(".altitude").val("");
    }
  };

  if (isCurrentGeolocalisation) {
    pointgeo = {
      latitude: /* myGeo.latitude */ "14.7510199",
      longitude: /* myGeo.longitude */ "-17.4535678",
      altitude: /* myGeo.accuracy */ "16.142",
    };
  } else {
    pointgeo = {
      latitude: getValues().latitude,
      longitude: getValues().longitude,
      altitude: getValues().altitude,
    };
  }

  const displayForm = React.useCallback(() => {
    setIsStructureUpdated(true);
  }, [isStructureUpdated]);

  const submitForm = async (data, e) => {
    data.latitude = pointgeo.latitude;
    data.longitude = pointgeo.longitude;
    data.altitude = pointgeo.altitude;

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
  };

  return (
    <div>
      <div
        className="mt-1"
        style={{ height: "auto", background: "white", marginTop: "-15px" }}
      >
        {!isStructureUpdated ? (
          <div className="card-body" style={{ marginTop: "-20px" }}>
            <div className="row">
              <div className="col-md-4 mb-1">
                <label className="text-muted">Dénomination :</label>{" "}
                {structure?.denomination}
              </div>
              <div className="col-md-4 mb-1">
                <label className="text-muted">Type acteur :</label>{" "}
                {structure?.type_acteur}
              </div>
              <div className="col-md-4 mb-1">
                <label className="text-muted">Source Finance :</label>{" "}
                {structure?.type_acteur}
              </div>
              <div className="col-md-4 mb-1">
                <label className="text-muted">Adresse :</label>{" "}
                {structure?.adresse_siege}
              </div>
              <div className="col-md-4 mb-1">
                <label className="text-muted">Email :</label>{" "}
                {structure?.email_siege}
              </div>
              <div className="col-md-4 mb-1">
                <label className="text-muted">Téléphone :</label>{" "}
                {structure?.telephone_siege}
              </div>
            </div>
            <i
              onClick={() => displayForm()}
              className="mdi mdi-pencil mdi-18px text-primary float-right"
              style={{ cursor: "pointer" }}
            >
              <small>Modifier</small>
            </i>
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
                          defaultValue={structure?.adresse_siege}
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
                          defaultValue={structure?.email_siege}
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
                        <label htmlFor="longitude">Téléphone</label>
                        <input
                          type="text"
                          defaultValue={structure?.telephone_siege}
                          {...register("telephone_siege", {
                            required: {
                              value: true,
                              message: "Veuillez saisir le téléphone",
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
                    Géolocalisation
                  </legend>
                  <div className="row bg-white mx-1">
                    <div className="row ml-3">
                      <div className="form-group col-md-3 my-4">
                        <input
                          className="form-check-input"
                          onChange={currentPositionHandler}
                          value="1"
                          type="checkbox"
                        />
                        <small> Récupérer ma position actuelle ? </small>
                      </div>
                      <div className="form-group  col-md-3">
                        <label htmlFor="latitude">Latitude</label>
                        <input
                          defaultValue={currentUser?.structure?.latitude}
                          type="text"
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
                      <div className="form-group  col-md-3">
                        <label htmlFor="longitude">Longitude</label>
                        <input
                          type="text"
                          defaultValue={currentUser?.structure?.longitude}
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
                      <div className="form-group  col-md-3">
                        <label htmlFor="altitude">Altitude</label>
                        <input
                          type="text"
                          defaultValue={currentUser?.structure?.altitude}
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
                <div className="d-flex  justify-content-between">
                  <button
                    type="button"
                    className="float-right btn"
                    onClick={() => setIsStructureUpdated(false)}
                  >
                    <i className="mdi mdi-cancel mdi-18px text-default ">
                      <small>Annuler</small>
                    </i>
                  </button>
                  <button type="submit" className="float-right btn">
                    <i className="mdi mdi-check mdi-18px text-success ">
                      <small>Valider</small>
                    </i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
      <>
        <div className="mt-1" style={{ height: "auto", background: "white" }}>
          <table className="table bg-white">
            <thead>
              <tr>
                <th>Anné</th>
                <th>MONNAIE</th>
                <th>MODE FINANCEMENT</th>
                <th>PILIER</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {currentTableData?.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.annee}</td>
                    <td>{item.monnaie}</td>
                    <td>
                      {item.mode_financement.map((mode) => (
                        <p className="badge badge-primary ml-1">
                          {mode.libelle}
                        </p>
                      ))}
                    </td>
                    <td>
                      {item.piliers.map((pl) => (
                        <p className="badge badge-primary ml-1">{pl.libelle}</p>
                      ))}
                    </td>
                    <td>
                      <div className="row" style={{ display: "inline-block" }}>
                        <i
                          className="mdi mdi-eye mdi-18px text-secondary"
                          role="button"
                          /* onClick={() =>
                            history.push(`/admin/structures/${item.id}`)
                          } */
                        ></i>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            className="pagination-bar mt-2 mx-auto"
            currentPage={currentPage}
            totalCount={
              structure?.investissements ? structure?.investissements.length : 0
            }
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </>
    </div>
  );
};

/*const mapDispatchToProps = (dispatch) => ({
  storeStructure: (subUrl, data) => dispatch(storeStructureAsync(subUrl, data)),
  getStructureById: (id) => dispatch(fetchStructureByIdAsync(id)),
});

const mapStateToProps = createStructuredSelector({
  structure: selectStructureById,
}); */

export default ActeurPrive;
