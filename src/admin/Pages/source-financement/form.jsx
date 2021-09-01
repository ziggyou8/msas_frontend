import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import firebase, { firestore, getData } from '../../../firebase/firebase.utils';
import { connect } from 'react-redux';
import {
    addActeurField,
    getSourceFinancementData, removeActeurField
} from '../../../redux/source-financement/source-financement.action';
import {
    fetchSourceFinancementAsync
} from '../../../redux/source-financement/source-financement.thunk';


 


function SourceFinancementForm(props) {
     
   const {initSourceFinancementList, storeSourceFinancement, resetSourceFinancement, sourceFinancementById, updateSourceFinancement, acteurFields} = props;
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const [field, setField]=useState(0);


    useEffect(()=>{
        reset({ 
            denomination: sourceFinancementById?.denomination,
            type_acteur: sourceFinancementById?.type_acteur
           });
           /* initPermissionList(); */
   },[sourceFinancementById]);

    const resetForm =()=>{
        reset();
        resetSourceFinancement();
        /* resetRole();
        editedRole?.permissions.forEach(permission =>{
            $('#permission option[data-id=' + permission + ']').attr('selected', false)
        }) */
    }

    const addField =()=>{
        setField(prevCount => prevCount + 1);
        props.addActeurField();
    }

    const removeField =()=>{
        setField(prevCount => prevCount - 1);
        removeActeurField();
    }
    const onSubmit = async(data, e) => {

        const { denomination, type_acteur:[...type_acteur]} = data;
        const financeData = {denomination, type_acteur:type_acteur.filter(type => type !== undefined)}
         if (sourceFinancementById) {
           updateSourceFinancement(sourceFinancementById.id, financeData);
           console.log('++++UPDATE TESTE++++',financeData)
         }else{
           storeSourceFinancement(financeData);
           console.log('++++STORE TESTE++++',financeData)
         }
         closeModal();
         initSourceFinancementList();
         resetForm();

    }

    /* sourceFinancementById?.acteurs.forEach(acteur =>{
        $('#permission option[data-id=' + acteur + 1 + ']').attr('selected', true)
    }) */
    
    const $ = window.$;
    const closeModal = ()=> $('#exampleModal').modal('hide');

  return(
        <div class="modal fade"  id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">AJOUT D'UNE SOURCE DE FINANCEMENT</h5>
                    <button type="button" onClick={()=>resetForm()} class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                
                <form  onSubmit={handleSubmit(onSubmit)}>
                <div className="">
                        <div class="form-group">
                            <label for="denomination">Source de financement</label>
                            <input type="text"  class="form-control" {...register("denomination", { required: true })} id="denomination" placeholder="la Dénomination" />
                            {errors.denomination && errors.denomination.type === "required" && <span class="text-danger">Veuillez remplir ce champ</span>}
                        </div>
                    </div>

                    <div className=" bg-white py-3">
                                <h6 className="px-4">Types d'acteur</h6>
                             <div className=" bg-white mx-1  py-3">
                                 {!sourceFinancementById? [...Array(acteurFields)].map((acteur, i) =>
                                    <div class="form-group mx-5" key={i}>
                                        <label for={`type_acteur${i+1}`}>Acteur {i+1}</label>
                                        <input type="text" class="form-control" {...register(`type_acteur[${i+1}]`, { required: true })} id={`type_addField${i+1}`} placeholder={`Acteur ${i+1}`}/>
                                        {errors[`type_acteur${i+1}`] && errors[`type_acteur${i+1}`].type === "required" && <span class="text-danger">Veuillez remplir ce champ</span>}
                                    </div>
                                ): [...Array(sourceFinancementById.acteurs.length+field)].map((acteur, i) =>
                                <div class="form-group mx-5" key={i}>
                                    <label for={`type_acteur${i+1}`}>Acteur {i+1}</label>
                                    <input type="text" defaultValue={sourceFinancementById?.acteurs[i]?.libelle} class="form-control" {...register(`type_acteur[${i+1}]`)} id={`type_addField${i+1}`} placeholder={`Acteur ${i+1}`}/>
                                    {errors[`type_acteur${i+1}`] && errors[`type_acteur${i+1}`].type === "required" && <span class="text-danger">Veuillez remplir ce champ</span>}
                                </div>
                            )}
                                 <hr />
                                    <button type="button" className="btn btn-sm float-right " disabled = {`${acteurFields === 1  ? 'disabled': ''}`} onClick={()=>removeField()} ><i class="mdi mdi-delete mdi-18px text-danger "></i></button>
                                    <button type="button" className="btn btn-sm float-right" onClick={()=>addField()} ><i class="mdi mdi-plus mdi-18px text-danger "></i></button>                                 
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
    initSourceFinancementList : () => dispatch(fetchSourceFinancementAsync()),
    removeActeurField : ()=>dispatch(removeActeurField()),
    addActeurField : ()=>dispatch(addActeurField())
})

const mapStateToProps = state => ({
    acteurFields : state.sourceFinancements.acteurtField
})
export default connect(mapStateToProps, mapDispatchToProps) (SourceFinancementForm);

