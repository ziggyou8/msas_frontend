import React, { lazy, useEffect} from 'react';
import AdminSideBar from './components/sidbar/sidebar.component';
import AdminNavbar from './components/navbar/navbar.component';
import { connect } from 'react-redux';
import { useState } from 'react';
import { auth, createUserProfileDocument } from '../firebase/firebase.utils';
import { setCurrentUser, fetchCurrentUserStratAsync } from '../redux/user/user.actions';
import axios from 'axios';



function AdminLayout ({setCurrentUser, currentUser, children})  {
   
  useEffect(()=>{
    
   //await axios.get('user').then(res=>setCurrentUser(res.data))
    setCurrentUser()
    //initCurrentUser();
    
}, [])

/* const initCurrentUser = async()=>{
  await axios.get('user').then(res=>setCurrentUser(res.data))
} */

    return(
        <div class="container-scroller">
          
    
     <AdminNavbar currentUser={currentUser}/>
      <div class="container-fluid page-body-wrapper">
       <AdminSideBar currentUser={currentUser}/>
        <div class="main-panel">
        <div class="content-wrapper">
           {children}
        </div>
          <footer class="footer">
            <div class="container-fluid clearfix">
              <span class="text-muted d-block text-center text-sm-left d-sm-inline-block">Copyright © Ip3-conseil.com</span>
              <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center"> <a href="#">Point E Zone B</a></span>
            </div>
          </footer>
        </div>
      </div>
    </div>
    )

};
const mapStateToProps = state => ({
    currentUser: state.user.currentUser
  });
  const mapDispatchToProps = dispatch => ({
    //setCurrentUser: user => dispatch(setCurrentUser(user)),
    setCurrentUser: () => dispatch(fetchCurrentUserStratAsync())
  });
  
export default connect(mapStateToProps, mapDispatchToProps) (AdminLayout);