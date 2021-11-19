declare namespace kintone.types {
  interface Fields {
    ゆめてつ割合: kintone.fieldTypes.Number;
    ここすも割合: kintone.fieldTypes.Number;
    契約日: kintone.fieldTypes.Date;
    合計ポイント: kintone.fieldTypes.Calc;
    ここすも担当者: {
      type: 'SUBTABLE';
      value: Array<{
        id: string;
        value: {
          ここすも個人割合: kintone.fieldTypes.Number;
          ここすも担当者名: kintone.fieldTypes.SingleLineText;
          ここすも個人ポイント: kintone.fieldTypes.Number;
        };
      }>;
    };
    項目: {
      type: 'SUBTABLE';
      value: Array<{
        id: string;
        value: {
          ポイント: kintone.fieldTypes.Number;
          種類: kintone.fieldTypes.SingleLineText;
        };
      }>;
    };
    ゆめてつ担当者: {
      type: 'SUBTABLE';
      value: Array<{
        id: string;
        value: {
          ゆめてつ個人ポイント: kintone.fieldTypes.Number;
          ゆめてつ担当者名: kintone.fieldTypes.SingleLineText;
          ゆめてつ個人割合: kintone.fieldTypes.Number;
        };
      }>;
    };
  }
  interface SavedFields extends Fields {
    $id: kintone.fieldTypes.Id;
    $revision: kintone.fieldTypes.Revision;
    更新者: kintone.fieldTypes.Modifier;
    作成者: kintone.fieldTypes.Creator;
    レコード番号: kintone.fieldTypes.RecordNumber;
    更新日時: kintone.fieldTypes.UpdatedTime;
    作成日時: kintone.fieldTypes.CreatedTime;
  }
}
