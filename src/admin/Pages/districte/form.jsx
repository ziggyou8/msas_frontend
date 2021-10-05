import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';


function DistricteForm(props) {
    const $ = window.$;
    const {editedDistricte,initDistricteList, resetDistricte, 
          storeDistricte,updateDistricte, regionList,
          initRegionList, 
          collectiviteByCodeParent, collectiviteList,
          resetCollectiviteByParentCode} = props;
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    //const [region, setRegion] = useState();
    const [departements, setDepartement] = useState({});
    const [communes, setCommune] = useState();
    const [quartiers, setQuartier] = useState();

    
    function assignBy(key) {
        return (data, item) => {
            data[item[key]] = item;
            return data;
        }
    }

    useEffect(()=>{
         reset({ 
             name: editedDistricte?.name,
             permission_id: editedDistricte?.permission_id
            });
            initRegionList();
         initDistricteList();
    },[editedDistricte]);


    $('#region').on('change', function(e) {
       resetCollectiviteByParentCode();
      /*  getCollectiviteByParentCode($(this).find(':selected').attr('data-id')) */
      setDepartement(collectiviteList.reduce(assignBy(1),{}))
    });
    
    


    /* $('#departement').change(function(e) {
       setCommune(departements?.filter(departement => departement.parent_code === $(this).find(':selected').attr('data-id')))
    }); */

      //console.log('✅ ✅ ✅', collectiviteByCodeParent);
      console.log('✅ ✅ ✅', departements);
      //regionList && setDepartement(collectiviteByCodeParent);



    const resetForm =()=>{
        reset();
          resetDistricte();
          editedDistricte?.permissions.forEach(permission =>{
            $('#permission option[data-id=' + permission + ']').attr('selected', false)
        })
    }

    //!editedDistricte && $("#permission option").prop("selected", false).trigger( "change" );

    editedDistricte?.permissions.forEach(permission =>{
        $('#permission option[data-id=' + permission + ']').attr('selected', true)
    })


    const onSubmit = async(data, e) => {
        const { name, permission_id} = data;
        const districteData = {name, permission_id:[...permission_id]}
         if (editedDistricte) {
           updateDistricte(editedDistricte.id, districteData);
         }else{
           storeDistricte(districteData);
         }
         closeModal();
         initDistricteList();
         resetForm();

    }


   
    

    const closeModal = ()=> window.$('#exampleModal').modal('hide');
    
  return(
        <div className="modal fade"  data-keyboard="false" data-backdrop="static"  id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <Helmet>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css" />
                <script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js" />
                <script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/i18n/defaults-*.min.js" />
            </Helmet>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">AJOUT D'UN RÔLES</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>resetForm()}>
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                
                <form id="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                        <div className="form-group col-md-12">
                            <label for="name">Libellé</label>
                            <input type="text"  className="form-control" {...register("name", { required: true })}  id="name" placeholder="name" />
                            {errors.name && errors.name.type === "required" && <span className="text-danger">Veuillez remplir ce champ</span>}
                        </div>
                        <div className="form-group col-md-12">
                            <label for="region">Région</label>
                            <select className="form-control" data-actions-box="true" data-live-search="true" {...register("region")} id="region">
                                <option>Choisir...</option>
                                {regionList.map(region=>(
                                    <option data-id={region.code} value={region.id}>{region.nom}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group col-md-12">
                            <label for="departement">Département</label>
                            <select className="form-control" data-actions-box="true" data-live-search="true" {...register("departement")} id="departement">
                                {collectiviteByCodeParent?.map(departement=>(
                                    <option data-id={departement.nom} value={departement.id}>{departement.nom}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group col-md-12">
                            <label for="commune">Commune</label>
                            <select className="form-control" data-actions-box="true" data-live-search="true" {...register("commune")} id="commune">
                                {communes?.map(region=>(
                                    <option data-id={region.nom} value={region.id}>{region.nom}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group col-md-12">
                            <label for="quartier">Quartiers</label>
                            <select className="form-control" data-actions-box="true" data-live-search="true" {...register("quartier")} id="quartier">
                                {quartiers?.map(region=>(
                                    <option data-id={region.nom} value={region.id}>{region.nom}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group col-md-12">
                            <label for="nom">Nom districte</label>
                            <input type="text"  className="form-control" {...register("nom", { required: true })}  id="nom" placeholder="nom" />
                            {errors.name && errors.name.type === "required" && <span className="text-danger">Veuillez remplir ce champ</span>}
                        </div>
                    </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>resetForm()}><i className="mdi mdi-close mdi-18px text-white align-left"></i> Annuler</button>
                            <button type="submit" className="btn btn-primary"  /* onClick={()=> setTimeout(function() {$('#exampleModal').modal('hide')}, 4000)} */><i className="mdi mdi-check mdi-18px text-white align-left"></i> Enregistrer</button>
                        </div>
                </form>
            </div>
      </div>
    </div>
    {/* <Helmet>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.min.js"></script>
    </Helmet> */}
  </div>
    )
};

export default DistricteForm;

