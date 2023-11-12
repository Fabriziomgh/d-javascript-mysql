import Swal from 'sweetalert2';
import '@sweetalert2/theme-bootstrap-4/bootstrap-4.css';

const ToastDelete = Swal.mixin({
   title: 'Estas seguro?',
   html: 'Luego no hay manera de revertirlo!',
   icon: 'warning',
   showCancelButton: true,
   confirmButtonColor: '#3085d6',
   cancelButtonColor: '#d33',
   confirmButtonText: 'Si, Borrar',
   toast: true,
   position: 'top-end',
});

const ToastMessage = Swal.mixin({
   toast: true,
   position: 'top-end',
   timer: 2000,
   timerProgressBar: true,
   showConfirmButton: false,
});

export { ToastDelete, ToastMessage };
