import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import firebase, { auth, getData, firestore, secondaryApp } from '../../../firebase/firebase.utils';
import { getStructureData, getTypeActeurData } from '../../../redux/structure/structure.action';
import { connect } from 'react-redux';
import {
    getSourceFinancementData
} from '../../../redux/source-financement/source-financement.action';
import { getUsersList } from '../../../redux/user/user.actions';
import axios from 'axios';
import { storeItem, updateItem } from '../../../utilities/request.utility';


function UserForm({initUsers, currentUser, editedUser, getUserById}) {
    

    const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm();

    useEffect(()=>{
        /* initSourceFiancementList(await getData('source_financement')); */
      reset({ prenom: editedUser?.nom_complet.split(' ')[0],
             nom: editedUser?.nom_complet.split(' ')[1],
             email: editedUser?.email,
             telephone: editedUser?.telephone,
            });
    },[editedUser]);

    const resetForm =()=>{
        reset();
        getUserById();
    }



    const onSubmit = async(data, e) => {
        const {nom, prenom, email, telephone, roles} = data;
        const userData = {nom_complet:`${prenom} ${nom}` ,email, telephone}
         if (editedUser) {
            await updateItem('users', editedUser.id, userData)
            .then(()=>{
                getUserById(null);
            })
            .catch(err=>alert(err.message))
         }else{
            await storeItem('users', userData)
            .then(()=>{
                getUserById(null);
            })
            .catch(err=>alert(err.message))
         }
         
         closeModal();
         initUsers();

         
    }
    const closeModal = ()=> window.$('#exampleModal').modal('hide');

    
  return(
        <div class="modal fade"  data-keyboard="false" data-backdrop="static"  id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">AJOUT D'UN UTILISATEUR</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                
                <form  onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                        <div class="form-group col-md-6">
                            <label for="prenom">Prénom</label>
                            <input type="text"  class="form-control" {...register("prenom", { required: true })}  id="prenom" placeholder="Prénom" />
                            {errors.prenom && errors.prenom.type === "required" && <span class="text-danger">Veuillez remplir ce champ</span>}
                        </div>
                        <div class="form-group col-md-6">
                            <label for="nom">Nom</label>
                            <input type="text" class="form-control" {...register("nom", { required: true })} id="nom" placeholder="Nom"/>
                        </div>

                        <div class="form-group col-md-6">
                            <label for="telephone">Téléphone</label>
                            <input type="text" class="form-control" {...register("telephone")} id="telephone" placeholder="+221 ...."/>
                        </div>
                        
                        <div class="form-group col-md-6">
                            <label for="email">Email</label>
                            <input type="text" class="form-control" {...register("email")} id="email" placeholder="Email"/>
                        </div>

                        {/* <div class="form-group col-md-6">
                            <label for="telephone">Rôles</label>
                            <select class="form-control" {...register("roles")} id="roles">
                                <option value="">CHoisir...</option>
                                <option value="ADMIN">ADMIN</option>
                                <option value="ADMIN">REDACTEUR</option>
                            </select>
                        </div> */}

                        {/* <div class="form-group col-md-6">
                            <label for="source_investissement">Source d'investissement</label>
                            <select   class="form-control" {...register("source_investissement", { required: true })} id="source_investissement">
                            <option  value="">Choisir....</option>
                                {sourceFinancements && sourceFinancements.map(finance =>(
                                    <option value={finance.source_financement}>{finance.source_financement}</option>
                                ))}
                            </select>
                            {errors.source_investissement && errors.source_investissement.type === "required" && <span class="text-danger">Veuillez remplir ce champ</span>}
                        </div> */}
                    
                    </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={()=>resetForm()}><i class="mdi mdi-close mdi-18px text-white align-left"></i> Annuler</button>
                            <button type="submit" class="btn btn-primary"  /* onClick={()=> setTimeout(function() {$('#exampleModal').modal('hide')}, 4000)} */><i class="mdi mdi-check mdi-18px text-white align-left"></i> Enregistrer</button>
                        </div>
                </form>
            </div>
      </div>
    </div>
  </div>
    )
};

/* const mapDispatchToProps = dispatch => ({
    initUsersList : data => dispatch(getUsersList(data))
}) */

/* const mapStateToProps = state =>({
    sourceFinancements : state.sourceFinancements.sourceFinancements,
    typeActeur : state.structure.typeActeur
}) */
export default UserForm;

