import './App.css';
/* import './main.scss'; */
import {Route, Switch} from 'react-router-dom';
import { lazy, useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import Dashboard from './admin/dashboard/dashboard.page';
import Structure from './admin/Pages/structure/structure.component';
import AuthPage from './admin/Pages/auth/auth.page';
import Financement from './pages/financement/financement.page';
import NiveauExecution from './pages/niveau-execution/niveau-execution.page';
import PointVigilance from './pages/point-vigilance/point-vigilance.page';
import Documentation from './pages/documentation/documentation.page';
import MobilisationRessource from './pages/mobilisation-resource/mobilisation.page';
import AchatService from './pages/achat-service/achat-service.page';
import MiseEnCommun from './pages/mise-en-commun/mise-en-commun.page';
import HomePage from './pages/home/home.page';
import PublicLayout from './public-layout';
import AdminLayout from './admin/admin-layout';
import SourceFinancement from './admin/Pages/source-financement/source_financement.component';
import User from './admin/Pages/utilisateur/user.component';
import UserProfile from './admin/Pages/user-profile/user-profile';

const SignUp = lazy(()=> import('./components/sign-up/sign-up.component'));
const SignIn = lazy(()=> import('./components/sign-in/sign-in.component'));
const NotFound = lazy(()=> import('./pages/not-found/not-found-page'));

function App({currentUser, setCurrentUser}) {
 
const PublicRouteDispatcher = ({component: Component, ...rest}) => {  
  return (  
    <Route {...rest} render={matchProps => (  
      <PublicLayout>  
          <Component {...matchProps} />  
      </PublicLayout>  
    )} />  
  )  
};

const AdminRouteDispatcher = ({component: Component, ...rest}) => {  
  return (  
    <Route {...rest} render={matchProps => (  
      <AdminLayout>  
          <Component {...matchProps} />  
      </AdminLayout>  
    )} />  
  )  
};
  return  (
    
      <Switch>
        {/* <Route exact path="/" render={()=> currentUser ? <Redirect  to="admin/dashboard"/> : <PublicRoute /> } /> */}
        <PublicRouteDispatcher exact  path="/"  component={HomePage}/>
        <PublicRouteDispatcher exact path="/execution" component={NiveauExecution}/>
        <PublicRouteDispatcher exact path="/vigilance" component={PointVigilance}/>
        <PublicRouteDispatcher exact path="/documentation" component={Documentation}/>
        <PublicRouteDispatcher exact path="/mobilisation" component={MobilisationRessource}/>
        <PublicRouteDispatcher exact path="/achat-service" component={AchatService}/>
        <PublicRouteDispatcher exact path="/mise-en-commun" component={MiseEnCommun}/>
        <PublicRouteDispatcher exact path="/financement" component={Financement}/>

        <AdminRouteDispatcher exact path="/admin/dashboard" component={Dashboard}/>
        <AdminRouteDispatcher exact path="/admin/structures" component={Structure}/>
        <AdminRouteDispatcher exact path="/admin/source_financement" component={SourceFinancement}/>
        <AdminRouteDispatcher exact path="/admin/utilisateurs" component={User}/>
        <AdminRouteDispatcher exact path="/admin/utilisateurs/profile" component={UserProfile}/>
        
        <Suspense fallback={<div class="loader">Loading...</div>}>
          <Route  exact path="/sign-up" component={SignUp}/>
          <Route exact path="/sign-in" component={AuthPage}/>
         </Suspense>
      </Switch>
      );
}
/* const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
}); */
export default App;
