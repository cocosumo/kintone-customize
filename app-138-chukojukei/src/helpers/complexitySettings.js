import {setFieldShown} from '../../../kintone-api/api';

export const fieldsUnvisible_103_003_01 = () =>[
  '_103_003_01_2', '_103_003_01_3', '_103_003_01_4',
  '_103_003_01_5', '_103_003_01_6', '_103_003_01_7',
  '_103_003_01_8', '_103_003_01_9', '_103_003_01_10',
  '_103_003_01_11', '_103_003_01_12'
]
  .map((item) => `${setFieldShown((item), false)}`);

export const fieldsVisible_103_003_01 = () => [
  '_103_003_01_2', '_103_003_01_3', '_103_003_01_4',
  '_103_003_01_7', '_103_003_01_8', '_103_003_01_9',
  '_103_003_01_10', '_103_003_01_11', '_103_003_01_12'
]
  .map((item) => `${setFieldShown((item), true)}`);

export const fieldsUnvisible_103_003_01_4 = () => [
  '_103_003_01_5', '_103_003_01_6'
]
  .map((item) => `${setFieldShown((item), false)}`);

export const fieldsVisible_103_003_01_4 = () => [
  '_103_003_01_5', '_103_003_01_6'
]
  .map((item) => `${setFieldShown((item), true)}`);

export const fieldsUnvisible_103_003_01_8 = () => [
  '_103_003_01_9', '_103_003_01_10', '_103_003_01_11'
]
  .map((item) => `${setFieldShown((item), false)}`);

export const fieldsVisible_103_003_01_8 = () => [
  '_103_003_01_9', '_103_003_01_10', '_103_003_01_11'
]
  .map((item) => `${setFieldShown((item), true)}`);
