import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';


function RoleForm(props) {
    
    const {initPermissionList, editedRole, resetUser, storeRole,updateRole,PermissionsList} = props;
    const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm();

    

    useEffect(()=>{
         reset({ 
             prenom: editedRole?.name,
             roles: editedRole?.roles
            });
            initPermissionList();
/*         const $ = window.$;
        $('#photo').on('change', traiteFile); */

    },[editedRole]);

    const resetForm =()=>{
        reset();
        //resetUser();
    }

    const onSubmit = async(data, e) => {
        const { name, permission_id} = data;
        const roleData = {name, permission_id:[...permission_id]}
         /* if (editedRole) {
           updateRole(editedUser.id, roleData);
         }else{
           storeRole(roleData);
           console.log('🔥🔥',roleData)
         } */
         storeRole(roleData);
         console.log('🔥🔥',roleData)

         closeModal();
         initPermissionList();
         resetForm();
         console.log(roleData);
    }

    const closeModal = ()=> window.$('#exampleModal').modal('hide');
    
  return(
        <div class="modal fade"  data-keyboard="false" data-backdrop="static"  id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">AJOUT D'UN Role</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={()=>resetForm()}>
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                
                <form  onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                        <div class="form-group col-md-6">
                            <label for="prenom">name</label>
                            <input type="text"  class="form-control" {...register("name", { required: true })}  id="prenom" placeholder="Prénom" />
                            {errors.nom && errors.nom.type === "required" && <span class="text-danger">Veuillez remplir ce champ</span>}
                        </div>
                        <div class="form-group col-md-6">
                            <label for="telephone">Rôles</label>
                            <select class="form-control" {...register("permission_id[]")} id="permission_id" multiple>
                                <option>CHoisir...</option>
                                {PermissionsList.map(permission=>(
                                    <option value={permission.id}>{permission.name}</option>
                                ))}
                            </select>
                        </div>

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

export default RoleForm;

