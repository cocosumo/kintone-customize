
declare namespace kintone.types {
  export interface AppFields {
    備考: kintone.fieldTypes.SingleLineText;
    店舗: kintone.fieldTypes.SingleLineText;
    終了: kintone.fieldTypes.DateTime;
    開始: kintone.fieldTypes.DateTime;
    号車: kintone.fieldTypes.SingleLineText;
    期間: kintone.fieldTypes.Calc;
  }
  export interface SavedAppFields extends AppFields {
    $id: kintone.fieldTypes.Id;
    $revision: kintone.fieldTypes.Revision;
    申請者: kintone.fieldTypes.Creator;
    更新者: kintone.fieldTypes.Modifier;
    レコード番号: kintone.fieldTypes.RecordNumber;
    申請日時: kintone.fieldTypes.CreatedTime;
    更新日時: kintone.fieldTypes.UpdatedTime;
  }
}
