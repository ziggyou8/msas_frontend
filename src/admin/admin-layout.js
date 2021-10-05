import React, { lazy, useEffect} from 'react';
import AdminSideBar from './components/sidbar/sidebar.component';
import AdminNavbar from './components/navbar/navbar.component';
import { connect } from 'react-redux';
import { fetchCurrentUserAsync } from '../redux/user/user.thunk';
/* import '../assets/style-admin.css'; */
import {Helmet} from "react-helmet";


function AdminLayout ({setCurrentUser, currentUser,isLoading, children})  {
   
  useEffect(()=>{
    setCurrentUser()
}, [])

    return(
     <div className="container-scroller">
      <Helmet>
        <link  rel="stylesheet" href="/assets/css/style-admin.css" />
      </Helmet>
     <AdminNavbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <div className="container-fluid page-body-wrapper">
       <AdminSideBar currentUser={currentUser}/>
        <div className="main-panel">
        <div className="content-wrapper">
           {children}
        </div>
          <footer className="footer">
            <div className="container-fluid clearfix">
              <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">Copyright © Ip3-conseil.com</span>
              <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center"> <a href="#">Point E Zone B</a></span>
            </div>
          </footer>
        </div>
      </div>
    </div>
    )

};
const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    isLoading: state.user.isFetching
  });
  const mapDispatchToProps = dispatch => ({
    setCurrentUser: () => dispatch(fetchCurrentUserAsync())

  });
  
export default connect(mapStateToProps, mapDispatchToProps) (AdminLayout);