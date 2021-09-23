import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import {
    fetchSourceFinancementStratAsync
} from '../../../redux/source-financement/source-financement.action';
import { selectCurrentStructure, selectTypeActeur } from '../../../redux/structure/structure.selector';
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


function formCopy(props) {
    const {initStructureData, sourceFinancements, structureById, updateStructure, storeStructure,getStructureById,
           initSourceFiancementList, acteurByFinancement, getActeurByFinancement,typeActeur } = props;
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

    useEffect(()=>{
        reset({ 
            denomination:structureById?.denomination, 
            addresse_siege:structureById?.addresse_siege, 
            email_personne_responsable:structureById?.personne_responsable[2],
            logo:structureById?.logo, 
            telephone:structureById?.telephone,
            nom_personne_responsable:structureById?.personne_responsable[1], 
            prenom_personne_responsable:structureById?.personne_responsable[0], 
            source_financement_id:structureById?.source_financement_id,
            telephone_personne_responsable:structureById?.personne_responsable[3], 
            type_acteur_id:structureById?.type_acteur_id, 
            type_fonds:structureById?.type_fonds
           });
        initSourceFiancementList();
         props.initListActeur();
    },[structureById]);


    const resetForm =()=>{
        reset();
        props.resetStructure();
        /* editedRole?.permissions.forEach(permission =>{
            $('#permission option[data-id=' + permission + ']').attr('selected', false)
        }) */
    }
    const onSubmit = async(data, e) => {
        const { denomination, addresse_siege, email_personne_responsable,logo, telephone,
            nom_personne_responsable, prenom_personne_responsable, source_financement_id,
            telephone_personne_responsable, type_acteur_id, type_fonds} = data;

        const structureData = {denomination, addresse_siege, email_personne_responsable,logo, telephone,
            nom_personne_responsable, prenom_personne_responsable, source_financement_id,
            telephone_personne_responsable, type_acteur_id, type_fonds};


         if (structureById) {
            updateStructure(structureById.id, structureData);
         }else{
            storeStructure(structureData);
         }
         closeModal();
         initStructureData();
         resetForm();
    }

    
    const $ = window.$;
    const closeModal = ()=> $('#exampleModal').modal('hide');

   
      /* typeActeur === null &&   getTypeActeur(sourceFinancements?.filter(source => source.source_financement ===  e.target.value)) */

      !structureById && $('#source_financement_id').change(function(e) {
        e.target.value ? getActeurByFinancement(e.target.value) :getActeurByFinancement(null);
        console.log('🎖', acteurByFinancement);
        e.target && $('#type_acteur').find('option:eq(0)').prop('selected', true)

      });

  structureById && $('#structure-form option[value=' + structureById?.source_financement?.id + ']').attr('selected', true)



      /* if ($('select').length > 0)
        $("select").select2({
            width: '100%'
        }); */
      

  return(
        <div className="modal fade"  id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">AJOUT D'UNE STRUCTURE</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>resetForm()}>
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                
                <form id="structure-form"  onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                        <div className="form-group col-md-6">
                            <label for="logo">Logo</label>
                            <input type="text"  className="form-control" {...register("logo")}  id="logo" placeholder="Logo structure" />
                            {errors.logo && errors.logo.type === "required" && <span className="text-danger">Veuillez remplir ce champ</span>}
                        </div>
                        <div className="form-group col-md-6">
                            <label for="denomination">Denomination</label>
                            <input type="text"  className="form-control" {...register("denomination", { required: true })}  id="denomination" placeholder="la Dénomination" />
                            {errors.denomination && errors.denomination.type === "required" && <span className="text-danger">Veuillez remplir ce champ</span>}
                        </div>
                        <div className="form-group col-md-6">
                            <label for="type_fonds">Type de fonds</label>
                            <input type="text"  className="form-control" {...register("type_fonds")}  id="type_fonds" placeholder="Type de fond" />
                            {errors.type_fonds && errors.type_fonds.type === "required" && <span className="text-danger">Veuillez remplir ce champ</span>}
                        </div>
                        <div className="form-group col-md-6">
                            <label for="addresse_siege">Adress du siège</label>
                            <input type="text" className="form-control" {...register("addresse_siege")}   id="addresse_siege" placeholder="Address du siège"/>
                        </div>

                        <div className="form-group col-md-6">
                            <label for="source_financement_id">Source d'investissement</label>
                            <select   className="form-control" {...register("source_financement_id")}  id="source_financement_id">
                            <option  value="">Choisir....</option>
                                {sourceFinancements && sourceFinancements.map(finance =>(
                                    <option key={finance.id}  value={finance.id}>{finance.denomination}</option>
                                ))}
                            </select>
                            {errors.source_investissement && errors.source_investissement.type === "required" && <span className="text-danger">Veuillez remplir ce champ</span>}
                        </div>
                       
                        <div className="form-group col-md-6">
                            <label for="type_acteur_id">Type d'acteur</label>
                            <select className="form-control" {...register("type_acteur_id")}  id="type_acteur_id">
                                {structureById ? typeActeur.map(acteur =>(
                                        <option key={acteur.id} value={acteur.id}>{acteur.libelle}</option>
                                )) : acteurByFinancement.map(acteur =>(
                                    <option key={acteur.id} value={acteur.id}>{acteur.libelle}</option>
                            ))/* : <option value="">Veuillez choisir d'abord le source d'investissement</option> */}
                            </select>
                            {errors.type_acteur && errors.type_acteur.type === "required" && <span className="text-danger">Veuillez remplir ce champ</span>}
                        </div>
                        <div className="form-group col-md-6">
                            <label for="telephone">Téléphone</label>
                            <input type="text" className="form-control" {...register("telephone")}  id="telephone" placeholder="Téléphone"/>
                        </div>
                    </div>

                    <div className=" bg-white py-3">
                                <h6 className="px-4">Personne responsable</h6>
                             <div className="row bg-white mx-1  py-3">
                                <div className="form-group col-md-6">
                                    <label for="prenom_personne_responsable">Prénom</label>
                                    <input type="text" className="form-control" {...register("prenom_personne_responsable")} id="prenom_personne_responsable" placeholder="Prénom"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label for="nom_personne_responsable">Nom</label>
                                    <input type="text" className="form-control"  {...register("nom_personne_responsable")} id="nom_personne_responsable" placeholder="Nom"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label for="email_personne_responsable">email</label>
                                    <input type="email" className="form-control"  {...register("email_personne_responsable")} id="email_personne_responsable" placeholder="Addresse email"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label for="telephone_personne_responsable">Contact</label>
                                    <input type="text" className="form-control" {...register("telephone_personne_responsable")} id="telephone_personne_responsable" placeholder="Contact"/>
                                </div>
                             </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal"><i className="mdi mdi-close mdi-18px text-white align-left"></i> Annuler</button>
                            <button type="submit" className="btn btn-primary" /* onClick={()=> setTimeout(function() {$('#exampleModal').modal('hide')}, 4000)} */><i className="mdi mdi-check mdi-18px text-white align-left"></i> Enregistrer</button>
                        </div>
                </form>
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
    acteurByFinancement : selectActeurByFinancement

})
export default connect(mapStateToProps, mapDispatchToProps) (formCopy);

