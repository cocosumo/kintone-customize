declare namespace KintoneTypes {
  interface Data {
    ダミー: kintone.fieldTypes.SingleLineText;
    適用月: kintone.fieldTypes.DropDown;
    エリア店舗名: kintone.fieldTypes.SingleLineText;
    媒体サイト名: kintone.fieldTypes.SingleLineText;
    課金額: kintone.fieldTypes.Number;
    適用年: kintone.fieldTypes.DropDown;
    適用年月: kintone.fieldTypes.Date;
    導入他社数: kintone.fieldTypes.Number;
  }
  interface SavedData extends Data {
    $id: kintone.fieldTypes.Id;
    $revision: kintone.fieldTypes.Revision;
    更新者: kintone.fieldTypes.Modifier;
    作成者: kintone.fieldTypes.Creator;
    レコード番号: kintone.fieldTypes.RecordNumber;
    更新日時: kintone.fieldTypes.UpdatedTime;
    作成日時: kintone.fieldTypes.CreatedTime;
  }
}
