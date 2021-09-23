import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import validate from '../../../../validation/validation';
import FormInput from '../components/FormInput';
import {
  upper,
  aadhaar,
  pan,
  salary
} from '../../../../validation/normalize';
import {
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  Input,
  Label
} from 'reactstrap';
import { agentExecution, piliers, typeOng, typePtf } from '../../../../Data/data';

const PersonalDetailsForm = (props) => {

 


  const { handleSubmit, previousPage } = props;
  const [sousRecipiandaire, setSousRecipiandaire] =useState([[1,"1"]])
  const [isDeleted, setIsDeleted] =useState(true)
  



const addSousRecipainadaire = ()=>{
  setSousRecipiandaire(prevCount => [...prevCount, [prevCount?.length +1, `${prevCount?.length +1}`]])
}

const RemoveSousRecipainadaire = (id)=>{
  setSousRecipiandaire(prevCount => prevCount.filter((sr) => sr !== id));

}


 const  createUI =()=>{
    return (sousRecipiandaire.map((acteur, i) =>
      <FormGroup row key={i} style={{marginBottom:'-15px'}}>
      <Col xs="12" lg="4">
          <Field 
            name={`projet_sous_recipiandaire[${acteur[1]}]`}
            type="text"
            component={FormInput}
            label="Projet"
          />
        </Col>
        <Col xs="12" lg="4">
          <Field 
            name={`montant_sous_recipiandaire[${acteur[1]}]`}
            type="text"
            component={FormInput}
            placeholder="CFA"
            label="Montant"
          />
        </Col>
        <Col xs="12" lg="4">
        <button style={{ marginTop:'25px', marginLeft:"-25px" }} type="button" className="btn btn-danger btn-sm float-left " /* disabled = {`${acteurFields === 1  ? 'disabled': ''}`}  */ onClick={()=>RemoveSousRecipainadaire(acteur)} ><i class="mdi mdi-delete mdi-18px text-white "></i></button>
        </Col>
      </FormGroup>)
      )
 }

  return (
    <form onSubmit={handleSubmit}>
      <Col sm="12">
        <Card className="card-border">
          {props.typeActeur === 'PTF' && (<CardBody>
          <FormGroup row>
          <Col xs="12" lg="3">
              <Field
              name="type"
              type="select"
              options={[typePtf.map(achat=><option value={achat[1]}>{achat[1]}</option>)]}
              component={FormInput}
              label="Type"
              inputPlaceHolder="Type"/>
          </Col>
          <Col xs="12" lg="3">
                <Field
                  name="agent_execution"
                  type="select"
                  component={FormInput}
                  label="Agent d'éxecution"
                  inputPlaceHolder="Agent d'éxecution"
                  options={[agentExecution.map(achat=><option value={achat[1]}>{achat[1]}</option>)]}
                />
            </Col>
              <Col xs="12" lg="3">
                  <Field
                  name="date_debut_intervention"
                  type="date"
                  component={FormInput}
                  label="Début de l'intervention"
                  inputPlaceHolder="Début intervention"
                  
                  />
              </Col>
              <Col xs="12" lg="3">
                  <Field
                  name="date_fin_intervention"
                  type="date"
                  component={FormInput}
                  label="Fin de l'intervention"
                  inputPlaceHolder="Fin intervention"
                  />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col xs="12" lg="3">
                    <Field
                      name="mt_prevu_par_pilier_annee_en_cour"
                      type="file"
                      component={FormInput}
                      label="Montant prévu par pilier année en cours"
                      inputPlaceHolder="Montant CFA"
                    />
                </Col>
                <Col xs="12" lg="3">
                    <Field
                      name="projection_annee_n_plus1_par_pilier"
                      type="file"
                      component={FormInput}
                      label="Projection année N+1 par pilier"
                      inputPlaceHolder="Montant CFA"
                    />
                </Col>
                <Col xs="12" lg="3">
                    <Field
                      name="projection_annee_n_plus2_par_pilier"
                      type="text"
                      component={FormInput}
                      label="Projection année N+2 par pilier"
                      inputPlaceHolder="Montant CFA"
                    />
                </Col>
                <Col xs="12" lg="3">
                    <Field
                    name="mt_mobilise_par_pilier"
                    type="text"
                    component={FormInput}
                    label="Montant mobilisé par pilier"
                    inputPlaceHolder="Montant CFA"
                    
                    />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs="12" lg="3">
                    <Field
                    name="mt_execute_par_pilier"
                    type="text"
                    component={FormInput}
                    label="Montant exécuté par pilier"
                    inputPlaceHolder="Montant CFA"
                    />
                </Col>
                <Col xs="12" lg="3">
                    <Field
                    name="piliers_intervention"
                    type="select"
                    component={FormInput}
                    label="Piliers d'intervention"
                    inputPlaceHolder="Piliers"
                    options={[piliers.map(pilier=><optgroup label={pilier[0]}>{pilier[1].map(p =><option value={p[1]}>{p[1]}</option>)}</optgroup>)]}
                    
                    />
                </Col>

                <Col xs="12" lg="3">
                  <Field
                  name="bailleur"
                  type="text"
                  component={FormInput}
                  label="Bailleur"
                  inputPlaceHolder="Bailleur"
                  />
              </Col>
              </FormGroup>
          </CardBody>)}



          {props.typeActeur === 'ONG' && (<CardBody>
          <FormGroup row>
          <Col xs="12" lg="3">
              <Field
              name="type"
              type="select"
              options={[typeOng.map(achat=><option value={achat[1]}>{achat[1]}</option>)]}
              component={FormInput}
              label="Type"
              inputPlaceHolder="Type"/>
          </Col>
          <Col xs="12" lg="3">
                <Field
                  name="bailleur"
                  type="text"
                  component={FormInput}
                  label="Bailleur"
                  inputPlaceHolder="Bailleur"
                />
            </Col>
              <Col xs="12" lg="3">
                  <Field
                  name="date_debut_intervention"
                  type="date"
                  component={FormInput}
                  label="Début de l'intervention"
                  inputPlaceHolder="Sous recipiandaire"
                  
                  />
              </Col>
              <Col xs="12" lg="3">
                  <Field
                  name="date_fin_intervention"
                  type="date"
                  component={FormInput}
                  label="Fin de l'intervention"
                  inputPlaceHolder="Fin intervention"
                  />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col xs="12" lg="3">
                    <Field
                      name="email"
                      type="text"
                      component={FormInput}
                      label="Email"
                      inputPlaceHolder="@gmail.com"
                    />
                </Col>
                <Col xs="12" lg="3">
                    <Field
                      name="piliers_intervention"
                      type="select"
                      component={FormInput}
                      label="Piliers d'intervention"
                      inputPlaceHolder="Piliers"
                      options={[piliers.map(pilier=><optgroup label={pilier[0]}>{pilier[1].map(p =><option value={p[1]}>{p[1]}</option>)}</optgroup>)]}
                    />
                </Col>
                <Col xs="12" lg="3">
                    <Field
                      name="montant_global_projet"
                      type="text"
                      component={FormInput}
                      label="Montant global du projet"
                      inputPlaceHolder="Montant CFA"
                    />
                </Col>
                <Col xs="12" lg="3">
                    <Field
                    name="mt_prevu_par_pilier"
                    type="number"
                    component={FormInput}
                    label="Montant prévu par palier"
                    inputPlaceHolder="Montant CFA"
                    
                    />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs="12" lg="3">
                    <Field
                    name="mt_mobilise_par_pilier"
                    type="text"
                    component={FormInput}
                    label="Montant mobilisé par pilier"
                    inputPlaceHolder="Montant CFA"
                    />
                </Col>
                <Col xs="12" lg="3">
                    <Field
                    name="mt_execute_par_pilier"
                    type="text"
                    component={FormInput}
                    label="Montant executé par pilier"
                    inputPlaceHolder="Montant CFA"
                    />
                </Col>
                <Col xs="12" lg="3">
                  <Field
                  name="sous_recipiandaire"
                  type="text"
                  component={FormInput}
                  label="Sous recipiandaire"
                  inputPlaceHolder="Sous recipiandaire"
                  
                  />
              </Col>
              <Col xs="12" lg="3">
                    <Field
                    name="mecanisme_financement"
                    type="text"
                    component={FormInput}
                    label="Mécanisme de financement"
                    inputPlaceHolder="Montant CFA"
                    />
                </Col>
              </FormGroup>

            <div style={{ marginTop:'-15px'}}>
             <p style={{ marginBottom:'15px', fontWeight:"bold" }}>Sous récipiandaires</p>

             {createUI()}


            
            <button style={{ marginTop:'-5px' }} type="button" className="btn btn-sm btn-primary float-left" onClick={()=>addSousRecipainadaire()} ><i class="mdi mdi-plus mdi-18px text-danger "></i></button>
             </div>

          </CardBody>)}
          <div style={{ paddingBottom: 30 }}>
            <Button color="primary" className="btn-pill pull-left" onClick={previousPage} style={{marginLeft: '20px'}}>
              <i className="fa fa-chevron-left" />
                &nbsp; Previous
            </Button>
            <Button color="primary"  className="btn-pill pull-right" type="submit" style={{marginRight: '20px'}}>
               Next &nbsp;
              <i className="fa fa-chevron-right" />
            </Button>
          </div>
        </Card>
      </Col>
    </form>
  );
};

PersonalDetailsForm.propTypes = {
  handleSubmit: PropTypes.func,
  previousPage: PropTypes.func
};

export default reduxForm({
  form: 'wizardForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(PersonalDetailsForm);