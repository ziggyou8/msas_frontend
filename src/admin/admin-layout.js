import React, { lazy, useEffect } from "react";
import AdminSideBar from "./components/sidbar/sidebar.component";
import AdminNavbar from "./components/navbar/navbar.component";
import { connect } from "react-redux";
import { fetchCurrentUserAsync } from "../redux/user/user.thunk";
import { ToastContainer } from "react-toastify";

function AdminLayout({ setCurrentUser, currentUser, isLoading, children }) {
  useEffect(() => {
    setCurrentUser();

    const $ = window.$;
    $("#sidebarCollapse").on("click", function () {
      $("#sidebar").toggleClass("active");
      $("#body").toggleClass("active");
    });
  }, []);

  return (
    <div class="wrapper">
      <AdminSideBar currentUser={currentUser} />
      <div id="body" class="">
        <AdminNavbar
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
        <ToastContainer limit={1} />
        {children}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  isLoading: state.user.isFetching,
});

/* const mapStateToProps = createStructuredSelector({
  isLoading: isLoading,
  currentUser: selectCurrentUser,
}); */
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: () => dispatch(fetchCurrentUserAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout);
