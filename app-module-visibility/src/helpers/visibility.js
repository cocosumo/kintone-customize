import settings from './visibilitySettings.json';
import {setFieldShown} from '../../../kintone-api/api';


const resolveVisibility = (fieldsSettings, choice, isReverse = false) => {

  if (fieldsSettings[choice]) {
    Object.entries(fieldsSettings[choice])
      .forEach(([key, fields]) => {
        const isShow = key === 'show';
        const isVisible = isReverse ? !isShow : isShow;
        fields.forEach(fieldCode => {
          setFieldShown(fieldCode, isVisible);
        });
      });
  } else {
    resolveVisibility(
      fieldsSettings,
      Object.keys(fieldsSettings)[0],
      true
    );
  }
};

export const setVisibility = (record) => {

  Object.entries(settings)
    .forEach(([fieldCode, fieldSettings]) => {
      const choice = record[fieldCode].value;
      resolveVisibility(fieldSettings, choice);
    });
};

export const setVisibilityByChangedField = ({fieldCode, choice}) => {
  resolveVisibility(settings[fieldCode], choice);
};