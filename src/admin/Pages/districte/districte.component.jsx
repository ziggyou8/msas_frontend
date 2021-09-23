import React from 'react';
import './role.style.scss';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import DistricteForm from './form';
import { resetEditedDistricte } from '../../../redux/districte/districte.actions';
import { fetchDistricteAsync, fetchDistricteByIdAsync, removeDistricteAsync, storeDistricteAsync, updateDistricteAsync } from '../../../redux/districte/districte.thunk';
import { selectDistricteById, selectListDistricte } from '../../../redux/districte/districte.selector';
import {
    fetchCollectiviteByParentCodeAsync,
    fetchRegionAsync,
    fetchCollectiviteAsync
} from '../../../redux/collectivite/collectivite.thunk';
import {
    selectListRegion,
    selectCollectiviteByParentCode,
    selectListCollectivite
} from '../../../redux/collectivite/collectivite.selector';
import { resetCollectiviteByCodeParent } from '../../../redux/collectivite/collectivite.actions';

const Districte = (props)=>{
    const { districtesList ,getDistricteById, removeDistricte, ...otherProps} = props;
    const $ = window.$;


    useEffect(()=>{
        props.initDistricteList();
        props.initCollectiviteList();
    },[]);

      const deleteDistricte = (id, libelle)=>{
        removeDistricte(id, libelle);
        props.initDistricteList();
      }

      const resetFormAndInitListDistricte = ()=>{
        getDistricteById(null);
        props.initDistricteList();
     }

    return(
    <div>
        <DistricteForm {...otherProps}/>
        <div class="page-header">
            <h3 class="page-title">
            <span class="page-title-icon bg-gradient-primary text-white mr-2">
                <i class="mdi mdi-function"></i>
            </span> Districtes
            </h3>
            <nav aria-label="breadcrumb">
            <ul class="breadcrumb">
                <button class="btn btn-primary text-white display1"  data-toggle="modal" data-target="#exampleModal" onClick={()=>resetFormAndInitListDistricte()}><i class="mdi mdi-plus mdi-18px text-white align-left"></i> Districte</button>
            </ul>
            </nav>
        </div>
        <div class="row">
            <div class="col-12 grid-margin">
            <div class="card">
                <div class="card-body">
                <h4 class="card-title">Liste des districtes</h4>
                <div class="table-responsive">
                    <table class="table">
                    <thead>
                        <tr>
                            <th> Nom</th>
                            <th> Collectivité</th>
                            <th> Action </th>
                        </tr>
                    </thead>
                    <tbody>
        
                       {districtesList.map(districte=>(
                            <tr key={districte.id}>
                            <td>{districte.nom}</td>
                            <td>{districte.collectivite.nom}</td>
                            <td> 
                                <div className="row">
                                <i class="mdi mdi-eye mdi-18px text-primary align-left mx-2" ></i>
                                <i class="mdi mdi-pencil mdi-18px text-primary align-left mx-2" data-toggle="modal" data-target="#exampleModal" onClick={()=>getDistricteById(districte.id)}></i>
                                <i class="mdi mdi-delete mdi-18px text-danger align-left mx-2" onClick={()=>deleteDistricte(districte.id, districte.nom)} ></i>
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
)};

const mapDispatchToProps = dispatch =>({
    resetDistricte : ()=>dispatch(resetEditedDistricte()),
    resetCollectiviteByParentCode : ()=>dispatch(resetCollectiviteByCodeParent()),
    getDistricteById : id => dispatch(fetchDistricteByIdAsync(id)),
    storeDistricte: data => dispatch(storeDistricteAsync(data)),
    updateDistricte: (id, data) => dispatch(updateDistricteAsync(id, data)),
    removeDistricte: (id, libelle) => dispatch(removeDistricteAsync(id, libelle)),
    initDistricteList:()=>dispatch(fetchDistricteAsync()),
    initCollectiviteList:()=>dispatch(fetchCollectiviteAsync()),
    initRegionList:()=>dispatch(fetchRegionAsync()),
    getCollectiviteByParentCode : id => dispatch(fetchCollectiviteByParentCodeAsync(id)),


})

const mapStateToProps = createStructuredSelector({
    editedDistricte : selectDistricteById,
    collectiviteByCodeParent : selectCollectiviteByParentCode,
    districtesList : selectListDistricte,
    regionList : selectListRegion,
    collectiviteList:selectListCollectivite

})
export default connect(mapStateToProps,mapDispatchToProps) (Districte);