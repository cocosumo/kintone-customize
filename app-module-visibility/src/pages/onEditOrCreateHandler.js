import {setVisibility} from '../helpers/visibility';

const onEditOrCreateHandler = ({record}) => {


  setVisibility(record);

  return {record};
};

export default onEditOrCreateHandler;
