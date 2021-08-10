import swal from 'sweetalert';
import { removeItem } from '../../utilities/request.utility';

export const deleteItem = (url, id, libelle) => {
   return swal({
        title: `Etes vous de voulour supprimer "${libelle}"?`,
        text: "La suppression sera définitive!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
            });
            return removeItem(url, id);
        } else {
            swal("Suppression Annulée!");
            return;
        }
      });

}