import './App.css';
/* import './main.scss'; */
import {Route, Switch} from 'react-router-dom';
import { lazy, useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import Dashboard from './admin/dashboard/dashboard.page';
import User from './admin/components/users/user.component';
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

const SignUp = lazy(()=> import('./components/sign-up/sign-up.component'));
const SignIn = lazy(()=> import('./components/sign-in/sign-in.component'));
const NotFound = lazy(()=> import('./pages/not-found/not-found-page'));

function App({currentUser, setCurrentUser}) {
  useEffect(()=>{
  let unsubscribeFromAuth = null;
    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
            setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
        });
        });
    }

      setCurrentUser(userAuth);
    });

    return ()=>{
        unsubscribeFromAuth();
    }
}, [])

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
        <AdminRouteDispatcher   exact path="/admin/users" component={User}/>
        
        <Suspense fallback={<div class="loader">Loading...</div>}>
          <Route  exact path="/sign-up" component={SignUp}/>
          <Route exact path="/sign-in" component={AuthPage}/>
         </Suspense>
      </Switch>
      );
}
const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
export default connect(mapStateToProps, mapDispatchToProps) (App);
