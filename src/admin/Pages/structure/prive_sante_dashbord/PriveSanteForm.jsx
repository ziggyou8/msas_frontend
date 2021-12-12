import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { connect } from "react-redux";
import { selectErrorMessage } from "../../../../redux/structure/structure.selector";
import { createStructuredSelector } from "reselect";
import { selectSourceFinancementList } from "../../../../redux/source-financement/source-financement.Selector";

import { resetEditedStructure } from "../../../../redux/structure/structure.action";
import { fetchSourceFinancementAsync } from "../../../../redux/source-financement/source-financement.thunk";
import Stepper from "react-stepper-horizontal";
import { pilierData } from "../../../../Data/data";
import MultipleValueTextInput from "react-multivalue-text-input";
import { useGeolocation } from "react-use";
import { storeItem } from "../../../../utilities/request.utility";
import { isInvalid } from "redux-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleRight,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

function ActeurPriveForm(props) {
  const $ = window.$;
  const {
    register,
    handleSubmit,
    control,
    watch,
    getValues,
    setValue,
    clearErrors,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  //useStates
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

  const [formStep, setFormStep] = useState(0);
  const [ActivStep, setActivStep] = useState(0);
  const [selectedActeur, setselectedActeur] = useState();
  const [isRegionChanged, setisRegionChanged] = useState(true);
  const [isDepartementChanged, setisDepartementChanged] = useState(true);
  const [isCommuneChanged, setisCommuneChanged] = useState(true);
  const [departements, setDepartements] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [districts, setdistricts] = useState([]);
  const [isAchatServiceCheck, setIsAchatServiceCheck] = useState(false);
  const [sousRecipiandaire, setSousRecipiandaire] = useState([[1, "1"]]);
  const [agentBailleur, setAgentBailleur] = useState([[1, "1"]]);
  const [pilierIntervention, setPilierIntervention] = useState([[1, "1"]]);
  const [selectedFile, setSelectedFile] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({
    type_acteur: null,
  });

  const [modeFinancement, setModeFinancement] = useState([
    { libelle: "", montant: "" },
  ]);

  const [geolocalisationPoint, setGeolocalisationPoint] = useState({});
  const [paquetSanteIntervention, setPaquetSanteIntervention] = useState();
  const [isCurrentGeolocalisation, setIsCurrentGeolocalisation] =
    useState(false);
  const [autreModeFiancement, setAutreModeFiancement] = useState(false);

  const firsStepIsInValide = watch().type_acteur || !watch().denomination;
  const [steps, setSteps] = useState([
    { title: "infos sur l'investissement" },
    { title: "Recap" },
  ]);
  useEffect(() => {
    props.currentUser?.structure &&
      reset({
        adresse_siege: props.currentUser?.structure?.adresse_siege,
        email_siege: props.currentUser?.structure?.email_siege,
        adresse_siege: props.currentUser?.structure?.adresse_siege,
        latitude: props.currentUser?.structure?.latitude,
        longitude: props.currentUser?.structure?.longitude,
        altitude: props.currentUser?.structure?.altitude,
      });
  }, []);

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

    !e.target.checked && clearErrors("autre_mode_montant");
    !e.target.checked && clearErrors("autre_mode_libelle");

    console.log(errors);
  };
  //handlers
  const myGeo = useGeolocation();
  let pointgeo;

  const currentPositionHandler = (e) => {
    e.target.checked
      ? setIsCurrentGeolocalisation(true)
      : setIsCurrentGeolocalisation(false);

    if (e.target.checked) {
      $("#latitude").val(/* `${myGeo.latitude}` */ "14.7510199");
      $("#longitude").val(/* `${myGeo.longitude}` */ "-17.4535678");
      $("#altitude").val(/* `${myGeo.accuracy}` */ "16.142");
    } else {
      $("#latitude").val("");
      $("#longitude").val("");
      $("#altitude").val("");
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
  //console.log('😎😎', pointgeo);

  const typeActeurHandler = (e) => {
    setselectedActeur(e.target.value);
  };

  const regionHandler = (e) => {
    e.target.value && e.target.value !== ""
      ? setisRegionChanged(false)
      : setisRegionChanged(true);
    setDepartements(
      props.collectiviteList?.filter(
        (col) =>
          col.parent_code ===
          e.target[e.target.selectedIndex].getAttribute("data-tag")
      )
    );
    setCommunes([]);
    setdistricts([]);
  };

  const departementHandler = (e) => {
    e.target.value !== ""
      ? setisDepartementChanged(false)
      : setisDepartementChanged(true);
    setCommunes(
      props.collectiviteList?.filter(
        (col) =>
          col.parent_code ===
          e.target[e.target.selectedIndex].getAttribute("data-tag")
      )
    );
    setdistricts([]);
  };

  const communeHandler = (e) => {
    e.target.value !== ""
      ? setisCommuneChanged(false)
      : setisCommuneChanged(true);
    setdistricts(
      props.collectiviteList?.filter(
        (col) =>
          col.parent_code ===
          e.target[e.target.selectedIndex].getAttribute("data-tag")
      )
    );
  };

  const achatServiceHandler = (e) => {
    setIsAchatServiceCheck(e.target.checked);
  };
  //Autres
  const regions = props.collectiviteList?.filter(
    (col) => col.type_collectivite === "Region"
  );

  //functions
  const addSousRecipainadaire = () => {
    setSousRecipiandaire((prevCount) => [
      ...prevCount,
      [prevCount?.length + 1, `${prevCount?.length + 1}`],
    ]);
  };

  const RemoveSousRecipainadaire = (id) => {
    const row = document.getElementById(`${id[0]}`).querySelectorAll("input");
    row.forEach((element) => {
      element.remove();
    });

    setSousRecipiandaire((prevCount) => prevCount.filter((sr) => sr !== id));
  };

  const addAgentBailleur = () => {
    setAgentBailleur((prevCount) => [
      ...prevCount,
      [prevCount?.length + 1, `${prevCount?.length + 1}`],
    ]);
  };

  const RemoveAgentBailleur = (id) => {
    const row = document
      .getElementById(`agent_bailleur_${id[0]}`)
      .querySelectorAll("input");
    row.forEach((element) => {
      element.remove();
    });

    setAgentBailleur((prevCount) => prevCount.filter((sr) => sr !== id));
  };

  //Boutons
  const submitButton = () => {
    return (
      <button
        disabled={!isValid}
        type="submit"
        className="btn btn-primary" /* onClick={()=> setTimeout(function() {$('#exampleModal').modal('hide')}, 4000)} */
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
        disabled={!isValid}
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

  const onFileChange = (event) => {
    const { name, files } = event.target;
    setSelectedFile({ ...selectedFile, [name]: files[0] });
  };

  const onNPlus1FileChange = (event) => {
    const { name, files } = event.target;

    /*  getValues()?.projection_annee_n_plus1_par_pilier?.forEach((element, index) => { 
          //setSelectedFile({...selectedFile, [name] :files[0]}); 
          setSelectedFile({...selectedFile, projection_annee_n_plus1_par_pilier :element["files"][0]});
         }) */

    //console.log('🔥🔥', selectedFile)
  };

  const addPilier = () => {
    setPiliers((prevCount) => [
      ...prevCount,
      {
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
    piliers.splice(index, 1);
    setPiliers([...piliers]);
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

    console.log(piliers);
    setPiliers([...piliers]);
  };

  const modeFinanceMontantHandler =
    (pilierIndex, axeIndex, domaine, field) => (e) => {
      let pilier = piliers[pilierIndex];
      pilier.axe[axeIndex][domaine][field] = e.target.value;
      piliers[pilierIndex] = pilier;
      setPiliers([...piliers]);
      console.log(piliers);
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

  const addModeFiancement = () => {
    setModeFinancement((prevModeFin) => [
      ...prevModeFin,
      { libelle: "", montant: "" },
    ]);
  };

  const removeModeFiancement = (index) => {
    modeFinancement.splice(index, 1);
    setModeFinancement([...modeFinancement]);
  };

  const totalPillier = (index) => {
    const axes = piliers[index].axe;
    return {
      total_prevu: axes?.investissement?.reduce(
        (accumulator, current) =>
          accumulator + parseInt(current?.montant_prevu),
        0
      ),
      total_mobilise: axes?.investissement?.reduce(
        (accumulator, current) =>
          accumulator + parseInt(current?.montant_mobilise),
        0
      ),
      total_execute: axes?.investissement?.reduce(
        (accumulator, current) =>
          accumulator + parseInt(current?.montant_execute),
        0
      ),
    };
  };
  //hanlers
  /* const onFileChange = event => { 
        const { name, files } = event.target;
        setSelectedFile({...selectedFile, [name]:files[0]}); 
    }; */
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

  const modeFinancementLibelleHandler = (index) => (e) => {
    let modeFin = modeFinancement[index];
    modeFin.libelle = e.target.value;
    modeFinancement[index] = modeFin;
    setModeFinancement([...modeFinancement]);
  };

  const modeFinancementMontantHandler = (index) => (e) => {
    let modeFin = modeFinancement[index];
    modeFin.montant = e.target.value;
    modeFinancement[index] = modeFin;
    setModeFinancement([...modeFinancement]);
    console.log(modeFinancement);
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

  /* const resetForm =()=>reset(); */

  const resetForm = () => {
    reset();
    //initStructureData();
    $("#exampleModal").modal("hide");
    setActivStep(0);
    setFormStep(0);
    props.fetchInvestissement();
  };

  const submitForm = async (data, e) => {
    const mode_finance = [
      { libelle: "Subvention", montant: `${getValues().subvention}` },
      { libelle: "Transfert", montant: `${getValues().transfert}` },
      { libelle: "Recette", montant: `${getValues().recette}` },
      { libelle: "Don", montant: `${getValues().don}` },
      {
        libelle: getValues().autre_mode_libelle || "",
        montant: `${getValues().autre_mode_montant}` || "",
      },
    ];

    //data.mode_finance = mode_finance;

    data.paquet_sante_intervention = paquetSanteIntervention?.join();
    data.latitude = pointgeo.latitude;
    data.longitude = pointgeo.longitude;
    data.altitude = pointgeo.altitude;

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

    /* data.projection_annee_n_plus1_par_pilier?.forEach((element, index) => { 
                console.log('🔥🔥', element.files[0]);
            }) */

    const formData = new FormData();
    formData.append("mode_finance", JSON.stringify(mode_finance));
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

    mode_finance.forEach((mode) => {
      formData.append("mode_finance[]", JSON.stringify(mode));
    });

    props.storeStructure("step_2", formData);
    resetForm();

    //storeItem("structures/step_2", formData).then((res) => console.log(res));
  };

  const closeModal = () => $("#exampleModal").modal("hide");

  return (
    <div
      className="modal fade bd-example-modal-xl "
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
              className="bg-primary bg-opacity-10 pb-3 w-100"
              style={{ marginTop: "-20px", width: "100vw !important" }}
            >
              <Stepper steps={steps} activeStep={ActivStep} />
            </div>

            <form onSubmit={handleSubmit(submitForm)}>
              {/* {formStep >= 0 && (
                <section style={{ display: formStep === 0 ? "block" : "none" }}>
                  <div className=" bg-white">
                    <div className="row bg-white mx-1  py-3">
                      <div className="form-group col-md-3">
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
                              message:
                                "Veuillez choisir le source de finncement",
                            },
                          })}
                          className="form-control"
                          onChange={typeActeurHandler}
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
                      <div className="form-group col-md-3">
                        <label htmlFor="type">Type</label>
                        <select {...register("type")} className="form-control">
                          <option>Choisir...</option>
                          {typeActeurs[selectedActeur]?.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                        {errors.type && (
                          <p className="text-danger mb-0">
                            {errors.type.message}
                          </p>
                        )}
                      </div>
                      {getValues().type === "Cabinet médical spécialiste" && (
                        <div className="form-group col-md-3">
                          <label htmlFor="type">
                            Domaine de spécialisation
                          </label>
                          <select
                            {...register("specialite")}
                            className="form-control"
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

                      {getValues().specialite === "Autre" && (
                        <div className="form-group col-md-3">
                          <label htmlFor="type">Préciser la spécialité</label>
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

                      <div className="form-group col-md-3">
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
                          placeholder="Dénomination"
                        />
                        {errors.denomination && (
                          <p className="text-danger mb-0">
                            {errors.denomination.message}
                          </p>
                        )}
                      </div>

                      {selectedActeur === "PTF" && (
                        <div className="form-group col-md-3">
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
                            {props.allContries?.map((contrie) => (
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
                        switch (selectedActeur) {
                          case "ONG":
                          case "PTF":
                            return (
                              <div className="form-group col-md-3">
                                <label htmlFor="numero_agrement">
                                  N° agrément
                                </label>
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
                              <div className="form-group col-md-3">
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
                  </div>

                  <div className=" bg-white" style={{ marginTop: "-30px" }}>
                    <div className="row bg-white mx-1  py-3">
                      <div className="form-group col-md-3">
                        <label htmlFor="region_intervention">
                          Région d'intervention
                        </label>
                        <select
                          {...register("region_intervention", {
                            required: {
                              value: true,
                              message: "Veuillez choisir la région",
                            },
                          })}
                          className="form-control"
                          onChange={regionHandler}
                        >
                          <option value="">Choisir...</option>
                          {regions.map((regions) => (
                            <option
                              key={regions.code}
                              data-tag={regions.code}
                              value={regions.nom}
                            >
                              {regions.nom}
                            </option>
                          ))}
                        </select>
                        {errors.region_intervention && (
                          <p className="text-danger mb-0">
                            {errors.region_intervention.message}
                          </p>
                        )}
                      </div>
                      <div className="form-group col-md-3">
                        <label htmlFor="departement_intervention">
                          Département d'intervention
                        </label>
                        <select
                          onChange={regionHandler}
                          {...register("departement_intervention", {
                            required: {
                              value: true,
                              message: "Veuillez choisir la région",
                            },
                          })}
                          className="form-control"
                          onChange={departementHandler}
                          disabled={isRegionChanged}
                        >
                          <option value="">Choisir...</option>
                          {departements.map((dep) => (
                            <option
                              key={dep.code}
                              data-tag={dep.code}
                              value={dep.nom}
                            >
                              {dep.nom}
                            </option>
                          ))}
                        </select>
                        {errors.departement_intervention && (
                          <p className="text-danger mb-0">
                            {errors.departement_intervention.message}
                          </p>
                        )}
                      </div>

                      <div className="form-group col-md-3">
                        <label htmlFor="commune_intervention">
                          Commune d'intervention
                        </label>
                        <select
                          {...register("commune_intervention", {
                            required: {
                              value: true,
                              message: "Veuillez choisir la commune",
                            },
                          })}
                          className="form-control"
                          onChange={communeHandler}
                          disabled={isDepartementChanged}
                        >
                          <option value="">Choisir...</option>
                          {communes.map((commune) => (
                            <option
                              key={commune.code}
                              data-tag={commune.code}
                              value={commune.nom}
                            >
                              {commune.nom}
                            </option>
                          ))}
                        </select>
                        {errors.commune_intervention && (
                          <p className="text-danger mb-0">
                            {errors.commune_intervention.message}
                          </p>
                        )}
                      </div>
                      <div className="form-group col-md-3">
                        <label
                          htmlFor="districte_intervention"
                          className="require-label"
                        >
                          District d'intervention
                        </label>
                        <select
                          {...register("districte_intervention", {
                            required: {
                              value: true,
                              message: "Veuillez choisir le distric sanitaire",
                            },
                          })}
                          className="form-control"
                          disabled={isCommuneChanged}
                        >
                          <option value="">Choisir...</option>
                          {districts.map((district) => (
                            <option key={district.code} value={district.nom}>
                              {district.nom}
                            </option>
                          ))}
                        </select>
                        {errors.districte_intervention && (
                          <p className="text-danger mb-0">
                            {errors.districte_intervention.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className=" bg-white" style={{ marginTop: "-30px" }}>
                    <p
                      style={{ marginBottom: "-15px", fontWeight: "bold" }}
                      className="ml-3"
                    >
                      Géolocalisation
                    </p>
                    <div className="row bg-white mx-1  py-3">
                      <div className="row ml-3">
                        <div className="form-group col-md-3 ">
                          <input
                            className="form-check-input"
                            onChange={currentPositionHandler}
                            value="1"
                            type="checkbox"
                          />
                          <small> Récupérer ma position actuelle ? </small>
                        </div>
                        <div className="form-group col-md-3">
                          <label htmlFor="latitude">Latitude</label>
                          <input
                            type="text"
                            {...register("latitude")}
                            className="form-control"
                            disabled={isCurrentGeolocalisation}
                            id="latitude"
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label htmlFor="longitude">Longitude</label>
                          <input
                            type="text"
                            {...register("longitude")}
                            className="form-control"
                            disabled={isCurrentGeolocalisation}
                            id="longitude"
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label htmlFor="altitude">Altitude</label>
                          <input
                            type="text"
                            {...register("altitude")}
                            className="form-control"
                            disabled={isCurrentGeolocalisation}
                            id="altitude"
                          />
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className=" bg-white" style={{ marginTop: "-30px" }}>
                    <div className="row bg-white mx-1  py-3">
                      {selectedActeur !== "CT" && (
                        <div className="form-group col-md-3">
                          <label htmlFor="adresse_siege">
                            Adresse du siège
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            {...register("adresse_siege")}
                            id="adresse_siege"
                            placeholder="Adresse du siège"
                          />
                        </div>
                      )}
                      <div className="form-group col-md-3">
                        <label htmlFor="telephone_siege">
                          Téléphone du siège
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          {...register("telephone_siege")}
                          id="telephone_siege"
                          placeholder="Téléphone du siège"
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label htmlFor="email_siege">Email du siège</label>
                        <input
                          type="text"
                          className="form-control"
                          {...register("email_siege")}
                          id="email_siege"
                          placeholder="Email du siège"
                        />
                      </div>
                      {
                        <div className="form-group col-md-3">
                          <label htmlFor="accord_siege">Accord de siège</label>
                          <input
                            type="file"
                            className="form-control"
                            name="accord_siege"
                            onChange={onFileChange}
                            id="accord_siege"
                            placeholder="Accord de siège"
                          />
                        </div>
                      }
                    </div>
                  </div>

                  {selectedActeur !== "SPS" && (
                    <div
                      className=" bg-white ml-4 mb-3"
                      style={{ marginTop: "-10px" }}
                    >
                      <p style={{ marginBottom: "-15px", fontWeight: "bold" }}>
                        Les dimensions du financement
                      </p>
                      <div className="row bg-white mx-1 ml-4 py-3 d-flex flex-row">
                        <div className="form-check form-check-inline col-md-3">
                          <input
                            className="form-check-input"
                            {...register("mobilisation_ressource")}
                            value="1"
                            type="checkbox"
                            id="mobilisation_ressource"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineCheckbox1"
                          >
                            Mobilisation des ressources
                          </label>
                        </div>
                        <div className="form-check form-check-inline col-md-3">
                          <input
                            className="form-check-input"
                            {...register("mis_en_commun_ressource")}
                            value="1"
                            type="checkbox"
                            id="mis_en_commun_ressource"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="mis_en_commun_ressource"
                          >
                            Mis en commun des ressources
                          </label>
                        </div>
                        <div className="form-check form-check-inline col-md-3">
                          <input
                            className="form-check-input"
                            {...register("achat_service")}
                            onChange={achatServiceHandler}
                            value="1"
                            type="checkbox"
                            id="achat_service"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="achat_service"
                          >
                            Achat de services
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className=" bg-white" style={{ marginTop: "-30px" }}>
                    <div className="row bg-white mx-1  py-3">
                      <div className="form-group col-md-3">
                        <label htmlFor="mecanisme_financement">
                          Mécanisme de financement
                        </label>
                        <select
                          {...register("mecanisme_financement")}
                          className="form-control"
                        >
                          <option>Choisir...</option>
                          {mecanismeFinance.map((mf) => (
                            <option key={mf[1]} value={mf[1]}>
                              {mf[1]}
                            </option>
                          ))}
                        </select>
                        {errors.type_achat && (
                          <p className="text-danger mb-0">
                            {errors.type_achat.message}
                          </p>
                        )}
                      </div>
                      {getValues().mecanisme_financement === "Autres" && (
                        <div className="form-group col-md-3">
                          <label htmlFor="autre_mecanisme_financement">
                            Préciser le mécanisme de financement
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            {...register("autre_mecanisme_financement")}
                            id="autre_mecanisme_financement"
                            placeholder="Libellé du mécanisme"
                          />
                        </div>
                      )}
                      {selectedActeur === "Etat" && (
                        <div className="form-group col-md-3">
                          <label htmlFor="mecanisme_achat">
                            Mécanisme d'achat
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            {...register("mecanisme_achat")}
                            id="mecanisme_achat"
                            placeholder=" Mécanisme"
                          />
                        </div>
                      )}
                      {isAchatServiceCheck && (
                        <div className="form-group col-md-3">
                          <label htmlFor="type_achat">Type d'achat</label>
                          <select
                            {...register("type_achat")}
                            className="form-control"
                          >
                            <option>Choisir...</option>
                            {typeAchat.map((achat) => (
                              <option key={achat[1]} value={achat[1]}>
                                {achat[1]}
                              </option>
                            ))}
                          </select>
                          {errors.type_achat && (
                            <p className="text-danger mb-0">
                              {errors.type_achat.message}
                            </p>
                          )}
                        </div>
                      )}

                      {selectedActeur !== "SPS" && (
                        <div className="form-group col-md-3">
                          <label htmlFor="paquet_sante_intervention">
                            Paquet santé d'intervention
                          </label>
                          <MultipleValueTextInput
                            className="form-control"
                            onItemAdded={(item, allItems) =>
                              setPaquetSanteIntervention(allItems)
                            }
                            onItemDeleted={(item, allItems) =>
                              setPaquetSanteIntervention(allItems)
                            }
                            name="paquet_sante_intervention"
                            placeholder="Taper sur entré ou mettez virgule aprés la saisie."
                          />
                          <small>
                            {" "}
                            NB: Ce champ prend plusieur valeurs, tapez sur entré
                            aprés chaque valeur{" "}
                          </small>
                        </div>
                      )}
                      <div className="form-group col-md-3">
                        <label htmlFor="secteur_intervention">
                          Secteurs d'intervention
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          multiple
                          {...register("secteur_intervention")}
                          id="secteur_intervention"
                          placeholder="Secteur d'intervention"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer mt-2">{nextButton()}</div>
                </section>
              )} */}
              {formStep >= 0 && (
                <section style={{ display: formStep === 0 ? "block" : "none" }}>
                  <div className="bg-white mt-2">
                    <div className=" bg-white ">
                      {/* <fieldset className="scheduler-border border">
                        <legend className="scheduler-border text-muted">
                          Coordonnées siège
                        </legend>
                        <div className=" bg-white container-fluid mb-2">
                          <div className="row bg-white">
                            <div className="form-group input-group-sm col-md-4">
                              <label htmlFor="adresse_siege">Adresse</label>
                              <input
                                type="text"
                                defaultValue={
                                  props.currentUser?.structure?.adresse_siege
                                }
                                className="form-control"
                                {...register("adresse_siege")}
                                id="telephone_siege"
                                placeholder="Ex: +221........"
                              />
                            </div>
                            <div className="form-group input-group-sm col-md-4">
                              <label htmlFor="telephone_siege">Téléphone</label>
                              <input
                                type="text"
                                defaultValue={
                                  props.currentUser?.structure?.telephone_siege
                                }
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
                                defaultValue={
                                  props.currentUser?.structure?.email_siege
                                }
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
                                type="text"
                                {...register("latitude")}
                                className="form-control input-group-sm"
                                disabled={isCurrentGeolocalisation}
                                id="latitude"
                              />
                            </div>
                            <div className="form-group  col-md-3">
                              <label htmlFor="longitude">Longitude</label>
                              <input
                                type="text"
                                {...register("longitude")}
                                className="form-control input-group-sm"
                                disabled={isCurrentGeolocalisation}
                                id="longitude"
                              />
                            </div>
                            <div className="form-group  col-md-3">
                              <label htmlFor="altitude">Altitude</label>
                              <input
                                type="text"
                                {...register("altitude")}
                                className="form-control input-group-sm"
                                disabled={isCurrentGeolocalisation}
                                id="altitude"
                              />
                            </div>
                          </div>
                        </div>
                      </fieldset> */}

                      <div className="row mt-2">
                        <div className="form-group input-group-sm col-md-3">
                          <label htmlFor="annee">Année</label>
                          <input
                            type="number"
                            className="form-control"
                            {...register("annee", {
                              required: {
                                value: true,
                                message: "Veuillez saisir l'année",
                              },
                            })}
                            id="annee"
                            placeholder="Année"
                          />
                          {errors.annee && (
                            <p className="text-danger mb-0">
                              {errors.annee.message}
                            </p>
                          )}
                        </div>
                        <div className="form-group input-group-sm col-md-3">
                          <label htmlFor="monnaie">Monnaie</label>
                          <select
                            {...register("monnaie", {
                              required: {
                                value: true,
                                message: "Veuillez choisir la monnaie",
                              },
                            })}
                            onChange={monneyHandler}
                            id="monnaie"
                            className="form-control"
                          >
                            <option value="XOF">XOF (CFA)</option>
                            <option value="EURO">EURO (€)</option>
                            <option value="DOLLAR">DOLLAR ($)</option>
                            <option value="Autre">Autre</option>
                          </select>
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

                      <fieldset className="scheduler-border border">
                        <legend className="scheduler-border text-muted">
                          Les dimensions du financement
                        </legend>
                        <div className="row bg-white mx-1 px-2 d-flex flex-row">
                          <div className="form-check form-check-inline col-md-4 d-flex">
                            <input
                              className="form-check mr-2 big-checkbox"
                              {...register("mobilisation_ressource")}
                              value="1"
                              type="checkbox"
                              id="mobilisation_ressource"
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
                              value="1"
                              type="checkbox"
                              id="mis_en_commun_ressource"
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

                      <fieldset className="scheduler-border border">
                        <legend className="scheduler-border text-muted">
                          Mode de financement
                        </legend>
                        <div className=" bg-white pb-2">
                          <div className="d-flex flex-wrap mx-1 pt-2 w-100">
                            <div className="input-group mb-1 col-md-6">
                              <div className="input-group-prepend ">
                                <span className="input-group-text bg-primary bg-opacity-75 text-white">
                                  Subvention
                                </span>
                              </div>
                              <input
                                type="number"
                                {...register("subvention")}
                                className="form-control form-control-sm w-20"
                                aria-label="Dollar amount (with dot and two decimal places)"
                                placeholder="Le montant de la subvention"
                              />
                            </div>

                            <div className="input-group mb-1 col-md-6">
                              <div className="input-group-prepend ">
                                <span className="input-group-text bg-primary bg-opacity-75 text-white">
                                  Transfert
                                </span>
                              </div>
                              <input
                                type="number"
                                {...register("transfert")}
                                className="form-control form-control-sm w-20"
                                aria-label="Dollar amount (with dot and two decimal places)"
                                placeholder="Le montant du transfert"
                              />
                            </div>

                            <div className="input-group mb-1 col-md-6">
                              <div className="input-group-prepend ">
                                <span className="input-group-text bg-primary bg-opacity-75 text-white">
                                  Recette
                                </span>
                              </div>
                              <input
                                type="number"
                                {...register("recette")}
                                className="form-control form-control-sm w-20"
                                aria-label="Dollar amount (with dot and two decimal places)"
                                placeholder="Le montant de la recette"
                              />
                            </div>

                            <div className="input-group mb-1 col-md-6">
                              <div className="input-group-prepend ">
                                <span className="input-group-text bg-primary bg-opacity-75 text-white">
                                  Don
                                </span>
                              </div>
                              <input
                                type="number"
                                {...register("don")}
                                className="form-control form-control-sm w-20"
                                aria-label="Dollar amount (with dot and two decimal places)"
                                placeholder="Le montant du don"
                              />
                            </div>
                          </div>

                          <div className="form-check form-check-inline col-md-3 d-flex">
                            <input
                              className="form-check mr-2 big-checkbox"
                              onChange={autreModeFianceHandler}
                              value="1"
                              type="checkbox"
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
                                  {...register("autre_mode_libelle", {
                                    required: {
                                      value: true,
                                      message: "Veuillez saisir le libelle",
                                    },
                                  })}
                                  placeholder="Préciser le mode de fiancement"
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

                      <fieldset className="scheduler-border border mb-5">
                        <legend className="scheduler-border text-muted">
                          Piliers et axes d'intervention
                        </legend>
                        {piliers.map((pilier, index) => (
                          <div
                            key={index}
                            className="d-flex no-gutters border m-1"
                          >
                            <div
                              className="col-md-2 px-1 pb-3"
                              style={{ margin: "auto" }}
                            >
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
                                  {Object.keys(pilierData).map((pilier) => (
                                    <option key={pilier} value={pilier}>
                                      {pilier}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="col-md-9  border-right border-left">
                              {pilier.axe.map((axe, i) => (
                                <div
                                  key={i}
                                  className="d-flex no-gutters border-bottom "
                                >
                                  <div
                                    className="col-md-3 mx-1"
                                    style={{ margin: "auto" }}
                                  >
                                    <div className="form-group mx-auto">
                                      <label htmlFor="libelle">Axe</label>
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

                                  <div className="row col-md-8 mx-auto">
                                    <div className="col-md-6 mt-1 bg-primary bg-opacity-75">
                                      <label className="text-white">
                                        Biens et Services
                                      </label>
                                      <div className="form-group input-group-sm mb-1">
                                        <input
                                          onChange={modeFinanceMontantHandler(
                                            index,
                                            i,
                                            "bien_et_service",
                                            "montant_prevu"
                                          )}
                                          type="number"
                                          className="form-control form-control-sm w-20"
                                          aria-label="Dollar amount (with dot and two decimal places)"
                                          placeholder="Montant prévu"
                                        />
                                      </div>
                                      <div className="form-group input-group-sm mb-1">
                                        <input
                                          type="number"
                                          onChange={modeFinanceMontantHandler(
                                            index,
                                            i,
                                            "bien_et_service",
                                            "montant_mobilise"
                                          )}
                                          className="form-control form-control-sm"
                                          aria-label="Dollar amount (with dot and two decimal places)"
                                          placeholder="Montant mobilisé"
                                        />
                                      </div>
                                      <div className="form-group input-group-sm mb-1">
                                        <input
                                          type="number"
                                          onChange={modeFinanceMontantHandler(
                                            index,
                                            i,
                                            "bien_et_service",
                                            "montant_execute"
                                          )}
                                          className="form-control form-control-sm"
                                          aria-label="Dollar amount (with dot and two decimal places)"
                                          placeholder="Montant exécuté"
                                        />
                                      </div>
                                    </div>

                                    <div className="col-md-6 mt-1 border-left bg-primary bg-opacity-75 border-right">
                                      <label className="text-white">
                                        Investissements
                                      </label>
                                      <div className="form-group input-group-sm mb-1">
                                        <input
                                          type="number"
                                          onChange={modeFinanceMontantHandler(
                                            index,
                                            i,
                                            "investissement",
                                            "montant_prevu"
                                          )}
                                          className="form-control form-control-sm"
                                          aria-label="Dollar amount (with dot and two decimal places)"
                                          placeholder="Montant prévu"
                                        />
                                      </div>
                                      <div className="form-group input-group-sm mb-1">
                                        <input
                                          type="number"
                                          onChange={modeFinanceMontantHandler(
                                            index,
                                            i,
                                            "investissement",
                                            "montant_mobilise"
                                          )}
                                          className="form-control form-control-sm"
                                          aria-label="Dollar amount (with dot and two decimal places)"
                                          placeholder="Montant mobilisé"
                                        />
                                      </div>
                                      <div className="form-group input-group-sm mb-1">
                                        <input
                                          type="number"
                                          onChange={modeFinanceMontantHandler(
                                            index,
                                            i,
                                            "investissement",
                                            "montant_execute"
                                          )}
                                          className="form-control form-control-sm"
                                          aria-label="Dollar amount (with dot and two decimal places)"
                                          placeholder="Montant exécuté"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="form-group col-md-1  mx-auto my-auto ">
                                    <button
                                      type="button"
                                      className="btn btn-sm"
                                      onClick={() => RemoveAxe(index, i)}
                                    >
                                      <FontAwesomeIcon
                                        className="mr-2"
                                        icon={faTrash}
                                        size="lg"
                                        color="red"
                                        role="button"
                                      />
                                    </button>
                                  </div>

                                  {/* <div className="form-group col-md-3 col-sm-12 pl-1">
                                  <label htmlFor="montant_prevu">
                                    Montant prévu (
                                    {monnaie == "EURO"
                                      ? "€"
                                      : monnaie == "DOLLAR"
                                      ? "$"
                                      : monnaie == "XOF"
                                      ? "CFA"
                                      : `${getValues().autre_monnaie}`}
                                    )
                                  </label>
                                  <input
                                    type="number"
                                    className="form-control form-control-sm"
                                    name="montant_prevu"
                                    value={axe.montant_prevu || ""}
                                    onChange={axeInputHandler(
                                      index,
                                      i
                                    )}
                                    id="montant_prevu"
                                    id="montant_prevu"
                                    placeholder={`Montant en ${
                                      monnaie == "EURO"
                                        ? "€"
                                        : monnaie == "DOLLAR"
                                        ? "$"
                                        : monnaie == "XOF"
                                        ? "CFA"
                                        : `${getValues().autre_monnaie}`
                                    }`}
                                  />
                                </div>
                                <div className="form-group col-md-3 col-sm-12 pl-1">
                                  <label htmlFor="montant_mobilise">
                                    Montant mobilisé (
                                    {monnaie == "EURO"
                                      ? "€"
                                      : monnaie == "DOLLAR"
                                      ? "$"
                                      : monnaie == "XOF"
                                      ? "CFA"
                                      : `${getValues().autre_monnaie}`}
                                    )
                                  </label>
                                  <input
                                    type="number"
                                    className="form-control form-control-sm"
                                    name="montant_mobilise"
                                    value={axe.montant_mobilise || ""}
                                    onChange={axeInputHandler(
                                      index,
                                      i
                                    )}
                                    id="montant_mobilise"
                                    id="montant_mobilise"
                                    placeholder={`Montant en ${
                                      monnaie == "EURO"
                                        ? "€"
                                        : monnaie == "DOLLAR"
                                        ? "$"
                                        : monnaie == "XOF"
                                        ? "CFA"
                                        : `${getValues().autre_monnaie}`
                                    }`}
                                  />
                                </div>
                                <div className="form-group col-md-3 col-sm-12 pl-1">
                                  <label htmlFor="montant_execute">
                                    Montant executé (
                                    {monnaie == "EURO"
                                      ? "€"
                                      : monnaie == "DOLLAR"
                                      ? "$"
                                      : monnaie == "XOF"
                                      ? "CFA"
                                      : `${getValues().autre_monnaie}`}
                                    )
                                  </label>
                                  <input
                                    type="number"
                                    className="form-control form-control-sm"
                                    name="montant_execute"
                                    value={axe.montant_execute || ""}
                                     onChange={axeInputHandler(
                                      index,
                                      i
                                    )}
                                    id="montant_execute"
                                    id="montant_execute"
                                    placeholder={`Montant en ${
                                      monnaie == "EURO"
                                        ? "€"
                                        : monnaie == "DOLLAR"
                                        ? "$"
                                        : monnaie == "XOF"
                                        ? "CFA"
                                        : `${getValues().autre_monnaie}`
                                    }`}
                                  />
                                </div> */}
                                  {/* <div className="form-group col-md-1  mx-auto my-auto ">
                                  <button
                                    type="button"
                                    className="btn btn-sm"
                                    onClick={() => RemoveAxe(index, i)}
                                  >
                                    <i className="mdi mdi-delete mdi-18px text-danger "></i>
                                  </button>
                                </div> */}
                                </div>
                              ))}

                              <div style={{ marginTop: "-10px" }}>
                                <button
                                  type="button"
                                  className="btn btn-sm text-primary"
                                  onClick={() => addAxe(index)}
                                >
                                  <FontAwesomeIcon icon={faPlus} />
                                  <small>Axe d'intervention</small>
                                </button>
                              </div>

                              {/* {pilier.axe.length > 1 && (
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
                                      monnaie == "EURO"
                                        ? "€"
                                        : monnaie == "DOLLAR"
                                        ? "$"
                                        : monnaie == "XOF"
                                        ? "CFA"
                                        : `${getValues().autre_monnaie}`
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
                                      monnaie == "EURO"
                                        ? "€"
                                        : monnaie == "DOLLAR"
                                        ? "$"
                                        : monnaie == "XOF"
                                        ? "CFA"
                                        : `${getValues().autre_monnaie}`
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
                                      monnaie == "EURO"
                                        ? "€"
                                        : monnaie == "DOLLAR"
                                        ? "$"
                                        : monnaie == "XOF"
                                        ? "CFA"
                                        : `${getValues().autre_monnaie}`
                                    }`}</p>
                                  </div>
                                </div>
                              )} */}
                            </div>
                            <div
                              className="col-md-1 "
                              style={{ margin: "auto" }}
                              onClick={() => removePilier(index)}
                            >
                              <button type="button" className="btn">
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  size="lg"
                                  color="red"
                                />
                              </button>
                            </div>
                          </div>
                        ))}

                        <div className="">
                          <button
                            type="button"
                            className="btn btn-sm text-primary"
                            onClick={() => addPilier()}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                            <small>Pilier</small>
                          </button>
                        </div>
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

                    {piliers.map((pilier, index) => (
                      <fieldset className="scheduler-border border">
                        <legend className="scheduler-border text-muted">
                          {`Pilier : ${pilier.pilier}`}
                        </legend>

                        <div className="row mx-1 mb-3 mr-1">
                          {pilier.axe.map((axe, i) => (
                            <div className="col-md-6">
                              <fieldset className="scheduler-border border">
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
                                          {axe.investissement.montant_execute}
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
  //initListActeur: () => dispatch(fetchActeursAsync()),
});

const mapStateToProps = createStructuredSelector({
  sourceFinancements: selectSourceFinancementList,
  //typeActeur: selectListActeur,
  // acteurByFinancement: selectActeurByFinancement,
  errorMessage: selectErrorMessage,
});
export default connect(mapStateToProps, mapDispatchToProps)(ActeurPriveForm);
