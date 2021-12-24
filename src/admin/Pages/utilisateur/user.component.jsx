import React, { useState } from "react";
import "./user.style.scss";
import UserForm from "./form";
import { connect } from "react-redux";
import { useEffect } from "react";
import { createStructuredSelector } from "reselect";
import {
  selectListUser,
  selectUserById,
} from "../../../redux/user/user.selector";
import {
  fetchUsersAsync,
  fetchUserByIdAsync,
  storeUserAsync,
  updateUserAsync,
  removeUserAsync,
  activateUserStatusdAsync,
} from "../../../redux/user/user.thunk";
import {
  fetchRoleByIdAsync,
  fetchRolesAsync,
} from "../../../redux/role/role.thunk";
import { selectListRole } from "../../../redux/role/role.selector";
import { resetEditedUser } from "../../../redux/user/user.actions";
import { fetchStructureAsync } from "../../../redux/structure/structurethunk";
import { selectStructureList } from "../../../redux/structure/structure.selector";
import Pagination from "../../components/pagination/Pagination";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { faToggleOff } from "@fortawesome/free-solid-svg-icons";
import {
  faEye,
  faPlus,
  faTrash,
  faTrashAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

let PageSize = 8;
const User = (props) => {
  const {
    usersList,
    getUserById,
    removeUser,
    activateUserStatus,
    ...otherProps
  } = props;

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = React.useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return usersList?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, usersList]);

  useEffect(() => {
    props.initUsersList();
  }, []);

  const deleteUser = (id, libelle) => {
    removeUser(id, libelle);
  };

  const userStatusActivation = (id) => {
    activateUserStatus(id);
    props.initUsersList();
  };

  const resetFormAndInitListRole = () => {
    getUserById(null);
    props.initRoleList();
  };

  return (
    <div class="content">
      <div class="container-fluid">
        <div class="page-title d-flex align-items-center justify-content-between">
          <h3>
            {" "}
            <FontAwesomeIcon icon={faUser} className="mr-1 mb-1" />
            GESTION DES UTILISATEURS
          </h3>
          <button
            className="btn btn-primary btn-sm text-white display1"
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={() => resetFormAndInitListRole()}
          >
            <span>
              <FontAwesomeIcon icon={faUser} className="mr-1" />
            </span>
            Ajouter un utilisateur
          </button>
        </div>

        <div class="row mb-4">
          <div class="col-md-12 col-lg-12">
            <UserForm {...otherProps} />
            <div class="card">
              <div class="card-header">
                <h5 class="mb-0">Liste des utilisateurs</h5>
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
                      <th> NOM COMPLET</th>
                      <th> TELEPHONE</th>
                      <th> EMAIL</th>
                      <th> RÔLE</th>
                      <th> ETAT</th>
                      <th> ACTIONS </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTableData?.map((item) => {
                      return (
                        <tr>
                          <td>
                            {" "}
                            <div class="benef">
                              <span class="avatar-benef">
                                <img
                                  src={
                                    item.photo
                                      ? `${item.photo}`
                                      : "/assets/images/faces/avatar.png"
                                  }
                                />
                              </span>
                              <span class="nom-benef">
                                {item.prenom} {item.nom}
                              </span>
                            </div>
                          </td>
                          <td>{item.telephone}</td>
                          <td>{item.email}</td>
                          <td>{item.roles[0]}</td>
                          <td>
                            {item.actif ? (
                              <span className="actif">Activé</span>
                            ) : (
                              <span className="complet">Desactivé</span>
                            )}
                          </td>
                          <td>
                            <span>
                              <FontAwesomeIcon
                                className="mr-2"
                                icon={faPowerOff}
                                color={`${item.actif ? "red" : "green"}`}
                                role="button"
                                onClick={() => userStatusActivation(item.id)}
                              />
                              <FontAwesomeIcon
                                className="mr-2"
                                icon={faEye}
                                color="grey"
                                role="button"
                                /* onClick={() =>
                                  history.push(`/admin/structures/${item.id}`)
                                } */
                              />
                              <FontAwesomeIcon
                                className="mr-2"
                                icon={faTrash}
                                color="red"
                                role="button"
                                onClick={() => deleteUser(item.id, item.prenom)}
                              />
                            </span>
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
              totalCount={usersList.length}
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
  resetUser: () => dispatch(resetEditedUser()),
  getUserById: (id) => dispatch(fetchUserByIdAsync(id)),
  activateUserStatus: (id) => dispatch(activateUserStatusdAsync(id)),
  initUsersList: () => dispatch(fetchUsersAsync()),
  storeUser: (data) => dispatch(storeUserAsync(data)),
  updateUser: (id, data) => dispatch(updateUserAsync(id, data)),
  removeUser: (id, libelle) => dispatch(removeUserAsync(id, libelle)),

  initRoleList: () => dispatch(fetchRolesAsync()),
  initStructureData: () => dispatch(fetchStructureAsync()),
});

const mapStateToProps = createStructuredSelector({
  usersList: selectListUser,
  editedUser: selectUserById,
  //roles
  rolesList: selectListRole,
  //structure
  structures: selectStructureList,
});
export default connect(mapStateToProps, mapDispatchToProps)(User);
