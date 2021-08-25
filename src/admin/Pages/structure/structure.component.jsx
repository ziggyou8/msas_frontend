import React from 'react';
import { useEffect } from 'react';
import StructureForm from './form';
import firebase, { firestore, getItem } from '../../../firebase/firebase.utils';
import './structure.style.scss'
import {
    getCurrentStructure,
    getStructureData,
    fetchStructureStratAsync
} from '../../../redux/structure/structure.action';
import { connect } from 'react-redux';
import { deleteItem } from '../../../assets/lib/alert';
import {selectStructureList } from '../../../redux/structure/structure.selector';
import { createStructuredSelector } from 'reselect';


function Structure (props){
  const {initStructureData, structures, getCurrentStructure} =props;

  useEffect(()=>{
      initStructureData();
  },[]);

  const deleteStructure =  (id, libelle)=>{
         deleteItem(id, libelle);
  }

  const getStructure = async(id)=> {
   getCurrentStructure (await getItem('structures', 'id', id))
  }

 

    return(
        <div>
         <StructureForm />
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
                        {Structure?.source_financement[0]?.denomination}
                        {/* <p>Denomination</p> */}
                        </td>
                        <td> {Structure?.source_financement[0]?.acteurs[0].libelle} </td>
                        <td> {Structure.telephone}</td>
                        <td> 
                            <div className="row">
                            <i class="mdi mdi-eye mdi-18px text-primary align-left mx-2" ></i>
                            <i class="mdi mdi-pencil mdi-18px text-primary align-left mx-2" data-toggle="modal" data-target="#exampleModal" onClick={()=>getStructure(Structure.id)}></i>
                            <i class="mdi mdi-delete mdi-18px text-danger align-left mx-2" onClick={() =>deleteStructure(Structure.id,Structure.denomination )}></i>
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
  //initStructureData: data => dispatch(getStructureData(data)),
  initStructureData: () => dispatch(fetchStructureStratAsync()),
  getCurrentStructure : data => dispatch(getCurrentStructure(data))
})

const mapStateToProps = createStructuredSelector({
  structures: selectStructureList,
});
export default connect(mapStateToProps, mapDispatchToProps) (Structure);