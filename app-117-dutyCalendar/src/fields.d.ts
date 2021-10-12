/* eslint-disable no-unused-vars */
declare namespace kintone.types {
  interface Fields {
    title: kintone.fieldTypes.SingleLineText;
    toDo: kintone.fieldTypes.DropDown;
    startTime: kintone.fieldTypes.DateTime;
    文字列__複数行_: kintone.fieldTypes.MultiLineText;

    onDuty: kintone.fieldTypes.UserSelect;
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
