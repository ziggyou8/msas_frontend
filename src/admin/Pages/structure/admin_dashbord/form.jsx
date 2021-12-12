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
  const [sourceFinancement, setSourceFinancement] = useState("");
  const [type, setType] = useState("");
  const [specialisation, setSpecialisation] = useState("");
  const [checkIds, setCheckIds] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  //const [selectedRegions, setSelectedRegions] = useState([]);
  const regions = collectiviteList?.filter(
    (col) => col.type_collectivite === "Region"
  );

  //Handlers
  const onSelect = (_, selectedItem) => {
    setSelectedRegions((pre) => [...pre, selectedItem]);
    selectedItem.regionChildren = collectiviteList?.filter(
      (col) => col.parent_code === selectedItem.code
    );
    setCheckIds((prev) => [...prev, { nom: selectedItem.nom, districts: [] }]);
  };

  const onRemove = (_, selectedItem) => {
    setSelectedRegions(
      selectedRegions.filter((el) => el.id !== selectedItem.id)
    );
    setCheckIds(checkIds.filter((el) => el.nom !== selectedItem.nom));
  };

  const sourceFinancementHandler = (e) => {
    setSourceFinancement(e.target.value);
  };

  const typeHandler = (e) => {
    setType(e.target.value);
  };

  const specialisationHandler = (e) => {
    setSpecialisation(e.target.value);
  };

  const checkHandler = (index) => (e) => {
    let checkedDistrict = checkIds[index];
    if (e.target.checked) {
      checkedDistrict.districts.push({
        id: e.target.getAttribute("data-id"),
        nom: e.target.value,
      });
      checkIds[index] = checkedDistrict;
      setCheckIds([...checkIds]);
    } else {
      checkedDistrict.districts = checkedDistrict.districts.filter(
        (el) => el.id !== e.target.getAttribute("data-id")
      );
      setCheckIds([...checkIds]);
    }
  };

  //Autres fonctions
  const resetForm = () => {
    initStructureData();
    setCheckIds([]);
    setSelectedRegions([]);
    $("#exampleModal").modal("hide");
    $(".chip").remove();
    /* reset(); */
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
    checkIds.forEach((districtId) => {
      formData.append("district_interventions[]", JSON.stringify(districtId));
    });

    storeStructure("step_1", formData);
    resetForm();
    e.target.reset();
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
              Ajout d'une structure
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
                  <div className="form-group input-group-sm col-md-3">
                    <label
                      htmlFor="source_financement"
                      className="require-label"
                    >
                      Source de Financement
                    </label>
                    <select
                      {...register("source_financement", {
                        required: {
                          value: true,
                          message: "Veuillez choisir le source de finncement",
                        },
                      })}
                      className="form-control"
                      onChange={sourceFinancementHandler}
                    >
                      <option value="">Choisir...</option>
                      {acteurs.map((acteur) => (
                        <option
                          key={acteur[1]}
                          disabled={acteur[2]}
                          value={acteur[1]}
                        >
                          {acteur[1]}
                        </option>
                      ))}
                    </select>
                    {errors.source_financement &&
                      getValues().source_financement === "" && (
                        <p className="text-danger mb-0">
                          {errors.source_financement.message}
                        </p>
                      )}
                  </div>
                  <div className="form-group input-group-sm col-md-3">
                    <label htmlFor="type">Type</label>
                    <select
                      {...register("type_acteur")}
                      onChange={typeHandler}
                      className="form-control"
                    >
                      <option>Choisir...</option>
                      {typeActeurs[sourceFinancement]?.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.type && (
                      <p className="text-danger mb-0">{errors.type.message}</p>
                    )}
                  </div>

                  {type === "Structure de santé" && sourceFinancement == "RSE" && (
                    <div className="form-group input-group-sm col-md-3">
                      <label htmlFor="categorie_rse">Catégorie</label>
                      <select
                        {...register("categorie_rse")}
                        className="form-control"
                      >
                        <option>Choisir...</option>
                        {typeStructureRse.map((type) => (
                          <option key={type[1]} value={type[1]}>
                            {type[1]}
                          </option>
                        ))}
                      </select>
                      {errors.categorie_rse && (
                        <p className="text-danger mb-0">
                          {errors.categorie_rse.message}
                        </p>
                      )}
                    </div>
                  )}

                  {sourceFinancement === "SPS" &&
                    type === "Cabinet médical spécialiste" && (
                      <div className="form-group input-group-sm col-md-3">
                        <label htmlFor="specialite">
                          Domaine de spécialisation
                        </label>
                        <select
                          {...register("specialite")}
                          className="form-control"
                          onChange={specialisationHandler}
                        >
                          <option>Choisir...</option>
                          {cabinetSpecialite?.map((type) => (
                            <option key={type[0]} value={type[0]}>
                              {type[0]}
                            </option>
                          ))}
                        </select>
                        {errors.type && (
                          <p className="text-danger mb-0">
                            {errors.type.message}
                          </p>
                        )}
                      </div>
                    )}

                  {type === "Cabinet médical spécialiste" &&
                    specialisation === "autre_specialite" && (
                      <div className="form-group input-group-sm col-md-3">
                        <label htmlFor="autre_specialite">
                          Préciser la spécialité
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.denomination && "is-invalid"
                          }`}
                          {...register("autre_specialite")}
                          id="denomination"
                          placeholder="Autre spécialité"
                        />
                        {errors.type && (
                          <p className="text-danger mb-0">
                            {errors.type.message}
                          </p>
                        )}
                      </div>
                    )}

                  <div className="form-group input-group-sm col-md-3">
                    <label htmlFor="denomination" className="require-label">
                      Dénomination
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.denomination && "is-invalid"
                      }`}
                      {...register("denomination", {
                        required: {
                          value: true,
                          message: "Veuillez saisir la dénomination",
                        },
                      })}
                      id="denomination"
                      placeholder="Libellé de la structure"
                    />
                    {errors.denomination && (
                      <p className="text-danger mb-0">
                        {errors.denomination.message}
                      </p>
                    )}
                  </div>

                  {sourceFinancement === "PTF" && (
                    <div className="form-group input-group-sm col-md-3">
                      <label
                        htmlFor="pays_nationalite"
                        className="require-label"
                      >
                        Pays/Nationalité
                      </label>
                      <select
                        {...register("pays_nationalite", {
                          required: {
                            value: true,
                            message:
                              "Veuillez choisir le pays / la nationalité",
                          },
                        })}
                        className="form-control"
                      >
                        <option value="">Choisir...</option>
                        {allContries?.map((contrie) => (
                          <option key={contrie.name} value={contrie.name}>
                            {contrie.name}
                          </option>
                        ))}
                      </select>
                      {errors.pays_nationalite &&
                        getValues().pays_nationalite === "" && (
                          <p className="text-danger mb-0">
                            {errors.pays_nationalite.message}
                          </p>
                        )}
                    </div>
                  )}

                  {(() => {
                    switch (sourceFinancement) {
                      case "ONG":
                      case "PTF":
                        return (
                          <div className="form-group input-group-sm col-md-3">
                            <label htmlFor="numero_agrement">N° agrément</label>
                            <input
                              type="text"
                              className="form-control"
                              {...register("numero_agrement")}
                              id="numero_agrement"
                              placeholder="Numéro agrément"
                            />
                          </div>
                        );
                        break;
                      case "SPS":
                        return (
                          <div className="form-group input-group-sm col-md-3">
                            <label htmlFor="numero_autorisation">
                              N° autorisation
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              {...register("numero_autorisation")}
                              id="numero_autorisation"
                              placeholder="N° autorisation"
                            />
                          </div>
                        );
                        break;
                      default:
                        break;
                    }
                  })()}
                </div>
                <div className="container-fluid mb-3 ">
                  {sourceFinancement !== "RSE" && (
                    <div>
                      <label>Région(s) d'intervention</label>
                      <Multiselect
                        options={regions} // Options à afficher dans le dropdown
                        selectedValues={""} // Valueur Preselectionnée à persister dans le dropdown
                        onSelect={onSelect} // Quand on selectionne une option
                        onRemove={onRemove} // Quand on déselectionne une option
                        displayValue="nom" // Propriété à afficher sur les options
                        placeholder="Sélectionner région(s)..."
                        className="form-control"
                      />
                      {selectedRegions.length > 0 && (
                        <div className="row border container-fluid mx-auto pb-2 mb-2 overflow-auto">
                          <label class="form-check-label mt-3">
                            Districts sanitaires
                          </label>
                          {selectedRegions.map((region, index) => (
                            <div className="col-md-4 mt-2">
                              <div style={{ background: "#3096F7" }}>
                                <h6 className="card-subtitle ml-2 mt-0 text-white">
                                  {region.nom.toUpperCase()}
                                </h6>
                              </div>
                              <div
                                className="border pb-1 overflow-auto"
                                style={{
                                  height: "150px",
                                  position: "relative",
                                }}
                              >
                                {region.regionChildren.map((child) => (
                                  <div class=" ml-2 ">
                                    <div
                                      class="d-flex form-check form-check-inline"
                                      style={{ marginBottom: "-25px" }}
                                    >
                                      <input
                                        value={child.nom}
                                        class="form-check mr-2 mb-2 big-checkbox"
                                        type="checkbox"
                                        id="gridCheck"
                                        data-id={child.id}
                                        onChange={checkHandler(index)}
                                      />
                                      <label class=" mt-1">
                                        {child.nom.toUpperCase()}
                                      </label>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  <fieldset className="scheduler-border border">
                    <legend className="scheduler-border text-muted">
                      Coordonnées siège
                    </legend>
                    <div className=" bg-white container-fluid">
                      <div className="row bg-white ">
                        {sourceFinancement !== "CT" && (
                          <div className="form-group input-group-sm col-md-4">
                            <label htmlFor="adresse_siege">Adresse</label>
                            <input
                              type="text"
                              className="form-control"
                              {...register("adresse_siege")}
                              id="adresse_siege"
                              placeholder="Ville, pays, rue etc."
                            />
                          </div>
                        )}
                        <div className="form-group input-group-sm col-md-4">
                          <label htmlFor="telephone_siege">Téléphone</label>
                          <input
                            type="text"
                            className="form-control"
                            {...register("telephone_siege")}
                            id="telephone_siege"
                            placeholder="Ex: +221........"
                          />
                        </div>
                        <div className="form-group input-group-sm col-md-4">
                          <label htmlFor="email_siege">Email</label>
                          <input
                            type="text"
                            className="form-control"
                            {...register("email_siege")}
                            id="email_siege"
                            placeholder="Ex: @gmail.com"
                          />
                        </div>
                      </div>
                    </div>
                  </fieldset>

                  <fieldset className="scheduler-border border">
                    <legend className="scheduler-border text-muted">
                      Personne responsable
                    </legend>
                    <div className=" bg-white container-fluid">
                      <div className="row bg-white">
                        <div className="form-group col-md-3 input-group-sm ">
                          <label htmlFor="fonction_responsable">Fonction</label>
                          <input
                            type="text"
                            className="form-control"
                            {...register("fonction_responsable")}
                            id="fonction_responsable"
                            placeholder="Ex: Directeur..."
                          />
                        </div>
                        <div className="form-group col-md-3 input-group-sm ">
                          <label htmlFor="prenom_responsable">Prénom</label>
                          <input
                            type="text"
                            className="form-control"
                            {...register("prenom_responsable")}
                            id="prenom_responsable"
                            placeholder="Prénom"
                          />
                        </div>
                        <div className="form-group col-md-3 input-group-sm ">
                          <label htmlFor="nom_responsable">Nom</label>
                          <input
                            type="text"
                            className="form-control"
                            {...register("nom_responsable")}
                            id="nom_responsable"
                            placeholder="Nom de famille"
                          />
                        </div>
                        <div className="form-group col-md-3 input-group-sm ">
                          <label htmlFor="email_responsable">Email</label>
                          <input
                            type="text"
                            className="form-control"
                            {...register("email_responsable")}
                            id="email_responsable"
                            placeholder="Ex: @gmail.com"
                          />
                        </div>
                        <div className="form-group col-md-3 input-group-sm ">
                          <label htmlFor="telephone_responsable">
                            Téléphone
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            {...register("telephone_responsable")}
                            id="telephone_responsable"
                            placeholder="Ex: +221........"
                          />
                        </div>
                      </div>
                    </div>
                  </fieldset>
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
