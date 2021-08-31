import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import firebase, { firestore, getData } from '../../../firebase/firebase.utils';
import { connect } from 'react-redux';
import {
    addActeurField,
    getSourceFinancementData, removeActeurField
} from '../../../redux/source-financement/source-financement.action';


 


function SourceFinancementForm({initSourceFinancementList, acteurFields, removeActeurField, addveActeurField}) {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

        const onSubmit = async(data, e) => {
            const createdAt = new Date();
            const typeActeur = data.type_acteur.splice(1)
            firebase
            .firestore()
            .collection('source_financement')
            .add({createdAt, source_financement: data.source_financement, type_acteur: typeActeur});
             e.target.reset();
             initSourceFinancementList(await getData('source_financement'));
             closeModal();
        }
    
    const $ = window.$;
    const closeModal = ()=> $('#exampleModal').modal('hide');

  return(
        <div class="modal fade"  id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">AJOUT D'UNE SOURCE DE FINANCEMENT</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                
                <form  onSubmit={handleSubmit(onSubmit)}>
                <div className="">
                        <div class="form-group">
                            <label for="source_financement">Source de financement</label>
                            <input type="text"  class="form-control" {...register("source_financement", { required: true })} id="source_financement" placeholder="la Dénomination" />
                            {errors.source_financement && errors.source_financement.type === "required" && <span class="text-danger">Veuillez remplir ce champ</span>}
                        </div>
                    </div>

                    <div className=" bg-white py-3">
                                <h6 className="px-4">Types d'acteur</h6>
                             <div className=" bg-white mx-1  py-3">
                                 {acteurFields.map(acteur => (
                                    <div class="form-group mx-5">
                                      <label for={`type_acteur${acteur}`}>Acteur {acteur}</label>
                                      <input type="text" class="form-control" {...register(`type_acteur[${acteur}]`, { required: true })} id={`type_addField${acteur}`} placeholder={`Acteur ${acteur}`}/>
                                      {errors[`type_acteur${acteur}`] && errors[`type_acteur${acteur}`].type === "required" && <span class="text-danger">Veuillez remplir ce champ</span>}
                                  </div>
                                 ))}
                                 <hr />
                                    <button type="button" className="btn btn-sm float-right " disabled = {`${acteurFields.length === 1 ? 'disabled': ''}`} onClick={()=>removeActeurField()} ><i class="mdi mdi-delete mdi-18px text-danger "></i></button>
                                    <button type="button" className="btn btn-sm float-right" onClick={()=>addveActeurField()} ><i class="mdi mdi-plus mdi-18px text-danger "></i></button>                                 
                             </div>
                             <br />
                        </div>
                        <div class="modal-footer row">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal"><i class="mdi mdi-close mdi-18px text-white align-left"></i> Annuler</button>
                            <button type="submit" class="btn btn-primary" /* onClick={()=> setTimeout(function() {$('#exampleModal').modal('hide')}, 4000)} */><i class="mdi mdi-check mdi-18px text-white align-left"></i> Enregistrer</button>
                        </div>
                </form>
            </div>
      </div>
    </div>
  </div>
    )
};

const mapDispatchToProps = dispatch =>({
    initSourceFinancementList : data => dispatch(getSourceFinancementData(data)),
    removeActeurField : ()=>dispatch(removeActeurField()),
    addveActeurField : ()=>dispatch(addActeurField())
})

const mapStateToProps = state => ({
    acteurFields : state.sourceFinancements.acteurtField
})
export default connect(mapStateToProps, mapDispatchToProps) (SourceFinancementForm);

