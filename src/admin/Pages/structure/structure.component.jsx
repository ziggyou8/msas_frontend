import React from 'react';
import { useEffect } from 'react';
import StructureForm from './form';
import './structure.style.scss'
import { connect } from 'react-redux';
import { deleteItem } from '../../../assets/lib/alert';
import {selectStructureById, selectStructureList } from '../../../redux/structure/structure.selector';
import { createStructuredSelector } from 'reselect';
import { selectActeurById } from '../../../redux/acteur/acteur.selector';
import {
    fetchStructureAsync,
    removeStructureAsync,
    storeStructureAsync,
    updateStructureAsync,
    fetchStructureByIdAsync
} from '../../../redux/structure/structurethunk';


function Structure (props){
  const {structures, getCurrentStructure, ...otherProps} =props;

  useEffect(()=>{
      props.initStructureData();
  },[]);

  const deleteStructure =  (id, libelle)=>{
    props.removeStructure(id, libelle);
  }
 
    return(
        <div>
         <StructureForm {...otherProps} />
        <div class="page-header">
          <h3 class="page-title">
            <span class="page-title-icon bg-gradient-primary text-white mr-2">
              <i class="mdi mdi-houzz"></i>
            </span> Structures
          </h3>
          <nav aria-label="breadcrumb">
            <ul class="breadcrumb">
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
                        <th> Type de fonds </th>
                        <th> Source d'investissement </th>
                        <th> Type d'acteurs </th>
                        <th> Téléphone </th>
                        <th> Action </th>
                      </tr>
                    </thead>
                    <tbody>
                      {structures && structures.map(structure =>(
                        <tr key={structure.id}>
                        <td>
                          {structure.denomination}
                        </td>
                        <td> {structure.addresse_siege} </td>
                        <td> {structure.type_fonds} </td>
                        <td>
                        {structure?.source_financement?.denomination}
                        </td>
                        <td> {structure?.acteur} </td>
                        <td> {structure.telephone}</td>
                        <td> 
                            <div className="row">
                            <i class="mdi mdi-eye mdi-18px text-primary align-left mx-2" ></i>
                            <i class="mdi mdi-pencil mdi-18px text-primary align-left mx-2" data-toggle="modal" data-target="#exampleModal" onClick={()=>props.getStructureById(structure.id)}></i>
                            <i class="mdi mdi-delete mdi-18px text-danger align-left mx-2" onClick={() =>deleteStructure(structure.id, structure.denomination )}></i>
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

})

const mapStateToProps = createStructuredSelector({
  structures: selectStructureList,
  structureById: selectStructureById,
});
export default connect(mapStateToProps, mapDispatchToProps) (Structure);