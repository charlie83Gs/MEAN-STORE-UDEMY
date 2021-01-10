import { ALERT_TYPE } from './values.config';
import Swal from 'sweetalert2';
//https://sweetalert2.github.io/#usage
export function basicAlert(icon = ALERT_TYPE.SUCCESS, title:string){
    Swal.fire({
        title,
        icon,
        confirmButtonText: 'X',
        toast:true,
        position:'bottom-start',
        timer:4000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      })
}