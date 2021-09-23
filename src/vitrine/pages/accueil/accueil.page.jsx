import React, { useEffect, useState } from 'react';
import './accueil.style.css';
/* import section1Image from '../../assets/images/section-1-image.svg'
import MobilisationIcon from '../../assets/icons/mobilisation.svg';
import MiseEnCommunIcon from '../../assets/icons/mise-en-commun.svg';
import AchatServiceIcon from '../../assets/icons/achat-service.svg';
import DimentionRightFoto from '../../assets/images/dimension.svg';
import {ReactComponent as LinkedInLightIcon}  from '../../assets/icons/linkein-2.svg';
import {ReactComponent as TwiterLightIcon}  from '../../assets/icons/twiter-2.svg';
import {ReactComponent as FaceBookLightIcon}  from '../../assets/icons/facebook-2.svg';
import ForwordIcon  from '../../assets/icons/forword.svg';
import GoBackIcon  from '../../assets/icons/go-back.svg';
import ShareIcon  from '../../assets/icons/share.svg';
import VoirPlusIcone  from '../../assets/icons/voir-plus.svg';
import slide1 from '../../assets/images/slide-1.svg';
import slide2 from '../../assets/images/slide-2.svg';
import slide3 from '../../assets/images/slide-3.svg';
import slide4 from '../../assets/images/slide-4.svg';
import { Link } from 'react-router-dom'; */

import {ReactComponent as LinkedInLightIcon} from '../../../assets/icons/linkedIn.svg';
import {ReactComponent as TwiterLightIcon}  from '../../../assets/icons/twiter.svg';
import {ReactComponent as FaceBookLightIcon}  from '../../../assets/icons/facebook.svg';
import logo from '../../../assets/vitrine/Assets/images/minist.png';
import source from '../../../assets/vitrine/Assets/icon/mobil ressource.svg';
import sourceCommun from '../../../assets/vitrine/Assets/icon/ressource en commun.svg';
import service from '../../../assets/vitrine/Assets/icon/services.svg';
import { Helmet } from 'react-helmet';

import { Link } from '@material-ui/core';

function AccueilPage(){
 
    return(
<div>
          {/* <Helmet>
            <script src="/assets/vitrine/circle.js" />
            <script src="/assets/vitrine/circle.min.js" />
          </Helmet> */}
    <div class="header">
    <div class="header-content row max  d-flex  justify-content-between align-items-center m-auto">
      <div class="col-md-7 col-sm-12 px-0">
        <p class="title fw-bold">PLATEFORME NUMERIQUE DE SUIVI DU FINANCEMENT DE LA SANTE AU SENEGAL</p>
      </div>
      <div class="col-md-5 col-sm-12 rs d-flex justify-content-end icon-social px-0">
        <p>Nous suivre sur :</p>
        <ul class="d-flex">
        <li><Link to=""><LinkedInLightIcon/></Link></li>
          <span class="ligne"></span>
          <li><Link><TwiterLightIcon/></Link></li>
          <span class="ligne"></span>
          <li><Link><FaceBookLightIcon/></Link></li>
        </ul>
      </div>
    </div>
  </div>
 <div class="bg-white sticky-md-top ">
  <nav id="navbar-example2" class="navbar navbar-expand-lg navbar-light  bg-white   bg-body  max ">
      <Link class="navbar-brand" to=""><img class="logo" src={logo}></img></Link>
    {/* <a  href="#"><img class="logo" src="./Assets/images/minist.png" alt="" /></a> */}
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
      aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="nav">
        <li class="nav-item ps-3 ">
          <a class="nav-link " href="#scrollspyAccueil">Accueil</a>
        </li>
        <li class="nav-item ps-3">
          <a class="nav-link" href="#scrollspyFinancement">Financement</a>
        </li>
        <li class="nav-item ps-3">
          <a class="nav-link" href="#scrollspyIndicateurs">Indicateurs</a>
        </li>
     </ul>
    </div>
    <div class="mx-auto d-flex justify-content-end">
      <li class="nav-item navbar-nav ps-3 pe-3 ms-auto">
        <a class="btn  btn btn-sm btn-order " href="#">DEMANDE D'INFORMATION</a>
      </li>
      <li class="nav-item navbar-nav">
        <a class="btn  btn btn-sm btn-order2 " href="#">SE CONNECTER</a>
      </li>
    </div>
  </nav>
 </div>
  <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-offset="0" class="scrollspy-example" tabindex="0">
    <h4 class="text-center" id="scrollspyAccueil"></h4>
    <div class=" ">
      <div class="card ">
        <div class="row g-0">
          <div class="col-md-5 col-sm-12 bg-blue-img ">
            <div class="card-body text-light ms-5 ps-3 px-0 pt-5  max">
              <div class="d-flex flex-column pb-4">
                <h5 class="card-title text-white pt-5 col-md-9">Le Financemet de la santé, une priorité pour les acteurs...</h5>
                <div class="divider"></div>
              </div>
              <p class="card-text pb-3">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus explicabo
                assumenda nisi nostrum natus suscipit vero quo quia sint ipsum aut, doloribus molestias quaerat atque
                totam. Ratione quasi assumenda cumque!</p>
              <div class="pb-5">
                <a class="btn btn btn-sm bouton" href="#">EN SAVOIR PLUS</a>
              </div>
            </div>
          </div>
          <div class="col-md-7 col-sm-12 bg-image1">
        
          </div>
        </div>
      </div>
      <div class="bg-grand-section">
        <h4 id="scrollspyFinancement"> </h4>
        <div class="d-flex flex-column max pb-4">
          <p class="card-title text-blue fs-3 pt-5 col-md-9">Le Financement de la santé</p>
          <div class="divider-financement"></div>
        </div>
        <div class="container-fluid g-0 px-0 max">
          <div class="card mb-3 " style={{ maxWidth: '100%' }}>
            <div class="row  g-0">
              <div class="col-md-8  ">
                <div class="card-body mb-5 p-0 pt-5  max">
                  <div class=" trick4 d-flex  justify-content-start mb-5  ">
                    <div> <img  class="icon-fin  pe-4 "
                        src={source} alt="" /></div>
                    <div class="d-flex flex-column">
                      <div  class="financement ps-3 pb-1">Mobilisation de
                        ressources</div>
                      <p class="ps-3 text-financement" >Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Necessitatibus, similique? Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consectetur
                        adipisicing elit. Obcaecati, quos. </p>
                    </div>
                  </div>
                  <div class=" trick4 d-flex  justify-content-start mb-5    ">
                    <div> <img  class="icon-fin  pe-4 "
                        src={sourceCommun} alt="" /></div>
                    <div class="d-flex flex-column">
                      <div  class="ps-3 pb-1 financement-Mise-en-commun">Mise en commun des ressources</div>
                      <p class="ps-3 text-financement" >Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Necessitatibus, similique? Lorem ipsum dolor sit amet. Lorem ipsum dolor sit, amet consectetur
                        adipisicing elit. Adipisci, alias.</p>
                    </div>
                  </div>
                  <div class="  d-flex align-items-center justify-content-start   ">
                    <div> <img  class="icon-fin  pe-4 "
                        src={service} alt="" /></div>
                    <div class="d-flex flex-column">
                      <div  class="ps-3 financement">Achat des services
                      </div>
                      <p class="ps-3 text-financement" >Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Necessitatibus, similique? Lorem ipsum dolor sit amet Lorem ipsum dolor sit, amet consectetur
                        adipisicing elit. Nostrum?.</p>
                    </div>
                  </div>

                </div>
              </div>
              <div  class="col-md-4 bg-image2 ">
                
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex flex-column max pb-5">
          <p class="card-title text-blue fs-4  pt-5 col-md-9">Le Volume du Financement de la santé par sources</p>
          <div class="divider-financement"></div>
        </div>
        <div class="container-fluid max ">
          <div  class="row ">
            <div  class="card   px-0 mb-3">
              <div  class="row  mx-auto g-0">
                <div class="col-md-2 text-light bg-blue">
                  <a  href="mobilisation-des-ressources.html"><img class="icon-info" src="./Assets/icon/information.svg" alt="" /></a>
                <p class=" mob-mise-en-commun-achat  ">MOBILISATION DES RESSOURCES</p>
                </div>
                <div class="col text-financement">
                  <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center align-items-center">
                      <p class="card-title categorie-volume-financement">Niveau d'execution</p>
                      <p><img class="icon2" src="./Assets/icon/niv-execution.svg" alt="" /></p>
                    </div>
                   
                   <div >
                    <div id="task-complete"></div>
                   </div>
                  </div>
                </div>
                <div class="col text-financement">
                  <div  class="card-body trait-vertical-gauche">
                    <div class="d-flex  justify-content-between align-items-center">
                      <p  class="card-title categorie-volume-financement">Engagement</p>
                      <p><img class="icon2" src="./Assets/icon/engagement.svg" alt="" /></p>
                    </div>
                    <div  class="sous-ligne">
                      <p class="secteur">Etat</p>
                      <p class="chiffres">100 000 000 F CFA</p>
                    </div>
                    <div class="sous-ligne">
                      <p class="secteur">Collectivités Territoriales (CT)</p>
                      <p class="chiffres">200 000 000 F CFA</p>
                    </div>
                    <div  class="sous-ligne">
                      <p class="secteur">Secteurs privés Sanitaires</p>
                      <p  class="chiffres"> 600 000 F CFA</p>
                    </div>
                    <div class="sous-ligne">
                      <p class="secteur">Secteurs privés non Sanitaires</p>
                      <p  class="chiffres">100 000 000 F CFA</p>
                    </div>
                    <div class="sous-ligne">
                      <p class="secteur">Secteurs privés non Sanitaires</p>
                      <p class="chiffres"> 13000 000 F CFA</p>
                    </div>
                    <div class="sous-ligne">
                      <p class="secteur">ONG et associations</p>
                      <p class="chiffres">20 000 000 F CFA</p>
                    </div>
                    <div class="">
                      <p class="secteur">Partenaires Techniques Financiers (PTF)</p>
                      <p class="chiffres">9 000 000 F CFA</p>
                    </div>
                  </div>
                </div>
                <div class="col text-financement">
                  <div class="card-body trait-vertical-gauche trait-vertical-droite">
                    <div class="d-flex  justify-content-between align-items-center">
                      <p class="card-title categorie-volume-financement">Mobilisation</p>
                      <p><img class="icon2" src="./Assets/icon/mobilisation.svg" alt="" /></p>
                    </div>
                    <div class="sous-ligne">
                      <p class="secteur">Etat</p>
                      <p  class="chiffres">20 000 000 F CFA</p>
                    </div>
                    <div  class="sous-ligne">
                      <p class="secteur">Collectivités Territoriales (CT)</p>
                      <p  class="chiffres">20 000 000 F CFA</p>
                    </div>
                    <div  class="sous-ligne">
                      <p class="secteur">Secteurs privés Sanitaires</p>
                      <p  class="chiffres"> 20 000 000 F CFA</p>
                    </div>
                    <div  class="sous-ligne">
                      <p class="secteur">Secteurs privés non Sanitaires</p>
                      <p  class="chiffres">20 000 000 F CFA</p>
                    </div>
                    <div  class="sous-ligne">
                      <p class="secteur">Secteurs privés non Sanitaires</p>
                      <p  class="chiffres"> 20 000 000 F CFA</p>
                    </div>
                    <div  class="sous-ligne">
                      <p class="secteur">ONG et associations</p>
                      <p  class="chiffres">20 000 000 F CFA</p>
                    </div>
                    <div class="">
                      <p class="secteur">Partenaires Techniques Financiers (PTF)</p>
                      <p  class="chiffres">20 000 000 F CFA</p>
                    </div>
                  </div>
                </div>
                <div class="col text-financement">
                  <div class="card-body">
                    <div class="d-flex  justify-content-between align-items-center">
                      <p class="card-title categorie-volume-financement">Besoins exprimés</p>
                      <p><img class="icon2" src="./Assets/icon/besoin.svg" alt="" /></p>
                    </div>


                    <div>
                      <p style={{ fontSize: '35px', fontWeight: '800' }}> 15 M FCFA</p>
                      <div class="progress mb-4 mt-4">
                        <div class="progress-bar " role="progressbar" style={{ width: '40%', backgroundColor: '#ff9100' }}
                          aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">40%</div>
                      </div>
                    </div>
                    <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui laborum aliquam,
                      itaque blanditiis repellendus dicta excepturi culpa porro vel vero eligendi commodi ratione velit
                      aspernatur, illo est nihil quam. Ipsam.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container-fluid max ">
          <div  class="row ">
            <div style={{ borderRadius: '15px !important' }}  class="card   px-0 mb-3">
              <div  class="row  mx-auto g-0">
                <div class="col-md-2 text-light bg-blue">
                  <p class="mob-mise-en-commun-achat ">MISE EN COMMUN DES RESSOURCES</p>
                   
                </div>
                <div class="col text-financement">
                  <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                      <p class="card-title categorie-volume-financement">Niveau d'execution</p>
                      <p><img class="icon2" src="./Assets/icon/niv-execution.svg" alt="" /></p>
                    </div>
                   <div >
                    <div id="execution-mise-en-commun"></div>
                   </div>
                  </div>
                </div>
                <div class="col text-financement">
                  <div  class="card-body trait-vertical-gauche ">
                    <div class="d-flex  justify-content-between align-items-center">
                      <p  class="card-title categorie-volume-financement ">Engagement</p>
                      <p><img class="icon2" src="./Assets/icon/engagement.svg" alt="" /></p>
                    </div>
                    <div class="sous-ligne">
                      <p class="secteur">Etat</p>
                      <p  class="chiffres">100 000 000 F CFA</p>
                    </div>
                    <div  class="sous-ligne">
                      <p class="secteur">Collectivités Territoriales (CT)</p>
                      <p class="chiffres">200 000 000 F CFA</p>
                    </div>
                    <div  class="sous-ligne">
                      <p class="secteur">Secteurs privés Sanitaires</p>
                      <p class="chiffres"> 600 000 F CFA</p>
                    </div>
                    <div  class="sous-ligne">
                      <p class="secteur">Secteurs privés non Sanitaires</p>
                      <p class="chiffres">100 000 000 F CFA</p>
                    </div>
                    <div  class="sous-ligne">
                      <p class="secteur">Secteurs privés non Sanitaires</p>
                      <p class="chiffres"> 13000 000 F CFA</p>
                    </div>
                    <div  class="sous-ligne">
                      <p class="secteur">ONG et associations</p>
                      <p class="chiffres">20 000 000 F CFA</p>
                    </div>
                    <div class="">
                      <p class="secteur">Partenaires Techniques Financiers (PTF)</p>
                      <p class="chiffres">9 000 000 F CFA</p>
                    </div>
                  </div>
                </div>
                <div class="col text-financement">
                  <div  class="card-body trait-vertical-gauche trait-vertical-droite">
                    <div class="d-flex  justify-content-between align-items-center">
                      <p class="card-title categorie-volume-financement">Mobilisation</p>
                      <p><img class="icon2" src="./Assets/icon/mobilisation.svg" alt="" /></p>
                    </div>
                    <div class="sous-ligne">
                      <p class="secteur">Etat</p>
                      <p class="chiffres">20 000 000 F CFA</p>
                    </div>
                    <div  class="sous-ligne">
                      <p class="secteur">Collectivités Territoriales (CT)</p>
                      <p class="chiffres">20 000 000 F CFA</p>
                    </div>
                    <div  class="sous-ligne">
                      <p class="secteur">Secteurs privés Sanitaires</p>
                      <p class="chiffres"> 20 000 000 F CFA</p>
                    </div>
                    <div  class="sous-ligne">
                      <p class="secteur">Secteurs privés non Sanitaires</p>
                      <p class="chiffres">20 000 000 F CFA</p>
                    </div>
                    <div  class="sous-ligne">
                      <p class="secteur" >Secteurs privés non Sanitaires</p>
                      <p class="chiffres"> 20 000 000 F CFA</p>
                    </div>
                    <div  class="sous-ligne">
                      <p class="secteur">ONG et associations</p>
                      <p class="chiffres">20 000 000 F CFA</p>
                    </div>
                    <div class="">
                      <p class="secteur">Partenaires Techniques Financiers (PTF)</p>
                      <p class="chiffres">20 000 000 F CFA</p>
                    </div>
                  </div>
                </div>
                <div class="col text-financement">
                  <div class="card-body">
                    <div class="d-flex  justify-content-between align-items-center">
                      <p class="card-title categorie-volume-financement">Besoins exprimés</p>
                      <p><img class="icon2" src="./Assets/icon/besoin.svg" alt="" /></p>
                    </div>
                    <div>
                      <p style={{ fontSize: '35px', fontWeight: '800' }}> 1 M FCFA</p>
                      <div class="progress mb-4 mt-4">
                        <div class="progress-bar " role="progressbar" style={{ width: '80%', backgroundColor: 'green' }}
                          aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">80%</div>
                      </div>
                    </div>
                    <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui laborum aliquam,
                      itaque blanditiis repellendus dicta excepturi culpa porro vel vero eligendi commodi ratione velit
                      aspernatur, illo est nihil quam. Ipsam.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container-fluid max ">
          <div  class="row ">
            <div style={{ borderRadius: '15px !important' }}  class="card    px-0 mb-3">
              <div  class="row  mx-auto g-0">
                <div class="col-md-2 text-light bg-blue">
                  <p class=" mob-mise-en-commun-achat ">ACHAT DE SERVICES</p>
                    
                </div>
                <div class="col text-financement">
                  <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                      <p class="card-title categorie-volume-financement">Niveau d'execution</p>
                      <p><img class="icon2" src="./Assets/icon/niv-execution.svg" alt="" /></p>
                    </div>
                   <div >
                    <div id="execution-achat-service"></div>
                   </div>
                  </div>
                </div>
                <div class="col text-financement">
                  <div class="card-body trait-vertical-gauche">
                    <div class="d-flex  justify-content-between align-items-center">
                      <p  class="card-title categorie-volume-financement">Engagement</p>
                      <p><img class="icon2" src="./Assets/icon/engagement.svg" alt="" /></p>
                    </div>
                    <div  class="sous-ligne">
                      <p class="secteur">Etat</p>
                      <p   class="chiffres">100 000 000 F CFA</p>
                    </div>
                    <div class="sous-ligne">
                      <p class="secteur">Collectivités Territoriales (CT)</p>
                      <p class="chiffres">200 000 000 F CFA</p>
                    </div>
                    <div class="sous-ligne">
                      <p class="secteur">Secteurs privés Sanitaires</p>
                      <p class="chiffres"> 600 000 F CFA</p>
                    </div>
                    <div class="sous-ligne">
                      <p class="secteur">Secteurs privés non Sanitaires</p>
                      <p class="chiffres">100 000 000 F CFA</p>
                    </div>
                    <div class="sous-ligne">
                      <p class="secteur">Secteurs privés non Sanitaires</p>
                      <p class="chiffres"> 13000 000 F CFA</p>
                    </div>
                    <div class="sous-ligne">
                      <p class="secteur">ONG et associations</p>
                      <p class="chiffres">20 000 000 F CFA</p>
                    </div>
                    <div class="">
                      <p class="secteur">Partenaires Techniques Financiers (PTF)</p>
                      <p class="chiffres">9 000 000 F CFA</p>
                    </div>
                  </div>
                </div>
                <div class="col text-financement">
                  <div class="card-body trait-vertical-gauche trait-vertical-droite">
                    <div class="d-flex  justify-content-between align-items-center">
                      <p class="card-title categorie-volume-financement">Mobilisation</p>
                      <p><img class="icon2" src="./Assets/icon/mobilisation.svg" alt="" /></p>
                    </div>
                    <div class="sous-ligne">
                      <p class="secteur" >Etat</p>
                      <p class="chiffres">20 000 000 F CFA</p>
                    </div>
                    <div  class="sous-ligne">
                      <p class="secteur" >Collectivités Territoriales (CT)</p>
                      <p class="chiffres">20 000 000 F CFA</p>
                    </div>
                    <div  class="sous-ligne">
                      <p class="secteur">Secteurs privés Sanitaires</p>
                      <p class="chiffres"> 20 000 000 F CFA</p>
                    </div>
                    <div  class="sous-ligne">
                      <p class="secteur">Secteurs privés non Sanitaires</p>
                      <p class="chiffres">20 000 000 F CFA</p>
                    </div>
                    <div  class="sous-ligne">
                      <p class="secteur">Secteurs privés non Sanitaires</p>
                      <p class="chiffres"> 20 000 000 F CFA</p>
                    </div>
                    <div  class="sous-ligne">
                      <p class="secteur" >ONG et associations</p>
                      <p class="chiffres">20 000 000 F CFA</p>
                    </div>
                    <div class="">
                      <p class="secteur" >Partenaires Techniques Financiers (PTF)</p>
                      <p class="chiffres">20 000 000 F CFA</p>
                    </div>
                  </div>
                </div>
                <div class="col text-financement">
                  <div class="card-body">
                    <div class="d-flex  justify-content-between align-items-center">
                      <p class="card-title categorie-volume-financement">Besoins exprimés</p>
                      <p><img class="icon2" src="./Assets/icon/besoin.svg" alt="" /></p>
                    </div>


                    <div>
                      <p style={{ fontSize: '35px', fontWeight: '800' }}> 22 M FCFA</p>
                      <div class="progress mb-4 mt-4">
                        <div class="progress-bar " role="progressbar" style={{ width: '12%', backgroundColor: 'red' }}
                          aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">12%</div>
                      </div>
                    </div>
                    <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui laborum aliquam,
                      itaque blanditiis repellendus dicta excepturi culpa porro vel vero eligendi commodi ratione velit
                      aspernatur, illo est nihil quam. Ipsam.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

       

        

         <h4 id="scrollspyIndicateurs"></h4>
         <div class="d-flex flex-column max pb-4">
          <p class="card-title text-blue fs-3  pt-5 col-md-9">Les indicateurs du financement de la Santé</p>
          <div class="divider-financement"></div>
        </div>
         <div class="card mb-5  max">
           <div class="card-body">
            <div style={{ height: '300px'}} class="max" id="chart-container">
              <canvas  id="barChart"></canvas>
            </div>
           </div>
         </div>


        <div class="max row ">
         <div class="col ps-0">
          <div class="card mb-3">
            <div class="card-body">
             <div class="bande">
              <div class=" fw-bold  ps-2 pt-2 text-bande" > Etat</div>
             </div>
              <div class="text-center mt-3">12 000 000 000 F.CFA</div>
            <div>
              <div class="progress mt-4 height-progress  ">
                <div class="progress-bar orange-progress " role="progressbar" 
                  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div  class="mobilisation fw-bold">Mobilisation</div>
                <div class="pourcentage">54%</div>
              </div>
            </div>
            <div>
              <div class="progress height-progress   mt-4">
                <div class="progress-bar vert-progress " role="progressbar" 
                  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div  class="mobilisation fw-bold">Engagement</div>
                <div class="pourcentage">90%</div>
              </div>
            </div>
            </div>
          </div>
         </div>
         <div class="col ps-0">
          <div class="card mb-3" >
            <div class="card-body">
              <div class="bande">
                <div  class=" fw-bold text-bande ps-2  "> Collectivités Territoriales (CT)</div>
              </div>
              <div class="text-center mt-3">6 000 000 000 F.CFA</div>
            <div>
              <div class="progress height-progress   mt-4">
                <div class="progress-bar bleu-progress " role="progressbar" 
                  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div  class="mobilisation fw-bold">Mobilisation</div>
                <div class="pourcentage">64%</div>
              </div>
            </div>
            <div>
              <div class="progress height-progress   mt-4">
                <div class="progress-bar vert-progress2 " role="progressbar" 
                  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div   class="mobilisation fw-bold">Engagement</div>
                <div class="pourcentage">91%</div>
              </div>
            </div>
            </div>
          </div>
         </div>
         <div class="col ps-0">
          <div class="card mb-3 " >
            <div class="card-body">
              <div class="bande">
                <div  class=" fw-bold text-bande ps-2 pt-2 "> Secteurs privés</div>
              </div>
              <div class="text-center mt-3">3 000 000 000 F.CFA</div>
            <div>
              <div class="progress height-progress   mt-4">
                <div class="progress-bar meuve-progress " role="progressbar"
                  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div  class="mobilisation fw-bold">Mobilisation</div>
                <div class="pourcentage">64%</div>
              </div>
            </div>
            <div>
              <div class="progress height-progress   mt-4">
                <div class="progress-bar rouge-progress " role="progressbar" 
                  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div  class="mobilisation fw-bold">Engagement</div>
                <div class="pourcentage">34%</div>
              </div>
            </div>
            </div>
          </div>
         </div>
         <div class="col ps-0">
          <div class="card mb-3">
            <div class="card-body">
             <div class="bande">
              <div class=" fw-bold text-bande ps-2 pt-2 "> ONG et associations</div>
             </div>
              <div class="text-center mt-3"> 2 500 000 000 F.CFA</div>
            <div>
              <div class="progress height-progress  mt-4">
                <div class="progress-bar rose-progress " role="progressbar" 
                  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div style={{ color: '#6f96aa' }} class="mobilisation fw-bold">Mobilisation</div>
                <div class="pourcentage">74%</div>
              </div>
            </div>
            <div>
              <div class="progress height-progress  mt-4">
                <div class="progress-bar vert-progress2 " role="progressbar" 
                  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div class="mobilisation fw-bold">Engagement</div>
                <div class="pourcentage">92%</div>
              </div>
            </div>
            </div>
          </div>
         </div>
         <div class="col ps-0 pe-0">
          <div class="card mb-3" >
            <div class="card-body">
              <div class="bande">
                <div  class=" fw-bold text-bande ps-2"> Partenaires Techniques Financiers (PTF)</div>
              </div>
              <div class="text-center mt-3">9 600 000 000 F.CFA</div>
            <div>
              <div class="progress height-progress  mt-4">
                <div class="progress-bar rouge-progess2" role="progressbar"
                  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div class="mobilisation fw-bold">Mobilisation</div>
                <div class="pourcentage">14%</div>
              </div>
            </div>
            <div>
              <div class="progress height-progress  mt-4">
                <div class="progress-bar jaune-progess " role="progressbar" 
                  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div  class="mobilisation fw-bold">Engagement</div>
                <div class="pourcentage">10%</div>
              </div>
            </div>
            </div>
          </div>
         </div>
        </div>
      
        <div class="row max">
<div class="col-md-4 ps-0">
  <div class="card card-stat mb-3 ">
    <p class="fw-bold mobilisation ps-3 pt-3">Statistique</p>
 <div class="d-flex justify-content-between align-items-center">
  <div  class="mt-3 canvas">
    <canvas   id="myChart"></canvas>
    </div>
    <div class="pourcent-stat pe-2">
      <p class="text-center fw-bold fs-3">75%</p>
      <p> Lorem, ipsum. <span>50%</span></p>
      <p> Lorem, ipsum. <span>45%</span></p>
    </div>
 </div>
  </div>
</div>
<div class="col-md-5 ps-0">
  <div class="card mb-3 card-stat ">
    <p class="fw-bold mobilisation ps-3 pt-3">Statistique</p>
<div class="ps-3 pe-3">
  <canvas id="myChart2"></canvas>
</div>
  </div>
</div>
<div class="col-md-3 ps-0 pe-0">
  <div class="card mb-3 card-stat ">
    <p class="fw-bold mobilisation ps-3 pt-3">Statistique</p>
   <div class="">
    <canvas class="ps-3 pe-3" id="myChart3" width="" height=""></canvas>
   </div>
    <div class="d-flex justify-content-between align-items-center pt-4">
      <p class="fw-bold mobilisation ps-3">21 600 000 000 F.CFA</p>
    <p class="fw-bold mobilisation pe-3">2021</p>
    </div>
  </div>
</div>
        </div>
      </div>
    </div>
  </div>
  <div class="header">
    <div class="header-content row max  d-flex  justify-content-between align-items-center m-auto">
      <div class="col-md-7 col-sm-12 px-0">
        <p class="title ">DIRECTION DE LA PLANIFICATION DE LA RECHERCHE ET DES STATISTIQUES</p>
      </div>
      <div class="col-md-5 col-sm-12 rs d-flex justify-content-end icon-social px-0">
        <p>Nous suivre sur :</p>
        <ul class="d-flex">
          <li><a href=""><img class="icon" src="./Assets/icon/linkedin.svg" alt="" /></a></li>
          <span class="ligne">|</span>
          <li><a href=""><img class="icon" src="./Assets/icon/twitter.svg" alt="" /></a></li>
          <span class="ligne">|</span>
          <li><a href=""><img class="icon" src="./Assets/icon/facebook.svg" alt="" /></a></li>
        </ul>
      </div>
    </div>
  </div>
        </div>
    )
};

export default AccueilPage;