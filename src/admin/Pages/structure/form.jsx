import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import {
    fetchSourceFinancementStratAsync
} from '../../../redux/source-financement/source-financement.action';
import { selectCurrentStructure, selectErrorMessage, selectTypeActeur } from '../../../redux/structure/structure.selector';
import { createStructuredSelector } from 'reselect';
import { selectSourceFinancementList } from '../../../redux/source-financement/source-financement.Selector';
import { selectActeurByFinancement, selectActeurById, selectListActeur } from '../../../redux/acteur/acteur.selector';
import {
    fetchActeurByFinancementAsync,
    fetchActeursAsync
} from '../../../redux/acteur/acteur.thunk';
import { resetEditedUser } from '../../../redux/user/user.actions';
import { resetEditedStructure } from '../../../redux/structure/structure.action';
import { fetchSourceFinancementAsync } from '../../../redux/source-financement/source-financement.thunk';
import Stepper from 'react-stepper-horizontal';
import {
    acteurs,
    agentExecution,
    districts,
    piliers,
    typePtf,
    typeOng,
    typeAchat,
    tyepeSps,
    sourceFinancements
} from '../../../Data/data';


const MAX_STEPS = 3;
function  StructureForm(props) {
    const { register, handleSubmit, watch, getValues, reset, formState: { errors, isValid } } = useForm({mode:"all"}); 

    //useStates
    const [formStep, setFormStep]=useState(0);
    const [ActivStep, setActivStep]=useState(0);
    const [selectedActeur, setselectedActeur] = useState()
    const [isRegionChanged, setisRegionChanged] = useState(true)
    const [isDepartementChanged, setisDepartementChanged] = useState(true)
    const [departements, setDepartements] =useState([])
    const [communes, setCommunes] =useState([])
    const [isAchatServiceCheck, setIsAchatServiceCheck] = useState(false)
    const [sousRecipiandaire, setSousRecipiandaire] =useState([[1,"1"]])
    
    
    const [steps, setSteps]=useState([
        {title: 'Identification'},
        {title: 'Autres informations'},
        {title: 'Personne responsable'},
        {title: 'Recap'}]);

    //Steps
    const completeFormStep = ()=> {
        setFormStep(cur => cur + 1)
        setActivStep(step => step + 1)
    }
    const goToPreviousStep = ()=> {
        setFormStep(cur => cur - 1);
        setActivStep(step => step - 1)

    }
    //handlers
    const typeActeurHandler = (e)=>{
        setselectedActeur(e.target.value);
    }
    const regionHandler = (e)=>{
        e.target.value &&  e.target.value !== "" ? setisRegionChanged(false) : setisRegionChanged(true)
        setDepartements(props.collectiviteList?.filter(col=>col.parent_code === e.target.value));
        setCommunes([])
      }
    const departementHandler = (e)=>{
    e.target.value ? setisDepartementChanged(false) : setisDepartementChanged(true);
    setCommunes(props.collectiviteList?.filter(col=>col.parent_code === e.target.value))
    }
    const achatServiceHandler = (e)=>{
        setIsAchatServiceCheck(e.target.checked);
      }
    //Autres
    const regions = props.collectiviteList?.filter(col=>col.type_collectivite === "REGION");

    //functions
    const addSousRecipainadaire = ()=>{
        setSousRecipiandaire(prevCount => [...prevCount, [prevCount?.length +1, `${prevCount?.length +1}`]])
      }
      
      const RemoveSousRecipainadaire = (id)=>{
        setSousRecipiandaire(prevCount => prevCount.filter((sr) => sr !== id));
      
      }

      //Boutons
      const submitButton =()=>{
         return <button disabled={!isValid} type="submit" className="btn btn-primary" /* onClick={()=> setTimeout(function() {$('#exampleModal').modal('hide')}, 4000)} */>
                   <i className="mdi mdi-check mdi-18px text-white align-left"></i>
                   Enregistrer
               </button>
     }

     const nextButton =()=>{
        return <button onClick={completeFormStep} disabled={!isValid} type="button" className="btn btn-primary">
                    Suivant
                    <i className="mdi mdi-arrow-right mdi-18px text-white align-left"></i>
                </button>
    }

      const previousButton =()=>{
          return <button style={{ display: formStep != 0 ? "block" : "none" }} onClick={goToPreviousStep} type="button" className="btn btn-primary">
                    <i className="mdi mdi-arrow-left mdi-18px text-white align-left"></i> 
                    Précédent
                </button>
        
      }

      const resetForm =()=>{
        reset();
        setActivStep(0);
        setFormStep(0);
    }
    
      const submitForm = async(data, e) => {
          props.storeStructure(data);
         /*  e.preventDefault(); */
         props.initStructureData()
          closeModal();
          resetForm();

          //props.errorMessage && alert(props.errorMessage)
    }

    
    const $ = window.$;
    const closeModal = ()=> $('#exampleModal').modal('hide');

    return(
        <div className="modal fade bd-example-modal-lg "  id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg " role="document">
            <div className="modal-content bg-white">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">AJOUT D'UNE STRUCTURE</h5>
                    <button onClick={()=>resetForm()} type="button" className="close" data-dismiss="modal" aria-label="Close" /* onClick={()=>resetForm()} */>
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                <Stepper steps={ steps } activeStep={ ActivStep }/>

                <form onSubmit={handleSubmit(submitForm)}>
                    {formStep >= 0 && (<section style={{display: formStep === 0 ? "block" : "none"  }}>
                    <div className=" bg-white">
                        <div className="row bg-white mx-1  py-3">
                        <div className="form-group col-md-3">
                            <label for="type_acteur" className="require-label" >Type d'acteur</label>
                            <select  {...register("type_acteur"/* ,{ required: 
                                {value: true , message:"Veuillez choisir le type d'acteur"}} */)} 
                                className="form-control" 
                                onChange={typeActeurHandler}>
                                <option value="">Choisir...</option>
                                {acteurs.map(acteur=><option disabled={acteur[2]}  value={acteur[1]}>{acteur[1]}</option>)}
                            </select>
                            {errors.type_acteur && getValues().type_acteur ==="" && <p className="text-danger mb-0">{errors.type_acteur.message}</p>}
                        </div>
                        <div className="form-group col-md-3">
                            <label for="source_financement" className="require-label" >Source de Financement</label>
                            <select  {...register("source_financement",{ required: 
                                {value: true , message:"Veuillez choisir le source de finncement"}})} 
                                className="form-control"
                                disabled={!selectedActeur}>
                                <option value="">Choisir...</option>
                                {sourceFinancements[selectedActeur]?.map(acteur=><option  value={acteur[1]}>{acteur[1]}</option>)}
                            </select>
                            {errors.source_financement && getValues().source_financement ==="" && <p className="text-danger mb-0">{errors.source_financement.message}</p>}
                        </div>
                        <div className="form-group col-md-3">
                            <label for="denomination" className="require-label">Dénomination</label>
                            <input type="text" className={`form-control ${errors.denomination && "is-invalid"}`} 
                            {...register("denomination",{ required: 
                                {value: true , message:"Veuillez saisir la dénomination"}})} id="denomination" placeholder="Dénomination"/>
                            {errors.denomination && <p className="text-danger mb-0">{errors.denomination.message}</p>}
                        </div>

                        {selectedActeur ==="PTF" && <div className="form-group col-md-3">
                            <label for="pays_nationalite" className="require-label" >Pays/Nationalité</label>
                            <select  {...register("pays_nationalite",{ required: 
                                {value: true , message:"Veuillez choisir le pays / la nationalité"}})} 
                                className="form-control" >
                                <option value="">Choisir...</option>
                                {props.allContries?.map(contrie=><option value={contrie.name}>{contrie.name}</option>)}
                            </select>
                            {errors.pays_nationalite && getValues().pays_nationalite ==="" && <p className="text-danger mb-0">{errors.pays_nationalite.message}</p>}
                        </div>
                        }

                            {(() => {
                                switch (selectedActeur) {
                                case 'ONG':
                                case 'PTF':
                                    return(     
                                    <div className="form-group col-md-3">
                                        <label for="numero_agrement">N° agrément</label>
                                        <input type="text" className="form-control" 
                                        {...register("numero_agrement")} id="numero_agrement" placeholder="Numéro agrément"/>
                                    </div>)
                                    break;
                                case 'SPS':
                                    return(     
                                    <div className="form-group col-md-3">
                                        <label for="numero_autorisation">N° autorisation</label>
                                        <input type="text" className="form-control" 
                                        {...register("numero_autorisation")} id="numero_autorisation" placeholder="N° autorisation"/>
                                    </div>)
                                    break;
                                default:
                                    break;
                                }
                            })()}
                        </div>
                    </div>

                    <div className=" bg-white" style={{ marginTop:'-30px' }}>
                            <div className="row bg-white mx-1  py-3">
                            <div className="form-group col-md-3">
                                <label for="region_intervention">Région d'intervention</label>
                                <select 
                                    onChange={regionHandler} 
                                    {...register("region_intervention",{ required: 
                                    {value: true , message:"Veuillez choisir la région"}})} 
                                    className="form-control" 
                                    onChange={regionHandler}>
                                    <option value="">Choisir...</option>
                                    {regions.map(regions=><option value={regions.code}>{regions.nom}</option>)}
                                </select>
                                {errors.region_intervention && <p className="text-danger mb-0">{errors.region_intervention.message}</p>}
                            </div>
                            <div className="form-group col-md-3">
                                <label for="departement_intervention">Département d'intervention</label>
                                <select 
                                    onChange={regionHandler} 
                                    {...register("departement_intervention",{ required: 
                                    {value: true , message:"Veuillez choisir la région"}})} 
                                    className="form-control" 
                                    onChange={departementHandler}
                                    disabled={isRegionChanged}>
                                    <option value="">Choisir...</option>
                                    {departements.map(dep=><option value={dep.code}>{dep.nom}</option>)}
                                </select>
                                {errors.departement_intervention && <p className="text-danger mb-0">{errors.departement_intervention.message}</p>}
                            </div>

                            <div className="form-group col-md-3">
                                <label for="commune_intervention">Commune d'intervention</label>
                                <select 
                                    {...register("commune_intervention",{ required: 
                                    {value: true , message:"Veuillez choisir la commune"}})} 
                                    className="form-control"
                                    disabled={isDepartementChanged || isRegionChanged}>
                                    <option value="" >Choisir...</option>
                                    {communes.map(commune=><option value={commune.code}>{commune.nom}</option>)}
                                </select>
                                {errors.commune_intervention && <p className="text-danger mb-0">{errors.commune_intervention.message}</p>}
                            </div>
                            <div className="form-group col-md-3">
                                <label for="districte_intervention" className="require-label">Districte d'intervention</label>
                                <select 
                                    {...register("districte_intervention",{ required: 
                                    {value: true , message:"Veuillez choisir le distric sanitaire"}})} 
                                    className="form-control"
                                    disabled={isRegionChanged}>
                                    <option value="" >Choisir...</option>
                                    {districts.map(district=><option value={district[1]}>{district[1]}</option>)}
                                </select>
                                {errors.districte_intervention && <p className="text-danger mb-0">{errors.districte_intervention.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className=" bg-white" style={{ marginTop:'-30px' }}>
                            <div className="row bg-white mx-1  py-3">
                            <div className="form-group col-md-3">
                                <label for="latitude">Latitude</label>
                                <input type="text" className="form-control" 
                                {...register("latitude")} id="latitude" placeholder="Exemple: 14.2"/>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="longitude">Longitude</label>
                                <input type="text" className="form-control" 
                                {...register("longitude")} id="longitude" placeholder="Exemple: -17.2"/>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="autre_secteur_intervention">Autres secteurs d'intervention</label>
                                <input type="text" className="form-control" 
                                {...register("autre_secteur_intervention")} id="autre_secteur_intervention" placeholder="Autres secteurs"/>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="paquet_sante_intervention">Paquet santé d'intervention</label>
                                <input type="text" className="form-control" 
                                {...register("paquet_sante_intervention")} id="paquet_sante_intervention" placeholder="Paquet santé d'intervention"/>
                            </div>
                        </div>
                    </div>
                    <div className=" bg-white" style={{ marginTop:'-30px' }}>
                            <div className="row bg-white mx-1  py-3">
                            {selectedActeur !== 'CT' &&<div className="form-group col-md-3">
                                <label for="adresse_siege">Adresse du siège</label>
                                <input type="text" className="form-control" 
                                {...register("adresse_siege")} id="adresse_siege" placeholder="Adresse du siège"/>
                            </div>}
                            <div className="form-group col-md-3">
                                <label for="telephone_siege">Téléphone du siège</label>
                                <input type="text" className="form-control" 
                                {...register("telephone_siege")} id="telephone_siege" placeholder="Téléphone du siège"/>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="email_siege">Email du siège</label>
                                <input type="text" className="form-control" 
                                {...register("email_siege")} id="email_siege" placeholder="Email du siège"/>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="accord_siege">Accord de siège</label>
                                <input type="text" className="form-control" 
                                {...register("accord_siege")} id="accord_siege" placeholder="Accord de siège"/>
                            </div>
                        </div>
                    </div>

                    <div className=" bg-white ml-4 mb-3" style={{ marginTop:'-10px' }}>
                    <p style={{ marginBottom:'-15px', fontWeight:"bold" }}>Les dimensions  de l'acteur</p>
                        <div className="row bg-white mx-1 ml-4 py-3 d-flex flex-row">
                            <div class="form-check form-check-inline col-md-3">
                            <input class="form-check-input" {...register("mobilisation_ressource")} value="1" type="checkbox" id="mobilisation_ressource"  />
                            <label class="form-check-label" for="inlineCheckbox1">Mobilisation des ressources</label>
                            </div>
                            <div class="form-check form-check-inline col-md-3">
                            <input class="form-check-input" {...register("mis_en_commun_ressource")} value="1" type="checkbox" id="mis_en_commun_ressource"  />
                            <label class="form-check-label" for="mis_en_commun_ressource">Mis en commun des ressources</label>
                            </div>
                            <div class="form-check form-check-inline col-md-3">
                            <input class="form-check-input" value="1" {...register("achat_service")} onChange={achatServiceHandler} type="checkbox" id="achat_service"  />
                            <label class="form-check-label" for="achat_service">Achat de services</label>
                            </div>
                        </div>
                    </div>

                    <div className=" bg-white" style={{ marginTop:'-30px' }}>
                        <div className="row bg-white mx-1  py-3">
                            <div className="form-group col-md-3">
                                <label for="mecanisme_financement">Mécanisme de financement</label>
                                <input type="text" className="form-control" 
                                {...register("mecanisme_financement")} id="mecanisme_financement" placeholder="Mécanisme financement"/>
                            </div>
                            {selectedActeur ==="Etat" && <div className="form-group col-md-3">
                                <label for="mecanisme_achat">Mécanisme d'achat</label>
                                <input type="text" className="form-control" 
                                {...register("mecanisme_achat")} id="mecanisme_achat" placeholder="Mécanisme d'achat"/>
                            </div>}
                            {isAchatServiceCheck && <div className="form-group col-md-3">
                                <label for="type_achat">Type d'achat</label>
                                <select {...register("type_achat")} 
                                    className="form-control">
                                    <option >Choisir...</option>
                                    {typeAchat.map(achat=><option value={achat[1]}>{achat[1]}</option>)}
                                </select>
                                {errors.type_achat && <p className="text-danger mb-0">{errors.type_achat.message}</p>}
                            </div>}

                        </div>
                    </div>
                    

                    <div className="modal-footer mt-5">
                       {nextButton()}
                    </div>

                    </section>)}
                        {formStep >= 1 && (<section style={{display: formStep === 1 ? "block" : "none"  }}>

                    {/* -----PTF--------  */}
                        {selectedActeur === 'PTF' && <div className=" bg-white">
                        <div className="row bg-white mx-1  py-3" >
                            <div className="form-group col-md-3">
                                <label for="type">Type</label>
                                <select {...register("type")} 
                                    className="form-control">
                                    <option >Choisir...</option>
                                    {typePtf.map(type=><option value={type[1]}>{type[1]}</option>)}
                                </select>
                                {errors.type && <p className="text-danger mb-0">{errors.type.message}</p>}
                            </div>
                            <div className="form-group col-md-3">
                                <label for="agent_execution">Agent d'exécution</label>
                                <select {...register("agent_execution")} 
                                    className="form-control">
                                    <option >Choisir...</option>
                                    {agentExecution.map(achat=><option value={achat[1]}>{achat[1]}</option>)}
                                </select>
                                {errors.agent_execution && <p className="text-danger mb-0">{errors.agent_execution.message}</p>}
                            </div>

                            <div className="form-group col-md-3">
                                <label for="date_debut_intervention">Début de l'intervention</label>
                                <input type="date" className="form-control" 
                                {...register("date_debut_intervention")} id="date_debut_intervention"/>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="date_fin_intervention">Fin de l'intervention</label>
                                <input type="date" className="form-control" 
                                {...register("date_fin_intervention")} id="date_fin_intervention"/>
                            </div>
                        </div>

                        <div className="row bg-white mx-1  py-3" style={{ marginTop:'-30px' }}>
                            <div className="form-group col-md-3">
                                <label for="mt_prevu_par_pilier_annee_en_cour">Montant prévu par pilier année en cours</label>
                                <input type="number" className="form-control" 
                                {...register("mt_prevu_par_pilier_annee_en_cour")} id="mt_prevu_par_pilier_annee_en_cour"/>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="projection_annee_n_plus1_par_pilier">Projection année N+1 par année</label>
                                <input type="file" className="form-control" 
                                /* {...register("projection_annee_n_plus1_par_pilier")} */ id="projection_annee_n_plus1_par_pilier"/>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="projection_annee_n_plus2_par_pilier">Projection année N+2 par année</label>
                                <input type="file" className="form-control" 
                                /* {...register("projection_annee_n_plus2_par_pilier")} */ id="projection_annee_n_plus2_par_pilier"/>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="mt_mobilise_par_pilier">Montatnt mobilisé par pilier</label>
                                <input type="number" className="form-control" 
                                {...register("mt_mobilise_par_pilier")} id="mt_mobilise_par_pilier"/>
                            </div>
                        </div>

                        <div className="row bg-white mx-1  py-3" style={{ marginTop:'-30px' }}>
                            <div className="form-group col-md-3">
                                <label for="mt_execute_par_pilier">Montant exécuté par pilier</label>
                                <input type="number" className="form-control" 
                                {...register("mt_execute_par_pilier")} id="mt_execute_par_pilier"/>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="piliers_intervention">Piliers d'intervention</label>
                                <select {...register("piliers_intervention")} 
                                    className="form-control">
                                    <option >Choisir...</option>
                                    {piliers.map(pilier=><optgroup label={pilier[0]}>{pilier[1].map(p =><option value={p[1]}>{p[1]}</option>)}</optgroup>)}
                                </select>
                                {errors.piliers_intervention && <p className="text-danger mb-0">{errors.piliers_intervention.message}</p>}
                            </div>
                            <div className="form-group col-md-3">
                                <label for="bailleur">Bailleur</label>
                                <input type="text" className="form-control" 
                                {...register("bailleur")} id="bailleur"/>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="mt_mobilise_par_pilier">Montatnt mobilisé par pilier</label>
                                <input type="number" className="form-control" 
                                {...register("mt_mobilise_par_pilier")} id="mt_mobilise_par_pilier"/>
                            </div>
                        </div>
                    </div>}

                    {/* ----ONG--- */}
                    {selectedActeur === 'ONG' && <div className=" bg-white">
                        <div className="row bg-white mx-1  py-3" >
                            <div className="form-group col-md-3">
                                <label for="type">Type</label>
                                <select {...register("type")} 
                                    className="form-control">
                                    <option >Choisir...</option>
                                    {typeOng.map(ong=><option value={ong[1]}>{ong[1]}</option>)}
                                </select>
                                {errors.type && <p className="text-danger mb-0">{errors.type.message}</p>}
                            </div>
                            <div className="form-group col-md-3">
                                <label for="bailleur">Bailleur</label>
                                <input type="text" className="form-control" 
                                {...register("bailleur")} id="bailleur"/>
                            </div>

                            <div className="form-group col-md-3">
                                <label for="date_debut_intervention">Début de l'intervention</label>
                                <input type="date" className="form-control" 
                                {...register("date_debut_intervention")} id="date_debut_intervention"/>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="date_fin_intervention">Fin de l'intervention</label>
                                <input type="date" className="form-control" 
                                {...register("date_fin_intervention")} id="date_fin_intervention"/>
                            </div>
                        </div>

                        <div className="row bg-white mx-1  py-3" style={{ marginTop:'-30px' }}>
                            <div className="form-group col-md-3">
                                <label for="email">Email</label>
                                <input type="text" className="form-control" 
                                {...register("email")} id="email"/>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="piliers_intervention">Piliers d'intervention</label>
                                <select {...register("piliers_intervention")} 
                                    className="form-control">
                                    <option >Choisir...</option>
                                    {piliers.map(pilier=><optgroup label={pilier[0]}>{pilier[1].map(p =><option value={p[1]}>{p[1]}</option>)}</optgroup>)}
                                </select>
                                {errors.piliers_intervention && <p className="text-danger mb-0">{errors.piliers_intervention.message}</p>}
                            </div>
                            <div className="form-group col-md-3">
                                <label for="montant_global_projet">Montant globale par projet</label>
                                <input type="number" className="form-control" 
                                {...register("montant_global_projet")} id="montant_global_projet"/>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="mt_prevu_par_pilier">Montatnt prévu par pilier</label>
                                <input type="number" className="form-control" 
                                {...register("mt_prevu_par_pilier")} id="mt_prevu_par_pilier"/>
                            </div>
                        </div>

                        <div className="row bg-white mx-1  py-3" style={{   marginTop:'-30px' }}>
                            <div className="form-group col-md-3">
                                <label for="mt_mobilise_par_pilier">Montant mobilisé par pilier</label>
                                <input type="number" className="form-control" 
                                {...register("mt_mobilise_par_pilier")} id="mt_mobilise_par_pilier"/>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="mt_execute_par_pilier">Montant exécuté par pilier</label>
                                <input type="number" className="form-control" 
                                {...register("mt_execute_par_pilier")} id="mt_execute_par_pilier"/>
                            </div>
                            {/* <div className="form-group col-md-3">
                                <label for="mecanisme_financement">Mecanisme de financement</label>
                                <input type="text" className="form-control" 
                                {...register("mecanisme_financement")} id="mecanisme_financement"/>
                            </div> */}
                        </div>
                        
                        <div style={{ marginTop:'-15px'}}>
                            <p style={{ marginBottom:'25px', marginLeft:"20px", fontWeight:"bold" }}>Sous récipiandaires</p>

                                {sousRecipiandaire.map(acteur=><div className="row bg-white mx-1  py-3" style={{   marginTop:'-30px' }}>
                                <div className="form-group col-md-3">
                                    <label for="projet_sous_recipiandaire">Projet</label>
                                    <input type="text" className="form-control" 
                                   /*  {...register(`projet_sous_recipiandaire[${acteur[1]}]`)} */ id="projet_sous_recipiandaire"/>
                                </div>
                                <div className="form-group col-md-3">
                                    <label for="montant_sous_recipiandaire">Montant </label>
                                    <input type="text" className="form-control" 
                                    /* {...register(`montant_sous_recipiandaire[${acteur[1]}]`)} */ id="montant_sous_recipiandaire"/>
                                </div>
                                <div className="form-group col-md-3">
                                <button style={{ marginTop:'25px', marginLeft:"-25px" }} type="button" className="btn btn-danger btn-sm float-left " /* disabled = {`${acteurFields === 1  ? 'disabled': ''}`}  */ onClick={()=>RemoveSousRecipainadaire(acteur)} ><i class="mdi mdi-delete mdi-18px text-white "></i></button>
                                </div>
                            </div>)}

                        <button style={{ marginTop:'-20 px' }} type="button" className="btn btn-sm btn-primary ml-4 float-left" onClick={()=>addSousRecipainadaire()} ><i class="mdi mdi-plus mdi-18px text-danger mb-0 "></i></button>
                    </div>
                    </div>}


                    {/* ----EPS--- */}
                    {selectedActeur === 'EPS' && <div className=" bg-white">
                        <div className="row bg-white mx-1  py-3" >
                            <div className="form-group col-md-3">
                                <label for="type">Piliers d'intervention</label>
                                <select {...register("piliers_intervention")} 
                                    className="form-control">
                                    <option >Choisir...</option>
                                    {piliers.map(pilier=><optgroup label={pilier[0]}>{pilier[1].map(p =><option value={p[1]}>{p[1]}</option>)}</optgroup>)}
                                </select>
                                {errors.piliers_intervention && <p className="text-danger mb-0">{errors.piliers_intervention.message}</p>}
                            </div>
                            <div className="form-group col-md-3">
                                <label for="mt_prevu_par_pilier">Montant prévu par pilier</label>
                                <input type="number" className="form-control" 
                                {...register("mt_prevu_par_pilier")} id="mt_prevu_par_pilier"/>
                            </div>

                            <div className="form-group col-md-3">
                                <label for="mt_mobilise_par_pilier">Montant mobilisé par pilier</label>
                                <input type="number" className="form-control" 
                                {...register("mt_mobilise_par_pilier")} id="mt_mobilise_par_pilier"/>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="mt_execute_par_pilier">Montant exécuté par pilier</label>
                                <input type="number" className="form-control" 
                                {...register("mt_execute_par_pilier")} id="mt_execute_par_pilier"/>
                            </div>
                        </div>

                        <div className="row bg-white mx-1  py-3" style={{ marginTop:'-30px' }}>
                            <div className="form-group col-md-3">
                                <label for="investissement_en_cours">Investissement en cours</label>
                                <input type="text" className="form-control" 
                                {...register("investissement_en_cours")} id="investissement_en_cours"/>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="projets">projets</label>
                                <input type="text" className="form-control" 
                                {...register("projets")} id="projets"/>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="opprtunites">Opportunités</label>
                                <input type="text" className="form-control" 
                                {...register("opprtunites")} id="opprtunites"/>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="perspective">Perspectives</label>
                                <input type="text" className="form-control" 
                                {...register("perspective")} id="perspective"/>
                            </div>
                        </div>

                        <div className="row bg-white mx-1  py-3" style={{   marginTop:'-30px' }}>
                            <div className="form-group col-md-3">
                                <label for="documents">Documents</label>
                                <input type="file" className="form-control" 
                                /* {...register("documents")} */ id="documents"/>
                            </div>
                        </div>
                    </div>}

                    {/* ----SPS--- */}
                    {selectedActeur === 'SPS' && <div className=" bg-white">
                        <div className="row bg-white mx-1  py-3" >
                            <div className="form-group col-md-3">
                                <label for="type">Type de structure</label>
                                <select {...register("type_structure")} 
                                    className="form-control">
                                    <option >Choisir...</option>
                                    {tyepeSps.map(sps=><option value={sps[1]}>{sps[1]}</option>)}
                                </select>
                                {errors.type_structure && <p className="text-danger mb-0">{errors.type_structure.message}</p>}
                            </div>

                            <div className="form-group col-md-3">
                                <label for="mt_prevu_par_pilier">Montant prévu par pilier</label>
                                <input type="text" className="form-control" 
                                {...register("mt_prevu_par_pilier")} id="mt_prevu_par_pilier"/>
                            </div>

                            <div className="form-group col-md-3">
                                <label for="mt_mobilise_par_pilier">Montant mobilisé par pilier</label>
                                <input type="number" className="form-control" 
                                {...register("mt_mobilise_par_pilier")} id="mt_mobilise_par_pilier"/>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="mt_execute_par_pilier">Montant exécuté par pilier</label>
                                <input type="number" className="form-control" 
                                {...register("mt_execute_par_pilier")} id="mt_execute_par_pilier"/>
                            </div>
                        </div>

                        <div className="row bg-white mx-1  py-3" style={{ marginTop:'-30px' }}>
                            <div className="form-group col-md-3">
                                <label for="investissement_en_cours">Investissement en cours</label>
                                <input type="text" className="form-control" 
                                {...register("investissement_en_cours")} id="investissement_en_cours"/>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="projets">projets</label>
                                <input type="text" className="form-control" 
                                {...register("projets")} id="projets"/>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="opprtunites">Opportunités</label>
                                <input type="text" className="form-control" 
                                {...register("opprtunites")} id="opprtunites"/>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="perspective">Perspectives</label>
                                <input type="text" className="form-control" 
                                {...register("perspective")} id="perspective"/>
                            </div>
                        </div>

                        <div className="row bg-white mx-1  py-3" style={{   marginTop:'-30px' }}>
                            <div className="form-group col-md-3">
                                <label for="type">Piliers d'intervention</label>
                                <select {...register("piliers_intervention")} 
                                    className="form-control">
                                    <option >Choisir...</option>
                                    {piliers.map(pilier=><optgroup label={pilier[0]}>{pilier[1].map(p =><option value={p[1]}>{p[1]}</option>)}</optgroup>)}
                                </select>
                                {errors.piliers_intervention && <p className="text-danger mb-0">{errors.piliers_intervention.message}</p>}
                            </div>
                            <div className="form-group col-md-3">
                                <label for="documents">Documents</label>
                                <input type="file" className="form-control" 
                                /* {...register("documents")} */ id="documents"/>
                            </div>
                        </div>
                    </div>}

                     {/* ----Etat--- */}
                     {selectedActeur === 'Etat' && <div className=" bg-white">
                        <div className="row bg-white mx-1  py-3" >
                            <div className="form-group col-md-3">
                                <label for="domaine_intervention_sante">Domaine d'intervention dans la santé</label>
                                <input type="text" className="form-control" 
                                {...register("domaine_intervention_sante")} id="domaine_intervention_sante"/>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="type">Piliers d'intervention</label>
                                <select {...register("piliers_intervention")} 
                                    className="form-control">
                                    <option >Choisir...</option>
                                    {piliers.map(pilier=><optgroup label={pilier[0]}>{pilier[1].map(p =><option value={p[1]}>{p[1]}</option>)}</optgroup>)}
                                </select>
                                {errors.piliers_intervention && <p className="text-danger mb-0">{errors.piliers_intervention.message}</p>}
                            </div>

                            <div className="form-group col-md-3">
                                <label for="beneficiaire">Bénéficiaire</label>
                                <input type="text" className="form-control" 
                                {...register("beneficiaire")} id="beneficiaire"/>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="mt_mobilise_par_annee">Montant mobilisé par année</label>
                                <input type="number" className="form-control" 
                                {...register("mt_mobilise_par_annee")} id="mt_mobilise_par_annee"/>
                            </div>
                        </div>

                        <div className="row bg-white mx-1  py-3" style={{ marginTop:'-30px' }}>
                            <div className="form-group col-md-3">
                                <label for="realisation">Réalisation</label>
                                <input type="text" className="form-control" 
                                {...register("realisation")} id="realisation"/>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="prestation_prise_en_charge">Prestation prise en charge</label>
                                <input type="text" className="form-control" 
                                {...register("prestation_prise_en_charge")} id="prestation_prise_en_charge"/>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="opprtunites">Opportunités</label>
                                <input type="text" className="form-control" 
                                {...register("opprtunites")} id="opprtunites"/>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="perspective">Perspectives</label>
                                <input type="text" className="form-control" 
                                {...register("perspective")} id="perspective"/>
                            </div>
                        </div>

                        <div className="row bg-white mx-1  py-3" style={{   marginTop:'-30px' }}>
                            <div className="form-group col-md-3">
                                <label for="projet_en_cours">Projet en cours</label>
                                <input type="text" className="form-control" 
                                {...register("projet_en_cours")} id="projet_en_cours"/>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="documents">Documents</label>
                                <input type="file" className="form-control" 
                                /* {...register("documents")} */ id="documents"/>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="service_soins_achetes">Service soins achetés</label>
                                <input type="text" className="form-control" 
                                {...register("service_soins_achetes")} id="service_soins_achetes"/>
                            </div>
                        </div>
                    </div>}
                    
                    <div className="modal-footer mt-5 d-flex justify-content-between">
                       {previousButton()}{nextButton()}
                    </div>
                    </section>)}

                    {formStep >= 2 && (<section style={{display: formStep === 2 ? "block" : "none"  }}>
                    <div className=" bg-white">
                            <div className="row bg-white mx-1  py-3">
                            <div className="form-group col-md-6">
                                <label for="prenom_responsable">Prénom</label>
                                <input type="text" className="form-control" 
                                {...register("prenom_responsable")} id="prenom_responsable" placeholder="Prénom responsable"/>
                            </div>
                            <div className="form-group col-md-6">
                                <label for="nom_responsable">Nom</label>
                                <input type="text" className="form-control" 
                                {...register("nom_responsable")} id="nom_responsable" placeholder="Nom responsable"/>
                            </div>
                            <div className="form-group col-md-6">
                                <label for="email_responsable">Email</label>
                                <input type="text" className="form-control" 
                                {...register("email_responsable")} id="email_responsable" placeholder="Email responsable"/>
                            </div>
                            <div className="form-group col-md-6">
                                <label for="telephone_responsable">Téléphone</label>
                                <input type="text" className="form-control" 
                                {...register("telephone_responsable")} id="telephone_responsable" placeholder="Téléphone responsable"/>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer mt-5 d-flex justify-content-between">
                       {previousButton()}{nextButton()}
                    </div>
                    </section>)}

                    {formStep === 3 && (<section>
                        <div className=" bg-white">
                            <div className="row bg-white container mx-auto mx-1  py-3 border border-success mt-4">
                                <div class="d-flex justify-content-between flex-column col-md-4 border-right border-success">
                                    <h4 className="mx-1 badge badge-primary">Etape 1</h4>
                                    {getValues().type_acteur &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Type d'acteur</span>: {getValues().type_acteur}</div>}
                                    {getValues().source_financement &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Source de financement</span>: {getValues().source_financement}</div>}
                                    {getValues().mecanisme_achat &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Mécanisme d'achat</span>: {getValues().mecanisme_achat}</div>}
                                    {getValues().denomination &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Denomination</span>: {getValues().denomination}</div>}
                                    {getValues().numero_agrement &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >N° agrément</span>: {getValues().numero_agrement}</div>}
                                    {getValues().pays_nationalite &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Pays/Nationalité</span>: {getValues().pays_nationalite}</div>}
                                    {getValues().region_intervention &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Région</span>: {getValues().region_intervention}</div>}
                                    {getValues().departement_intervention &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Département</span>: {getValues().departement_intervention}</div>}
                                    {getValues().commune_intervention &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Commune</span>: {getValues().commune_intervention}</div>}
                                    {getValues().autre_secteur_intervention &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Autre secteur d'intervention</span>: {getValues().autre_secteur_intervention}</div>}
                                    {getValues().paquet_sante_intervention &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Paquet santé d'intervention</span>: {getValues().paquet_sante_intervention}</div>}
                                    {getValues().adresse_siege &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Adresse siège</span>: {getValues().adresse_siege}</div>}
                                    {getValues().email_siege &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Email siège</span>: {getValues().email_siege}</div>}
                                    {getValues().telephone_siege &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Téléphone siège</span>: {getValues().telephone_siege}</div>}
                                    {getValues().accord_siege &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Accord siège</span>: {getValues().accord_siege}</div>}
                                    {getValues().mecanisme_financement &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Mécanisme de financement</span>: {getValues().mecanisme_financement}</div>}
                                    {getValues().type_achat &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Type d'achat</span>: {getValues().type_achat}</div>}
                                    <div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Dimention de l'acteur</span>: <span>{getValues().mis_en_commun && "Mis en commun"} , {getValues().mobilisation_ressource && "Achat de service"}, {getValues().mobilisation_ressource && "mobilisation ressource"}</span></div>
                                </div>

                                <div class="d-flex justify-content-between flex-column col-md-4 border-right border-success">
                                <h4 className="mx-1 badge badge-primary">Etape 2</h4>
                                    {getValues().type &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Type</span>: {getValues().type}</div>}
                                    {getValues().agent_execution &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Agent d'exécution</span>: {getValues().agent_execution}</div>}
                                    {getValues().date_debut_intervention &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Période d'intervention</span>: Du {getValues().date_debut_intervention} au {getValues().date_fin_intervention}</div>}
                                    {getValues().mt_prevu_par_pilier_annee_en_cour &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Montant prévu par pilier année en cour</span>: {getValues().mt_prevu_par_pilier_annee_en_cour}</div>}
                                    {getValues().projection_annee_n_plus1_par_pilier &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Projection année N+1 par palier</span>: {getValues().projection_annee_n_plus1_par_pilier}</div>}
                                    {getValues().projection_annee_n_plus2_par_pilier &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Projection année N+2 par palier</span>: {getValues().projection_annee_n_plus2_par_pilier}</div>}
                                    {getValues().mt_mobilise_par_pilier &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Montatnt mobilisé par pilier</span>: {getValues().mt_mobilise_par_pilier}</div>}
                                    {getValues().mt_mobilise_par_annee &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Montatnt mobilisé par année</span>: {getValues().mt_mobilise_par_annee}</div>}
                                    {getValues().mt_execute_par_pilier &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Montatnt exécuté par pilier</span>: {getValues().mt_execute_par_pilier}</div>}
                                    {getValues().piliers_intervention &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Piliers d'intervention</span>: {getValues().piliers_intervention}</div>}
                                    {getValues().bailleur &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Bailleur</span>: {getValues().bailleur}</div>}
                                    {getValues().mt_mobilise_par_pilier &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Montant mobilisé par pilier</span>: {getValues().mt_mobilise_par_pilier}</div>}
                                    {getValues().email &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Email ONG</span>: {getValues().email}</div>}
                                    {getValues().montant_global_projet &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Montant global du projet</span>: {getValues().montant_global_projet}</div>}
                                    {getValues().mt_prevu_par_pilier &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Montant prévu par piliers</span>: {getValues().mt_prevu_par_pilier}</div>}
                                    {getValues().investissement_en_cours &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Investissements en cours</span>: {getValues().investissement_en_cours}</div>}
                                    {getValues().mt_prevu_par_pilier &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Montant prévu par piliers</span>: {getValues().mt_prevu_par_pilier}</div>}
                                    {getValues().beneficiaire &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Bénéficiaire</span>: {getValues().beneficiaire}</div>}
                                    {getValues().projets &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Projet</span>: {getValues().projets}</div>}
                                    {getValues().investissement_en_cours &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Investissements en cours</span>: {getValues().investissement_en_cours}</div>}
                                    {getValues().opprtunites &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Opportinutés</span>: {getValues().opprtunites}</div>}
                                    {getValues().perspective &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Perspective</span>: {getValues().perspective}</div>}
                                    {getValues().documents &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Documents</span>: {getValues().documents}</div>}
                                    {getValues().numero_autorisation &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >N° autorisation</span>: {getValues().numero_autorisation}</div>}
                                    {getValues().type_structure &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Type de structure</span>: {getValues().type_structure}</div>}
                                    {getValues().domaine_intervention_sante &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Domaine d'intervention dans la santé</span>: {getValues().domaine_intervention_sante}</div>}
                                    {getValues().realisation &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Rélisation</span>: {getValues().realisation}</div>}
                                    {getValues().prestation_prise_en_charge &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Prestation prise en charge</span>: {getValues().prestation_prise_en_charge}</div>}
                                    {getValues().projet_en_cours &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Projet en cours</span>: {getValues().projet_en_cours}</div>}
                                    {getValues().service_soins_achetes &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Services soins achetés</span>: {getValues().service_soins_achetes}</div>}
                                    {getValues()?.projet_sous_recipiandaire &&<div class="py-1 mb-2 bg-light"><span class="text-muted recap mr-2" >Sous récipiandaires</span>: {getValues().projet_sous_recipiandaire?.map((projet, i)=><span>{projet} </span> )}</div>}
                                </div>
                                <div class="d-flex justify-content-start flex-column col-md-4">
                                <p className="mx-1 badge badge-primary">Etape 3</p>
                                    {getValues().prenom_responsable &&<div class="py-1 mb-3 bg-light"><span class="text-muted recap mr-2" >Prénom</span>: {getValues().prenom_responsable}</div>}
                                    {getValues().nom_responsable &&<div class="py-1 mb-3 bg-light"><span class="text-muted recap mr-2" >Nom</span>: {getValues().nom_responsable}</div>}
                                    {getValues().email_responsable &&<div class="py-1 mb-3 bg-light"><span class="text-muted recap mr-2" >Email</span>: {getValues().email_responsable}</div>}
                                    {getValues().telephone_responsable &&<div class="py-1 mb-3 bg-light"><span class="text-muted recap mr-2" >Téléphone</span>: {getValues().telephone_responsable}</div>}
                                    
                                </div>
                            {/* <pre>{JSON.stringify(getValues(), null, 2)}</pre> */}
                            </div>
                    </div>


                       
                        <div className="modal-footer mt-5 d-flex justify-content-between">
                       {previousButton()}{submitButton()}
                    </div>
                    </section>)}

                    
                </form>
                {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
                </div>
            </div>
        </div>
       </div>
    )
};

const mapDispatchToProps = dispatch => ({
    initSourceFiancementList : () => dispatch(fetchSourceFinancementAsync()),
    getActeurByFinancement : id => dispatch(fetchActeurByFinancementAsync(id)),
    resetStructure : ()=>dispatch(resetEditedStructure()),
    initListActeur : ()=>dispatch(fetchActeursAsync()),

})

const mapStateToProps = createStructuredSelector({
    sourceFinancements : selectSourceFinancementList,
    typeActeur : selectListActeur,
    acteurByFinancement : selectActeurByFinancement,
    errorMessage : selectErrorMessage

})
export default connect(mapStateToProps, mapDispatchToProps) (StructureForm);

