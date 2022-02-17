import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { selectErrorMessage } from "../../../../redux/structure/structure.selector";
import { createStructuredSelector } from "reselect";
import { selectSourceFinancementList } from "../../../../redux/source-financement/source-financement.Selector";

import { resetEditedStructure } from "../../../../redux/structure/structure.action";
import { fetchSourceFinancementAsync } from "../../../../redux/source-financement/source-financement.thunk";
import Stepper from "react-stepper-horizontal";
import { pilierData } from "../../../../Data/data";
import {
  storeInvestissementAsync,
  updateInvestissementAsync,
} from "../../../../redux/investissement/investissement.thunk";
import {
  storeItem,
  removeItem,
  updateItem,
} from "../../../../utilities/request.utility";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleRight,
  faPlus,
  faTrash,
  faCalendar,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";
import Ajout from "../../../../assets/images/ajout.svg";
import Supprimer from "../../../../assets/images/supprimer.svg";

function SpsEpsEditForm(props) {
  const $ = window.$;
  const {
    register,
    handleSubmit,
    control,
    watch,
    getValues,
    clearErrors,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
  });

  //useStates
  const [steps, setSteps] = useState([
    { title: "infos sur l'investissement" },
    { title: "Recap" },
  ]);
  const [axeInitData, setAxeInitData] = useState();
  const [monnaie, setsetMonnaie] = useState();
  const [editAutreModeFinancement, setEditAutreModeFinancement] =
    useState(null);
  const [investissements, setInvestissements] = useState([
    { libelle: "", montant: "" },
  ]);
  const [piliers, setPiliers] = useState([]);
  const [modeFinancement, setModeFinancement] = useState([]);
  const [formStep, setFormStep] = useState(0);
  const [ActivStep, setActivStep] = useState(0);
  const [isAchatServiceCheck, setIsAchatServiceCheck] = useState(false);
  const [selectedFile, setSelectedFile] = useState({});
  const [paquetSanteIntervention, setPaquetSanteIntervention] = useState();
  const [autreModeFiancement, setAutreModeFiancement] = useState(false);

  useEffect(() => {
    reset();
    setPiliers(
      props.investissementsById?.piliers?.map((pl) => {
        return {
          id: pl.id,
          pilier: pl.libelle,
          axe: pl.axes.map((axe) => {
            return {
              id: axe.id,
              libelle: axe.libelle,
              investissement: {
                id: axe.nature[0].id,
                montant_prevu: axe.nature[0].montant_prevu,
                montant_mobilise: axe.nature[0].montant_mobilise,
                montant_execute: axe.nature[0].montant_execute,
              },
              bien_et_service: {
                id: axe.nature[1].id,
                montant_prevu: axe.nature[1].montant_prevu,
                montant_mobilise: axe.nature[1].montant_mobilise,
                montant_execute: axe.nature[1].montant_execute,
              },
            };
          }),
        };
      })
    );

    setModeFinancement(
      props.investissementsById?.mode_financement.map((mode) => {
        return { id: mode.id, libelle: mode.libelle, montant: mode.montant };
      })
    );
    setEditAutreModeFinancement(
      !["Subvention", "Recette", "Transfert", "Don"].includes(
        props.investissementsById?.mode_financement[
          props.investissementsById?.mode_financement?.length - 1
        ]?.libelle
      )
    );
  }, [props.investissementsById]);

  const modeFinanceEditHandler = (index) => (e) => {
    if (typeof modeFinancement[index] === "undefined") {
      modeFinancement[index] = { id: null, montant: e.target.value };
      switch (index) {
        case 0:
          modeFinancement[index].libelle = "Subvention";
          break;
        case 1:
          modeFinancement[index].libelle = "Transfert";
          break;
        case 2:
          modeFinancement[index].libelle = "Recette";
          break;
        case 3:
          modeFinancement[index].libelle = "Don";
          break;
        default:
          break;
      }
      Object.keys(modeFinancement).forEach((key) => {
        if (modeFinancement[key] === undefined) {
          delete modeFinancement[key];
        }
      });
      setModeFinancement([...modeFinancement]);
    }
    Object.keys(modeFinancement).forEach((key) => {
      if (modeFinancement[key] === undefined) {
        delete modeFinancement[key];
      }
    });
    let editedModeFinance = modeFinancement[index];
    editedModeFinance.montant = e.target.value;
    modeFinancement[index] = editedModeFinance;
    setModeFinancement([...modeFinancement]);
  };
  const libelleEditModeFinanceHandler = (index) => (e) => {
    if (typeof modeFinancement[index] === "undefined") {
      modeFinancement[index] = { id: null, libelle: e.target.value };
      Object.keys(modeFinancement).forEach((key) => {
        if (modeFinancement[key] === undefined) {
          delete modeFinancement[key];
        }
      });
      setModeFinancement([...modeFinancement]);
    }
    let editedModeFinance = modeFinancement[index];
    editedModeFinance.libelle = e.target.value;
    modeFinancement[index] = editedModeFinance;
    Object.keys(modeFinancement).forEach((key) => {
      if (modeFinancement[key] === undefined) {
        delete modeFinancement[key];
      }
    });
    setModeFinancement([...modeFinancement]);
  };
  //console.log("QQQQ", editAutreModeFinancement);
  //Steps
  const completeFormStep = () => {
    setFormStep((cur) => cur + 1);
    setActivStep((step) => step + 1);
  };
  const goToPreviousStep = () => {
    setFormStep((cur) => cur - 1);
    setActivStep((step) => step - 1);
  };

  const autreModeFianceHandler = (e) => {
    e.target.checked
      ? setAutreModeFiancement(true)
      : setAutreModeFiancement(false);
    //setEditAutreModeFinancement(!editAutreModeFinancement);
    e.target.checked
      ? setEditAutreModeFinancement(true)
      : setEditAutreModeFinancement(false);

    !e.target.checked && clearErrors("autre_mode_montant");
    !e.target.checked && clearErrors("autre_mode_libelle");
  };
  //handlers

  const achatServiceHandler = (e) => {
    setIsAchatServiceCheck(e.target.checked);
  };
  //Autres
  const regions = props.collectiviteList?.filter(
    (col) => col.type_collectivite === "Region"
  );

  //Boutons
  const submitButton = () => {
    return (
      <button
        /* disabled={!isValid} */
        type="submit"
        className="btn btn-primary" /* onClick={()=> setTimeout(function() {$('#editModal').modal('hide')}, 4000)} */
      >
        <i className="mdi mdi-check mdi-18px text-white align-left"></i>
        Enregistrer
      </button>
    );
  };

  const nextButton = () => {
    return (
      <button
        onClick={completeFormStep}
        /* disabled={!isValid} */
        type="button"
        className="btn btn-primary"
      >
        Suivant
        <FontAwesomeIcon
          className="ml-2"
          icon={faAngleDoubleRight}
          size="lg"
          role="button"
        />
      </button>
    );
  };

  const previousButton = () => {
    return (
      <button
        style={{ display: formStep != 0 ? "block" : "none" }}
        onClick={goToPreviousStep}
        type="button"
        className="btn btn-primary"
      >
        <i className="mdi mdi-arrow-left mdi-18px text-white align-left"></i>
        Précédent
      </button>
    );
  };

  /* const resetForm = () => {
    reset();
    setActivStep(0);
    setFormStep(0);
  }; */

  const addPilier = () => {
    setPiliers((prevCount) => [
      ...prevCount,
      {
        id: null,
        pilier: "",
        axe: [
          {
            libelle: "",
            investissement: {
              montant_prevu: "",
              montant_mobilise: "",
              montant_execute: "",
            },
            bien_et_service: {
              montant_prevu: "",
              montant_mobilise: "",
              montant_execute: "",
            },
          },
        ],
      },
    ]);
  };
  const removePilier = (index) => {
    let pilierToDelete = piliers[index];
    return removeItem(
      "investissements/pilier",
      pilierToDelete.id,
      pilierToDelete.pilier
    ).then((res) => {
      if (res === true) {
        piliers.splice(index, 1);
        setPiliers([...piliers]);
      }
    });
  };

  const addAxe = (index) => {
    let addedAxeToPilier = piliers[index];
    piliers[index] = addedAxeToPilier;
    addedAxeToPilier.axe.push({
      libelle: "",
      investissement: {
        montant_prevu: "",
        montant_mobilise: "",
        montant_execute: "",
      },
      bien_et_service: {
        montant_prevu: "",
        montant_mobilise: "",
        montant_execute: "",
      },
    });
    setPiliers([...piliers]);
  };

  const modeFinanceMontantHandler =
    (pilierIndex, axeIndex, domaine, field) => (e) => {
      let pilier = piliers[pilierIndex];
      pilier.axe[axeIndex][domaine][field] = e.target.value;
      piliers[pilierIndex] = pilier;
      setPiliers([...piliers]);
    };

  const RemoveAxe = (pilierIndex, axeIndex) => {
    let editedPilier = piliers[pilierIndex];
    let id = editedPilier.axe[axeIndex].id;
    let libelle = editedPilier.axe[axeIndex].libelle;
    return removeItem("investissements/pilier/axe", id, libelle).then((res) => {
      if (res === true) {
        editedPilier.axe.splice(axeIndex, 1);
        piliers[pilierIndex] = editedPilier;
        setPiliers([...piliers]);
      }
    });
  };

  //hanlers
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
  };

  const monneyHandler = (e) => setsetMonnaie(e.target.value);

  const resetForm = () => {
    reset();
    $("#editModal").modal("hide");
    setActivStep(0);
    setFormStep(0);
    props.fetchInvestissement();
    setPiliers([]);
  };

  const submitForm = async (data, e) => {
    data.structure_id = props.investissementsById?.structure?.id;
    data.investissement_id = props.investissementsById?.id;
    data.paquet_sante_intervention = paquetSanteIntervention?.join();
    if (
      data.mecanisme_financement &&
      data.mecanisme_financement === "Autres" &&
      data.autre_mecanisme_financement
    ) {
      data.mecanisme_financement = data.autre_mecanisme_financement;
    }

    if (data.monnaie && data.monnaie === "Autre" && data.autre_monnaie) {
      data.monnaie = data.autre_monnaie;
    }

    const formData = new FormData();
    const fileField = Object.entries(selectedFile);
    fileField.forEach((file) => formData.append(file[0], file[1]));

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

    modeFinancement.forEach((mode) => {
      formData.append("mode_finance[]", JSON.stringify(mode));
    });

    props.storeStructure("update_investissement", formData);
    resetForm();
    // props.updateInvestissement(1, formData);
    //resetForm();

    //storeItem("investissements", formData).then((res) => console.log(res));
  };

  return (
    <div
      className="modal fade bd-example-modal-xl "
      id="editModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl " role="document">
        <div className="modal-content bg-white">
          <div className="modal-header">
            <h5 className="modal-title" id="editModalLabel">
              AJOUT FINACEMENT{" "}
              {props.currentUser?.structure?.denomination?.toUpperCase()}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close" /* onClick={()=>resetForm()} */
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div
              className="bg-opacity-10 pb-3 w-100 top-form"
              style={{ marginTop: "-20px", width: "100vw !important" }}
            >
              <Stepper steps={steps} activeStep={ActivStep} />
            </div>

            <form onSubmit={handleSubmit(submitForm)}>
              {formStep >= 0 && (
                <section style={{ display: formStep === 0 ? "block" : "none" }}>
                  <div className="bg-white mt-4">
                    <div className=" bg-white ">
                      <div className="row container-fluid m-0">
                        <div className="form-group col-md-6">
                          <label htmlFor="annee">Année</label>
                          <div class="input-group right-prepend">
                            <input
                              type="number"
                              className="form-control input-style"
                              {...register("annee", {
                                required: {
                                  value: true,
                                  message: "Veuillez saisir l'année",
                                },
                              })}
                              id="annee"
                              placeholder="Année"
                              defaultValue={props.investissementsById?.annee}
                            />
                            <div class="input-group-prepend ">
                                <span class="input-group-text style-right-prepend bg-style text-white">
                                  <FontAwesomeIcon icon={faCalendar} className="mr-1 mb-1" />
                                </span>
                            </div>
                          </div>
                          {errors.annee && (
                            <p className="text-danger mb-0">
                              {errors.annee.message}
                            </p>
                          )}
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="monnaie">Monnaie</label>
                          <div class="input-group right-prepend">
                            <select
                              {...register("monnaie", {
                                required: {
                                  value: true,
                                  message: "Veuillez choisir la monnaie",
                                },
                              })}
                              onChange={monneyHandler}
                              id="monnaie"
                              className="form-control input-style"
                            >
                              <option
                              selected={
                                props.investissementsById?.monnaie == "XOF"
                              }
                              value="XOF"
                            >
                              XOF (CFA)
                            </option>
                            <option
                              selected={
                                props.investissementsById?.monnaie == "EURO"
                              }
                              value="EURO"
                            >
                              EURO (€)
                            </option>
                            <option
                              selected={
                                props.investissementsById?.monnaie == "DOLLAR"
                              }
                              value="DOLLAR"
                            >
                              DOLLAR ($)
                            </option>
                            <option
                              selected={
                                props.investissementsById?.monnaie == "Autre"
                              }
                              value="Autre"
                            >
                              Autre
                            </option>
                            </select>
                            <div class="input-group-prepend ">
                                <span class="input-group-text style-right-prepend bg-style text-white">
                                  <FontAwesomeIcon icon={faCoins} className="mr-1 mb-1" />
                                  </span>
                            </div>
                          </div>
                        </div>

                        {monnaie === "Autre" && (
                          <div className="form-group input-group-sm col-md-3">
                            <label htmlFor="annee">Préciser la monnaie</label>
                            <input
                              type="number"
                              className="form-control"
                              {...register("autre_monnaie")}
                              placeholder="Préciser la monnaie"
                              placeholder=""
                            />
                          </div>
                        )}
                      </div>

                      <fieldset className="scheduler-border border section-style">
                        <legend className="scheduler-border text-muted">
                          Les dimensions du financement
                        </legend>
                        <div className="row mx-1 px-2 d-flex flex-row bg-section">
                          <div className="form-check form-check-inline col-md-4 d-flex">
                            <input
                              className="form-check mr-2 big-checkbox"
                              {...register("mobilisation_ressource")}
                              value="1"
                              type="checkbox"
                              id="mobilisation_ressource"
                              defaultChecked={
                                props.investissementsById?.structure
                                  ?.mobilisation_ressource
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="inlineCheckbox1"
                            >
                              Mobilisation des ressources
                            </label>
                          </div>
                          <div className="form-check form-check-inline col-md-4 d-flex">
                            <input
                              className="form-check mr-2 big-checkbox"
                              {...register("mis_en_commun_ressource")}
                              // value="1"
                              type="checkbox"
                              id="mis_en_commun_ressource"
                              defaultChecked={
                                props.investissementsById?.structure
                                  .mis_en_commun_ressource
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="mis_en_commun_ressource"
                            >
                              Mis en commun des ressources
                            </label>
                          </div>
                          <div className="form-check form-check-inline col-md-3 d-flex">
                            <input
                              className="form-check mr-2 big-checkbox"
                              {...register("achat_service")}
                              onChange={achatServiceHandler}
                              value="1"
                              type="checkbox"
                              id="achat_service"
                              defaultChecked={
                                props.investissementsById?.structure
                                  .achat_service
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="achat_service"
                            >
                              Achat de services
                            </label>
                          </div>
                        </div>
                      </fieldset>

                      <fieldset className="scheduler-border border section-style">
                        <legend className="scheduler-border text-muted">
                          Mode de financement
                        </legend>
                        <div className="pb-2 bg-section">
                          <div className="d-flex flex-wrap mx-1 pt-2 w-100">
                            <div className="input-group mb-4 col-md-6 right-prepend">
                              <div className="input-group-prepend ">
                                <span className="input-group-text bg-style bg-opacity-75 text-white text-style">
                                  Subvention
                                </span>
                              </div>
                              <input
                                type="number"
                                {...register("subvention")}
                                onChange={modeFinanceEditHandler(0)}
                                className="form-control form-control-sm w-20 input-style"
                                aria-label="Dollar amount (with dot and two decimal places)"
                                placeholder="Le montant de la subvention"
                                defaultValue={
                                  props.investissementsById?.mode_financement?.find(
                                    (el) => el.libelle == "Subvention"
                                  )?.montant
                                }
                              />
                              <div class="input-group-prepend ">
                                  <span class="input-group-text style-right-prepend">CFA</span>
                              </div>
                            </div>

                            <div className="input-group mb-4 col-md-6 right-prepend">
                              <div className="input-group-prepend ">
                                <span className="input-group-text bg-style bg-opacity-75 text-white text-style">
                                  Transfert
                                </span>
                              </div>
                              <input
                                type="number"
                                {...register("transfert")}
                                onChange={modeFinanceEditHandler(1)}
                                className="form-control form-control-sm w-20"
                                aria-label="Dollar amount (with dot and two decimal places)"
                                placeholder="Le montant du transfert"
                                defaultValue={
                                  props.investissementsById?.mode_financement?.find(
                                    (el) => el.libelle == "Transfert"
                                  )?.montant
                                }
                              />
                              <div class="input-group-prepend ">
                                  <span class="input-group-text style-right-prepend">CFA</span>
                              </div>
                            </div>

                            <div className="input-group mb-4 col-md-6 right-prepend">
                              <div className="input-group-prepend ">
                                <span className="input-group-text bg-style bg-opacity-75 text-white text-style">
                                  Recette
                                </span>
                              </div>
                              <input
                                type="number"
                                {...register("recette")}
                                onChange={modeFinanceEditHandler(2)}
                                className="form-control form-control-sm w-20"
                                aria-label="Dollar amount (with dot and two decimal places)"
                                placeholder="Le montant de la recette"
                                defaultValue={
                                  props.investissementsById?.mode_financement?.find(
                                    (el) => el.libelle == "Recette"
                                  )?.montant
                                }
                              />
                              <div class="input-group-prepend ">
                                  <span class="input-group-text style-right-prepend">CFA</span>
                              </div>
                            </div>

                            <div className="input-group mb-4 col-md-6 right-prepend">
                              <div className="input-group-prepend ">
                                <span className="input-group-text bg-style bg-opacity-75 text-white text-style">
                                  Don
                                </span>
                              </div>
                              <input
                                type="number"
                                {...register("don")}
                                onChange={modeFinanceEditHandler(3)}
                                className="form-control form-control-sm w-20"
                                aria-label="Dollar amount (with dot and two decimal places)"
                                placeholder="Le montant du don"
                                defaultValue={
                                  props.investissementsById?.mode_financement?.find(
                                    (el) => el.libelle == "Don"
                                  )?.montant
                                }
                              />
                              <div class="input-group-prepend ">
                                  <span class="input-group-text style-right-prepend">CFA</span>
                              </div>
                            </div>
                          </div>

                          <div className="form-check form-check-inline col-md-3 d-flex">
                            <input
                              className="form-check mr-2 big-checkbox"
                              onChange={autreModeFianceHandler}
                              value="1"
                              type="checkbox"
                              defaultChecked={editAutreModeFinancement}
                            />
                            <label className="form-check-label">Autre</label>
                          </div>

                          {autreModeFiancement && (
                            <div className="d-flex">
                              <div className="form-group input-group-sm col-md-6">
                                <label htmlFor="autre_mode_libelle">
                                  Libellé du mode de financement
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  {...register("autre_mode_libelle")}
                                  onChange={libelleEditModeFinanceHandler(4)}
                                  placeholder="Préciser le mode de fiancement"
                                  defaultValue={
                                    props.investissementsById?.mode_financement?.filter(
                                      (el) =>
                                        el.libelle !== "Subvention" &&
                                        el.libelle !== "Recette" &&
                                        el.libelle !== "Don" &&
                                        el.libelle !== "Transfert"
                                    )[0]?.libelle
                                  }
                                />
                                {errors.autre_mode_libelle && (
                                  <p className="text-danger mb-0">
                                    {errors.autre_mode_libelle.message}
                                  </p>
                                )}
                              </div>

                              <div className="form-group input-group-sm col-md-6">
                                <label htmlFor="autre_mode_motant">
                                  Montant
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  {...register("autre_mode_montant", {
                                    required: {
                                      value: true,
                                      message: "Veuillez saisir le montant",
                                    },
                                  })}
                                  placeholder="Le montant"
                                />
                                {errors.autre_mode_montant && (
                                  <p className="text-danger mb-0">
                                    {errors.autre_mode_montant.message}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </fieldset>

                      <fieldset className="row scheduler-border border mb-5 section-style m-0">
                        <legend className="scheduler-border text-muted pb-4">
                          <div className="col-md-8 pb-2 action-section-ajout">
                            <a href="#" onClick={() => addPilier()}>
                                <button type="button" className="btn btn-sm text-success">
                                  <small class="text-bold">Ajouter Pilier</small>
                                  <img src={Ajout} alt="" class="ml-1"/>
                                </button>
                            </a>
                        </div>
                          Piliers et axes d'intervention
                        </legend>
                        
                        {piliers?.map((pilier, index) => (
                          <div class="row p-3">
                            <div key={index} className="row p-4 pt-3 d-flex border m-1 bg-white cadrage control" >
                              <div className="offset-md-10 col-md-2 mb-0 pb-0 action-section decale1">
                                  {/* <a href="#" onClick={() => addPilier()}>
                                      <button type="button" className="btn btn-sm text-success">
                                        <small>Ajouter Pilier</small>
                                        <FontAwesomeIcon icon={faPlus} />
                                      </button>
                                  </a> */}
                                  <a href="#" onClick={() => removePilier(index)}>
                                      <button type="button" className="btn btn-sm text-danger">
                                        <small class="text-bold">Supprimer</small>
                                       <img src={Supprimer} alt="" class="ml-1"/>
                                      </button>
                                  </a>
                              </div>
                              <div className="row col-md-12 " >
                                <div className="form-group mb-4">
                                  <label htmlFor="pilier">Pilier</label>
                                  <select
                                    /* name="pilier" */
                                    {...register(`pilier_${index}`, {
                                      required: {
                                        value: true,
                                        message: "Veuillez saisir l'année",
                                      },
                                    })}
                                    id="pilier"
                                    onChange={pilierLibelleHandler(index)}
                                    className="form-control form-control-sm"
                                  >
                                    <option>Choisir...</option>
                                    {Object.keys(pilierData).map((pl) => (
                                    <option
                                      selected={pilier.pilier == pl}
                                      key={pl}
                                      value={pl}
                                    >
                                      {pl}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              
                              {pilier.axe.map((axe, i) => (
                              <div class="row bg-axe p-4 border cadrage control mt-4">
                                <div className="col-md-12 ">
                                    <div key={i} className="row d-flex no-gutters border-bottom ">
                                      <div className="row col-md-12 mx-1 mb-3" style={{ margin: "auto" }}>
                                        <div className="offset-md-7 col-md-5 mb-0 pb-0 action-section decale">
                                          <a href="#" onClick={() => addAxe(index)}>
                                              <button type="button" className="btn btn-sm text-success">
                                            <small class="text-bold">Ajouter Axe d'intervention</small>
                                            <img src={Ajout} alt="" class="ml-1"/>
                                          </button>
                                          </a>
                                          <a href="#" onClick={() => RemoveAxe(index, i)}>
                                              <button type="button" className="btn btn-sm text-danger">
                                                <small class="text-bold">Supprimer</small>
                                                <img src={Supprimer} alt="" class="ml-1"/>
                                              </button>
                                          </a>
                                          
                                        </div>
                                        <div className="form-group mx-auto">
                                          <label htmlFor="libelle">Axe d'intervention</label>
                                          <select
                                            name="libelle"
                                            id="libelle"
                                            onChange={axeInputHandler(index, i)}
                                            className="form-control form-control-sm"
                                          >
                                            <option>Choisir...</option>
                                            {pilierData[pilier.pilier]?.map(
                                          (ax) => (
                                            <option
                                              selected={axe.libelle === ax[1]}
                                              key={ax[i]}
                                              value={ax[1]}
                                            >
                                              {ax[1]}
                                              </option>
                                            ))}
                                          </select>
                                        </div>
                                      </div>

                                      <div className="row col-md-12 mx-auto ">
                                        <div class="row cadrage control bg-axe-section-input mb-4" style={{"min-height": "100px"}}>
                                          <div class="col-md-2  bg-axe-section p-4">
                                              <span className="bg-opacity-75 text-white text-style">
                                                Biens et Services
                                              </span>
                                          </div>
                                          <div class="row col-md-10 bg-axe-section-input pt-2">
                                              <div class="form-group col-md-4 ">
                                                <label htmlFor="Montant prévu">Montant prévu</label>
                                                <div class="input-group right-prepend">
                                                    <input
                                                    onChange={modeFinanceMontantHandler(
                                                      index,
                                                      i,
                                                      "bien_et_service",
                                                      "montant_prevu"
                                                    )}
                                                    type="number"
                                                    className="form-control form-control-sm w-20 input-style2"
                                                    aria-label="Dollar amount (with dot and two decimal places)"
                                                    placeholder="XXXXXXXXXX"
                                                    defaultValue={
                                                      axe.bien_et_service.montant_prevu
                                                    }
                                                  />
                                                  <div class="input-group-prepend">                        <span class="input-group-text style-right-prepend2">CFA</span>
                                                  </div>
                                                </div>
                                              </div>
                                              <div class="form-group col-md-4 ">
                                                   <label htmlFor="Montant mobilise">Montant mobilisé</label>
                                                    <div class="input-group right-prepend">
                                                      <input
                                                        type="number"
                                                        onChange={modeFinanceMontantHandler(
                                                          index,
                                                          i,
                                                          "bien_et_service",
                                                          "montant_mobilise"
                                                        )}
                                                        className="form-control form-control-sm w-20 input-style2"
                                                        aria-label="Dollar amount (with dot and two decimal places)"
                                                        placeholder="XXXXXXXXXX"
                                                        defaultValue={
                                                          axe.bien_et_service.montant_mobilise
                                                        }
                                                      />
                                                      <div class="input-group-prepend">                        <span class="input-group-text style-right-prepend2">CFA</span>
                                                      </div>
                                                    </div>
                                              </div>
                                              <div class="form-group col-md-4 ">
                                                   <label htmlFor="Montant execute">Montant exécuté</label>
                                                    <div class="input-group right-prepend">
                                                      <input
                                                        type="number"
                                                        onChange={modeFinanceMontantHandler(
                                                          index,
                                                          i,
                                                          "bien_et_service",
                                                          "montant_execute"
                                                        )}
                                                        className="form-control form-control-sm input-style2"
                                                        aria-label="Dollar amount (with dot and two decimal places)"
                                                        placeholder="XXXXXXXXXX"
                                                        defaultValue={
                                                          axe.bien_et_service.montant_execute
                                                        }
                                                      />
                                                      <div class="input-group-prepend">                        <span class="input-group-text style-right-prepend2">CFA</span>
                                                      </div>
                                                    </div>
                                              </div>
                                          </div>
                                        </div>

                                        <div class="row cadrage control bg-axe-section-input mb-3" style={{"min-height": "100px"}}>
                                          <div class="col-md-2  bg-axe-section p-4">
                                              <span className="bg-opacity-75 text-white text-style pt-3">
                                                Investissements
                                              </span>
                                          </div>
                                          <div class="row col-md-10 bg-axe-section-input pt-2">
                                              <div class="form-group col-md-4 ">
                                                <label htmlFor="Montant prevu">Montant prévu</label>
                                                <div class="input-group right-prepend">
                                                    <input
                                                      type="number"
                                                      onChange={modeFinanceMontantHandler(
                                                        index,
                                                        i,
                                                        "investissement",
                                                        "montant_prevu"
                                                      )}
                                                      className="form-control form-control-sm w-20 input-style2"
                                                      aria-label="Dollar amount (with dot and two decimal places)"
                                                      placeholder="XXXXXXXXXX"
                                                      defaultValue={
                                                        axe.investissement.montant_prevu
                                                      }
                                                    />
                                                  <div class="input-group-prepend">                        <span class="input-group-text style-right-prepend2">CFA</span>
                                                  </div>
                                                </div>
                                              </div>
                                              <div class="form-group col-md-4 ">
                                                   <label htmlFor="Montant mobilise">Montant mobilisé</label>
                                                    <div class="input-group right-prepend">
                                                      <input
                                                        type="number"
                                                        onChange={modeFinanceMontantHandler(
                                                          index,
                                                          i,
                                                          "investissement",
                                                          "montant_mobilise"
                                                        )}
                                                        className="form-control form-control-sm input-style2"
                                                        aria-label="Dollar amount (with dot and two decimal places)"
                                                        placeholder="XXXXXXXXXX"
                                                        defaultValue={
                                                          axe.investissement.montant_mobilise
                                                        }
                                                      />
                                                      <div class="input-group-prepend">                        <span class="input-group-text style-right-prepend2">CFA</span>
                                                      </div>
                                                    </div>
                                              </div>
                                              <div class="form-group col-md-4 ">
                                                   <label htmlFor="Montant execute">Montant exécuté</label>
                                                    <div class="input-group right-prepend">
                                                      <input
                                                        type="number"
                                                        onChange={modeFinanceMontantHandler(
                                                          index,
                                                          i,
                                                          "investissement",
                                                          "montant_execute"
                                                        )}
                                                        className="form-control form-control-sm w-20 input-style2"
                                                        aria-label="Dollar amount (with dot and two decimal places)"
                                                        placeholder="XXXXXXXXXX"
                                                        defaultValue={
                                                          axe.investissement.montant_execute
                                                        }
                                                      />
                                                      <div class="input-group-prepend">                        <span class="input-group-text style-right-prepend2">CFA</span>
                                                      </div>
                                                    </div>
                                              </div>
                                          </div>
                                          
                                        </div>
                                      </div>
                                    </div>
                                </div>
                              </div>
                               ))}
                            </div>
                            
                          </div>
                        ))}

                        
                      </fieldset>
                    </div>
                  </div>

                  <div className=" mt-2 float-right">
                    {previousButton()}
                    {nextButton()}
                  </div>
                </section>
              )}

              {formStep >= 1 && (
                <section style={{ display: formStep === 1 ? "block" : "none" }}>
                  <div className=" bg-white row border mx-1 mt-3 p-3">
                    <div className="row">
                      <div className=" col-md-6 my-1">
                        <p className="">
                          <strong>Année</strong> : {getValues().annee}
                        </p>
                      </div>
                      <div className=" col-md-6 my-1">
                        <p className="">
                          <strong>Monnaie</strong> : {getValues().monnaie}
                        </p>
                      </div>
                      <div className=" col-md-6 my-1">
                        <p className="">
                          <strong>dimentions</strong> :{" "}
                          {getValues().mobilisation_ressource && (
                            <span className="badge badge-primary mr-1">
                              Mobilisation
                            </span>
                          )}
                          {getValues().achat_service && (
                            <span className="badge badge-primary mr-1">
                              Achat service
                            </span>
                          )}
                          {getValues().mis_en_commun_ressource && (
                            <span className="badge badge-primary mr-1">
                              Mis en commun
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    <fieldset className="scheduler-border border">
                      <legend className="scheduler-border text-muted">
                        Mode de financement
                      </legend>
                      <div className="row">
                        {getValues().subvention && (
                          <div className=" col-md-6 my-1">
                            <p className="">
                              <strong>Subvention</strong> :{" "}
                              {getValues().subvention}
                            </p>
                          </div>
                        )}
                        {getValues().transfert && (
                          <div className=" col-md-6 my-1">
                            <p className="">
                              <strong>Transfert</strong> :{" "}
                              {getValues().transfert}
                            </p>
                          </div>
                        )}
                        {getValues().recette && (
                          <div className=" col-md-6 my-1">
                            <p className="">
                              <strong>Recette</strong> : {getValues().recette}
                            </p>
                          </div>
                        )}
                        {getValues().don && (
                          <div className=" col-md-6 my-1">
                            <p className="">
                              <strong>Don</strong> : {getValues().don}
                            </p>
                          </div>
                        )}
                        {getValues().autre_mode_montant && (
                          <div className=" col-md-6 my-1">
                            <p className="">
                              <strong>{getValues().autre_mode_libelle}</strong>{" "}
                              : {getValues().autre_mode_montant}
                            </p>
                          </div>
                        )}
                      </div>
                    </fieldset>

                    {piliers?.map((pilier, index) => (
                      <fieldset key={index} className="scheduler-border border">
                        <legend className="scheduler-border text-muted">
                          {`Pilier : ${pilier.pilier}`}
                        </legend>

                        <div className="row mx-1 mb-3 mr-1">
                          {pilier?.axe.map((axe, i) => (
                            <div className="col-md-6">
                              <fieldset
                                key={i}
                                className="scheduler-border border"
                              >
                                <legend className="scheduler-border text-muted">
                                  {`Axe:  ${axe.libelle}`}
                                </legend>
                                <div className="row">
                                  <div className="col-md-6">
                                    <p className="text-muted">
                                      Biens et services
                                    </p>
                                    <div>
                                      <p>
                                        Montant prévu :{" "}
                                        <span className="bold">
                                          {axe.bien_et_service.montant_prevu}
                                        </span>
                                      </p>
                                      <p>
                                        Montant mobilisé :{" "}
                                        <span className="bold">
                                          {axe.bien_et_service.montant_mobilise}
                                        </span>
                                      </p>
                                      <p>
                                        Montant exécuté :{" "}
                                        <span className="bold">
                                          {axe.bien_et_service.montant_execute}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="col-md-6 border-left">
                                    <p className="text-muted">
                                      Investissements
                                    </p>
                                    <div>
                                      <p>
                                        Montant prévu :{" "}
                                        <span className="bold">
                                          {axe.investissement.montant_prevu}
                                        </span>
                                      </p>
                                      <p>
                                        Montant mobilisé :{" "}
                                        <span className="bold">
                                          {axe.investissement.montant_mobilise}
                                        </span>
                                      </p>
                                      <p>
                                        Montant exécuté :{" "}
                                        <span className="bold">
                                          {axe.investissement.montant_execute}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </fieldset>
                            </div>
                          ))}
                        </div>
                      </fieldset>
                    ))}
                  </div>
                  <div className="modal-footer mt-2 d-flex justify-content-between">
                    {previousButton()}
                    {submitButton()}
                  </div>
                </section>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  initSourceFiancementList: () => dispatch(fetchSourceFinancementAsync()),
  resetStructure: () => dispatch(resetEditedStructure()),
  storeInvestissement: () => dispatch(storeInvestissementAsync()),
  //updateInvestissement: (id) => dispatch(updateInvestissementAsync(id)),
});

const mapStateToProps = createStructuredSelector({
  sourceFinancements: selectSourceFinancementList,
  errorMessage: selectErrorMessage,
});
export default connect(mapStateToProps, mapDispatchToProps)(SpsEpsEditForm);
