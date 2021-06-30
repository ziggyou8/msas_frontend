import React from 'react';
import {ReactComponent as LinkedIN} from '../../../assets/icons/linkedIn.svg';
import {ReactComponent as Twiter} from '../../../assets/icons/twiter.svg';
import {ReactComponent as Facebook} from '../../../assets/icons/facebook.svg';
import { Link } from 'react-router-dom';
import './header.style.scss'


const Header = ()=>(
    <div class="header ">
        <div class="header-content col-md-8 col-md-12 col-sm-12">
            <h1 class="title">PLATEFORME NUMERIQUE DE SUIVI DU FINANCEMENT DE LA SANTE AU SENEGAL</h1>
            <div class="rs">
                <p>Nous suivre sur :</p>
                <ul>
                <li><Link><LinkedIN/></Link></li>
                <li><Link><Twiter/></Link></li>
                <li><Link><Facebook/></Link></li>
                </ul>
            </div>
        </div>
    </div>
);

export default Header;