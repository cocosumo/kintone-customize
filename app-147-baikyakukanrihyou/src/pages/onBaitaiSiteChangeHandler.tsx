import {setFieldShown} from '../../../kintone-api/typescript/typedAPI';


const onBaitaiSiteChangeHandler = (event : FieldChangeEvent) => {
  const {record: {
    媒体サイト_copy: pseudoBaitaiSite,
  }} = event;


  setFieldShown('媒体サイト名', pseudoBaitaiSite.value === 'その他');
  setFieldShown('媒体サイト_copy', false);
  return event;
};

export default onBaitaiSiteChangeHandler;