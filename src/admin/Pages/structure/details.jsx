import React, { useState } from 'react';
import { useEffect } from 'react';
import './structure.style.scss'
import { connect } from 'react-redux';
import {selectStructureById } from '../../../redux/structure/structure.selector';
import { createStructuredSelector } from 'reselect';
import {fetchStructureByIdAsync} from '../../../redux/structure/structurethunk';


function DetailStructure ({match:{params}, structureById, getStructureById}){
  
useEffect(()=>{
   getStructureById(params[1])
},[]);
    return(
        <div>
          <div className="page-header">
            <h3 className="page-title">
              <span className="page-title-icon bg-gradient-primary text-white mr-2">
                <i className="mdi mdi-houzz"></i>
              </span> Structures
            </h3>
          </div>
          <div className="row">
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">{structureById?.denomination} </h4>

                    <div className="row">
                       {/* ----1---- */}
                      <div className="col-md-6">
                          <ul className="list-group list-group-striped">
                          {structureById?.type_acteur && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Type de structure : </strong>
                                  <span className="text-muted">{structureById?.type_acteur}</span>
                              </p>
                          </li>}
                          {structureById?.denomination && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Dénomination : </strong>
                                  <span className="text-muted">{structureById?.denomination}</span>
                              </p>
                          </li>}
                          {structureById?.source_financement && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Source de financement : </strong>
                                  <span className="text-muted">{structureById?.source_financement}</span>
                              </p>
                          </li>}
                          {structureById?.infos_suplementaires?.numero_agrement && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">N° agrément : </strong>
                                  <span className="text-muted">{structureById?.infos_suplementaires?.numero_agrement}</span>
                              </p>
                          </li>}
                          {structureById?.paquet_sante_intervention && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Paquet santé d'intervention : </strong>
                                  <span className="text-muted">{structureById?.paquet_sante_intervention}</span>
                              </p>
                          </li>}
                          {structureById?.infos_suplementaires?.numero_autorisation && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">N° autorisation : </strong>
                                  <span className="text-muted">{structureById?.infos_suplementaires?.numero_autorisation}</span>
                              </p>
                          </li>}
                          {structureById?.pays_nationalite && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Pays/Nationalité : </strong>
                                  <span className="text-muted">{structureById?.pays_nationalite}</span>
                              </p>
                          </li>}
                          {structureById?.region_intervention && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Région : </strong>
                                  <span className="text-muted">{structureById?.region_intervention}</span>
                              </p>
                          </li>}
                          {structureById?.departement_intervention && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Départemet : </strong>
                                  <span className="text-muted">{structureById?.departement_intervention}</span>
                              </p>
                          </li>}
                          {structureById?.commune_intervention && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Commune : </strong>
                                  <span className="text-muted">{structureById?.commune_intervention}</span>
                              </p>
                          </li>}
                          {structureById?.districte_intervention && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">District : </strong>
                                  <span className="text-muted">{structureById?.districte_intervention}</span>
                              </p>
                          </li>}
                          {structureById?.autre_secteur_intervention && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Autres secteurs d'intervention : </strong>
                                  <span className="text-muted">{structureById?.autre_secteur_intervention}</span>
                              </p>
                          </li>}
                          {<li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Dimensions : </strong>
                                  <span className="text-muted">
                                    <span className="badge badge-primary ml-1">{structureById?.mis_en_commun_ressource ? "Mise en commun" : ""}</span>
                                    <span className="badge badge-primary ml-1">{structureById?.mobilisation_ressource ? "Mobilisation": ""}</span>
                                    <span className="badge badge-primary ml-1">{structureById?.achat_service ? "Achat de service": ""}</span>
                                  </span>
                              </p>
                          </li>}
                          {structureById?.mecanisme_financement && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Mécanisme de financement : </strong>
                                  <span className="text-muted">{structureById?.mecanisme_financement}</span>
                              </p>
                          </li>}
                          {structureById?.type_achat && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Type d'achat : </strong>
                                  <span className="text-muted">{structureById?.type_achat}</span>
                              </p>
                          </li>}
                          {structureById?.adresse_siege && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Adresse du siège : </strong>
                                  <span className="text-muted">{structureById?.adresse_siege}</span>
                              </p>
                          </li>}
                          {structureById?.email_siege && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Email du siège : </strong>
                                  <span className="text-muted">{structureById?.email_siege}</span>
                              </p>
                          </li>}
                          {structureById?.telephone_siege && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Téléphone du siège : </strong>
                                  <span className="text-muted">{structureById?.telephone_siege}</span>
                              </p>
                          </li>}
                          {structureById?.infos_suplementaires?.accord_siege && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Accord de siège : </strong>
                                  <span className="text-muted">{structureById?.infos_suplementaires?.accord_siege}</span>
                              </p>
                          </li>}
                          </ul>
                        </div>
                        {/* ----2---- */}

                        {structureById?.infos_suplementaires && <div className="col-md-6">
                          <ul className="list-group list-group-striped">
                          {structureById?.infos_suplementaires?.type && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Type : </strong>
                                  <span className="text-muted">{structureById?.infos_suplementaires?.type}</span>
                              </p>
                          </li>}
                          {structureById?.infos_suplementaires?.agent_execution && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Agent d'exécution : </strong>
                                  <span className="text-muted">{structureById?.infos_suplementaires?.agent_execution}</span>
                              </p>
                          </li>}
                          {structureById?.infos_suplementaires?.date_debut_intervention && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Période d'intervention : </strong>
                                  <span className="text-muted"> Du {structureById?.infos_suplementaires?.date_debut_intervention} au {structureById?.infos_suplementaires?.date_fin_intervention}</span>
                              </p>
                          </li>}
                          {structureById?.infos_suplementaires?.mt_prevu_par_pilier_annee_en_cour && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Montant prévu par pilier année en cour : </strong>
                                  <span className="text-muted">{structureById?.infos_suplementaires?.mt_prevu_par_pilier_annee_en_cour}</span>
                              </p>
                          </li>}
                          {structureById?.infos_suplementaires?.projection_annee_n_plus1_par_pilier && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Projection année N+1 par pilier : </strong>
                                  <span className="text-muted">{structureById?.infos_suplementaires?.projection_annee_n_plus1_par_pilier} fichier</span>
                              </p>
                          </li>}
                          {structureById?.infos_suplementaires?.projection_annee_n_plus2_par_pilier && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Projection année N+2 par pilier : </strong>
                                  <span className="text-muted">{structureById?.infos_suplementaires?.projection_annee_n_plus2_par_pilier} fichier</span>
                              </p>
                          </li>}
                          {structureById?.infos_suplementaires?.mt_mobilise_par_pilier && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Montant mobilisé par pilier : </strong>
                                  <span className="text-muted">{structureById?.infos_suplementaires?.mt_mobilise_par_pilier}</span>
                              </p>
                          </li>}
                          {structureById?.infos_suplementaires?.mt_mobilise_par_annee && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Montant mobilisé par année : </strong>
                                  <span className="text-muted">{structureById?.infos_suplementaires?.mt_mobilise_par_annee}</span>
                              </p>
                          </li>}
                          {structureById?.infos_suplementaires?.service_soins_achetes && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Services soins achetés : </strong>
                                  <span className="text-muted">{structureById?.infos_suplementaires?.service_soins_achetes}</span>
                              </p>
                          </li>}
                          {structureById?.infos_suplementaires?.beneficiaire && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Bénéficiaire : </strong>
                                  <span className="text-muted">{structureById?.infos_suplementaires?.beneficiaire}</span>
                              </p>
                          </li>}
                          {structureById?.infos_suplementaires?.opportunites && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Opportinutés : </strong>
                                  <span className="text-muted">{structureById?.infos_suplementaires?.opportunites}</span>
                              </p>
                          </li>}
                          {structureById?.infos_suplementaires?.mt_execute_par_pilier && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Montant exécuté par pilier : </strong>
                                  <span className="text-muted">{structureById?.infos_suplementaires?.mt_execute_par_pilier}</span>
                              </p>
                          </li>}
                          {structureById?.infos_suplementaires?.piliers_intervention && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Piliers d'interventions : </strong>
                                  <span className="text-muted">{structureById?.infos_suplementaires?.piliers_intervention}</span>
                              </p>
                          </li>}
                          {structureById?.infos_suplementaires?.bailleur && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Bailleur : </strong>
                                  <span className="text-muted">{structureById?.infos_suplementaires?.bailleur}</span>
                              </p>
                          </li>}
                          {structureById?.infos_suplementaires?.sous_recip&&<li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Sous récipiandaires : </strong>
                                  <span className="text-muted">
                                     <p><span>Projet 1</span>: Montant</p>
                                     <p><span>Projet 2</span>: Montant</p>
                                  </span>
                              </p>
                          </li>}
                          {structureById?.infos_suplementaires?.mt_mobilise_par_pilier && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Montant mobilisé par pilier : </strong>
                                  <span className="text-muted">{structureById?.infos_suplementaires?.mt_mobilise_par_pilier}</span>
                              </p>
                          </li>}
                          {structureById?.infos_suplementaires?.montant_global_projet && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Montant global du projet : </strong>
                                  <span className="text-muted">{structureById?.infos_suplementaires?.montant_global_projet}</span>
                              </p>
                          </li>}
                          {structureById?.infos_suplementaires?.mt_prevu_par_pilier && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">montant prévu par pilier : </strong>
                                  <span className="text-muted">{structureById?.infos_suplementaires?.mt_prevu_par_pilier}</span>
                              </p>
                          </li>}
                          {structureById?.infos_suplementaires?.email && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Email du siège : </strong>
                                  <span className="text-muted">{structureById?.infos_suplementaires?.email}</span>
                              </p>
                          </li>}
                          {structureById?.infos_suplementaires?.investissement_en_cours && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Investissement en cours : </strong>
                                  <span className="text-muted">{structureById?.infos_suplementaires?.investissement_en_cours}</span>
                              </p>
                          </li>}
                          {structureById?.infos_suplementaires?.projets && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Projets : </strong>
                                  <span className="text-muted">{structureById?.infos_suplementaires?.projets}</span>
                              </p>
                          </li>}
                          {structureById?.infos_suplementaires?.opprtunites && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Opprtunités : </strong>
                                  <span className="text-muted">{structureById?.infos_suplementaires?.opprtunites}</span>
                              </p>
                          </li>}
                          {structureById?.infos_suplementaires?.perspective && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Perspectives : </strong>
                                  <span className="text-muted">{structureById?.infos_suplementaires?.perspective}</span>
                              </p>
                          </li>}
                          {structureById?.infos_suplementaires?.documents && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Documents : </strong>
                                  <span className="text-muted">{structureById?.infos_suplementaires?.documents}</span>
                              </p>
                          </li>}
                          {structureById?.infos_suplementaires?.type_structure && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Type : </strong>
                                  <span className="text-muted">{structureById?.infos_suplementaires?.type_structure}</span>
                              </p>
                          </li>}

                          {structureById?.infos_suplementaires?.domaine_intervention_sante && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Domaine d'intervention dans la santé : </strong>
                                  <span className="text-muted">{structureById?.infos_suplementaires?.domaine_intervention_sante}</span>
                              </p>
                          </li>}

                          {structureById?.infos_suplementaires?.realisation && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Réalisation : </strong>
                                  <span className="text-muted">{structureById?.infos_suplementaires?.realisation}</span>
                              </p>
                          </li>}
                          {structureById?.infos_suplementaires?.prestation_prise_en_charge && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Prestation de prise en charge : </strong>
                                  <span className="text-muted">{structureById?.infos_suplementaires?.prestation_prise_en_charge}</span>
                              </p>
                          </li>}
                          {structureById?.infos_suplementaires?.projet_en_cours && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Projet en cours : </strong>
                                  <span className="text-muted">{structureById?.infos_suplementaires?.projet_en_cours}</span>
                              </p>
                          </li>}

                          </ul>
                        </div>}

                           {/* personne responsable */}
                           <div className="col-md-6 mt-1">
                          <ul className="list-group list-group-striped">
                          {structureById?.prenom_responsable && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Prénom responsable : </strong>
                                  <span className="text-muted">{structureById?.prenom_responsable}</span>
                              </p>
                          </li>}
                          {structureById?.nom_responsable && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Nom responsable : </strong>
                                  <span className="text-muted">{structureById?.nom_responsable}</span>
                              </p>
                          </li>}
                          {structureById?.telephone_responsable && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Téléphone responsable : </strong>
                                  <span className="text-muted">{structureById?.telephone_responsable}</span>
                              </p>
                          </li>}
                          {structureById?.email_responsable && <li className="list-group-item">
                              <p className="list-p">
                                  <strong className="tx-inverse tx-medium">Email responsable : </strong>
                                  <span className="text-muted">{structureById?.email_responsable}</span>
                              </p>
                          </li>}
                          
                          </ul>
                        </div>
                     </div>

                </div>
              </div>
            </div>
          </div>
        </div>
    )
};

const mapDispatchToProps = dispatch =>({
  getStructureById : id => dispatch(fetchStructureByIdAsync(id)),


})

const mapStateToProps = createStructuredSelector({
  structureById: selectStructureById,

});
export default connect(mapStateToProps, mapDispatchToProps) (DetailStructure);