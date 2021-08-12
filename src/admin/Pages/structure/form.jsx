import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import firebase, { getData } from '../../../firebase/firebase.utils';
import {
    getStructureData,
    getTypeActeurData,
    getCurrentStructure
} from '../../../redux/structure/structure.action';
import { connect } from 'react-redux';
import {
    getSourceFinancementData,
    fetchSourceFinancementStratAsync
} from '../../../redux/source-financement/source-financement.action';
import { v4 as uuidv4 } from 'uuid';
import { selectCurrentStructure, selectTypeActeur } from '../../../redux/structure/structure.selector';
import { createStructuredSelector } from 'reselect';
import { selectSourceFinancementList } from '../../../redux/source-financement/source-financement.Selector';


function StructureForm(props) {
    const {initStructureData, sourceFinancements, 
           initSourceFiancementList, getTypeActeur, typeActeur, 
           currentStructure } = props;
    useEffect(()=>{
       // initData();
        initSourceFiancementList()
        
    },[])

    /* const initData = async ()=>{
        initSourceFiancementList(await getData('source_financement'));
    } */

    const [acteur, setActeur] = useState();

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async(data, e) => {
       if(!currentStructure){
            const id = uuidv4();
            const createdAt = new Date();
            firebase
            .firestore()
            .collection('structures')
            .add({id, createdAt, ...data});
       }else{
        firebase.firestore()
            .collection('structures').where('id', '==', currentStructure.id).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                     firebase.firestore().collection('structures').doc(doc.id).update(data)
                });
              });

              console.log(data)
       }
            e.target.reset();
            closeModal();

    }

    

    const $ = window.$;
    const closeModal = ()=> $('#exampleModal').modal('hide');

   
      /* typeActeur === null &&   getTypeActeur(sourceFinancements?.filter(source => source.source_financement ===  e.target.value)) */

    $('#source_investissement').change(function(e) {
        e.target.value && setActeur(sourceFinancements?.filter(source => source.acteurs.id ===  e.target.value));
        console.log('🎖', acteur)
        e.target && $('#type_acteur').find('option:eq(0)').prop('selected', true)

      });


      /* if ($('select').length > 0)
        $("select").select2({
            width: '100%'
        }); */
      

  return(
        <div class="modal fade"  id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">AJOUT D'UNE STRUCTURE</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                
                <form  onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                        <div class="form-group col-md-6">
                            <label for="denomination">Denomination</label>
                            <input type="text"  class="form-control" {...register("denomination", { required: true })} defaultValue={currentStructure ? currentStructure.denomination: ''} id="denomination" placeholder="la Dénomination" />
                            {errors.denomination && errors.denomination.type === "required" && <span class="text-danger">Veuillez remplir ce champ</span>}
                        </div>
                        <div class="form-group col-md-6">
                            <label for="address">Adress du siège</label>
                            <input type="text" class="form-control" {...register("addresse_siege")} defaultValue={currentStructure ? currentStructure.addresse_siege: ''}  id="addresse_siege" placeholder="Address du siège"/>
                        </div>

                        <div class="form-group col-md-6">
                            <label for="source_investissement">Source d'investissement</label>
                            <select   class="form-control" {...register("source_investissement", { required: true })} value={currentStructure && currentStructure.source_investissement} id="source_investissement">
                            <option  value="">Choisir....</option>
                                {sourceFinancements && sourceFinancements.map(finance =>(
                                    <option  value={finance.id}>{finance.denomination}</option>
                                ))}
                            </select>
                            {errors.source_investissement && errors.source_investissement.type === "required" && <span class="text-danger">Veuillez remplir ce champ</span>}
                        </div>
                       
                        <div class="form-group col-md-6">
                            <label for="source_investissement">Type d'acteur</label>
                            <select class="form-control" {...register("type_acteur", { required: true })} value={currentStructure && currentStructure.type_acteur} id="type_acteur">
                                {typeActeur?.map(finance =>(
                                    ["",...finance.acteurs].map(type=>(
                                        <option value={type ? type : ''}>{type ? type : 'choisir...'}</option>
                                    ))
                                ))/* : <option value="">Veuillez choisir d'abord le source d'investissement</option> */}
                            </select>
                            {errors.type_acteur && errors.type_acteur.type === "required" && <span class="text-danger">Veuillez remplir ce champ</span>}
                        </div>
                        <div class="form-group col-md-6">
                            <label for="telephone">Téléphone</label>
                            <input type="number" class="form-control" defaultValue={currentStructure ? currentStructure.telephone: ''} {...register("telephone")} id="telephone" placeholder="Téléphone"/>
                        </div>
                    </div>

                    <div className=" bg-white py-3">
                                <h6 className="px-4">Personne responsable</h6>
                             <div className="row bg-white mx-1  py-3">
                                <div class="form-group col-md-6">
                                    <label for="prenom">Prénom</label>
                                    <input type="text" class="form-control" defaultValue={currentStructure ? currentStructure.prenom: ''} {...register("prenom")} id="prenom" placeholder="Prénom"/>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="nom">Nom</label>
                                    <input type="text" class="form-control" defaultValue={currentStructure ? currentStructure.nom: ''}  {...register("nom")} id="nom" placeholder="Nom"/>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="email_responsable">email</label>
                                    <input type="email" class="form-control" defaultValue={currentStructure ? currentStructure.email_responsable: ''} {...register("email_responsable")} id="email_responsable" placeholder="Addresse email"/>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="telephone_responsable">Contact</label>
                                    <input type="number" class="form-control" defaultValue={currentStructure ? currentStructure.telephone_responsable: ''} {...register("telephone_responsable")} id="telephone_responsable" placeholder="Contact"/>
                                </div>
                             </div>
                        </div>
                        <div class="modal-footer">
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

const mapDispatchToProps = dispatch => ({
    initStructureData : data => dispatch(getStructureData(data)),
    initSourceFiancementList : () => dispatch(fetchSourceFinancementStratAsync()),
    getTypeActeur : data => dispatch(getTypeActeurData(data)),
})

const mapStateToProps = createStructuredSelector({
    sourceFinancements : selectSourceFinancementList,
    typeActeur : selectTypeActeur,
    currentStructure : selectCurrentStructure

    /* sourceFinancements : selectSourceFinancementList,
    typeActeur : selectCurrentStructure,
    currentStructure : selectCurrentStructure */
})
export default connect(mapStateToProps, mapDispatchToProps) (StructureForm);

