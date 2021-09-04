import { debounce } from '@material-ui/core';

const yasumiSaveHandler = debounce(({
  newYasumiRecords,
  savedRecords,
}) => {
  console.log(savedRecords, newYasumiRecords);
  /* Delete */
  Object.keys(savedRecords).forEach((key) => {
    console.log(key, newYasumiRecords[key]);
  });

  /* Add */

  /* Add and Update */
}, 1000);

export default yasumiSaveHandler;
