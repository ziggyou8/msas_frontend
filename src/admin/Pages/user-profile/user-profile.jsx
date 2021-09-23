import React from 'react';
import { createStructuredSelector } from 'reselect';
import './user-profile.scss'
import { selectCurrentUser } from '../../../redux/user/user.selector';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { fetchCurrentUserAsync, updateCurrentUserAsync } from '../../../redux/user/user.thunk';


function UserProfile ({currentUser, setCurrentUser, updateCurrentUser}){

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    useEffect(()=>{
        reset({ 
        prenom: currentUser?.data?.prenom,
        nom: currentUser?.data?.nom,
        email: currentUser?.data?.email,
        telephone: currentUser?.data?.telephone,
       });
    },[currentUser?.data])

    console.log('✅✅', currentUser?.data)
    
    const onSubmit = async(data, e) => {
        e.preventDefault();
        const {old_password, new_password, confirm_password, prenom, nom, email, telephone} = data;
        const isValid = old_password !== "" && new_password === confirm_password;
        const userData = {
                prenom,
                nom,
                email,
                telephone,
                password: new_password
        }
        if(!isValid){
            console.log('Mot de pass ne correspondent pas')
        }
        updateCurrentUser(currentUser?.data.id, userData);

     }
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
        <div class="container light-style flex-grow-1 container-p-y">
                <div class="page-header">
                <h3 class="page-title">
                    <span class="page-title-icon bg-gradient-primary text-white mr-2">
                    <i class="mdi mdi-settings"></i>
                    </span> Paramètrage compte
                </h3>
                </div>
            <div class="card overflow-hidden">
            <div class="row no-gutters row-bordered row-border-light">
                <div class="col-md-3 pt-0">
                <div class="list-group list-group-flush account-settings-links">
                    <a class="list-group-item list-group-item-action active" data-toggle="list" href="#account-general">General</a>
                    <a class="list-group-item list-group-item-action" data-toggle="list" href="#account-change-password">Change mot de passe</a>
                    <a class="list-group-item list-group-item-action" data-toggle="list" href="#account-info">Infos</a>
                    {/* <a class="list-group-item list-group-item-action" data-toggle="list" href="#account-social-links">Social links</a>
                    <a class="list-group-item list-group-item-action" data-toggle="list" href="#account-connections">Connections</a>
                    <a class="list-group-item list-group-item-action" data-toggle="list" href="#account-notifications">Notifications</a> */}
                </div>
                </div>
                <div class="col-md-9">
                <div class="tab-content">
                    <div class="tab-pane fade active show" id="account-general">
                    <div class="card-body media align-items-center">
                        <img src={ currentUser && currentUser?.data?.photo ? `${currentUser?.data?.photo}` : '/assets/images/faces/avatar.png'} alt="Profile" class="d-block ui-w-80" />
                    </div>
                    <hr class="border-light m-0" />
                    <div class="card-body">
                        <div class="form-group">
                            <label class="form-label">Prenom</label>
                            <input type="text" class="form-control mb-1" {...register("prenom", { required: true })}  />
                          {/* {errors.prenom && errors.prenom.type === "required" && <span class="text-danger">Veuillez remplir ce champ</span>} */}
                        </div>
                        <div class="form-group">
                            <label class="form-label">Nom</label>
                            <input type="text" class="form-control" {...register("nom", { required: true })}  />
                        </div>
                        <div class="form-group">
                            <label class="form-label">Email</label>
                            <input type="text" disabled  class="form-control mb-1" {...register("email", { required: true })}  />
                        </div>
                        <div class="form-group">
                            <label class="form-label">Téléphone</label>
                            <input type="tel" class="form-control" {...register("telephone", { required: true })} />
                        </div>
                    </div>

                    </div>
                    <div class="tab-pane fade" id="account-change-password">
                    <div class="card-body pb-2">

                        <div class="form-group">
                        <label class="form-label">Mot de passe actuel</label>
                        <input type="password" {...register("old_password")} class="form-control" />
                        </div>

                        <div class="form-group">
                        <label class="form-label">Nouveau mot de passe</label>
                        <input type="password" {...register("new_password")} class="form-control" />
                        </div>

                        <div class="form-group">
                        <label class="form-label">Confirmation mot de passe</label>
                        <input type="password" {...register("confirm_password")} class="form-control" />
                        </div>

                    </div>
                    </div>
                    {/* <div class="tab-pane fade" id="account-info">
                    <div class="card-body pb-2">

                        <div class="form-group">
                        <label class="form-label">Bio</label>
                        <textarea class="form-control" rows="5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nunc arcu, dignissim sit amet sollicitudin iaculis, vehicula id urna. Sed luctus urna nunc. Donec fermentum, magna sit amet rutrum pretium, turpis dolor molestie diam, ut lacinia diam risus eleifend sapien. Curabitur ac nibh nulla. Maecenas nec augue placerat, viverra tellus non, pulvinar risus.</textarea>
                        </div>
                        <div class="form-group">
                        <label class="form-label">Birthday</label>
                        <input type="text" class="form-control" value="May 3, 1995" />
                        </div>
                        <div class="form-group">
                        <label class="form-label">Country</label>
                        <select class="custom-select">
                            <option>USA</option>
                            <option selected="">Canada</option>
                            <option>UK</option>
                            <option>Germany</option>
                            <option>France</option>
                        </select>
                        </div>

                    </div>
                    <hr class="border-light m-0" />
                    <div class="card-body pb-2">

                        <h6 class="mb-4">Contacts</h6>
                        <div class="form-group">
                        <label class="form-label">Phone</label>
                        <input type="text" class="form-control" value="+0 (123) 456 7891" />
                        </div>
                        <div class="form-group">
                        <label class="form-label">Website</label>
                        <input type="text" class="form-control" value="" />
                        </div>

                    </div>
            
                    </div> */}
                    {/* <div class="tab-pane fade" id="account-social-links">
                    <div class="card-body pb-2">

                        <div class="form-group">
                        <label class="form-label">Twitter</label>
                        <input type="text" class="form-control" value="https://twitter.com/user" />
                        </div>
                        <div class="form-group">
                        <label class="form-label">Facebook</label>
                        <input type="text" class="form-control" value="https://www.facebook.com/user" />
                        </div>
                        <div class="form-group">
                        <label class="form-label">Google+</label>
                        <input type="text" class="form-control" value="" />
                        </div>
                        <div class="form-group">
                        <label class="form-label">LinkedIn</label>
                        <input type="text" class="form-control" value="" />
                        </div>
                        <div class="form-group">
                        <label class="form-label">Instagram</label>
                        <input type="text" class="form-control" value="https://www.instagram.com/user" />
                        </div>

                    </div>
                    </div>
                    <div class="tab-pane fade" id="account-connections">
                    <div class="card-body">
                        <button type="button" class="btn btn-twitter">Connect to <strong>Twitter</strong></button>
                    </div>
                    <hr class="border-light m-0" />
                    <div class="card-body">
                        <h5 class="mb-2">
                        <a href="javascript:void(0)" class="float-right text-muted text-tiny"><i class="ion ion-md-close"></i> Remove</a>
                        <i class="ion ion-logo-google text-google"></i>
                        You are connected to Google:
                        </h5>
                        nmaxwell@mail.com
                    </div>
                    <hr class="border-light m-0" />
                    <div class="card-body">
                        <button type="button" class="btn btn-facebook">Connect to <strong>Facebook</strong></button>
                    </div>
                    <hr class="border-light m-0" />
                    <div class="card-body">
                        <button type="button" class="btn btn-instagram">Connect to <strong>Instagram</strong></button>
                    </div>
                    </div>
                    <div class="tab-pane fade" id="account-notifications">
                    <div class="card-body pb-2">

                        <h6 class="mb-4">Activity</h6>

                        <div class="form-group">
                        <label class="switcher">
                            <input type="checkbox" class="switcher-input" checked="" />
                            <span class="switcher-indicator">
                            <span class="switcher-yes"></span>
                            <span class="switcher-no"></span>
                            </span>
                            <span class="switcher-label">Email me when someone comments on my article</span>
                        </label>
                        </div>
                        <div class="form-group">
                        <label class="switcher">
                            <input type="checkbox" class="switcher-input" checked="" />
                            <span class="switcher-indicator">
                            <span class="switcher-yes"></span>
                            <span class="switcher-no"></span>
                            </span>
                            <span class="switcher-label">Email me when someone answers on my forum thread</span>
                        </label>
                        </div>
                        <div class="form-group">
                        <label class="switcher">
                            <input type="checkbox" class="switcher-input" />
                            <span class="switcher-indicator">
                            <span class="switcher-yes"></span>
                            <span class="switcher-no"></span>
                            </span>
                            <span class="switcher-label">Email me when someone follows me</span>
                        </label>
                        </div>
                    </div>
                    <hr class="border-light m-0" />
                    <div class="card-body pb-2">

                        <h6 class="mb-4">Application</h6>

                        <div class="form-group">
                        <label class="switcher">
                            <input type="checkbox" class="switcher-input" checked="" />
                            <span class="switcher-indicator">
                            <span class="switcher-yes"></span>
                            <span class="switcher-no"></span>
                            </span>
                            <span class="switcher-label">News and announcements</span>
                        </label>
                        </div>
                        <div class="form-group">
                        <label class="switcher">
                            <input type="checkbox" class="switcher-input" />
                            <span class="switcher-indicator">
                            <span class="switcher-yes"></span>
                            <span class="switcher-no"></span>
                            </span>
                            <span class="switcher-label">Weekly product updates</span>
                        </label>
                        </div>
                        <div class="form-group">
                        <label class="switcher">
                            <input type="checkbox" class="switcher-input" checked="" />
                            <span class="switcher-indicator">
                            <span class="switcher-yes"></span>
                            <span class="switcher-no"></span>
                            </span>
                            <span class="switcher-label">Weekly blog digest</span>
                        </label>
                        </div>

                    </div>
                    </div> */}
                </div>
                </div>
            </div>
            </div>

            <div class="text-right mt-3">
            <input type="submit" class="btn btn-primary" value="Enregistrer" />&nbsp;
            <button type="button" class="btn btn-default">Annuler</button>
            </div>

        </div>
  </form>

    )
}

const mapStateToProps = createStructuredSelector({
    currentUser :selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: () => dispatch(fetchCurrentUserAsync()),
    updateCurrentUser: (id, data) => dispatch(updateCurrentUserAsync(id, data))
  });

export default connect(mapStateToProps, mapDispatchToProps) (UserProfile);