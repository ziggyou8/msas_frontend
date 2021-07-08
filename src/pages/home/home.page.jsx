import React, { useEffect, useState } from 'react';
import './home.style.scss';
import './media.query.scss';
import section1Image from '../../assets/images/section-1-image.svg'
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
import { Link } from 'react-router-dom';

function HomePage(){
 
    return(
        <div>
                <section>
                    <div class="section-1">
                        <div class="section-1-left">
                            <div class="info">
                                <h2>SNFS</h2>
                                <p>Stratégie Nationale de Financement de la Santé</p>
                                <div class="divider"></div>
                                <h3>Le financement de la santé, <br /> une priorité pour tous les acteurs…</h3>
                                <button>EN SAVOIR PLUS</button>
                            </div>
                            <p class="section-1-left-text">
                                Dans le cadre de la mise en œuvre de <b style={{fontWeight: 'bolder'  }}>Stratégie Nationale de Financement de la Santé</b> (SNFS) pour tendre vers la CSU, adoptée en juin 2017, le Ministère de la Santé et de l’Action sociale (MSAS) a élaboré en collaboration avec les différentes parties prenantes, une feuille de route couvrant la période 2018-2022. 
                            </p>
                        </div>
                        <img src={section1Image} alt="" />
                    </div>
                </section>

                <section class="section-direction-planification ">
                    <h2>La Direction de la Planification, de la Recherche et des Statistiques (DPRS) </h2>
                    <div class="direction-planification row mx-auto">
                        <iframe class="col-md-3 " width="560" height="315" src="https://www.youtube.com/embed/y881t8ilMyc" frameborder="0" allowfullscreen></iframe>
                        <div class="direction-planification-right col-md-8 col-sm-12 mx-auto">
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                            <div class="direction-planification-footer ">
                                <div>
                                    <p>Coordonnatrice</p>
                                    <p><h6>Mme Sokhna Fall DIAGNE</h6></p>
                                </div>
                                <button>
                                    EN SAVOIR PLUS
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                <div class="section-dimension-financement">
                <h2>les 03 dimensions du financement de la santé AU SENEGAL </h2>
                <div class="dimension-financement row">
                    <div class="dimension-financement-left col-md-8">
                        <div class="dimension">
                            <img src={MobilisationIcon} height="80px" alt="Mobilisation fond" />
                            <div>
                                <h4><a href="">MOBILISATION DE RESSOURCES</a></h4>
                                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo </p>
                            </div>
                            <Link to="/mobilisation"><button style={{ display:'none' }}>EN SAVOIR PLUS</button></Link>
                        </div>
                        <div class="dimension">
                        <img src={MiseEnCommunIcon} height="80px" alt="Mise en commun" />

                            <div>
                                <h4><a href="">MISE EN COMMUN DES RESSOURCES</a></h4>
                                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
                            </div>
                            <Link to="/mise-en-commun"><button style={{ display:'none' }}>EN SAVOIR PLUS</button></Link>
                        </div>
                        <div class="dimension">
                          <img src={AchatServiceIcon} height="80px" alt="Achat service" />
                            <div>
                                <h4><a href="">ACHAT DE SERVICES</a></h4>
                                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo </p>
                            </div>
                            <Link to="/achat-service"> <button style={{ display:'none' }}>EN SAVOIR PLUS  3</button></Link>
                        </div>
                    </div>
                    <div id="dimension-financement-right" class="dimension-financement-right col-md-4">
                        <img src={DimentionRightFoto} alt="Dimension" />
                    </div>
                </div>
                </div>
            </section>

            <section>
                <div class="orientation-strategic">
                    <h2>Les orientations stratégiques de la SNFS</h2>
                    <div class="orientation-strategic-content mx-auto">
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                    </p>
                    <div class="orientation-strategic-cards">
                            <div class="orientation-strategic-cards-item d-flex flex-column justify-content-around">
                                <h4>ORIENTATIONS STRATEGIQUE 1</h4>
                                <img src={AchatServiceIcon} height="80px" alt="Achat service" />
                                <p>Amélioration de la disponibilité des services de santé de qualité</p>
                                <div class="bottom-item ">
                                    <div class="">
                                        <h3>03</h3>
                                        <p class=" ">Lignes d’actions</p>
                                    </div>
                                    <div class="bootom-divider">

                                    </div>
                                    <div class="">
                                        <h3>17</h3>
                                        <p class="">Interventions prioritaires</p>
                                    </div>
                                </div>
                            </div>

                            <div class="orientation-strategic-cards-item min-vw-50 -1 pt-2 d-flex flex-column justify-content-around">
                                <h4>ORIENTATIONS STRATEGIQUE 1</h4>
                                <img src={AchatServiceIcon} height="80px" alt="Achat service" />
                                <p>Amélioration de la disponibilité des services de santé de qualité</p>
                                <div class="bottom-item ">
                                    <div class="">
                                        <h3>04</h3>
                                        <p class=" ">Lignes d’actions</p>
                                    </div>
                                    <div class="bootom-divider">

                                    </div>
                                    <div class="">
                                        <h3>09</h3>
                                        <p class="">Interventions prioritaires</p>
                                    </div>
                                </div>
                            </div>

                            <div class="orientation-strategic-cards-item min-vw-50 pt-2 d-flex flex-column justify-content-around">
                                <h4>ORIENTATIONS STRATEGIQUE 1</h4>
                                <img src={AchatServiceIcon} height="80px" alt="Achat service" />
                                <p>Amélioration de la disponibilité des services de santé de qualité</p>
                                <div class="bottom-item ">
                                    <div class="">
                                        <h3>02</h3>
                                        <p class=" ">Lignes d’actions</p>
                                    </div>
                                    <div class="bootom-divider">

                                    </div>
                                    <div class="">
                                        <h3>11</h3>
                                        <p class="">Interventions prioritaires</p>
                                    </div>
                                </div>
                            </div>

                            <div class="orientation-strategic-cards-item min-vw-50 pt-2 d-flex flex-column justify-content-around">
                                <h4>ORIENTATIONS STRATEGIQUE 1</h4>
                                <img src={AchatServiceIcon} height="80px" alt="Achat service" />
                                <p>Amélioration de la disponibilité des services de santé de qualité</p>
                                <div class="bottom-item ">
                                    <div>
                                        <h3>04</h3>
                                        <p>Lignes d’actions</p>
                                    </div>
                                    <div class="bootom-divider">

                                    </div>
                                    <div>
                                        <h3>19</h3>
                                        <p>Interventions prioritaires</p>
                                    </div>
                                </div>
                            </div>
                            
                    </div>
                        <button>EN SAVOIR PLUS</button>

                </div>
                </div>
            </section>

            <section>
                <div class="actualite">
                    <h2>ActualiteS</h2>
                    <div id="container">
                        <img src={GoBackIcon} /* onClick={slideRight} */ id="slide-to-left" className="slide-to-left " alt="Revenir en arrière" />
                        <div id="slider-container">
                            <div id="slider" class="container-fluid" class="carousel slide" data-interval="300">
                                <div class="slide card">
                                    <div class="illustration">
                                        <div style={{ background: `url(${slide1})` }} class="background-image">

                                    </div>
                                </div>
                                <div class="card-info-container">
                                        <div class="card-info">
                                            <h6>Comité Interne de Suivi du Plan 
                                                National de Développement Sanitaire et social</h6>
                                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore …</p>
                                        </div>
                                        <div class="card-bottom">
                                            <ul class="share-hover" style={{ display: 'none' }}>
                                                    <li><Link to=""><LinkedInLightIcon/></Link></li>
                                                    <li><Link><TwiterLightIcon/></Link></li>
                                                    <li><Link><FaceBookLightIcon/></Link></li>
                                            </ul>
                                                <a class="share-section" href="">
                                                    <p class="share"><Link to=""><img src={ShareIcon}></img></Link> Partager</p>
                                                </a>
                                                <a href=""><p class="voir-plus">Voir plus <Link to=""><img src={VoirPlusIcone}/></Link></p></a>
                                        </div>
                                </div>
                            </div>
                            <div class="slide card">
                                    <div class="illustration">
                                        <div style={{ background: `url(${slide2})` }} class="background-image"> </div>
                                    </div>
                                    <div class="card-info-container">
                                        <div class="card-info">
                                            <h6>Pose première pierre du Centre Hospitalier Régional de Matam - Ourossogui</h6>
                                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore …</p>
                                        </div>
                                        <div class="card-bottom">
                                            <ul class="share-hover" style={{ display: 'none' }}>
                                                    <li><Link to=""><LinkedInLightIcon/></Link></li>
                                                    <li><Link><TwiterLightIcon/></Link></li>
                                                    <li><Link><FaceBookLightIcon/></Link></li>
                                            </ul>
                                                <a class="share-section" href="">
                                                    <p class="share"><Link to=""><img src={ShareIcon}></img></Link> Partager</p>
                                                </a>
                                                <a href=""><p class="voir-plus">Voir plus <Link to=""><img src={VoirPlusIcone}/></Link></p></a>
                                        </div>
                                    </div>
                                </div>
                                <div class="slide card">
                                    <div class="illustration">
                                        <div style={{ background: `url(${slide1})` }} class="background-image">

                                        </div>
                                    </div>
                                    <div class="card-info-container">
                                        <div class="card-info">
                                            <h6>Inauguration de l’Etablissement Public de Santé Abdoul Cissé KANE des Agnams </h6>
                                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore …</p>
                                        </div>
                                        <div class="card-bottom">
                                            <ul class="share-hover" style={{ display: "none" }}>
                                                    <li><Link to=""><LinkedInLightIcon/></Link></li>
                                                    <li><Link><TwiterLightIcon/></Link></li>
                                                    <li><Link><FaceBookLightIcon/></Link></li>
                                            </ul>
                                                <a class="share-section" href="">
                                                    <p class="share"><Link to=""><img src={ShareIcon}></img></Link> Partager </p>
                                                </a>
                                                <a href=""><p class="voir-plus">Voir plus <Link to=""><img src={VoirPlusIcone}/></Link></p></a>
                                        </div>
                                    </div>
                                </div>
                                <div class="slide card">
                                    <div class="illustration">
                                        <div style={{ background: `url(${slide2})` }} class="background-image">

                                        </div>
                                    </div>
                                    <div class="card-info-container">
                                        <div class="card-info">
                                            <h6>Comité Interne de Suivi du Plan 
                                                National de Développement Sanitaire et social</h6>
                                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore …</p>
                                        </div>
                                        <div class="card-bottom">
                                            <ul class="share-hover" style={{ display: "none" }}>
                                                    <li><Link to=""><LinkedInLightIcon/></Link></li>
                                                    <li><Link><TwiterLightIcon/></Link></li>
                                                    <li><Link><FaceBookLightIcon/></Link></li>
                                            </ul>
                                                <a class="share-section" href="">
                                                    <p class="share"><Link to=""><img src={ShareIcon}></img></Link> Partager</p>
                                                </a>
                                                <a href=""><p class="voir-plus">Voir plus <Link to=""><img src={VoirPlusIcone}/></Link></p></a>
                                        </div>
                                    </div>
                                </div>
                                <div class="slide card">
                                    <div class="illustration">
                                        <div style={{ background: `url(${slide3})` }} class="background-image">

                                        </div>
                                    </div>
                                    <div class="card-info-container">
                                        <div class="card-info">
                                            <h6>Inauguration de l’Etablissement Public de Santé Abdoul Cissé KANE des Agnams </h6>
                                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore …</p>
                                        </div>
                                        <div class="card-bottom">
                                            <ul class="share-hover" style={{ display: "none" }}>
                                                    <li><Link to=""><LinkedInLightIcon/></Link></li>
                                                    <li><Link><TwiterLightIcon/></Link></li>
                                                    <li><Link><FaceBookLightIcon/></Link></li>
                                            </ul>
                                                <a class="share-section" href="">
                                                    <p class="share"><Link to=""><img src={ShareIcon}></img></Link> Partager</p>
                                                </a>
                                                <a href=""><p class="voir-plus">Voir plus <Link to=""><img src={VoirPlusIcone}/></Link></p></a>
                                        </div>
                                    </div>
                                </div>
                                <div class="slide card">
                                    <div class="illustration">
                                        <div style={{ background: `url(${slide4})` }} class="background-image">

                                        </div>
                                    </div>
                                    <div class="card-info-container">
                                        <div class="card-info">
                                            <h6>Comité Interne de Suivi du Plan 
                                                National de Développement Sanitaire et social</h6>
                                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore …</p>
                                        </div>
                                        <div class="card-bottom">
                                            <ul class="share-hover" style={{ display: "none" }}>
                                                    <li><Link to=""><LinkedInLightIcon/></Link></li>
                                                    <li><Link><TwiterLightIcon/></Link></li>
                                                    <li><Link><FaceBookLightIcon/></Link></li>
                                            </ul>
                                                <a class="share-section" href="">
                                                    <p class="share"><Link to=""><img src={ShareIcon}></img></Link> Partager</p>
                                                </a>
                                                <a href=""><p class="voir-plus">Voir plus <Link to=""><img src={VoirPlusIcone}/></Link></p></a>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <img src={ForwordIcon} /* onclick={slideLeft} */ id="slide-to-right" className="slide-to-right" alt="Revenir en arrière" />
                    </div>
                </div>
            </section>
        </div>
    )
};

export default HomePage;