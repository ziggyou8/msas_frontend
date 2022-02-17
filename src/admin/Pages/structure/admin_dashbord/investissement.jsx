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
import {
  fetchInvestissementByIdAsync,
  fetchInvestissementsAsync,
} from "../../../../redux/investissement/investissement.thunk";
import {
  selectListInvestissementByStructure,
  selectListInvestissement,
  selectInvestissementById,
} from "../../../../redux/investissement/investissement.selector";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faDonate } from "@fortawesome/free-solid-svg-icons";
import SpsEpsEditForm from "./SpsEpsEditForm";

let PageSize = 8;
function Investissements(props) {
  const {
    structures,
    getCurrentStructure,
    history,
    currentUser,
    investissementData,
    investissements,
    investissementsById,
    fetchInvestissementById,
    isLoading,
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
    return investissements?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, investissements]);

  useEffect(() => {
    props.investissementData();
    props.initCollectiviteList();
  }, []);

  const deleteStructure = (id, libelle) => {
    props.removeStructure(id, libelle);
    /*  props.initStructureData(); */
  };

  const editInvestisement = (id) => {
    fetchInvestissementById(id);
  };

  return (
    <div>
      <div class="content Title">
        <div class="container-fluid bg-title">
          <div class="page-title d-flex align-items-center justify-content-between">
            <h3>
              <FontAwesomeIcon icon={faDonate} className="mr-1 mb-1" />
              GESTION DES INVESTISSEMENTS
            </h3>
          </div>
        </div>
        
        <div class="container-fluid dash-content">
          <div class="row mb-4">
            <div class="col-md-12 col-lg-12">
              <SpsEpsEditForm
                {...otherProps}
                //fetchInvestissement={fetchInvestissement}
                currentUser={currentUser}
                investissementsById={investissementsById}
                isLoading={isLoading}
              />

              <div class="card">
                <div class="card-header">
                  <h5 class="mb-0">Liste des investissements</h5>
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
                          <th>LOGO</th>
                          <th>ANNEE</th>
                          <th>SOURCE FINANCEMENT</th>
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
                                    {item.structure.denomination}
                                  </span>
                                </div>
                              </td>
                              <td>{item?.annee}</td>
                              <td>{item.structure?.source_financement}</td>
                              <td>
                                <span>
                                  <FontAwesomeIcon
                                    className="mr-2"
                                    icon={faEye}
                                    color="grey"
                                    role="button"
                                    onClick={() =>
                                      history.push(
                                        `/admin/investissements/${item.id}`
                                      )
                                    }
                                  />
                                  {/* <FontAwesomeIcon
                                    className="mr-2"
                                    icon={faPen}
                                    color="grey"
                                    role="button"
                                    data-toggle="modal"
                                    data-target="#editModal"
                                    onClick={() => editInvestisement(item.id)}
                                  /> */}
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
  investissementData: () => dispatch(fetchInvestissementsAsync()),
  initCollectiviteList: () => dispatch(fetchCollectiviteAsync()),
  fetchInvestissementById: (id) => dispatch(fetchInvestissementByIdAsync(id)),

  /*  initStructureData: () => dispatch(fetchStructureAsync()),
  getCurrentStructure: (id) => dispatch(fetchStructureByIdAsync(id)),
  getStructureByType: (type) => dispatch(fetchStructureByTypeAsync(type)),

  storeStructure: (subUrl, data) => dispatch(storeStructureAsync(subUrl, data)),
  updateStructure: (id, data) => dispatch(updateStructureAsync(id, data)),
  removeStructure: (id, libelle) => dispatch(removeStructureAsync(id, libelle)),
   */
});

const mapStateToProps = createStructuredSelector({
  structures: selectStructureList,
  investissements: selectListInvestissement,
  collectiviteList: selectListCollectivite,
  /* structure: selectStructureById,
  currentUser: selectCurrentUser */
  isLoading: selectIsLoading,
  investissementsById: selectInvestissementById,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Investissements));
