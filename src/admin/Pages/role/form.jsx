import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { swal } from "sweetalert";

function RoleForm(props) {
  const $ = window.$;
  const {
    initPermissionList,
    editedRole,
    initRoleList,
    resetRole,
    storeRole,
    updateRole,
    PermissionsList,
  } = props;
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset({
      name: editedRole?.name,
      permission_id: editedRole?.permission_id,
    });
    initPermissionList();
  }, [editedRole]);

  const resetForm = () => {
    reset();
    resetRole();
    editedRole?.permissions.forEach((permission) => {
      $("#permission option[data-id=" + permission + "]").attr(
        "selected",
        false
      );
    });
  };

  //!editedRole && $("#permission option").prop("selected", false).trigger( "change" );

  editedRole?.permissions.forEach((permission) => {
    $("#permission option[data-id=" + permission + "]").attr("selected", true);
  });

  const onSubmit = async (data, e) => {
    const { name, permission_id } = data;
    const roleData = { name, permission_id: [...permission_id] };
    if (editedRole) {
      updateRole(editedRole.id, roleData);
    } else {
      storeRole(roleData);
    }
    closeModal();
    initPermissionList();
    initRoleList();
    resetForm();
  };

  const closeModal = () => window.$("#exampleModal").modal("hide");

  return (
    <div
      className="modal fade"
      data-keyboard="false"
      data-backdrop="static"
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css"
        />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/i18n/defaults-*.min.js" />
      </Helmet>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              AJOUT D'UN RÔLES
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => resetForm()}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form id="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="name">Libellé</label>
                  <input
                    type="text"
                    disabled
                    className="form-control"
                    {...register("name", { required: true })}
                    id="name"
                    placeholder="name"
                  />
                  {errors.name && errors.name.type === "required" && (
                    <span className="text-danger">
                      Veuillez remplir ce champ
                    </span>
                  )}
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="permission_id">Permission</label>
                  <select
                    className="form-control select2"
                    multiple
                    data-actions-box="true"
                    data-live-search="true"
                    {...register("permission_id[]")}
                    id="permission"
                  >
                    {PermissionsList.map((permission) => (
                      <option
                        key={permission.id}
                        data-id={permission.name}
                        value={permission.id}
                      >
                        {permission.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => resetForm()}
                >
                  <i className="mdi mdi-close mdi-18px text-white align-left"></i>{" "}
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn btn-primary" /* onClick={()=> setTimeout(function() {$('#exampleModal').modal('hide')}, 4000)} */
                >
                  <i className="mdi mdi-check mdi-18px text-white align-left"></i>{" "}
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <Helmet>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.min.js"></script>
    </Helmet> */}
    </div>
  );
}

export default RoleForm;
