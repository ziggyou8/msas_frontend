import React from 'react';
import { useEffect } from 'react';
import SourceFinancementForm from './form';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
    selectSourceFinancementList,
    selectSourceFinancementById
} from '../../../redux/source-financement/source-financement.Selector';
import {
    fetchSourceFinancementAsync,
    fetchSourceFinancementByIdAsync,
    removeSourceFinancementeAsync,
    storeSourceFinancementAsync,
    updateSourceFinancementAsync
} from '../../../redux/source-financement/source-financement.thunk';
import { resetEditedSourceFinancement } from '../../../redux/source-financement/source-financement.action';


function SourceFinancement (props){
  const {getSourceFinancementList, sourceFinancementList, ...otherProps} = props;

  useEffect(()=>{
    getSourceFinancementList();
  },[]);

    return(
        <div>
         <SourceFinancementForm {...otherProps}/>
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
                          {source.denomination}
                        </td>
                        <td> {source.acteurs.map(acteur=>(
                          <div className="badge badge-primary mx-1">{acteur.libelle}</div>
                        ))} </td>
                        <td> 
                            <div className="row">
                            <i class="mdi mdi-eye mdi-18px text-primary align-left mx-2" ></i>
                            <i class="mdi mdi-pencil mdi-18px text-primary align-left mx-2" data-toggle="modal" data-target="#exampleModal" onClick={()=>props.getSourceFinancementById(source.id)}></i>
                            <i class="mdi mdi-delete mdi-18px text-danger align-left mx-2" onClick={()=>props.removeSourceFinancement(source.id, source.denomination)} ></i>
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

const mapStateToProps = createStructuredSelector({
  sourceFinancementList : selectSourceFinancementList,
  sourceFinancementById : selectSourceFinancementById,

})

const mapDispatchToProps = dispatch =>({
  resetSourceFinancement : ()=>dispatch(resetEditedSourceFinancement()),
  getSourceFinancementList : () => dispatch(fetchSourceFinancementAsync()),
  getSourceFinancementById : id => dispatch(fetchSourceFinancementByIdAsync(id)),
  storeSourceFinancement: data => dispatch(storeSourceFinancementAsync(data)),
  updateSourceFinancement: (id, data) => dispatch(updateSourceFinancementAsync(id, data)),
  removeSourceFinancement: (id, libelle) => dispatch(removeSourceFinancementeAsync(id, libelle)),
})

export default connect(mapStateToProps, mapDispatchToProps) (SourceFinancement);

