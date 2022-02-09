import React, { useState } from "react";
import "./role.style.scss";
import { connect } from "react-redux";
import { useEffect } from "react";
import { createStructuredSelector } from "reselect";
import {
  fetchPermissionsAsync,
  fetchRoleByIdAsync,
  fetchRolesAsync,
  removeRoleAsync,
  storeRoleAsync,
  updateRoleAsync,
} from "../../../redux/role/role.thunk";
import {
  selectListRole,
  selectRoleById,
  selectListPermission,
} from "../../../redux/role/role.selector";
import { resetEditedUser } from "../../../redux/user/user.actions";
import RoleForm from "./form";
import { resetEditedRole } from "../../../redux/role/role.actions";
import { Helmet } from "react-helmet";
import Pagination from "../../components/pagination/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPen,
  faTrash,
  faTrashAlt,
  faUser,
  faUserCog,
} from "@fortawesome/free-solid-svg-icons";

let PageSize = 8;
const Role = (props) => {
  const { rolesList, getRoleById, removeRole, ...otherProps } = props;
  const $ = window.$;
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = React.useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return rolesList?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, rolesList]);

  useEffect(() => {
    props.initRoleList();
  }, []);

  const deleteRole = (id, libelle) => {
    removeRole(id, libelle);
  };

  const resetFormAndInitListRole = () => {
    getRoleById(null);
    props.initRoleList();
  };

  return (
    <div class="content Title">
      <div class="container-fluid bg-title">
        <div class="page-title d-flex align-items-center justify-content-between">
          <h3>
            {" "}
            <FontAwesomeIcon icon={faUserCog} className="mr-1 mb-1" />
            GESTION DES RÔLES
          </h3>
          {/* <button
            className="btn btn-sm btn-primary text-white display1"
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={() => resetFormAndInitListRole()}
          >
            <span>
              <FontAwesomeIcon icon={faUserCog} className="mr-1" />
            </span>
            Ajouter un rôle
          </button> */}
        </div>
      </div>
      
      <div class="container-fluid dash-content">
        <div class="row mb-4">
          <div class="col-md-12 col-lg-12">
            <RoleForm {...otherProps} />
            <div class="card">
              <div class="card-header">
                <h5 class="mb-0">Liste des rôles</h5>
              </div>
              <div class="card-body">
                <p class="card-title"></p>
                <table
                  class="table table-hover table-sm table-bordered tab-beneficiaires"
                  /* id="dataTables-example" */
                  width="100%"
                >
                  <thead>
                    <tr>
                      <th> LIBELLE</th>
                      <th> PERMISSIONS</th>
                      <th> ACTIONS </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTableData?.map((item) => {
                      return (
                        <tr>
                          <td>{item.name}</td>
                          <td>
                            <div className="d-flex">
                              {item.permissions.map((permission) => (
                                <span className="actif mr-2">{permission}</span>
                              ))}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex">
                              {/*  <FontAwesomeIcon
                                className="mr-2"
                                icon={faEye}
                                color="grey"
                                role="button"
                                onClick={() =>
                                  history.push(`/admin/structures/${item.id}`)
                                }
                              /> */}
                              <FontAwesomeIcon
                                className="mr-2"
                                icon={faPen}
                                color="grey"
                                role="button"
                                data-toggle="modal"
                                data-target="#exampleModal"
                                onClick={() => getRoleById(item.id)}
                              />
                              {/* <FontAwesomeIcon
                                className="mr-2"
                                icon={faTrash}
                                color="red"
                                role="button"
                                onClick={() => deleteRole(item.id, item?.name)}
                              /> */}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <Pagination
              className="pagination-bar mt-2 float-right mr-4"
              currentPage={currentPage}
              totalCount={rolesList.length}
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  resetRole: () => dispatch(resetEditedRole()),
  getRoleById: (id) => dispatch(fetchRoleByIdAsync(id)),
  storeRole: (data) => dispatch(storeRoleAsync(data)),
  updateRole: (id, data) => dispatch(updateRoleAsync(id, data)),
  removeRole: (id, libelle) => dispatch(removeRoleAsync(id, libelle)),
  initRoleList: () => dispatch(fetchRolesAsync()),
  initPermissionList: () => dispatch(fetchPermissionsAsync()),
});

const mapStateToProps = createStructuredSelector({
  //usersList : selectListUser,
  editedRole: selectRoleById,
  rolesList: selectListRole,
  PermissionsList: selectListPermission,
});
export default connect(mapStateToProps, mapDispatchToProps)(Role);
