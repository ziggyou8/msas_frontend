import React from 'react';
import { useEffect } from 'react';
import firebase, { getData } from '../../../firebase/firebase.utils';
import SourceFinancementForm from './form';
import {
    getSourceFinancementData
} from '../../../redux/source-financement/source-financement.action';
import { connect } from 'react-redux';


function SourceFinancement ({getSourceFinancementList, sourceFinancementList}){

  useEffect(async()=>{
    getSourceFinancementList( await getData('source_financement'));
  },[]);

    return(
        <div>
         <SourceFinancementForm />
        <div class="page-header">
          <h3 class="page-title">
            <span class="page-title-icon bg-gradient-primary text-white mr-2">
              <i class="mdi mdi-chart-line"></i>
            </span> Source de financement
          </h3>
          <nav aria-label="breadcrumb">
            <ul class="breadcrumb">
              {/* <li class="breadcrumb-item active" aria-current="page">
                <span></span>Statistiques <i class="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
              </li> */}
              <button class="btn btn-primary text-white display1" data-toggle="modal" data-target="#exampleModal"><i class="mdi mdi-plus mdi-18px text-white align-left"></i> Source de financement</button>
            </ul>
          </nav>
        </div>
        <div class="row">
          <div class="col-12 grid-margin">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Liste des Sources de financement</h4>
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th> Source de financement </th>
                        <th> Types d'acteur</th>
                        <th> Action </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sourceFinancementList && sourceFinancementList.map(source =>(
                        <tr>
                        <td>
                          {source.source_financement}
                        </td>
                        <td> {source.type_acteur.map(type=>(
                          <div className="badge badge-primary mx-1">{type}</div>
                        ))} </td>
                        <td> 
                            <div className="row">
                            <i class="mdi mdi-eye mdi-18px text-primary align-left mx-2"></i>
                            <i class="mdi mdi-pencil mdi-18px text-primary align-left mx-2"></i>
                            <i class="mdi mdi-delete mdi-18px text-danger align-left mx-2"></i>
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

const mapStateToProps = state => ({
  sourceFinancementList : state.sourceFinancements.sourceFinancements
})

const mapDispatchToProps = dispatch =>({
  getSourceFinancementList : data => dispatch(getSourceFinancementData(data))
})

export default connect(mapStateToProps, mapDispatchToProps) (SourceFinancement);

