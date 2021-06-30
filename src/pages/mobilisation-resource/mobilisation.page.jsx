import React, { useEffect, useState } from 'react';
import {ReactComponent as Warning} from '../../assets/icons/warning.svg';
import mobilisationResoureceImage from '../../assets/images/mob-ressource.svg';
import './mobilisation.style.scss';
function MobilisationRessource(){

    return(
        <section>
            <div class="mob-ressource">
            <h2>MOBILISATION DE RESSOURCES </h2>
                <div class="mob-ressource-content row">
                    <div class="mob-ressource-content-left col-md-8">
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus </p>
                        <div>
                            <Warning/>
                            <h3>Contenu à préciser</h3>
                        </div>
                    </div>
                    <div class="col-md-4" style={{ background: `url(${mobilisationResoureceImage})` }}>

                    </div>
                </div>
            </div>
        </section>
    )
};

export default MobilisationRessource;