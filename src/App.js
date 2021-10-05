import './App.css';
import {Route, Switch} from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Structure from './admin/Pages/structure/structure.component';
import AuthPage from './admin/Pages/auth/auth.page';
import PublicLayout from './public-layout';
import AdminLayout from './admin/admin-layout';
import SourceFinancement from './admin/Pages/source-financement/source_financement.component';
import User from './admin/Pages/utilisateur/user.component';
import UserProfile from './admin/Pages/user-profile/user-profile';
import Role from './admin/Pages/role/role.component';
import districte from './admin/Pages/districte/districte.component';
import DetailStructure from './admin/Pages/structure/details';

const SignUp = lazy(()=> import('./components/sign-up/sign-up.component'));
const Accueil = lazy(()=> import('./vitrine/pages/accueil/accueil.page'));
const MobilisationRessource = lazy(()=> import('./vitrine/pages/mobilisation-resource/mobilisation.page'));
/* const NotFound = lazy(()=> import('./pages/not-found/not-found-page')); */

function App() {
 
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
        <AdminRouteDispatcher exact path="/admin/structures" component={Structure}/>
        <AdminRouteDispatcher exact path="/admin/source_financement" component={SourceFinancement}/>
        <AdminRouteDispatcher exact path="/admin/utilisateurs" component={User}/>
        <AdminRouteDispatcher exact path="/admin/utilisateurs/profile" component={UserProfile}/>
        <AdminRouteDispatcher exact path="/admin/roles" component={Role}/>
        <AdminRouteDispatcher exact path="/admin/districtes" component={districte}/>
        <AdminRouteDispatcher exact path="/admin/structures/:1" component={DetailStructure}/>
        
        <Suspense fallback={<div className="loader">Loading...</div>}>
          <Route  exact path="/sign-up" component={SignUp}/>
          <Route exact path="/sign-in" component={AuthPage}/>
          <Route exact path="/" component={Accueil}/>
          <Route exact path="/mobilisation" component={MobilisationRessource}/>
         </Suspense>
      </Switch>
      );
}
export default App;
