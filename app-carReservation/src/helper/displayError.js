import Swal from 'sweetalert2';

const displayError = (title, msg) => {
  Swal.fire(title, msg, 'error');
};

export default displayError;
