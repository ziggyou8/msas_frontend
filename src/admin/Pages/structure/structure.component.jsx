import React, { useState } from 'react';
import { useEffect } from 'react';
import StructureForm from './form';
import './structure.style.scss'
import { connect } from 'react-redux';
import {selectStructureById, selectStructureList } from '../../../redux/structure/structure.selector';
import { createStructuredSelector } from 'reselect';
import {
    fetchStructureAsync,
    removeStructureAsync,
    storeStructureAsync,
    updateStructureAsync,
    fetchStructureByIdAsync
} from '../../../redux/structure/structurethunk';
import { selectListCollectivite } from '../../../redux/collectivite/collectivite.selector';
import { fetchCollectiviteAsync } from '../../../redux/collectivite/collectivite.thunk';
import { fetchAllContries } from '../../../Data/data';
import axios from 'axios';


function Structure (props){
  const {structures, getCurrentStructure, history, ...otherProps} =props;
  const [allContries, setAllContries] =useState([{name:"Senegal"},{name:"Mali"},{name:"Gambi"}, {name:"Etc.."}])


  useEffect(()=>{
      props.initStructureData();
      props.initCollectiviteList();
      fetchAllContries(setAllContries);
      //fetching()
  },[]);


  /* const fetching =()=>{
    return axios.get('https://api.first.org/data/v1/countries?region=africa&limit=3&pretty=true')
    .then(response => {
        // handle the response
      console.log('------dddbbbb------', response)

    })
    .catch(error => {
        // handle the error
      console.log('------dddbbbb------', error)
        
    });
  } */

  const deleteStructure =  (id, libelle)=>{
    props.removeStructure(id, libelle);
  }
 
 /* const result = (values) => {
    console.log('result is', values);
    props.storeStructure(values);
    }

    result(); */
    return(
        <div>
          {/* <Form onSubmit={result} {...otherProps} allContries={allContries}/> */}
         <StructureForm allContries={allContries}  {...otherProps} />
        <div class="page-header">
          <h3 class="page-title">
            <span class="page-title-icon bg-gradient-primary text-white mr-2">
              <i class="mdi mdi-houzz"></i>
            </span> Structures
          </h3>
          <nav aria-label="breadcrumb">
            <ul class="breadcrumb">
              <button class="btn btn-primary text-white display1" class="btn btn-primary" data-toggle="modal"  data-target=".bd-example-modal-lg"><i class="mdi mdi-plus mdi-18px text-white align-left"></i> Structures</button>
            </ul>
          </nav>
        </div>
        <div class="row">
          <div class="col-12 grid-margin">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Liste des structures</h4>
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th> Dénomination </th>
                        <th> Type d'acteur </th>
                        <th> Dimensions de l'acteur </th>
                        <th> Téléphone </th>
                        <th> Adresse </th>
                        <th> Action </th>
                      </tr>
                    </thead>
                    <tbody>
                      {structures && structures.map(structure =>(
                        <tr key={structure.id}>
                        <td>{structure.denomination}</td>
                        <td> {structure.type_acteur} </td>
                        <td>
                          {structure.mobilisation_ressource ? <span className="badge badge-primary mx-1">Mobilisation</span>: ""}
                          {structure.mis_en_commun_ressource ? <span className="badge badge-primary mx-1">Mis en commun</span>: ""}
                          {structure.achat_service ? <span className="badge badge-primary mx-1">Achat service</span>: ""}
                        </td>
                        <td> {structure.telephone_siege} </td>
                        <td> {structure?.adresse_siege} </td>
                       
                        <td> 
                            <div className="row" style={{ display:'inline-block' }}>
                            <i class="mdi mdi-eye mdi-18px text-primary"  onClick={()=>history.push(`/admin/structures/${structure.id}`)}></i>
                            <i class="mdi mdi-pencil mdi-18px text-primary " style={{ margin:'0px -15px' }} data-toggle="modal" data-target="#exampleModal" onClick={()=>props.getStructureById(structure.id)}></i>
                            <i class="mdi mdi-delete mdi-18px text-danger" onClick={() =>deleteStructure(structure.id, structure.denomination )}></i>
                            </div> 
                          </td>
                      </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    )
};

const mapDispatchToProps = dispatch =>({
  initStructureData: () => dispatch(fetchStructureAsync()),
  getStructureById : id => dispatch(fetchStructureByIdAsync(id)),

  storeStructure: data => dispatch(storeStructureAsync(data)),
  updateStructure: (id, data) => dispatch(updateStructureAsync(id, data)),
  removeStructure: (id, libelle) => dispatch(removeStructureAsync(id, libelle)),
  initCollectiviteList:()=>dispatch(fetchCollectiviteAsync()),


})

const mapStateToProps = createStructuredSelector({
  structures: selectStructureList,
  structureById: selectStructureById,
  collectiviteList:selectListCollectivite

});
export default connect(mapStateToProps, mapDispatchToProps) (Structure);