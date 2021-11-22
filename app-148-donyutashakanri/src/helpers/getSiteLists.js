import {fetchRecords} from '../../../kintone-api/fetchRecords';

const getSiteLists = () => {
  const appId = 146;
  const fetchSiteLists = () => fetchRecords({appId});
  const siteLists = async () => (await fetchSiteLists())
    .records
    .filter(({媒体サイト名}) => (媒体サイト名.value) !== 'その他')
    .map(({媒体サイト名}) => 媒体サイト名.value);

  return siteLists();
};

export default getSiteLists;
