import {fieldsUnvisible_103_003_01, fieldsVisible_103_003_01,
  fieldsUnvisible_103_003_01_4, fieldsVisible_103_003_01_4,
  fieldsVisible_103_003_01_8, fieldsUnvisible_103_003_01_8} from './complexitySettings';

export const complexityProcess = (event) => {
  console.log('complexityProcess', event);

  // 「①土地区画整理法に基づく制限」の表示設定
  if (event.type.includes('_103_003_01_1')) {
    if (event.changes.field.value === '無') {
      fieldsUnvisible_103_003_01();
    } else {
      fieldsVisible_103_003_01();
      visibleCheck_103_003_01(event.record);
    }
  }

  // 「仮換地指定」の表示設定
  if (event.type.includes('_103_003_01_4')) {
    if (event.changes.field.value === '未') {
      fieldsUnvisible_103_003_01_4();
    } else {
      fieldsVisible_103_003_01_4();
      // visibleCheck_103_003_01(event.record);
    }
  }

  // 「精算金の徴収・交付」の表示設定
  if (event.type.includes('_103_003_01_8')) {
    if (event.changes.field.value === '有') {
      fieldsVisible_103_003_01_8();
      // visibleCheck_103_003_01(event.record);
    } else {
      fieldsUnvisible_103_003_01_8();
    }
  }
};

const visibleCheck_103_003_01 = (record) => {
  // console.log('visiblecheck', record);
  if (record._103_003_01_4.value === '未') {
    fieldsUnvisible_103_003_01_4();
  } else {
    fieldsVisible_103_003_01_4();
  }

  if (record._103_003_01_8.value === '有') {
    fieldsVisible_103_003_01_8();
  } else {
    fieldsUnvisible_103_003_01_8();
  }
};

export const visibleChecks = (event) => {
  // 複雑なフィールド表示の、初回チェック用
  visibleCheck_103_003_01(event.record);
};
