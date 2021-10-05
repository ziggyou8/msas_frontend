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
    fetchStructureByIdAsync,
    fetchStructureByTypeAsync
} from '../../../redux/structure/structurethunk';
import { selectListCollectivite } from '../../../redux/collectivite/collectivite.selector';
import { fetchCollectiviteAsync } from '../../../redux/collectivite/collectivite.thunk';
import swal from 'sweetalert';


function Structure (props){
  const {structures, getCurrentStructure, history, ...otherProps} =props;
  const [allContries, setAllContries] =useState([{name:"Senegal"},{name:"Mali"},{name:"Gambi"}, {name:"Etc.."}])


  useEffect(()=>{
      props.initStructureData();
      props.initCollectiviteList();
      //props.getStructureByType('ong')
      //fetchAllContries(setAllContries);
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

  const $ = window.$;
  $('.tab-link').click( function() {
	
    var tabID = $(this).attr('data-tab');
    
    $(this).addClass('active').siblings().removeClass('active');
    
    $('#tab-'+tabID).addClass('active').siblings().removeClass('active');
  });
 
 /* const result = (values) => {
    console.log('result is', values);
    props.storeStructure(values);
    }

    result(); */
    return(
        <div>
          {/* <Form onSubmit={result} {...otherProps} allContries={allContries}/> */}
         <StructureForm allContries={allContries}  {...otherProps} />
        <div className="page-header">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white mr-2">
              <i className="mdi mdi-houzz"></i>
            </span> Structures
          </h3>
          <nav aria-label="breadcrumb">
            <ul className="breadcrumb">
              <button className="btn btn-primary text-white display1" className="btn btn-primary" data-toggle="modal"  data-target=".bd-example-modal-lg"><i className="mdi mdi-plus mdi-18px text-white align-left"></i> Structures</button>
            </ul>
          </nav>
        </div>
        {/* <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Liste des structures</h4>
                <div className="table-responsive">
                  <table className="table">
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
                            <i className="mdi mdi-eye mdi-18px text-primary"  onClick={()=>history.push(`/admin/structures/${structure.id}`)}></i>
                            <i className="mdi mdi-pencil mdi-18px text-primary " style={{ margin:'0px -15px' }} data-toggle="modal" data-target="#exampleModal" onClick={()=>props.getStructureById(structure.id)}></i>
                            <i className="mdi mdi-delete mdi-18px text-danger" onClick={() =>deleteStructure(structure.id, structure.denomination )}></i>
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
        </div> */}

<div className="wrapper">
		
    <div className="tab-wrapper">
      <ul className="tabs">
          <li className="tab-link active" data-tab="1">ONG</li>
          <li className="tab-link" data-tab="2">PTF</li>
          <li className="tab-link" data-tab="3">EPS</li>
          <li className="tab-link" data-tab="4">SPS</li>
      </ul>
    </div>
  
    <div className="content-wrapper">
  
      <div id="tab-1" className="tab-content active">
      <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
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
                      {structures && structures.filter(str => str.type_acteur ==="ONG").map(structure =>(
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
                            <i className="mdi mdi-eye mdi-18px text-primary"  onClick={()=>history.push(`/admin/structures/${structure.id}`)}></i>
                            <i className="mdi mdi-pencil mdi-18px text-primary " style={{ margin:'0px -15px' }} data-toggle="modal" data-target="#exampleModal" onClick={()=>props.getStructureById(structure.id)}></i>
                            <i className="mdi mdi-delete mdi-18px text-danger" onClick={() =>deleteStructure(structure.id, structure.denomination )}></i>
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
  
      <div id="tab-2" className="tab-content">
      <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
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
                      {structures && structures.filter(str => str.type_acteur ==="PTF").map(structure =>(
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
                            <i className="mdi mdi-eye mdi-18px text-primary"  onClick={()=>history.push(`/admin/structures/${structure.id}`)}></i>
                            <i className="mdi mdi-pencil mdi-18px text-primary " style={{ margin:'0px -15px' }} data-toggle="modal" data-target="#exampleModal" onClick={()=>props.getStructureById(structure.id)}></i>
                            <i className="mdi mdi-delete mdi-18px text-danger" onClick={() =>deleteStructure(structure.id, structure.denomination )}></i>
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
  
      <div id="tab-3"className="tab-content">
      <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
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
                      {structures && structures.filter(str => str.type_acteur ==="ESP").map(structure =>(
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
                            <i className="mdi mdi-eye mdi-18px text-primary"  onClick={()=>history.push(`/admin/structures/${structure.id}`)}></i>
                            <i className="mdi mdi-pencil mdi-18px text-primary " style={{ margin:'0px -15px' }} data-toggle="modal" data-target="#exampleModal" onClick={()=>props.getStructureById(structure.id)}></i>
                            <i className="mdi mdi-delete mdi-18px text-danger" onClick={() =>deleteStructure(structure.id, structure.denomination )}></i>
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

      <div id="tab-4"className="tab-content">
      <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
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
                      {structures && structures.filter(str => str.type_acteur ==="SPS").map(structure =>(
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
                            <i className="mdi mdi-eye mdi-18px text-primary"  onClick={()=>history.push(`/admin/structures/${structure.id}`)}></i>
                            <i className="mdi mdi-pencil mdi-18px text-primary " style={{ margin:'0px -15px' }} data-toggle="modal" data-target="#exampleModal" onClick={()=>props.getStructureById(structure.id)}></i>
                            <i className="mdi mdi-delete mdi-18px text-danger" onClick={() =>deleteStructure(structure.id, structure.denomination )}></i>
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

      <div id="tab-4"className="tab-content">
        MGGGG
      </div>

      <div id="tab-4"className="tab-content">
        MGGGG
      </div>

      
  
    </div>
    
  </div>

        </div>
    )
};

const mapDispatchToProps = dispatch =>({
  initStructureData: () => dispatch(fetchStructureAsync()),
  getStructureById : id => dispatch(fetchStructureByIdAsync(id)),
  getStructureByType : type => dispatch(fetchStructureByTypeAsync(type)),

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