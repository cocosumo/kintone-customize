import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const areYouSure = () => MySwal.fire({
  title: '削除しますか',
  showCancelButton: true,
  focusConfirm: false,
  heightAuto: false,
});

export default areYouSure;
