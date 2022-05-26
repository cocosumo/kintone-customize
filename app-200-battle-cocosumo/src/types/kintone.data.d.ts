declare namespace KintoneTypes195 {
  interface Record {
    配布エリア: kintone.fieldTypes.SingleLineText;
    担当者名: kintone.fieldTypes.SingleLineText;
    てまき種類: kintone.fieldTypes.DropDown;
    行動日: kintone.fieldTypes.Date;
    枚数: kintone.fieldTypes.Number;
  }
  interface SavedRecord extends Record {
    $id: kintone.fieldTypes.Id;
    $revision: kintone.fieldTypes.Revision;
    更新者: kintone.fieldTypes.Modifier;
    作成者: kintone.fieldTypes.Creator;
    レコード番号: kintone.fieldTypes.RecordNumber;
    更新日時: kintone.fieldTypes.UpdatedTime;
    作成日時: kintone.fieldTypes.CreatedTime;
  }
}
