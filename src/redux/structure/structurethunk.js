import swal from 'sweetalert';
import { getItem, getItems, removeItem, storeItem, updateItem, storeItemWithUplodingFile } from '../../utilities/request.utility';
import {
    fetchStructureStart,
    fetchStructureByIdSuccess,
    fetchStructureFail,
    updateStructureSuccess,
    removeStructureSuccess,
    storeStructureSuccess,
    fetchStructureSuccess,
    fetchStructureByTypeSuccess
} from './structure.action';



  export const fetchStructureAsync = ()=>{
    return (dispatch) => {
      dispatch(fetchStructureStart())
       getItems('structures').then(res=>{
         dispatch(fetchStructureSuccess(res.data.data))
        }).catch(err=>{
          dispatch(fetchStructureFail(err.message))
        })
    }
  }

  export const fetchStructureByIdAsync = id=>{
    return dispatch => {
      dispatch(fetchStructureStart())
      getItem('structures', id).then(res=>{
         dispatch(fetchStructureByIdSuccess(res.data.data));
        }).catch(err=>{
          dispatch(fetchStructureFail(err.message))
        })
    }
  }

  export const fetchStructureByTypeAsync = type=>{
    return dispatch => {
      dispatch(fetchStructureStart())
      getItem('structures/type_acteur', type).then(res=>{
         dispatch(fetchStructureByTypeSuccess(res.data.data));
        }).catch(err=>{
          dispatch(fetchStructureFail(err.message))
        })
    }
  }

  export const storeStructureAsync = (data)=>{
    return dispatch => {
      dispatch(fetchStructureStart())
       storeItemWithUplodingFile('structures', data).then(res=>{
         dispatch(storeStructureSuccess(res.data.data));
         
           swal({
          title: "Ajout!",
          text: "Enregistrement effectué avec succès",
          icon: "success",
          button: "Ok!"
        });
       
         

        }).catch(err=>{
          swal({
            title: "Erreur!",
            text: "Cet adresse email est déjà utilisé",
            icon: "error",
            button: "Ok!"
          });
          dispatch(fetchStructureFail(err.message))
        })
    }
  }

  export const updateStructureAsync = (id, data)=>{
    return dispatch => {
      dispatch(fetchStructureStart())
       updateItem('structures', id, data).then(res=>{
         dispatch(updateStructureSuccess(res.data.data))
        }).catch(err=>{
          dispatch(fetchStructureFail(err.message))
        })
    }
  }

  export const removeStructureAsync = (id, libelle)=>{
    return dispatch => {
      dispatch(fetchStructureStart())
      removeItem('structures', id, libelle).then(()=>{
        dispatch(removeStructureSuccess(id))
      }).catch(err=>{
          dispatch(fetchStructureFail(err.message))
        })
    }
  }

  
