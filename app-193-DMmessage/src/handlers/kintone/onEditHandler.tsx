import gettingUrl from '../gettingUrl';
import './onCreateHandler.css';

const onEditHandler = (event : kintone.types.SavedAppFields) => {
  console.log('onEdit Test');
  gettingUrl(event);

  return event;
};

export default onEditHandler;