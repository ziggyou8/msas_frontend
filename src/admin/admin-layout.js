import React, { lazy, useEffect} from 'react';
import AdminSideBar from './components/sidbar/sidebar.component';
import AdminNavbar from './components/navbar/navbar.component';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useState } from 'react';



function AdminLayout (props)  {
      const [isLoaded, setIsloaded] =useState(false);

      useEffect(()=>{
          setIsloaded(true);
      },[])
    return(
        <div class="container-scroller">
            {isLoaded &&
            <Helmet>
            <script src="/assets/vendors/js/vendor.bundle.base.js" />
  
            <script src="/assets/vendors/chart.js/Chart.min.js" />
            
            <script src="/assets/js/off-canvas.js" />
            <script src="/assets/js/hoverable-collapse.js" />
            <script src="/assets/js/misc.js" />
            
            <script src="/assets/js/dashboard.js" />
            <script src="/assets/js/todolist.js" />
            </Helmet>}
      <AdminNavbar currentUser={props.currentUser}/>
      <div class="container-fluid page-body-wrapper">
       <AdminSideBar currentUser={props.currentUser}/>
        <div class="main-panel">
        <div class="content-wrapper">
          {props.children}
        </div>
          <footer class="footer">
            <div class="container-fluid clearfix">
              <span class="text-muted d-block text-center text-sm-left d-sm-inline-block">Copyright © Ip3-conseil.com</span>
              <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center"> Free <a href="https://www.bootstrapdash.com/bootstrap-admin-template/" target="_blank">Point E </a> Zone B</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
    )

};
const mapStateToProps = state =>({
    currentUser : state.user.currentUser
})
  
export default connect(mapStateToProps) (AdminLayout);