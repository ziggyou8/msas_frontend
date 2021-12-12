import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  acteurs,
  typeActeurs,
  cabinetSpecialite,
  typeStructureRse,
  typeBesoinRse,
  sourceFinancements,
  niveauUrgence,
} from "../../../../Data/data";
import axios from "axios";
import Multiselect from "multiselect-react-dropdown";
import { selectErrorMessage } from "../../../../redux/structure/structure.selector";
import {
  faCheck,
  faClosedCaptioning,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { selectSourceFinancementList } from "../../../../redux/source-financement/source-financement.Selector";
import { fetchSourceFinancementAsync } from "../../../../redux/source-financement/source-financement.thunk";
import { resetEditedStructure } from "../../../../redux/structure/structure.action";

function StructureForm({
  collectiviteList,
  initStructureData,
  storeStructure,
  allContries,
  isLoading,
  currentUser,
}) {
  //Variables
  const $ = window.$;
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  /* const { isSubmitting } = formState; */

  //useStates
  const [isDisplay, setIsDisplay] = useState(false);

  //Handlers
  const displayDocumentHandler = (e) => {
    e.target.checked ? setIsDisplay(true) : setIsDisplay(false);
  };

  //Autres fonctions
  const resetForm = () => {
    reset();
    $("#exampleModal").modal("hide");
    $(".chip").remove();
  };

  const submitForm = async (data, e) => {
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

    //data.district_interventions = checkIds;
    //storeItem("structures/step_1", formData).then((res) => console.log(res));

    storeStructure("step_1", formData);
    //e.preventDefault();
    resetForm();
  };

  return (
    <div
      className="modal fade bd-example-modal-lg "
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl " role="document">
        <div className="modal-content bg-white">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {(() => {
                switch (currentUser?.structure?.type_acteur) {
                  case "Ministère":
                  case "Structure de santé":
                  case "Collectivité locale":
                    return `Demande ${currentUser?.structure?.denomination}`;
                    break;
                  case "Entreprise":
                    return `Offre ${currentUser?.structure?.denomination}`;
                    break;
                  default:
                    break;
                }
              })()}
            </h5>
            <button
              onClick={() => resetForm()}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form
              onSubmit={handleSubmit(submitForm)}
              encType="multipart/form-data"
            >
              <div className=" bg-white">
                <div className="row bg-white mx-1  py-1">
                  <div className="form-group input-group-sm col-md-6">
                    <label htmlFor="type">Type de besoin</label>
                    <select
                      {...register("type_besoin")}
                      className="form-control"
                    >
                      <option>Choisir...</option>
                      {typeBesoinRse.map((type) => (
                        <option key={type[1]} value={type[1]}>
                          {type[1]}
                        </option>
                      ))}
                    </select>
                    {errors.type_besoin && (
                      <p className="text-danger mb-0">
                        {errors.type_besoin.message}
                      </p>
                    )}
                  </div>

                  <div className="form-group input-group-sm col-md-6">
                    <label htmlFor="type">Niveau d'urgence</label>
                    <select
                      {...register("niveau_urgence")}
                      className="form-control"
                    >
                      <option>Choisir...</option>
                      {niveauUrgence.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.niveau_urgence && (
                      <p className="text-danger mb-0">
                        {errors.niveau_urgence.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="form-group input-group-sm mx-3">
                  <label for="justification_besoin">
                    Justification du besoin
                  </label>
                  <textarea
                    className="form-control"
                    id="justification_besoin"
                    rows="5"
                    name="justification_besoin"
                    placeholder="Votre text ici....."
                  ></textarea>
                </div>
                <div className="form-group input-group-sm mx-3">
                  <label for="impact_attendu">Impact attendu</label>
                  <textarea
                    className="form-control"
                    id="impact_attendu"
                    rows="5"
                    name="impact_attendu"
                    placeholder="Votre text ici....."
                  ></textarea>
                </div>

                <div className="row">
                  <div className="d-flex ">
                    <div className="col-md-4  form-check-inline  d-flex">
                      <input
                        className="form-check big-input mx-3"
                        onChange={displayDocumentHandler}
                        value="1"
                        type="checkbox"
                      />
                      <label className="form-check-label">
                        Document de projet ?
                      </label>
                    </div>
                    {isDisplay && (
                      <div className="form-group  col-md-6">
                        <label htmlFor="latitude">Document</label>
                        <input
                          type="file"
                          {...register("document", {
                            required: {
                              value: true,
                              message: "Veuillez uploader un document",
                            },
                          })}
                          className="form-control input-group-sm"
                        />
                        {errors.document && (
                          <p className="text-danger mb-0">
                            {errors.document.message}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="modal-footer mt-2 d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => resetForm()}
                >
                  Annuler
                  <FontAwesomeIcon icon={faTimes} className="ml-1" />
                </button>
                <button
                  disabled={!isValid}
                  type="submit"
                  className="btn btn-success"
                >
                  Enregistrer
                  <FontAwesomeIcon icon={faCheck} className="ml-1" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  initSourceFiancementList: () => dispatch(fetchSourceFinancementAsync()),
  /* getActeurByFinancement: (id) => dispatch(fetchActeurByFinancementAsync(id)), */
  resetStructure: () => dispatch(resetEditedStructure()),
});

const mapStateToProps = createStructuredSelector({
  sourceFinancements: selectSourceFinancementList,
  errorMessage: selectErrorMessage,
});
export default connect(mapStateToProps, mapDispatchToProps)(StructureForm);
