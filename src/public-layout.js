import './App.css';
import { Suspense } from 'react';
import BanierePub from './components/share/baniere-pup/baniere-pub.component';
import Footer from './components/share/footer/footer.component';
import Header from './components/share/header/header.component';
import Navbar from './components/share/navbar/navbar.component';

function PublicLayout ({children}){

    return(
        <div className="App body-content">
        <BanierePub/>
        <Header/>
        <Navbar/>
          <Suspense fallback={<div class="loader">Loading...</div>}>
            {children}
          </Suspense>
         <Footer/> 
    </div>
    )
};

export default PublicLayout;