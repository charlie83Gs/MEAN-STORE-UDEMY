import { ALERT_TYPE } from './values.config';
import Swal from 'sweetalert2';

export function basicAlert(icon = ALERT_TYPE.SUCCESS, title:string){
    Swal.fire({
        title,
        icon,
        confirmButtonText: 'X',
        toast:true,
        position:'bottom-start',
        timer:4000

      })
}