import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';


function UserForm(props) {
    
    const {initUsersList, editedUser, resetUser, storeUser,updateUser, rolesList, initRoleList, initStructureData, structures} = props;
    const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm();
    const [encodedImage, setencodedImage] = useState();
    const $ = window.$;


    

    useEffect(()=>{
         reset({ 
             prenom: editedUser?.prenom,
             nom: editedUser?.nom,
             email: editedUser?.email,
             telephone: editedUser?.telephone,
            });


            initRoleList();
            initStructureData();

        const $ = window.$;
        $('#photo').on('change', traiteFile);
        
    },[editedUser]);

    const resetForm =()=>{
        reset();
        resetUser();
        if(editedUser){
            $('#role option[data-id=' + editedUser.roles[0] + ']').attr('selected', false);
            structures?.forEach(structure =>{
                $('#structures option[data-id=' + structure.denomination + ']').attr('selected', false)
            })
        }
    }


    if(editedUser){
        $('#role option[data-id=' + editedUser.roles[0] + ']').attr('selected', true);
        editedUser?.structures?.forEach(structure =>{
            $('#structures option[data-id=' + structure.denomination + ']').attr('selected', true)
        })
    }


    async function traiteFile() {
        let base64; //in this variable i need the base64
        const selectedFile = document.getElementById("photo").files;
        const fileToLoad = selectedFile[0];
        await getBase64(fileToLoad).then(
          data => {
            base64 = data;
          }
        );
        document.getElementById('avatar').src = base64;
        document.getElementById('avatar').style.display = 'block';
        setencodedImage(base64)
        //console.log(base64);
      }
      
      //This is my function for get base64, but not return the string base64
      function getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
          return Promise.resolve(reader.result)
        });
      }

    const onSubmit = async(data, e) => {
        const {nom, prenom, email, telephone, role, structure_id} = data;
        const userData = {prenom, nom,email, telephone,structure_id:[...structure_id], photo:encodedImage, role}
         if (editedUser) {
            updateUser(editedUser.id, userData);
         }else{
            storeUser(userData);
         }
         closeModal();
         initUsersList();
         resetForm();
    }

    const closeModal = ()=> window.$('#exampleModal').modal('hide');
    
  return(
        <div class="modal fade"  data-keyboard="false" data-backdrop="static"  id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">AJOUT D'UN UTILISATEUR</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={()=>resetForm()}>
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                
                <form  onSubmit={handleSubmit(onSubmit)}>
                <img style={{height: "70px", width: "70px", display:'none', borderRadius:'50%'}} id="avatar" /* src="" *//>
                <div className="row">
                        <div class="form-group col-md-6">
                            <label for="prenom">Photo</label>
                            <input type="file" id="photo"  class="form-control" {...register("photo")}  id="photo" placeholder="Prénom" />
                            {errors.photo && errors.photo.type === "required" && <span class="text-danger">Veuillez remplir ce champ</span>}
                        </div>
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

                        <div class="form-group col-md-6">
                            <label for="telephone">Rôles</label>
                            <select class="form-control" {...register("role")} id="role">
                                <option value="">CHoisir...</option>
                                {rolesList?.map(role=>(
                                    <option data-id={role.name} value={role.name}>{role.name}</option>
                                ))}
                            </select>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="telephone">Structures</label>
                            <select class="form-control" multiple {...register("structure_id[]")} id="structures">
                                <option value="">CHoisir...</option>
                                {structures?.map(structure=>(
                                    <option data-id={structure.denomination} value={structure.id}>{structure.denomination}</option>
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

export default UserForm;

