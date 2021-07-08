import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import firebase, { getData } from '../../../firebase/firebase.utils';
import { getStructureData, getTypeActeurData } from '../../../redux/structure/structure.action';
import { connect } from 'react-redux';
import {
    getSourceFinancementData
} from '../../../redux/source-financement/source-financement.action';


function StructureForm({initStructureData, sourceFinancements, initSourceFiancementList, getTypeActeur, typeActeur}) {

    useEffect(async()=>{
        initSourceFiancementList(await getData('source_financement'));
    },[])

    /* const [typeActeur, setTypeActeur] =useState(); */

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async(data, e) => {
        const createdAt = new Date();
        firebase
        .firestore()
        .collection('structures')
        .add({createdAt, ...data});
            e.target.reset();
            initStructureData(await getData('structures'))
            closeModal();
    }

    

    const $ = window.$;
    const closeModal = ()=> $('#exampleModal').modal('hide');

    $('#source_investissement').change(function(e) {
        /* console.log(e.target.find('option:eq(0)')) */
        e.target.value && getTypeActeur(e.target.value);
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
                            <input type="text"  class="form-control" {...register("denomination", { required: true })} id="denomination" placeholder="la Dénomination" />
                            {errors.denomination && errors.denomination.type === "required" && <span class="text-danger">Veuillez remplir ce champ</span>}
                        </div>
                        <div class="form-group col-md-6">
                            <label for="address">Adress du siège</label>
                            <input type="text" class="form-control" {...register("addresse_siege")} id="addresse_siege" placeholder="Address du siège"/>
                        </div>
                        {/* <div class="form-group col-md-6">
                            <label for="source_investissement">Source d'investissement</label>
                            <input type="text" class="form-control"  {...register("source_investissement", { required: true })}  id="source_investissement" placeholder="Source d'investissement" />
                            {errors.source_investissement && errors.source_investissement.type === "required" && <span class="text-danger">Veuillez remplir ce champ</span>}
                        </div> */}

                        <div class="form-group col-md-6">
                            <label for="source_investissement">Source d'investissement</label>
                            <select   class="form-control" {...register("source_investissement", { required: true })} id="source_investissement">
                            <option  value="">Choisir....</option>
                                {sourceFinancements && sourceFinancements.map(finance =>(
                                    <option value={finance.source_financement}>{finance.source_financement}</option>
                                ))}
                            </select>
                            {errors.source_investissement && errors.source_investissement.type === "required" && <span class="text-danger">Veuillez remplir ce champ</span>}
                        </div>
                        {/* <div class="form-group col-md-6">
                            <label for="type_acteur">Type d'acteur</label>
                            <input type="text" class="form-control" {...register("type_acteur")} id="type_acteur" placeholder="Type d'acteur"/>
                        </div> */}
                        <div class="form-group col-md-6">
                            <label for="source_investissement">Type d'acteur</label>
                            <select class="form-control" {...register("type_acteur", { required: true })} id="type_acteur">
                                {typeActeur ?  sourceFinancements.filter(source => source.source_financement === typeActeur).map(finance =>(
                                    ["",...finance.type_acteur].map(type=>(
                                        <option value={type ? type : ''}>{type ? type : 'choisir...'}</option>
                                    ))
                                )): <option value="">Veuillez choisir d'abord le source d'investissement</option>}
                            </select>
                            {errors.type_acteur && errors.type_acteur.type === "required" && <span class="text-danger">Veuillez remplir ce champ</span>}
                        </div>
                        <div class="form-group col-md-6">
                            <label for="telephone">Téléphone</label>
                            <input type="number" class="form-control" {...register("telephone")} id="telephone" placeholder="Téléphone"/>
                        </div>
                    </div>

                    <div className=" bg-white py-3">
                                <h6 className="px-4">Personne responsable</h6>
                             <div className="row bg-white mx-1  py-3">
                                <div class="form-group col-md-6">
                                    <label for="personne_responsable">Prénom</label>
                                    <input type="text" class="form-control" {...register("prenom")} id="prenom" placeholder="Prénom"/>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="nom">Nom</label>
                                    <input type="text" class="form-control" {...register("nom")} id="nom" placeholder="Nom"/>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="email_responsable">email</label>
                                    <input type="email" class="form-control" {...register("email_responsable")} id="email_responsable" placeholder="Addresse email"/>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="telephone_responsable">Contact</label>
                                    <input type="number" class="form-control" {...register("telephone_responsable")} id="telephone_responsable" placeholder="Contact"/>
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
    {/* <Helmet>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.8/js/select2.min.js"></script>
    </Helmet> */}
  </div>
    )
};

const mapDispatchToProps = dispatch => ({
    initStructureData : data => dispatch(getStructureData(data)),
    initSourceFiancementList : data => dispatch(getSourceFinancementData(data)),
    getTypeActeur : data => dispatch(getTypeActeurData(data))
})

const mapStateToProps = state =>({
    sourceFinancements : state.sourceFinancements.sourceFinancements,
    typeActeur : state.structure.typeActeur
})
export default connect(mapStateToProps, mapDispatchToProps) (StructureForm);

