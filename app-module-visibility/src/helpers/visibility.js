/* eslint-disable no-nested-ternary */
import settings from './visibilitySettings.json';
import {setFieldShown} from '../../../kintone-api/api';

let _record = {};

const resolveVisibility = (fieldsSettings, choice, isReverse = false, isHideAll = false) => {

  if (fieldsSettings[choice]) {
    Object.entries(fieldsSettings[choice])
      .forEach(([key, fields]) => {
        const isShow = key === 'show';
        const isVisible = isReverse ? !isShow : isShow;

        fields.forEach(fieldCode => {
          const nested = settings[fieldCode];
          if (nested) {
            console.log(_record[fieldCode].value, fieldCode, '_record[fieldCode]');
            resolveVisibility(nested, _record[fieldCode].value, false, !isVisible);
          }

          setFieldShown(fieldCode, isHideAll ? false : isVisible);
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
  _record = record;
  Object.entries(settings)
    .forEach(([fieldCode, fieldSettings]) => {
      const choice = record[fieldCode].value;
      resolveVisibility(fieldSettings, choice);
    });
};

export const setVisibilityByChangedField = (event) => {


  const {
    record,
    changes: {field},
    type
  } = event;

  _record = record;

  const fieldCode = type.split('change.')[1];
  const choice = field.value;

  resolveVisibility(settings[fieldCode], choice);
};