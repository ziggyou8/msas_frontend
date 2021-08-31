import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';


function RoleForm(props) {
    const $ = window.$;
    const {initPermissionList, editedRole,initRoleList, resetRole, storeRole,updateRole,PermissionsList} = props;
    const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm();

    

    useEffect(()=>{
         reset({ 
             name: editedRole?.name,
             permission_id: editedRole?.permission_id
            });
            initPermissionList();
    },[editedRole]);

    const resetForm =()=>{
        reset();
        resetRole();
        editedRole?.permissions.forEach(permission =>{
            $('#permission option[data-id=' + permission + ']').attr('selected', false)
        })
    }

    //!editedRole && $("#permission option").prop("selected", false).trigger( "change" );

    editedRole?.permissions.forEach(permission =>{
        $('#permission option[data-id=' + permission + ']').attr('selected', true)
    })


    const onSubmit = async(data, e) => {
        const { name, permission_id} = data;
        const roleData = {name, permission_id:[...permission_id]}
         if (editedRole) {
           updateRole(editedRole.id, roleData);
           
         }else{
           storeRole(roleData);
         }
         closeModal();
         initPermissionList();
         initRoleList();
         resetForm();

    }

    const closeModal = ()=> window.$('#exampleModal').modal('hide');
    
  return(
        <div class="modal fade"  data-keyboard="false" data-backdrop="static"  id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">AJOUT D'UN RÔLES</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={()=>resetForm()}>
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                
                <form id="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                        <div class="form-group col-md-6">
                            <label for="name">Libellé</label>
                            <input type="text"  class="form-control" {...register("name", { required: true })}  id="name" placeholder="name" />
                            {errors.name && errors.name.type === "required" && <span class="text-danger">Veuillez remplir ce champ</span>}
                        </div>
                        <div class="form-group col-md-6">
                            <label for="permission_id">Rôles</label>
                            <select class="form-control" {...register("permission_id[]")} id="permission" multiple>
                                <option>CHoisir...</option>
                                {PermissionsList.map(permission=>(
                                    <option data-id={permission.name} value={permission.id}>{permission.name}</option>
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

