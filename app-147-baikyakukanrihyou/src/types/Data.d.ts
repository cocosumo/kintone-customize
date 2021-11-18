declare namespace KintoneTypes {
  interface Data {
    媒体サイト: kintone.fieldTypes.SingleLineText;
    受付時刻: kintone.fieldTypes.Time;
    営業担当: kintone.fieldTypes.SingleLineText;
    受付店舗: kintone.fieldTypes.SingleLineText;
    その他備考: kintone.fieldTypes.MultiLineText;
    反響受付日: kintone.fieldTypes.Date;
    種別: kintone.fieldTypes.DropDown;
    課金対象: kintone.fieldTypes.RadioButton;
    媒介獲得日: kintone.fieldTypes.Date;
    査定先住所: kintone.fieldTypes.SingleLineText;

    反響対応: kintone.fieldTypes.CheckBox;
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
