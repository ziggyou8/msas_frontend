import React from "react";
import { createStructuredSelector } from "reselect";
import "./user-profile.scss";
import {
  selectCurrentUser,
  isLoading,
} from "../../../redux/user/user.selector";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  fetchCurrentUserAsync,
  storeUserAsync,
  updateCurrentUserAsync,
} from "../../../redux/user/user.thunk";
import { storeItem } from "../../../utilities/request.utility";
import Skeleton from "react-loading-skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faCheck,
  faKey,
  faLock,
  faUser,
  faUserCircle,
  faUserCog,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";

function UserProfile({
  currentUser,
  setCurrentUser,
  updateCurrentUser,
  isLoading,
  history,
}) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    reset({
      prenom: currentUser?.prenom,
      nom: currentUser?.nom,
      email: currentUser?.email,
      telephone: currentUser?.telephone,
    });
  }, [currentUser]);

  const $ = window.$;
  const [encodedImage, setencodedImage] = useState();
  const [displayInfos, setDisplayInfo] = useState(true);
  const [updatePassword, setUpdatePassword] = useState(false);
  const [updateInfo, setUpdateInfo] = useState(false);

  const updateUserProfile = (param) => {
    if (param === "user-infos") {
      setDisplayInfo(true);
      setUpdatePassword(false);
      setUpdateInfo(false);
    } else if (param === "password") {
      setDisplayInfo(false);
      setUpdatePassword(true);
      setUpdateInfo(false);
    } else if (param === "update-info") {
      setDisplayInfo(false);
      setUpdatePassword(false);
      setUpdateInfo(true);
    }
  };

  async function traiteFile() {
    let base64; //in this variable i need the base64
    const selectedFile = document.getElementById("photo").files;
    const fileToLoad = selectedFile[0];
    await getBase64(fileToLoad).then((data) => {
      base64 = data;
    });
    document.getElementById("avatar").src = base64;
    document.getElementById("avatar").style.display = "block";
    setencodedImage(base64);
    //console.log(base64);
  }

  //This is my function for get base64, but not return the string base64
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      return Promise.resolve(reader.result);
    });
  }
  const inputPreTagSise = {
    width: "13rem",
  };

  const photoHandler = () => {
    traiteFile();
  };

  const onSubmit = async (data, e) => {
    data["photo"] = encodedImage;
    updateInfo && updateCurrentUser("update_profile", data);
    updatePassword && updateCurrentUser("update_password", data);
    setCurrentUser();
    e.preventDefault();
  };

  return (
    <div class="content">
      <div class="container-fluid">
        <div class="page-title d-flex align-items-center justify-content-between">
          <h3>
            {" "}
            <FontAwesomeIcon icon={faUserEdit} className="mr-1 mb-1" />
            PARAMETRAGE PROFILE
          </h3>
          <button
            className="btn btn-secondary btn-sm text-white display1"
            onClick={() => history.goBack()}
          >
            <span>
              <FontAwesomeIcon icon={faAngleDoubleLeft} className="mr-1" />
            </span>
            Retour
          </button>
        </div>

        <div class="row mb-4">
          <div class="col-md-12 col-lg-12">
            <div class="card">
              <div class="card-body">
                <p class="card-title"></p>

                <div className="bg-white pb-4">
                  <div className="p-3">
                    <h5>Mon profile</h5>
                    <h6 className="text-muted">Détails de mon profile</h6>
                  </div>
                  <div
                    class="btn-toolbar justify-content-end pt-3"
                    role="toolbar"
                    aria-label="Toolbar with button groups"
                  >
                    <div class="btn-group mr-1">
                      <button
                        type="button"
                        class="btn btn-sm  btn-primary"
                        onClick={() => updateUserProfile("user-infos")}
                      >
                        Mes infos
                        <FontAwesomeIcon icon={faUserCircle} className="ml-1" />
                      </button>
                    </div>
                    <div class="btn-group mr-1">
                      <button
                        type="button"
                        class="btn btn-sm btn-danger"
                        onClick={() => updateUserProfile("password")}
                      >
                        Changer mon mot de passe
                        <FontAwesomeIcon icon={faKey} className="ml-1" />
                      </button>
                    </div>
                    <div class="btn-group mr-3" role="group">
                      <button
                        type="button"
                        class="btn btn-sm btn-info text-white"
                        onClick={() => updateUserProfile("update-info")}
                      >
                        Mettre à jour mes infos
                        <FontAwesomeIcon icon={faUserCog} className="ml-1" />
                      </button>
                    </div>
                  </div>

                  <div className="row justify-content-end mr-2 mt-3 pb-4">
                    <div
                      id="photo_profile"
                      className="col-md-3"
                      style={{
                        backgroundImage: `url(${
                          currentUser && currentUser?.photo
                            ? currentUser?.photo
                            : "/assets/images/faces/avatar.png"
                        })`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        height: "350px",
                      }}
                    ></div>

                    {displayInfos && (
                      <div
                        class="list-group col-md-8 border rounded"
                        style={{ height: "350px" }}
                      >
                        <div className="row ml-0   pt-3 border-bottom bg-light ">
                          <strong className="col-md-3">Prénom :</strong>
                          <p className=" col-md-7 text-muted">
                            {currentUser?.prenom}
                          </p>
                        </div>
                        <div className="row ml-0   pt-3 border-bottom  ">
                          <strong className="col-md-3">Nom :</strong>
                          <p className=" col-md-7 text-muted">
                            {currentUser?.nom}
                          </p>
                        </div>
                        <div className="row ml-0   pt-3 border-bottom bg-light ">
                          <strong className="col-md-3">Email :</strong>
                          <p className=" col-md-7 text-muted">
                            {currentUser?.email}
                          </p>
                        </div>
                        <div className="row ml-0   pt-3 border-bottom  ">
                          <strong className="col-md-3">Téléphone :</strong>
                          <p className=" col-md-7 text-muted">
                            {currentUser?.telephone}
                          </p>
                        </div>
                        <div className="row ml-0   pt-3 border-bottom  bg-light">
                          <strong className="col-md-3">Rôle :</strong>
                          <p className=" col-md-7 text-muted">
                            {currentUser?.roles?.includes("Admin")
                              ? currentUser?.roles[0]
                              : "Point focal"}
                          </p>
                        </div>
                      </div>
                    )}

                    {updatePassword && (
                      <div
                        className="bg-white col-md-8 border rounded"
                        style={{ height: "350px" }}
                      >
                        {isLoading ? (
                          <Skeleton count={3} height="40px" className="mt-4" />
                        ) : (
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <div class="card-body">
                              <div class="input-group mb-3">
                                <div
                                  class="input-group-prepend"
                                  style={inputPreTagSise}
                                >
                                  <span
                                    class="input-group-text w-100"
                                    id="basic-addon1"
                                  >
                                    Ancien mot de passe
                                  </span>
                                </div>
                                <input
                                  type="password"
                                  {...register("old_password", {
                                    required: true,
                                  })}
                                  className={`form-control ${
                                    errors.old_password && "is-invalid"
                                  }`}
                                  placeholder="Ancien mot de passe"
                                  aria-label="old_password"
                                  aria-describedby="basic-addon1"
                                />
                              </div>
                              <div class="input-group mb-3">
                                <div
                                  class="input-group-prepend"
                                  style={inputPreTagSise}
                                >
                                  <span
                                    class="input-group-text w-100 "
                                    id="basic-addon1"
                                  >
                                    Nouveau mot de passe
                                  </span>
                                </div>
                                <input
                                  type="password"
                                  {...register("password", { required: true })}
                                  className={`form-control ${
                                    errors.password && "is-invalid"
                                  }`}
                                  placeholder="Nouveau mot de passe actuel"
                                  aria-label="password"
                                  aria-describedby="basic-addon1"
                                />
                              </div>
                              <div class="input-group mb-3">
                                <div
                                  class="input-group-prepend "
                                  style={inputPreTagSise}
                                >
                                  <span
                                    class="input-group-text w-100"
                                    id="basic-addon1"
                                  >
                                    Confirmation mot de passe
                                  </span>
                                </div>
                                <input
                                  type="password"
                                  {...register("confirm_password", {
                                    required: true,
                                  })}
                                  className={`form-control ${
                                    errors.confirm_password && "is-invalid"
                                  }`}
                                  placeholder="Confirmez votre mode pass"
                                  aria-label="confirm_password"
                                  aria-describedby="basic-addon1"
                                />
                              </div>
                            </div>
                            <button
                              type="submit"
                              className="btn btn-sm btn-success float-right"
                              style={{
                                position: "absolute",
                                bottom: "-50px",
                                right: "-2px",
                              }}
                            >
                              Enregistrer
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="ml-1"
                              />
                            </button>
                          </form>
                        )}
                      </div>
                    )}

                    {updateInfo && (
                      <ul
                        className="bg-white col-md-8 border rounded"
                        style={{ height: "350px" }}
                      >
                        {isLoading ? (
                          <Skeleton count={4} height="40px" className="mt-4" />
                        ) : (
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <div class="card-body">
                              <div className="row">
                                <div class="input-group mb-2 col-md-6">
                                  <div class="input-group-prepend">
                                    <span
                                      class="input-group-text"
                                      id="basic-addon1"
                                    >
                                      Prénom
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    {...register("prenom", { required: true })}
                                    className={`form-control ${
                                      errors.prenom && "is-invalid"
                                    }`}
                                    placeholder="Entrez votre prénom"
                                    aria-label="prenom"
                                    aria-describedby="basic-addon1"
                                  />
                                </div>

                                <div class="input-group mb-2 col-md-6">
                                  <div class="input-group-prepend">
                                    <span
                                      class="input-group-text"
                                      id="basic-addon1"
                                    >
                                      Nom
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    {...register("nom", { required: true })}
                                    className={`form-control ${
                                      errors.nom && "is-invalid"
                                    }`}
                                    placeholder="Entrez votre nom"
                                    aria-label="nom"
                                    aria-describedby="basic-addon1"
                                  />
                                </div>
                              </div>

                              <div className="d-flex no-gutters">
                                <div class="input-group mb-2 col-md-11">
                                  <div class="input-group-prepend">
                                    <span
                                      class="input-group-text"
                                      id="basic-addon1"
                                    >
                                      Photo
                                    </span>
                                  </div>
                                  <input
                                    type="file"
                                    {...register("photo")}
                                    onChange={photoHandler}
                                    class="form-control"
                                    aria-label="Photo"
                                    aria-describedby="basic-addon1"
                                    id="photo"
                                  />
                                </div>
                                <img
                                  className="col-md-1"
                                  src={
                                    currentUser?.photo
                                      ? currentUser?.photo
                                      : "/assets/images/faces/avatar.png"
                                  }
                                  style={{
                                    height: "50px",
                                    width: "70px",
                                  }}
                                  id="avatar"
                                />
                              </div>

                              <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                  <span
                                    class="input-group-text"
                                    id="basic-addon1"
                                  >
                                    Email
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  {...register("email", { required: true })}
                                  className={`form-control ${
                                    errors.email && "is-invalid"
                                  }`}
                                  placeholder="Entrez votre adresse email"
                                  aria-label="email"
                                  aria-describedby="basic-addon1"
                                />
                              </div>
                              <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                  <span
                                    class="input-group-text"
                                    id="basic-addon1"
                                  >
                                    Téléphone
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  {...register("telephone", { required: true })}
                                  className={`form-control ${
                                    errors.telephone && "is-invalid"
                                  }`}
                                  placeholder="Entrez votre N° téléphone"
                                  aria-label="telephone"
                                  aria-describedby="basic-addon1"
                                />
                              </div>
                            </div>
                            <button
                              type="submit"
                              className="btn btn-sm btn-success float-right"
                              style={{
                                position: "absolute",
                                bottom: "-50px",
                                right: "-2px",
                              }}
                            >
                              Enregistrer
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="ml-1"
                              />
                            </button>
                          </form>
                        )}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isLoading: isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: () => dispatch(fetchCurrentUserAsync()),
  updateCurrentUser: (subUrl, data) => dispatch(storeUserAsync(subUrl, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
