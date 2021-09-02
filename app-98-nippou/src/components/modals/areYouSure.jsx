import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const areYouSure = () => MySwal.fire({
  icon: 'warning',
  title: '削除しますか',
  reverseButtons: true,
  showCancelButton: true,
  focusConfirm: false,
  heightAuto: false,
});

export default areYouSure;
