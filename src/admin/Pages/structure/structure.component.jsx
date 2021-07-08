import React, { useState } from 'react';
import { useEffect } from 'react';
import StructureForm from './form';
import firebase, { getData } from '../../../firebase/firebase.utils';
import './structure.style.scss'
import { getStructureData } from '../../../redux/structure/structure.action';
import { connect } from 'react-redux';


function Structure ({initStructureData, structures}){

  useEffect(async()=>{
    initStructureData(await getData('structures'))
  },[]);

    return(
        <div>
         <StructureForm />
        <div class="page-header">
          <h3 class="page-title">
            <span class="page-title-icon bg-gradient-primary text-white mr-2">
              <i class="mdi mdi-account"></i>
            </span> Structures
          </h3>
          <nav aria-label="breadcrumb">
            <ul class="breadcrumb">
              {/* <li class="breadcrumb-item active" aria-current="page">
                <span></span>Statistiques <i class="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
              </li> */}
              <button class="btn btn-primary text-white display1" data-toggle="modal" data-target="#exampleModal"><i class="mdi mdi-plus mdi-18px text-white align-left"></i> Structures</button>
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
                        <th> Denomination </th>
                        <th> Addresse siège </th>
                        <th> Source d'investissement </th>
                        <th> Type d'acteur </th>
                        <th> Téléphone </th>
                        <th> Action </th>
                      </tr>
                    </thead>
                    <tbody>
                      {structures && structures.map(Structure =>(
                        <tr>
                        <td>
                          {Structure.denomination}
                        </td>
                        <td> {Structure.addresse_siege} </td>
                        <td>
                        {Structure.source_investissement}
                        </td>
                        <td> {Structure.type_acteur} </td>
                        <td> {Structure.telephone}</td>
                        <td> 
                            <div className="row">
                            <i class="mdi mdi-eye mdi-18px text-primary align-left mx-2"></i>
                            <i class="mdi mdi-pencil mdi-18px text-primary align-left mx-2"></i>
                            <i class="mdi mdi-delete mdi-18px text-danger align-left mx-2"></i>
                            </div> 
                          </td>
                      </tr>
                      ))}
                      {/* <tr>
                        <td>
                          <img src="/assets/images/faces/face2.jpg" class="mr-2" alt="image"/> Stella Johnson
                        </td>
                        <td> High loading time </td>
                        <td>
                          <label class="badge badge-gradient-warning">PROGRESS</label>
                        </td>
                        <td> Dec 12, 2017 </td>
                        <td> WD-12346 </td>
                      </tr>
                      <tr>
                        <td>
                          <img src="/assets/images/faces/face3.jpg" class="mr-2" alt="image" /> Marina Michel
                        </td>
                        <td> Website down for one week </td>
                        <td>
                          <label class="badge badge-gradient-info">ON HOLD</label>
                        </td>
                        <td> Dec 16, 2017 </td>
                        <td> WD-12347 </td>
                      </tr>
                      <tr>
                        <td>
                          <img src="/assets/images/faces/face4.jpg" class="mr-2" alt="image" /> John Doe
                        </td>
                        <td> Loosing control on server </td>
                        <td>
                          <label class="badge badge-gradient-danger">REJECTED</label>
                        </td>
                        <td> Dec 3, 2017 </td>
                        <td> WD-12348 </td>
                      </tr> */}
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
  initStructureData: data => dispatch(getStructureData(data))
})

const mapStateToProps = state => ({
  structures: state.structure.structure
});
export default connect(mapStateToProps, mapDispatchToProps) (Structure);