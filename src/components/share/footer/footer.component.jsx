import React from 'react';
import {ReactComponent as LinkedIN} from '../../../assets/icons/linkedIn.svg';
import {ReactComponent as Twiter} from '../../../assets/icons/twiter.svg';
import {ReactComponent as Facebook} from '../../../assets/icons/facebook.svg';
import { Link } from 'react-router-dom';
import './footer.style.scss'


const Footer = ()=>(
    <footer>
    <p className="powed-by">Powered by @IP3-Conseil - 2021</p>
    <ul>
        <li><p>Nous suivre sur: </p></li>
        <li><Link><LinkedIN/></Link></li>
        <li><Link><Twiter/></Link></li>
        <li><Link><Facebook/></Link></li>
    </ul>
</footer>
);

export default Footer;