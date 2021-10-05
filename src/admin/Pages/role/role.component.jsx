import React from 'react';
import './role.style.scss';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { fetchPermissionsAsync, fetchRoleByIdAsync, fetchRolesAsync, removeRoleAsync, storeRoleAsync, updateRoleAsync } from '../../../redux/role/role.thunk';
import {
    selectListRole,
    selectRoleById,
    selectListPermission
} from '../../../redux/role/role.selector';
import { resetEditedUser } from '../../../redux/user/user.actions';
import RoleForm from './form';
import { resetEditedRole } from '../../../redux/role/role.actions';
import { Helmet } from 'react-helmet';

const Role = (props)=>{
    const { rolesList ,getRoleById, removeRole, ...otherProps} = props;
    const $ = window.$;


    useEffect(()=>{
        props.initRoleList();
    },[]);

      const deleteRole = (id, libelle)=>{
        removeRole(id, libelle);
      }

      const resetFormAndInitListRole = ()=>{
        getRoleById(null);
        props.initRoleList();
     }

    return(
    <div>
        <RoleForm {...otherProps}/>
        <div className="page-header">
            <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white mr-2">
                <i className="mdi mdi-function"></i>
            </span> Rôles
            </h3>
            <nav aria-label="breadcrumb">
            <ul className="breadcrumb">
                <button className="btn btn-primary text-white display1"  data-toggle="modal" data-target="#exampleModal" onClick={()=>resetFormAndInitListRole()}><i className="mdi mdi-plus mdi-18px text-white align-left"></i> Rôles</button>
            </ul>
            </nav>
        </div>
        <div className="row">
            <div className="col-12 grid-margin">
            <div className="card">
                <div className="card-body">
                <h4 className="card-title">Liste des rôles</h4>
                <div className="table-responsive">
                    <table className="table">
                    <thead>
                        <tr>
                            <th> Libelle</th>
                            <th> Permissions</th>
                            <th> Action </th>
                        </tr>
                    </thead>
                    <tbody>
        
                       {rolesList.map(role=>(
                            <tr key={role.id}>
                            <td>{role.name}</td>
                            <td>{role.permissions.map(permission=>(
                                <div className="badge badge-primary mx-1">{permission}</div>
                                ))} 
                            </td>
                            <td> 
                                <div className="row" style={{ display:'inline-block' }}>
                                <i className="mdi mdi-eye mdi-18px text-primary align-left mx-2" ></i>
                                <i className="mdi mdi-pencil mdi-18px text-primary align-left mx-2" style={{ margin:'0px -15px' }} data-toggle="modal" data-target="#exampleModal" onClick={()=>getRoleById(role.id)}></i>
                                <i className="mdi mdi-delete mdi-18px text-danger align-left mx-2" onClick={()=>deleteRole(role.id, role.name)} ></i>
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
    resetRole : ()=>dispatch(resetEditedRole()),
    getRoleById : id => dispatch(fetchRoleByIdAsync(id)),
    storeRole: data => dispatch(storeRoleAsync(data)),
    updateRole: (id, data) => dispatch(updateRoleAsync(id, data)),
    removeRole: (id, libelle) => dispatch(removeRoleAsync(id, libelle)),
    initRoleList:()=>dispatch(fetchRolesAsync()),
    initPermissionList:()=>dispatch(fetchPermissionsAsync()),

})

const mapStateToProps = createStructuredSelector({
    //usersList : selectListUser,
    editedRole : selectRoleById,
    rolesList : selectListRole,
    PermissionsList : selectListPermission,

})
export default connect(mapStateToProps,mapDispatchToProps) (Role);