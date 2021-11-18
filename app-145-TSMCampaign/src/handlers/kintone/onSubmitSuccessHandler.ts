import {recalculateAll} from '../../helpers/calculate';

const onSubmitSuccessHandler = (event: SaveFields)=>{
  recalculateAll(event);
};

export default onSubmitSuccessHandler;