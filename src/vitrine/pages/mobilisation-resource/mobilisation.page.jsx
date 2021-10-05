import React from 'react';
import './mobilisation.style.css';
import {ReactComponent as LinkedInLightIcon} from '../../../assets/icons/linkedIn.svg';
import {ReactComponent as TwiterLightIcon}  from '../../../assets/icons/twiter.svg';
import {ReactComponent as FaceBookLightIcon}  from '../../../assets/icons/facebook.svg';
import {ReactComponent as ForwordIcon}  from '../../../assets/icons/retour.svg';
import {ReactComponent as EngagementIcon}  from '../../../assets/icons/engagement.svg';
import {ReactComponent as BesoinIcon}  from '../../../assets/icons/besoin.svg';
import {ReactComponent as MobilisationIcon}  from '../../../assets/icons/mobilisation.svg';
import {ReactComponent as NiveauExecutionIcon}  from '../../../assets/icons/niv-execution.svg';
import logo from '../../../assets/vitrine/Assets/images/minist.png';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ChangingProgressProvider from '../../../components/ChangingProgressProvider';

import { Link } from 'react-router-dom';
function MobilisationRessource(){

    return(
 
  
  <div>
    <div className="header">
    <div className="header-content row d-flex  align-items-center m-auto">
      <div className="col-md-8 col-sm-12 px-0">
        <p className="title fw-bold" style={{ fontSize:'2.5vh', textAlign: 'justify'}}>PLATEFORME NUMERIQUE DE SUIVI DU FINANCEMENT DE LA SANTE AU SENEGAL</p>
      </div>
      <div className="col-md-4 col-sm-12  rs reseaux-sociaux ">
        <ul className="d-flex" style={{ marginRight: '-1rem' }}>
        <p className="">Nous suivre sur :</p>
        <li><Link to=""><LinkedInLightIcon/></Link></li>
          <span className="ligne"></span>
          <li><Link to=""><TwiterLightIcon/></Link></li>
          <span className="ligne"></span>
          <li><Link to=""><FaceBookLightIcon/></Link></li>
        </ul>
      </div>
    </div>
  </div>    
     <div className=" bg-white shadow sticky-md-top ">
      <nav id="navbar-example2" className="navbar navbar-expand-lg navbar-light  bg-white max  ">
      <Link className="navbar-brand" to="/"><img style={{ marginBottom:'10px' }} className="logo" src={logo}></img></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="nav">
    
            <li className="nav-item ps-3 ">
              <Link to='/' className="nav-link" href="#scrollspyAccueil">Accueil</Link>
            </li>
            <li className="nav-item ps-3">
              <Link to='/' className="nav-link" href="#scrollspyFinancement">Financement</Link>
            </li>
            <li className="nav-item ps-3">
              <Link to='/' className="nav-link" href="#scrollspyIndicateurs">Indicateurs</Link>
            </li>
        </ul>
        </div>
        <div className="mx-auto d-flex justify-content-end">
                <li className="nav-item navbar-nav ps-3 pe-3 ms-auto">
                    <a className="btn  btn btn-sm btn-order " href="#">DEMANDE D'INFORMATION</a>
                </li>
                <li className="nav-item navbar-nav">
                    <Link to="/sign-in" className="btn text-white text-decoration-none  btn btn-sm btn-order2 ">
                        SE CONNECTER
                    </Link>
                </li>
        </div>
      </nav>
     </div>
      <div className="bg-grand-section ">
        <div className="pb-5"></div>
<div className="card max ">
    <div className="mobilisation-des-ressources text-white d-flex justify-content-between align-items-center mb-2">
        <p className="mt-3 ps-4 fw-bold">MOBILISATION DES RESSOURCES</p>
        <div className="ferme">
        <Link to="/"><ForwordIcon className="icon "/></Link> <span className="ps-2 pe-3"></span>
        </div>
    </div>
    <div className="card me-4 ms-4 mb-2">
        <div className="d-flex justify-content-start align-items-center icon-text ">
            <p><NiveauExecutionIcon className="icon2"/></p>
            <p className="card-title categorie-volume-financement">Niveau d'execution</p>
            
          </div>
          <hr/>
          <div className="tricks d-flex justify-content-between align-items-center ps-3">
        <p className="col-md-9 color-text" > Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque fugiat quisquam dolorum, iste voluptatibus sed numquam esse facere aut recusandae molestias fugit, nobis aliquid dolor tempore minus. Quisquam, quasi porro! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, cum. Animi praesentium repellendus, natus in nam nemo? Officia magni quis earum natus id porro ea? Ab velit neque earum quae! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore officiis adipisci impedit repellat, numquam et doloremque necessitatibus temporibus ipsam voluptatem eveniet architecto quasi suscipit est expedita, repellendus nisi autem asperiores.

        </p>
        
            <div id="task-complete" style={{width:'200px', height:"200px", padding:"20px"}}>
            <ChangingProgressProvider values={[0, 60]}>
                        {percentage => (
                          <CircularProgressbar
                            strokeWidth={5}
                            value={percentage}
                            text={`${60}%`}
                            styles={buildStyles({
                              pathTransition:
                                percentage === 0 ? "none" : "stroke-dashoffset 0.5s ease 0s",
                                pathColor: '#F2913D',
                                textColor: 'Black',
                                trailColor: '#d6d6d6',
                                backgroundColor: '#3e98c7',
      
                            })}
                          />
                        )}
                      </ChangingProgressProvider>
            </div>
          
          </div>

</div>

<div className="card me-4 ms-4 mb-2 bg-cadre">
    <div className="d-flex just</EngaementIcone>ify-content-start align-items-center icon-text ">
        <p><EngagementIcon className="icon2"/></p>
        <p className="card-title categorie-volume-financement">Engagement</p>
        
      </div>
      <hr/>
    <div className="row taille ">
      <div className="col ms-3 verticale">
<div className="secteur">Etat</div>
<p className="chiffre fw-bold">100 000 000 F CFA</p>
<div className="top ">TOP 01</div>
<p className="chiffre-top">100 000 000 F CFA</p>
<div className="top">TOP 02</div>
<p className="chiffre-top">100 000 000 F CFA</p>
<div className="top">TOP 03</div>
<p className="chiffre-top">100 000 000 F CFA</p>
<div className="top">TOP 04</div>
<p className="chiffre-top">100 000 000 F CFA</p>
<div className="top">TOP 05</div>
<p className="chiffre-top">100 000 000 F CFA</p>
      </div>
      <div className="col verticale">
        <div className="secteur ">Collectivités territoriales (CT)</div>
<p className="chiffre fw-bold">200 000 000 F CFA</p>
<div className="top">TOP 01</div>
<p className="chiffre-top">100 000 000 F CFA</p>
<div className="top">TOP 02</div>
<p className="chiffre-top">100 000 000 F CFA</p>
<div className="top">TOP 03</div>
<p className="chiffre-top">100 000 000 F CFA</p>
<div className="top">TOP 04</div>
<p className="chiffre-top">100 000 000 F CFA</p>
<div className="top">TOP 05</div>
<p className="chiffre-top">100 000 000 F CFA</p>
      </div>
      <div className="col verticale">
        <div className="secteur ">Secteurs privés Sanitaires</div>
<p className="chiffre fw-bold">6 000 000 F CFA</p>
<div className="top">TOP 01</div>
<p className="chiffre-top">100 000 000 F CFA</p>
<div className="top">TOP 02</div>
<p className="chiffre-top">100 000 000 F CFA</p>
<div className="top">TOP 03</div>
<p className="chiffre-top">100 000 000 F CFA</p>
<div className="top">TOP 04</div>
<p className="chiffre-top">100 000 000 F CFA</p>
<div className="top">TOP 05</div>
<p className="chiffre-top">100 000 000 F CFA</p>
      </div>
      <div className="col verticale">
        <div className="secteur ">Secteurs privés non Sanitaires</div>
        <p className="chiffre fw-bold">13 000 000 F CFA</p>
        <div className="top">TOP 01</div>
        <p className="chiffre-top">100 000 000 F CFA</p>
        <div className="top">TOP 02</div>
        <p className="chiffre-top">100 000 000 F CFA</p>
        <div className="top">TOP 03</div>
        <p className="chiffre-top">100 000 000 F CFA</p>
        <div className="top">TOP 04</div>
        <p className="chiffre-top">100 000 000 F CFA</p>
        <div className="top">TOP 05</div>
        <p className="chiffre-top">100 000 000 F CFA</p>
      </div>
      <div className="col verticale">
        <div className="secteur ">ONG et associations</div>
        <p className="chiffre fw-bold">20 000 000 F CFA</p>
        <div className="top">TOP 01</div>
        <p className="chiffre-top">100 000 000 F CFA</p>
        <div className="top">TOP 02</div>
        <p className="chiffre-top">100 000 000 F CFA</p>
        <div className="top">TOP 03</div>
        <p className="chiffre-top">100 000 000 F CFA</p>
        <div className="top">TOP 04</div>
        <p className="chiffre-top">100 000 000 F CFA</p>
        <div className="top">TOP 05</div>
        <p className="chiffre-top">100 000 000 F CFA</p>
      </div>
      <div className="col">
        <div className="secteur ">Partenaires Techniques et Financiers</div>
        <p className="chiffre fw-bold">9 000 000 F CFA</p>
        <div className="top">TOP 01</div>
        <p className="chiffre-top">100 000 000 F CFA</p>
        <div className="top">TOP 02</div>
        <p className="chiffre-top">100 000 000 F CFA</p>
        <div className="top">TOP 03</div>
        <p className="chiffre-top">100 000 000 F CFA</p>
        <div className="top">TOP 04</div>
        <p className="chiffre-top">100 000 000 F CFA</p>
        <div className="top">TOP 05</div>
        <p className="chiffre-top">100 000 000 F CFA</p>
      </div>
    </div>
    

</div>
<div className="card me-4 ms-4 mb-2 bg-cadre">
  <div className="d-flex  justify-content-start align-items-center icon-text">
    <p><MobilisationIcon className="icon2"/></p>
    <p className="card-title categorie-volume-financement">Mobilisation</p>
   
  </div>
    <hr/>
  <div className="row taille ">
    <div className="col ms-3 verticale">
<div className="secteur">Etat</div>
<p className="chiffre fw-bold">100 000 000 F CFA</p>
<div className="top ">TOP 01</div>
<p className="chiffre-top">100 000 000 F CFA</p>
<div className="top">TOP 02</div>
<p className="chiffre-top">100 000 000 F CFA</p>
<div className="top">TOP 03</div>
<p className="chiffre-top">100 000 000 F CFA</p>
<div className="top">TOP 04</div>
<p className="chiffre-top">100 000 000 F CFA</p>
<div className="top">TOP 05</div>
<p className="chiffre-top">100 000 000 F CFA</p>
    </div>
    <div className="col verticale">
      <div className="secteur ">Collectivités territoriales (CT)</div>
<p className="chiffre fw-bold">200 000 000 F CFA</p>
<div className="top">TOP 01</div>
<p className="chiffre-top">100 000 000 F CFA</p>
<div className="top">TOP 02</div>
<p className="chiffre-top">100 000 000 F CFA</p>
<div className="top">TOP 03</div>
<p className="chiffre-top">100 000 000 F CFA</p>
<div className="top">TOP 04</div>
<p className="chiffre-top">100 000 000 F CFA</p>
<div className="top">TOP 05</div>
<p className="chiffre-top">100 000 000 F CFA</p>
    </div>
    <div className="col verticale">
      <div className="secteur ">Secteurs privés Sanitaires</div>
<p className="chiffre fw-bold">6 000 000 F CFA</p>
<div className="top">TOP 01</div>
<p className="chiffre-top">100 000 000 F CFA</p>
<div className="top">TOP 02</div>
<p className="chiffre-top">100 000 000 F CFA</p>
<div className="top">TOP 03</div>
<p className="chiffre-top">100 000 000 F CFA</p>
<div className="top">TOP 04</div>
<p className="chiffre-top">100 000 000 F CFA</p>
<div className="top">TOP 05</div>
<p className="chiffre-top">100 000 000 F CFA</p>
    </div>
    <div className="col verticale">
      <div className="secteur ">Secteurs privés non Sanitaires</div>
      <p className="chiffre fw-bold">13 000 000 F CFA</p>
      <div className="top">TOP 01</div>
      <p className="chiffre-top">100 000 000 F CFA</p>
      <div className="top">TOP 02</div>
      <p className="chiffre-top">100 000 000 F CFA</p>
      <div className="top">TOP 03</div>
      <p className="chiffre-top">100 000 000 F CFA</p>
      <div className="top">TOP 04</div>
      <p className="chiffre-top">100 000 000 F CFA</p>
      <div className="top">TOP 05</div>
      <p className="chiffre-top">100 000 000 F CFA</p>
    </div>
    <div className="col verticale">
      <div className="secteur ">ONG et associations</div>
      <p className="chiffre fw-bold">20 000 000 F CFA</p>
      <div className="top">TOP 01</div>
      <p className="chiffre-top">100 000 000 F CFA</p>
      <div className="top">TOP 02</div>
      <p className="chiffre-top">100 000 000 F CFA</p>
      <div className="top">TOP 03</div>
      <p className="chiffre-top">100 000 000 F CFA</p>
      <div className="top">TOP 04</div>
      <p className="chiffre-top">100 000 000 F CFA</p>
      <div className="top">TOP 05</div>
      <p className="chiffre-top">100 000 000 F CFA</p>
    </div>
    <div className="col">
      <div className="secteur ">Partenaires Techniques et Financiers</div>
      <p className="chiffre fw-bold">9 000 000 F CFA</p>
      <div className="top">TOP 01</div>
      <p className="chiffre-top">100 000 000 F CFA</p>
      <div className="top">TOP 02</div>
      <p className="chiffre-top">100 000 000 F CFA</p>
      <div className="top">TOP 03</div>
      <p className="chiffre-top">100 000 000 F CFA</p>
      <div className="top">TOP 04</div>
      <p className="chiffre-top">100 000 000 F CFA</p>
      <div className="top">TOP 05</div>
      <p className="chiffre-top">100 000 000 F CFA</p>
    </div>
  </div>
  

</div>
<div className="card me-4 ms-4 mb-4 ">
  <div className="d-flex  justify-content-start align-items-center icon-text">
    <p><BesoinIcon className="icon2"/></p>
    <p className="card-title categorie-volume-financement">Besoins exprimés</p>
    
  </div>
  <hr/>
  <div className="tricks d-flex justify-content-between align-items-center ps-3">
    <div className="chiffre-besoin"> 15M F CFA</div>
    <p className="col-md-9 color-text" > Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque fugiat quisquam dolorum, iste voluptatibus sed numquam esse facere aut recusandae molestias fugit, nobis aliquid dolor tempore minus. Quisquam, quasi porro! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, cum. Animi praesentium repellendus, natus in nam nemo? Officia magni quis earum natus id porro ea? Ab velit neque earum quae! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore officiis adipisci impedit repellat, numquam et doloremque necessitatibus temporibus ipsam voluptatem eveniet architecto quasi suscipit est expedita, repellendus nisi autem asperiores.

    </p>
    
        
      
      </div>
</div>
    </div>
    <div className="pt-5"></div>

</div>
<div className="header">
    <div className="header-content row max  d-flex  justify-content-between align-items-center m-auto">
      <div className="col-md-7 col-sm-12 px-0">
        <p className="title " style={{ fontSize:'2.5vh' }}>DIRECTION DE LA PLANIFICATION DE LA RECHERCHE ET DES STATISTIQUES</p>
      </div>
      <div className="col-md-4 col-sm-12  rs reseaux-sociaux ">
        <ul className="d-flex" style={{ marginRight: '-1rem' }}>
        <p className="">Nous suivre sur :</p>
        <li><Link to=""><LinkedInLightIcon/></Link></li>
          <span className="ligne"></span>
          <li><Link to=""><TwiterLightIcon/></Link></li>
          <span className="ligne"></span>
          <li><Link to=""><FaceBookLightIcon/></Link></li>
        </ul>
      </div>
    </div>
  </div>
  </div>
    )
};

export default MobilisationRessource;