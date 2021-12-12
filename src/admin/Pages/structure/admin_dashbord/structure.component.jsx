import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import "./structure.style.scss";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  fetchStructureAsync,
  fetchStructureByIdAsync,
  fetchStructureByTypeAsync,
  storeStructureAsync,
  updateStructureAsync,
  removeStructureAsync,
} from "../../../../redux/structure/structurethunk";
import {
  selectStructureList,
  selectStructureById,
  selectIsLoading,
} from "../../../../redux/structure/structure.selector";
import { selectCurrentUser } from "../../../../redux/user/user.selector";
import { selectListCollectivite } from "../../../../redux/collectivite/collectivite.selector";
import { fetchCollectiviteAsync } from "../../../../redux/collectivite/collectivite.thunk";
import Pagination from "../../../components/pagination/Pagination";
import StructureForm from "./form";

let PageSize = 8;
function Structure(props) {
  const {
    structures,
    getCurrentStructure,
    history,
    currentUser,
    ...otherProps
  } = props;
  const [allContries, setAllContries] = useState([
    { name: "Senegal" },
    { name: "Mali" },
    { name: "Gambi" },
    { name: "Etc.." },
  ]);

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = React.useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return structures?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, structures]);

  useEffect(() => {
    props.initStructureData();
    props.initCollectiviteList();
    //props.getCurrentStructure(1);
    //fetchAllContries(setAllContries);
    //fetching();
  }, []);

  const deleteStructure = (id, libelle) => {
    props.removeStructure(id, libelle);
    /*  props.initStructureData(); */
  };

  return (
    <div>
      <div class="content">
        <div class="container-fluid">
          <div class="page-title d-flex align-items-center justify-content-between">
            <h3>
              {" "}
              <FontAwesomeIcon icon={faBuilding} className="mr-1 mb-1" />
              GESTION DES STRUCTURES
            </h3>
            <button
              className="btn btn-primary btn-sm text-white display1"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              <span>
                <FontAwesomeIcon icon={faBuilding} className="mr-1" />
              </span>
              Ajouter une structure
            </button>
          </div>
          <div class="row mb-4">
            <div class="col-md-12 col-lg-12">
              {currentUser?.roles.includes("Admin") && (
                <StructureForm allContries={allContries} {...otherProps} />
              )}

              {/* {!currentUser?.roles.includes("Admin") && (
                <PriveSanteForm
                  allContries={allContries}
                  {...otherProps}
                  currentUser={currentUser}
                />
              )} */}

              <div class="card">
                <div class="card-header">
                  <h5 class="mb-0">Liste des structures de santé</h5>
                </div>
                <div class="card-body">
                  <p class="card-title"></p>
                  {props.isLoading ? (
                    <div className="">
                      <Skeleton count={7} height="40px" />
                    </div>
                  ) : (
                    <table
                      class="table table-hover table-sm table-bordered tab-beneficiaires"
                      /* id="dataTables-example" */
                      width="100%"
                    >
                      <thead>
                        <tr>
                          <th>DENOMINATION</th>
                          <th>SOURCE FINANCEMENT</th>
                          <th>SIEGE</th>
                          <th>EMAIL</th>
                          <th>PHONE</th>
                          <th>ACTIONS</th>
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
                                      src="/assets/admin/images/avatar.jpg"
                                      alt=""
                                    />
                                  </span>
                                  <span class="nom-benef">
                                    {item.denomination}
                                  </span>
                                </div>
                              </td>
                              <td>{item.source_financement}</td>
                              <td>{item.adresse_siege}</td>
                              <td>{item.email_siege}</td>
                              <td>{item.telephone_siege}</td>
                              <td>
                                <span>
                                  <FontAwesomeIcon
                                    className="mr-2"
                                    icon={faEye}
                                    color="grey"
                                    role="button"
                                    onClick={() =>
                                      history.push(
                                        `/admin/structures/${item.id}`
                                      )
                                    }
                                  />
                                  <FontAwesomeIcon
                                    className="mr-2"
                                    icon={faTrash}
                                    color="red"
                                    role="button"
                                    onClick={() =>
                                      deleteStructure(
                                        item.id,
                                        item.denomination
                                      )
                                    }
                                  />
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
              <Pagination
                className="pagination-bar mt-2 float-right mr-4"
                currentPage={currentPage}
                totalCount={structures.length}
                pageSize={PageSize}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  initStructureData: () => dispatch(fetchStructureAsync()),
  getCurrentStructure: (id) => dispatch(fetchStructureByIdAsync(id)),
  getStructureByType: (type) => dispatch(fetchStructureByTypeAsync(type)),

  storeStructure: (subUrl, data) => dispatch(storeStructureAsync(subUrl, data)),
  updateStructure: (id, data) => dispatch(updateStructureAsync(id, data)),
  removeStructure: (id, libelle) => dispatch(removeStructureAsync(id, libelle)),
  initCollectiviteList: () => dispatch(fetchCollectiviteAsync()),
});

const mapStateToProps = createStructuredSelector({
  structures: selectStructureList,
  structure: selectStructureById,
  collectiviteList: selectListCollectivite,
  currentUser: selectCurrentUser,
  isLoading: selectIsLoading,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Structure));
