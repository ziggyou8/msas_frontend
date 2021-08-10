import React from 'react';
import './user.style.scss';
import UserForm from './form';
import { getUsersList, getUserById, fetchUsersStratAsync } from '../../../redux/user/user.actions';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { getData } from '../../../firebase/firebase.utils';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser, selectListUser, selectListUserWithoutAdmin, selectUserById } from '../../../redux/user/user.selector';
import axios from 'axios';
import { deleteItem } from '../../../assets/lib/alert';
import { getItem } from '../../../utilities/request.utility';

const User = ({initUsersList, usersList, currentUser, userById,getUserById})=>{

    useEffect(()=>{
        initUsersList();
    },[]);

    /* const init = async()=>{
     await axios.get('users').then(res=>initUsersList(res.data.data));
      } */

      const deleteUser = (id, libelle)=>{
         deleteItem('users', id, libelle).then(()=>initUsersList())
      }
      const getUser = (id)=>{
        axios.get(`users/${id}`).then(res=>getUserById(res.data.data))
      }
    return(
    <div>
        <UserForm initUsers={initUsersList} editedUser={userById} currentUser={currentUser} getUserById={getUserById}/>
        <div class="page-header">
            <h3 class="page-title">
            <span class="page-title-icon bg-gradient-primary text-white mr-2">
                <i class="mdi mdi-account"></i>
            </span> Utilisateurs
            </h3>
            <nav aria-label="breadcrumb">
            <ul class="breadcrumb">
                <button class="btn btn-primary text-white display1"  data-toggle="modal" data-target="#exampleModal" onClick={()=>getUserById(null)}><i class="mdi mdi-plus mdi-18px text-white align-left"></i> Utilisateur</button>
            </ul>
            </nav>
        </div>
        <div class="row">
            <div class="col-12 grid-margin">
            <div class="card">
                <div class="card-body">
                <h4 class="card-title">Liste des utilisateurs</h4>
                <div class="table-responsive">
                    <table class="table">
                    <thead>
                        <tr>
                            <th> Nom complet</th>
                            <th> Téléphone</th>
                            <th> Email</th>
                            <th> Action </th>
                        </tr>
                    </thead>
                    <tbody>
        
                       {usersList.map(user=>(
                            <tr>
                            <td>{user.nom_complet}</td>
                            <td>{user.telephone}</td>
                            <td>{user.email}</td>
                            <td> 
                                <div className="row">
                                <i class="mdi mdi-eye mdi-18px text-primary align-left mx-2" ></i>
                                <i class="mdi mdi-pencil mdi-18px text-primary align-left mx-2" data-toggle="modal" data-target="#exampleModal" onClick={()=>getUser(user.id)}></i>
                                <i class="mdi mdi-delete mdi-18px text-danger align-left mx-2" onClick={()=>deleteUser(user.id, user.nom_complet)} ></i>
                                </div> 
                                </td>
                            </tr>
                       ))}
                        {/* <tr>
                        <td>
                            <img src="/assets/images/faces/face2.jpg" class="mr-2" alt="image"/> Stella Johnson
                        </td>
                        <td> High loading time </td>
                        <td>
                            <label class="badge badge-gradient-warning">PROGRESS</label>
                        </td>
                        <td> Dec 12, 2017 </td>
                        <td> WD-12346 </td>
                        </tr>
                        <tr>
                        <td>
                            <img src="/assets/images/faces/face3.jpg" class="mr-2" alt="image" /> Marina Michel
                        </td>
                        <td> Website down for one week </td>
                        <td>
                            <label class="badge badge-gradient-info">ON HOLD</label>
                        </td>
                        <td> Dec 16, 2017 </td>
                        <td> WD-12347 </td>
                        </tr>
                        <tr>
                        <td>
                            <img src="/assets/images/faces/face4.jpg" class="mr-2" alt="image" /> John Doe
                        </td>
                        <td> Loosing control on server </td>
                        <td>
                            <label class="badge badge-gradient-danger">REJECTED</label>
                        </td>
                        <td> Dec 3, 2017 </td>
                        <td> WD-12348 </td>
                        </tr> */}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
            </div>
        </div>
   </div>
)};
const mapDispatchToProps = dispatch =>({
    //initUsersList : data => dispatch(getUsersList(data)),
    getUserById : data => dispatch(getUserById(data)),
    initUsersList:()=>dispatch(fetchUsersStratAsync())
})

const mapStateToProps = createStructuredSelector({
    usersList : selectListUser,
    currentUser : selectCurrentUser,
    userById : selectUserById
})
export default connect(mapStateToProps,mapDispatchToProps) (User);