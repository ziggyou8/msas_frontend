import React from 'react';
import './user.style.scss';
import UserForm from './form';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { selectListUser, selectUserById } from '../../../redux/user/user.selector';
import { fetchUsersAsync, fetchUserByIdAsync, storeUserAsync, updateUserAsync, removeUserAsync } from '../../../redux/user/user.thunk';
import { fetchRoleByIdAsync, fetchRolesAsync } from '../../../redux/role/role.thunk';
import { selectListRole } from '../../../redux/role/role.selector';
import { resetEditedUser } from '../../../redux/user/user.actions';
import { fetchStructureAsync } from '../../../redux/structure/structurethunk';
import { selectStructureList } from '../../../redux/structure/structure.selector';

const User = (props)=>{
    const { usersList ,getUserById, removeUser, ...otherProps} = props;

    useEffect(()=>{
        props.initUsersList();
    },[]);

      const deleteUser = (id, libelle)=>{
         removeUser(id, libelle);
      }

      const resetFormAndInitListRole = ()=>{
        getUserById(null);
        props.initRoleList();
     }
     

    return(
    <div>
        <UserForm {...otherProps}/>
        <div className="page-header">
            <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white mr-2">
                <i className="mdi mdi-account"></i>
            </span> Utilisateurs
            </h3>
            <nav aria-label="breadcrumb">
            <ul className="breadcrumb">
                <button className="btn btn-primary text-white display1"  data-toggle="modal" data-target="#exampleModal" onClick={()=>resetFormAndInitListRole()}><i className="mdi mdi-plus mdi-18px text-white align-left"></i> Utilisateur</button>
            </ul>
            </nav>
        </div>
        <div className="row">
            <div className="col-12 grid-margin">
            <div className="card">
                <div className="card-body">
                <h4 className="card-title">Liste des utilisateurs</h4>
                <div className="table-responsive">
                    <table className="table">
                    <thead>
                        <tr>
                            <th> photo</th>
                            <th> Nom complet</th>
                            <th> Téléphone</th>
                            <th> Email</th>
                            <th> Action </th>
                        </tr>
                    </thead>
                    <tbody>
        
                       {usersList.map(user=>(
                            <tr key={user.id}>
                            <td>
                            <img style={{ border:'1px solid black' }} src={user.photo ? `${user.photo}` : '/assets/images/faces/avatar.png'} /* src="/assets/images/faces/face4.jpg" */ className="mr-2" alt="image" />
                            </td>
                            <td>{user.prenom} {user.nom}</td>
                            <td>{user.telephone}</td>
                            <td>{user.email}</td>
                            <td> 
                                <div className="row" style={{ display:'inline-block' }}>
                                <i className="mdi mdi-eye mdi-18px text-primary align-left mx-2"></i>
                                <i className="mdi mdi-pencil mdi-18px text-primary align-left mx-2" style={{ margin:'0px -15px' }} data-toggle="modal" data-target="#exampleModal" onClick={()=>getUserById(user.id)}></i>
                                <i className="mdi mdi-delete mdi-18px text-danger align-left mx-2" onClick={()=>deleteUser(user.id, user.nom)} ></i>
                                </div> 
                                </td>
                            </tr>
                       ))}
                        {/* <tr>
                        <td>
                            <img src="/assets/images/faces/face2.jpg" className="mr-2" alt="image"/> Stella Johnson
                        </td>
                        <td> High loading time </td>
                        <td>
                            <label className="badge badge-gradient-warning">PROGRESS</label>
                        </td>
                        <td> Dec 12, 2017 </td>
                        <td> WD-12346 </td>
                        </tr>
                        <tr>
                        <td>
                            <img src="/assets/images/faces/face3.jpg" className="mr-2" alt="image" /> Marina Michel
                        </td>
                        <td> Website down for one week </td>
                        <td>
                            <label className="badge badge-gradient-info">ON HOLD</label>
                        </td>
                        <td> Dec 16, 2017 </td>
                        <td> WD-12347 </td>
                        </tr>
                        <tr>
                        <td>
                            <img src="/assets/images/faces/face4.jpg" className="mr-2" alt="image" /> John Doe
                        </td>
                        <td> Loosing control on server </td>
                        <td>
                            <label className="badge badge-gradient-danger">REJECTED</label>
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
    resetUser : ()=>dispatch(resetEditedUser()),
    getUserById : id => dispatch(fetchUserByIdAsync(id)),
    initUsersList:()=>dispatch(fetchUsersAsync()),
    storeUser: data => dispatch(storeUserAsync(data)),
    updateUser: (id, data) => dispatch(updateUserAsync(id, data)),
    removeUser: (id, libelle) => dispatch(removeUserAsync(id, libelle)),

    initRoleList:()=>dispatch(fetchRolesAsync()),
    initStructureData: () => dispatch(fetchStructureAsync()),


})

const mapStateToProps = createStructuredSelector({
    usersList : selectListUser,
    editedUser : selectUserById,
    //roles
    rolesList : selectListRole,
    //structure
    structures: selectStructureList,

})
export default connect(mapStateToProps,mapDispatchToProps) (User);