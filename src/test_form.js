import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { connect } from "react-redux";
import { selectErrorMessage } from "../../../redux/structure/structure.selector";
import { createStructuredSelector } from "reselect";
import { selectSourceFinancementList } from "../../../redux/source-financement/source-financement.Selector";

import { resetEditedStructure } from "../../../redux/structure/structure.action";
import { fetchSourceFinancementAsync } from "../../../redux/source-financement/source-financement.thunk";
import Stepper from "react-stepper-horizontal";
import {
  acteurs,
  agentExecution,
  pilierData,
  typePtf,
  typeOng,
  typeAchat,
  tyepeSps,
  sourceFinancements,
  typeActeurs,
} from "../../../Data/data";
import MultipleValueTextInput from "react-multivalue-text-input";
import Select from "react-select";
import CustomSelect from "../../../components/CostumSelect";
import { useGeolocation } from "react-use";
import axios from "axios";
import { storeItem } from "../../../utilities/request.utility";

function StructureForm(props) {
  const $ = window.$;
  const {
    register,
    handleSubmit,
    control,
    watch,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });
  //useStates
  const [selectedFile, setSelectedFile] = useState({});
  const [axeInitData, setAxeInitData] = useState();
  const [monnaie, setsetMonnaie] = useState();
  const [investissements, setInvestissements] = useState([
    { libelle: "", montant: "" },
  ]);
  const [projets, setProjets] = useState([
    { libelle: "", opportunite: "", perspective: "" },
  ]);
  const [documentInputs, setdocumentInputs] = useState([
    { name: "", file: null },
  ]);
  const [documents, setDocuments] = useState({});

  const [piliers, setPiliers] = useState([
    {
      pilier: "",
      axe: [
        {
          libelle: "",
          montant_prevu: 0,
          montant_mobilise: 0,
          montant_execute: 0,
        },
      ],
    },
  ]);

  //functions

  const addPilier = () => {
    setPiliers((prevCount) => [
      ...prevCount,
      {
        pilier: "",
        axe: [
          {
            libelle: "",
            montant_prevu: 0,
            montant_mobilise: 0,
            montant_execute: 0,
          },
        ],
      },
    ]);
  };
  const removePilier = (index) => {
    piliers.splice(index, 1);
    setPiliers([...piliers]);
  };

  const addAxe = (index) => {
    let addedAxeToPilier = piliers[index];
    piliers[index] = addedAxeToPilier;
    addedAxeToPilier.axe.push({
      libelle: "",
      montant_prevu: 0,
      montant_mobilise: 0,
      montant_execute: 0,
    });
    setPiliers([...piliers]);
  };
  const RemoveAxe = (pilierIndex, axeIndex) => {
    let editedPilier = piliers[pilierIndex];
    editedPilier.axe.splice(axeIndex, 1);
    piliers[pilierIndex] = editedPilier;
    setPiliers([...piliers]);
  };

  const addInvestissement = () => {
    setInvestissements((prevInvest) => [
      ...prevInvest,
      { libelle: "", montant: "" },
    ]);
  };

  const removeInvestissent = (index) => {
    investissements.splice(index, 1);
    setInvestissements([...investissements]);
  };

  const addProjet = () => {
    setProjets((prevProj) => [
      ...prevProj,
      { libelle: "", opportunite: "", perspective: "" },
    ]);
  };

  const removeProjet = (index) => {
    projets.splice(index, 1);
    setProjets([...projets]);
  };

  const totalPillier = (index) => {
    const axes = piliers[index].axe;
    return {
      total_prevu: axes?.reduce(
        (accumulator, current) =>
          accumulator + parseInt(current?.montant_prevu),
        0
      ),
      total_mobilise: axes?.reduce(
        (accumulator, current) =>
          accumulator + parseInt(current?.montant_mobilise),
        0
      ),
      total_execute: axes?.reduce(
        (accumulator, current) =>
          accumulator + parseInt(current?.montant_execute),
        0
      ),
    };
  };
  //hanlers
  const onFileChange = (event) => {
    const { name, files } = event.target;
    setSelectedFile({ ...selectedFile, [name]: files[0] });
  };
  const pilierLibelleHandler = (index) => (e) => {
    let pilier = piliers[index];
    pilier.pilier = e.target.value;
    pilier.optionAxies = pilierData[e.target.value];
    piliers[index] = pilier;
    setPiliers([...piliers]);
    setAxeInitData(pilierData[e.target.value]);
  };
  const axeInputHandler = (pilierIndex, axeIndex) => (e) => {
    let pilier = piliers[pilierIndex];
    pilier.axe[axeIndex][e.target.name] = e.target.value;
    piliers[pilierIndex] = pilier;
    setPiliers([...piliers]);

    //console.log('****---***',piliers)
  };

  const investissementLibelleHandler = (index) => (e) => {
    let investissement = investissements[index];
    investissement.libelle = e.target.value;
    investissements[index] = investissement;
    setInvestissements([...investissements]);
  };

  const investissementMontantHandler = (index) => (e) => {
    let investissement = investissements[index];
    investissement.montant = e.target.value;
    investissements[index] = investissement;
    setInvestissements([...investissements]);
    console.log(investissement);
  };

  const projetLibelleHandler = (index) => (e) => {
    let projet = projets[index];
    projet.libelle = e.target.value;
    projets[index] = projet;
    setProjets([...projets]);
  };

  const projetPerspectiveHandler = (index) => (e) => {
    let projet = projets[index];
    projet.perspective = e.target.value;
    projets[index] = projet;
    setProjets([...projets]);
  };
  const projetOpportuniteHandler = (index) => (e) => {
    let projet = projets[index];
    projet.opportunite = e.target.value;
    projets[index] = projet;
    setProjets([...projets]);
    console.log(projets);
  };

  const monneyHandler = (e) => setsetMonnaie(e.target.value);

  const resetForm = () => reset();

  const submitForm = async (data, e) => {
    /* data.projection_annee_n_plus1_par_pilier?.forEach((element, index) => { 
                console.log('🔥🔥', element.files[0]);
            }) */

    const formData = new FormData();
    const fileField = Object.entries(selectedFile);
    fileField.forEach((file) => formData.append(file[0], file[1]));

    //multiple files
    /* data.projection_annee_n_plus1_par_pilier?.forEach((element, index) => { 
                formData.append('projection_annee_n_plus1_par_pilier[]', element.files[0]);
            }) */

    for (let formField in data) {
      if (data[formField]) {
        Array.isArray(data[formField])
          ? data[formField].forEach((val) =>
              formData.append(formField + "[]", val)
            )
          : formData.append(formField, data[formField]);
      }
    }

    piliers.forEach((pilier) => {
      formData.append("piliers[]", JSON.stringify(pilier));
    });

    investissements.forEach((invest) => {
      formData.append("investissements[]", JSON.stringify(invest));
    });

    projets.forEach((pj) => {
      formData.append("projets[]", JSON.stringify(pj));
    });

    storeItem("structures/", formData).then((res) => console.log(res));

    /* for(var pair of formData.entries()) {
                console.log(pair[0]+ ', '+ pair[1]);
             } */

    /*  props.storeStructure(formData);

               e.preventDefault();
                props.initStructureData()
                closeModal();
                resetForm(); */

    //props.errorMessage && alert(props.errorMessage)
  };

  const documentHandler = (e) => {
    const { name, files } = e.target;
    setDocuments({ ...documents, [name]: files });
  };

  //console.log(documents);

  //const $ = window.$;
  const closeModal = () => $("#exampleModal").modal("hide");

  return (
    <div
      className="modal fade bd-example-modal-lg "
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg " role="document">
        <div className="modal-content bg-white">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              AJOUT D'UNE STRUCTURE
            </h5>
            <button
              onClick={() => resetForm()}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close" /* onClick={()=>resetForm()} */
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form
              onSubmit={handleSubmit(submitForm)}
              encType="multipart/form-data"
            >
              <div className=" bg-white ">
                <div className="input-group ml-1">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text text-muted"
                      id="basic-addon1"
                    >
                      Monnaie
                    </span>
                  </div>
                  <select
                    {...register("monnaie")}
                    onChange={monneyHandler}
                    id="monnaie"
                    className="border"
                  >
                    <option value="XOF">XOF (CFA)</option>
                    <option value="EURO">EURO (€)</option>
                  </select>
                </div>
                {piliers.map((pilier, index) => (
                  <div
                    key={index}
                    className="row mx-1"
                    style={{ border: "1px solid #C5C3C6" }}
                  >
                    <div className="col-md-2" style={{ margin: "auto" }}>
                      <div className="form-group">
                        <label htmlFor="pilier">Pilier</label>
                        <select
                          name="pilier"
                          id="pilier"
                          onChange={pilierLibelleHandler(index)}
                          className="form-control form-control-sm"
                        >
                          <option>Choisir...</option>
                          {Object.keys(pilierData).map((pilier) => (
                            <option key={pilier} value={pilier}>
                              {pilier}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-9 py-2 border-right border-left">
                      {pilier.axe.map((axe, i) => (
                        <div key={i} className="row no-gutters">
                          <div className="col-md-2 pl-1">
                            <div className="form-group ">
                              <label htmlFor="secteur_intervention">Axe</label>
                              <select
                                name="libelle"
                                id="libelle"
                                onChange={axeInputHandler(index, i)}
                                className="form-control form-control-sm"
                              >
                                <option>Choisir...</option>
                                {pilier.optionAxies?.map((axe) => (
                                  <option key={axe[i]} value={axe[1]}>
                                    {axe[1]}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="form-group col-md-3 col-sm-12 pl-1">
                            <label htmlFor="montant_prevu">
                              Montant prévu ({monnaie == "EURO" ? "€" : "CFA"})
                            </label>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              name="montant_prevu"
                              value={axe.montant_prevu || ""}
                              /* {...register("pilier")} */ onChange={axeInputHandler(
                                index,
                                i
                              )}
                              id="montant_prevu"
                              id="montant_prevu"
                              placeholder={`Montant en ${
                                monnaie == "EURO" ? "€" : "CFA"
                              }`}
                            />
                          </div>
                          <div className="form-group col-md-3 col-sm-12 pl-1">
                            <label htmlFor="montant_mobilise">
                              Montant mobilisé (
                              {monnaie == "EURO" ? "€" : "CFA"})
                            </label>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              name="montant_mobilise"
                              value={axe.montant_mobilise || ""}
                              /* {...register("pilier")} */ onChange={axeInputHandler(
                                index,
                                i
                              )}
                              id="montant_mobilise"
                              id="montant_mobilise"
                              placeholder={`Montant en ${
                                monnaie == "EURO" ? "€" : "CFA"
                              }`}
                            />
                          </div>
                          <div className="form-group col-md-3 col-sm-12 pl-1">
                            <label htmlFor="montant_execute">
                              Montant executé ({monnaie == "EURO" ? "€" : "CFA"}
                              )
                            </label>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              name="montant_execute"
                              value={axe.montant_execute || ""}
                              /* {...register("pilier")} */ onChange={axeInputHandler(
                                index,
                                i
                              )}
                              id="montant_execute"
                              id="montant_execute"
                              placeholder={`Montant en ${
                                monnaie == "EURO" ? "€" : "CFA"
                              }`}
                            />
                          </div>
                          <div className="form-group col-md-1  mx-auto my-auto ">
                            <button
                              type="button"
                              className="btn btn-sm"
                              onClick={() => RemoveAxe(index, i)}
                            >
                              <i className="mdi mdi-delete mdi-18px text-danger "></i>
                            </button>
                          </div>
                        </div>
                      ))}

                      <div style={{ marginTop: "-10px" }}>
                        <button
                          type="button"
                          className="btn btn-sm"
                          onClick={() => addAxe(index)}
                        >
                          <i className="mdi mdi-plus mdi-18px text-primary ">
                            <small>Ajouter axe d'intervention</small>
                          </i>
                        </button>
                      </div>

                      {pilier.axe.length > 1 && (
                        <div className="bg-light row w-full no-gutters p-1">
                          <div className="col-md-3 my-auto">
                            <small className="text-muted font-weight-bold">
                              {pilier.pilier}
                            </small>
                          </div>
                          <div className="col-md-2 mx-4 pl-2 border-left">
                            <small className="text-muted font-weight-bold">
                              Total prévu
                            </small>
                            <p
                              style={{ margin: "2px 1px" }}
                              className="text-muted"
                            >{`${totalPillier(index).total_prevu} ${
                              monnaie == "EURO" ? "€" : "CFA"
                            }`}</p>
                          </div>
                          <div className="col-md-2 mx-4 pl-2 border-left">
                            <small className="text-muted font-weight-bold">
                              Total mobilisé
                            </small>
                            <p
                              style={{ margin: "2px 1px" }}
                              className="text-muted"
                            >{`${totalPillier(index).total_mobilise} ${
                              monnaie == "EURO" ? "€" : "CFA"
                            }`}</p>
                          </div>
                          <div className="col-md-2 mx-4 pl-2 border-left">
                            <small className="text-muted font-weight-bold">
                              Total exécuté
                            </small>
                            <p
                              style={{ margin: "2px 1px" }}
                              className="text-muted"
                            >{`${totalPillier(index).total_execute} ${
                              monnaie == "EURO" ? "€" : "CFA"
                            }`}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div
                      className="form-group col-md-1 "
                      style={{ margin: "auto" }}
                    >
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => removePilier(index)}
                      >
                        <i className="mdi mdi-delete mdi-18px text-white "></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="form-group ">
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={() => addPilier()}
                >
                  <i className="mdi mdi-plus mdi-18px text-primary ">
                    <small>Ajouter pilier</small>
                  </i>
                </button>
              </div>

              {/* investissements */}
              <div className=" bg-white " style={{ marginTop: "-30px" }}>
                <div
                  className="row mx-1 pt-3 mb-1 "
                  style={{ border: "1px solid #C5C3C6" }}
                >
                  {investissements.map((investissement, index) => (
                    <div key={index} className="row col-md-6 no-gutters">
                      <div className="form-group col-md-5 col-sm-12">
                        <label htmlFor="montant_execute">Investissement</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="libelle"
                          onChange={investissementLibelleHandler(index)}
                          value={investissement.libelle}
                          id="montant_execute"
                          id="montant_execute"
                          placeholder="Investissement"
                        />
                      </div>
                      <div className="form-group col-md-5 col-sm-12 ml-1">
                        <label htmlFor="montant_execute">Montant</label>
                        <input
                          type="montant"
                          className="form-control form-control-sm"
                          name="montant_execute"
                          onChange={investissementMontantHandler(index)}
                          value={investissement.montant}
                          id="montant_execute"
                          id="montant_execute"
                          placeholder={`Montant en ${
                            monnaie == "EURO" ? "€" : "CFA"
                          }`}
                        />
                      </div>
                      <div className="form-group col-md-1  my-auto">
                        <button
                          type="button"
                          className="btn btn-sm"
                          onClick={() => removeInvestissent(index)}
                        >
                          <i className="mdi mdi-delete mdi-18px text-danger "></i>
                        </button>
                      </div>
                    </div>
                  ))}
                  <div>
                    <button
                      type="button"
                      className="btn btn-sm"
                      onClick={() => addInvestissement()}
                    >
                      <i className="mdi mdi-plus mdi-18px text-primary ">
                        <small>Ajouter Investissement</small>
                      </i>
                    </button>
                  </div>
                </div>
              </div>
              {/* Projets */}
              <div className=" bg-white mt-1" style={{ marginTop: "-30px" }}>
                <div
                  className=" mx-1  pt-3 mb-1 "
                  style={{ border: "1px solid #C5C3C6" }}
                >
                  {projets.map((projet, index) => (
                    <div key={index} className="row offset-md-2 no-gutters">
                      <div className="form-group col-md-3 col-sm-12">
                        <label htmlFor="montant_execute">Projet</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="libelle"
                          onChange={projetLibelleHandler(index)}
                          placeholder="Investissement"
                        />
                      </div>
                      <div className="form-group col-md-3 col-sm-12 ml-1">
                        <label htmlFor="montant_execute">Perspective</label>
                        <input
                          type="montant"
                          className="form-control form-control-sm"
                          name="perspective"
                          onChange={projetPerspectiveHandler(index)}
                          placeholder="Perspective"
                        />
                      </div>
                      <div className="form-group col-md-3 col-sm-12 ml-1">
                        <label htmlFor="montant_execute">Opportunité</label>
                        <input
                          type="montant"
                          className="form-control form-control-sm"
                          name="opportunite"
                          onChange={projetOpportuniteHandler(index)}
                          placeholder="Opportunite"
                        />
                      </div>
                      <div className="form-group col-md-1  my-auto">
                        <button
                          type="button"
                          className="btn btn-sm"
                          onClick={() => removeProjet(index)}
                        >
                          <i className="mdi mdi-delete mdi-18px text-danger "></i>
                        </button>
                      </div>
                    </div>
                  ))}
                  <div>
                    <button
                      type="button"
                      className="btn btn-sm"
                      onClick={() => addProjet()}
                    >
                      <i className="mdi mdi-plus mdi-18px text-primary ">
                        <small>Ajouter projet</small>
                      </i>
                    </button>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Enregistrer
              </button>
            </form>
            {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  initSourceFiancementList: () => dispatch(fetchSourceFinancementAsync()),
  resetStructure: () => dispatch(resetEditedStructure()),
  initListActeur: () => dispatch(fetchActeursAsync()),
});

const mapStateToProps = createStructuredSelector({
  sourceFinancements: selectSourceFinancementList,
  typeActeur: selectListActeur,
  acteurByFinancement: selectActeurByFinancement,
  errorMessage: selectErrorMessage,
});
export default connect(mapStateToProps, mapDispatchToProps)(StructureForm);
