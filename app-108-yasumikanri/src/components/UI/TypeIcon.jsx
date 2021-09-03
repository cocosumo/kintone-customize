import Processing from '../../assets/day-processing.png';
import Leave from '../../assets/day-leave.png';
import LeaveAM from '../../assets/day-leave-am.png';
import LeavePM from '../../assets/day-leave-pm.png';
import LeaveSpecial from '../../assets/day-leaveSpecial.png';
import LeaveSpecialAM from '../../assets/day-leaveSpecial-am.png';
import LeaveSpecialPM from '../../assets/day-leaveSpecial-pm.png';

import OrdinaryAM from '../../assets/day-ordinary-am.png';
import OrdinaryPM from '../../assets/day-ordinary-pm.png';
import Ordinary from '../../assets/day-ordinary.png';

const resolveIcon = ({ type, duration, status }) => {
  switch (type) {
    case 'day-ordinary':
      switch (duration) {
        case 'day-whole': return Ordinary;
        case 'day-am': return OrdinaryAM;
        case 'day-pm': return OrdinaryPM;
        default:
      }
      break;

    case 'day-leave':
      switch (status) {
        case 'unprocessed':
        case 'processing': return Processing;
        case 'approved':
          switch (duration) {
            case 'day-whole': return Leave;
            case 'day-am': return LeaveAM;
            case 'day-pm': return LeavePM;
            default:
          }
          break;
        case 'returned':
        default:
      }
      break;

    case 'day-leaveSpecial':
      switch (status) {
        case 'unprocessed':
        case 'processing': return Processing;
        case 'approved':
          switch (duration) {
            case 'day-whole': return LeaveSpecial;
            case 'day-am': return LeaveSpecialAM;
            case 'day-pm': return LeaveSpecialPM;
            default:
          }
          break;
        case 'returned':
        default:
      }
      break;
    default: return Processing;
  }
  return Processing;
};

const TypeIcon = ({ record }) => <img src={resolveIcon(record)} alt="type" width="100%" />;

export default TypeIcon;
