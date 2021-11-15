declare namespace KintoneTypes {
  interface Data {
    文字列__1行_: kintone.fieldTypes.SingleLineText;
    ラジオボタン: kintone.fieldTypes.RadioButton;
    営業担当: kintone.fieldTypes.SingleLineText;
    受付店舗: kintone.fieldTypes.SingleLineText;
    時刻: kintone.fieldTypes.Time;
    文字列__複数行_: kintone.fieldTypes.MultiLineText;
    種別: kintone.fieldTypes.DropDown;
    ルックアップ_0: kintone.fieldTypes.SingleLineText;
    日付: kintone.fieldTypes.Date;
    日付_2: kintone.fieldTypes.Date;

    チェックボックス: kintone.fieldTypes.CheckBox;
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
