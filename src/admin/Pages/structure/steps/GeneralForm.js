import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import validate from '../../../../validation/validation';
import FormInput from '../components/FormInput'
import {
  mobile,
  captialize,
  age
} from '../../../../validation/normalize';
import {
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  Label,Input 
} from 'reactstrap';
import { useState } from 'react';
import { acteurs, districts, typeAchat, mecanismeFinance, fetchAllContries } from '../../../../Data/data';


const GeneralForm = (props) => {
  const { handleSubmit, allContries} = props;
  const [isRegionChanged, setisRegionChanged] =useState(true)
  const [isDepartementChanged, setisDepartementChanged] =useState(true)
  const [isCommuneChanged, setisCommuneChanged] =useState(true)
  const [departements, setDepartements] =useState([])
  const [communes, setCommunes] =useState([])
  /* const [allContries, setAllContries] =useState([]) */

 
  /* useEffect(()=>{
    props.initCollectiviteList();
    fetchAllContries(setAllContries);
},[]); */




  const [selectedActeur, setselectedActeur] =useState()
  const [isAchatServiceCheck, setIsAchatServiceCheck] =useState(false)
 
  const miseEnCommunHandler = (e)=>{

  }

  const submitHandler = (e)=>{
    e.preventDefault();
  }

  const achatServiceHandler = (e)=>{
    setIsAchatServiceCheck(e.target.checked);
    console.log('******TESTE******', isAchatServiceCheck);

  }
  
  const typeActeurHandler = (e)=>{
    props.handleTypeActeur(e.target.value);
    setselectedActeur(e.target.value);
  }
  

  const regionHandler = (e)=>{
    e.target.value ? setisRegionChanged(false) : setisRegionChanged(true)
    setDepartements(props.collectiviteList?.filter(col=>col.parent_code === e.target.value));
    setCommunes([])
  }

  const departementHandler = (e)=>{
    e.target.value ? setisDepartementChanged(false) : setisDepartementChanged(true);
    setCommunes(props.collectiviteList?.filter(col=>col.parent_code === e.target.value))
  }

  const communeHandler = (e)=>{
    e.target.value ? setisCommuneChanged(false) : setisCommuneChanged(true)
  }


  const regions = props.collectiviteList?.filter(col=>col.type_collectivite === "REGION");
  const $ = window.$;

  /* $('#region').change(function (e) {
    $('#departement').val('').trigger("change");
     e.target.value ? $('#departement').prop("disabled", false) : $('#departement').prop("disabled", true);
    $('#commune').val('').trigger("change").empty();
    $('#quartiervillage').val('').trigger("change").empty();
    });

    $('#departement').change(function () {
        $('#commune').val('').trigger("change");
        $('#quartiervillage').val('').trigger("change").empty();
    }); */

    
  return (
    <form onSubmit={handleSubmit}>
      <Col sm="12">
        <Card className="card-border">
          <CardBody>
            
          <FormGroup row>
          <Col xs="12" lg="3">
                <Field
                customId="MGGGG"
                  name="type_acteur"
                  type="select"
                  component={FormInput}
                  options ={[acteurs.map(acteur=><option  value={acteur[1]}>{acteur[1]}</option>)]}
                  label="Type d'acteur *"
                  inputPlaceHolder="Type d'acteur"
                  normalize={captialize}
                  onChange={typeActeurHandler}
                />
            </Col>
              <Col xs="12" lg="3">
                  <Field
                  name="denomination"
                  type="text"
                  component={FormInput}
                  label="Dénomination"
                  inputPlaceHolder="Dénomination de l'acteur"
                  normalize={captialize}
                  />
              </Col>
              {selectedActeur ==="PTF" &&(<Col xs="12" lg="3">
                  <Field
                  name="pays_nationalite"
                  type="select"
                  component={FormInput}
                  label="Pays/Nationalité"
                  inputPlaceHolder="Pays/Nationalité"
                  normalize={captialize}
                  options ={[allContries.map(acteur=><option value={acteur.name}>{acteur.name}</option>)]}
                  />
              </Col>)}
              
              
              {(() => {
                switch (selectedActeur) {
                  case 'ONG':
                  case 'PTF':
                    return(
                      <Col xs="12" lg="3">
                        <Field
                        name="numero_agrement"
                        type="text"
                        component={FormInput}
                        label="Numéro d'agrément"
                        inputPlaceHolder="Numéro d'agrément"
                        normalize={captialize}
                        />
                    </Col>)
                    break;
                  default:
                    break;
                }
              })()}
            </FormGroup>

            <FormGroup row>
            <Col xs="12" lg="3">
                  <Field 
                    name="region_intervention"
                    type="select"
                    component={FormInput}
                    options ={[regions.map(regions=><option value={regions.code}>{regions.nom}</option>)]}
                    label="Région d'intervention *"
                    inputPlaceHolder="Région..."
                    normalize={captialize}
                    onChange={regionHandler}
                  />
              </Col>
              <Col xs="12" lg="3">
                  <Field  disabled={isRegionChanged}
                    name="departement_intervention"
                    type="select"
                    component={FormInput}
                    options ={[departements.map(dep=><option value={dep.code}>{dep.nom}</option>)]}
                    label="Département d'intervention *"
                    inputPlaceHolder="Département..."
                    normalize={captialize}
                    onChange={departementHandler}

                  />
              </Col>
              <Col xs="12" lg="3">
                  <Field disabled={isDepartementChanged || isRegionChanged}
                    name="commune_intervention"
                    type="select"
                    component={FormInput}
                    options ={[communes.map(commune=><option value={commune.code}>{commune.nom}</option>)]}
                    label="Commune d'intervention *"
                    inputPlaceHolder="Commune..."
                    normalize={captialize}
                  />
              </Col>
              <Col xs="12" lg="3">
                  <Field disabled={isRegionChanged}
                    name="districte_intervention"
                    type="select"
                    component={FormInput}
                    options ={[districts.map(district=><option value={district[1]}>{district[1]}</option>)]}
                    label="Districte d'intervention *"
                    inputPlaceHolder="Districte..."
                    normalize={captialize}
                  />
              </Col>
            </FormGroup>


            <FormGroup row>
            <Col xs="12" lg="3">
                  <Field
                    name="latitude"
                    type="text"
                    component={FormInput}
                    label="Latitude*"
                    inputPlaceHolder="Latitude"
                    normalize={captialize}
                  />
              </Col>
              <Col xs="12" lg="3">
                  <Field
                    name="longitude"
                    type="text"
                    component={FormInput}
                    label="Longitude"
                    inputPlaceHolder="Longitude"
                    normalize={captialize}
                  />
              </Col>
              <Col xs="12" lg="3">
                  <Field
                    name="autre_secteur_intervention"
                    type="text"
                    component={FormInput}
                    label="Autres secteurs d'intervention"
                    inputPlaceHolder="Autres secteurs"
                    normalize={captialize}
                  />
              </Col>
              <Col xs="12" lg="3">
                  <Field
                    name="paquet_sante_intervention"
                    type="text"
                    component={FormInput}
                    label="Paquet santé d'intervention"
                    inputPlaceHolder="Paquet santé d'intervention"
                    normalize={captialize}
                  />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col xs="12" lg="3">
                  <Field
                  name="telephone_siege"
                  type="text"
                  component={FormInput}
                  label="Téléphone siège"
                  inputPlaceHolder="Tel siège"
                  normalize={captialize}
                  />
              </Col>
              <Col xs="12" lg="3">
                  <Field
                  name="email_siege"
                  type="text"
                  component={FormInput}
                  label="Email siège *"
                  inputPlaceHolder="Email du siège"
                  normalize={captialize}
                  />
              </Col>
              <Col xs="12" lg="3">
                  <Field
                  name="adresse_siege"
                  type="text"
                  component={FormInput}
                  label="Adresse siège *"
                  inputPlaceHolder="Adresse du siège"
                  normalize={captialize}
                  />
              </Col>

              <Col xs="12" lg="3">
                  <Field
                  name="accord_siege"
                  type="text"
                  component={FormInput}
                  label="Accord de siège"
                  inputPlaceHolder="Accord de siège"
                  normalize={captialize}
                  />
              </Col>
            </FormGroup>

            <FormGroup row>
            <Col xs="12" lg="3">
                  <Field
                  name="mecanisme_financement"
                  type="select"
                  component={FormInput}
                  label="Mécanisme de financement"
                  inputPlaceHolder="Email du siège"
                  normalize={captialize}
                  options={[mecanismeFinance.map(achat=><option value={achat[1]}>{achat[1]}</option>)]}
                  />
              </Col>
              {isAchatServiceCheck && (<Col xs="12" lg="3">
                  <Field 
                  name="type_achat"
                  type="select"
                  component={FormInput}
                  label="Type d'achat"
                  inputPlaceHolder="Type d'achat"
                  normalize={captialize}
                  options={[typeAchat.map(achat=><option value={achat[1]}>{achat[1]}</option>)]}
                  />
              </Col>)}
            </FormGroup>


           {/*  <FormGroup row>
              <Col xs="12" lg="6">
                <Field
                  name="fatherName"
                  type="text"
                  component={FormInput}
                  label="FatherName"
                  inputPlaceHolder="Enter Father Name"
                  normalize={captialize}
                />
              </Col>
              <Col xs="12" lg="6">
                <Field
                  name="phone"
                  type="text"
                  component={FormInput}
                  label="Mobile No *"
                  inputPlaceHolder="+91"
                  normalize={mobile}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12" lg="6">
                <Field
                  name="dob"
                  type="date"
                  component={FormInput}
                  label="Date of Birth"
                />
              </Col>

              <Col xs="12" lg="6">
                <Field
                  name="age"
                  type="text"
                  component={FormInput}
                  label="Age"
                  inputPlaceHolder="Enter Age"
                  normalize={age}
                />
              </Col>
            </FormGroup> */}
             <div style={{ marginTop:'-15px'}}>
             <p style={{ marginBottom:'15px', fontWeight:"bold" }}>Les dimensions  de l'acteur</p>
            <FormGroup row>
            <Col xs="12" lg="4">
                <Field 
                  customId="mobilisation_ressource"
                  name="mobilisation_ressource"
                  type="checkbox"
                  component={FormInput}
                  label="Moobilisation des ressources"
                />
              </Col>
              <Col xs="12" lg="4">
                <Field 
                 customId="mis_en_commun"
                  name="mis_en_commun"
                  type="checkbox"
                  component={FormInput}
                  label="Mise en commun des ressources"
                />
              </Col>
              <Col xs="12" lg="4">
                <Field 
                  customId="Achat_service"
                  name="Achat_service"
                  type="checkbox"
                  component={FormInput}
                  label="Achat de services"
                  onChange={achatServiceHandler}
                />
              </Col>
            </FormGroup>
             </div>

          </CardBody>
          <div style={{ paddingBottom: 30, marginRight:'50px'}}>
            <Button color="primary"  type="submit" style={{marginRight: '10px'}}>
               Next &nbsp;
              <i className="fa fa-chevron-right" />
            </Button>
          </div>
        </Card>
      </Col>
    </form>
  );
};

GeneralForm.propTypes = {
  handleSubmit: PropTypes.func
};

export default reduxForm({
  form: 'wizardForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(GeneralForm);