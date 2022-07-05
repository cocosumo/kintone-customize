declare namespace kintone.types {
  interface AppFields {
    urlBackup: kintone.fieldTypes.SingleLineText;
    mail_title: kintone.fieldTypes.SingleLineText;
    customerType: kintone.fieldTypes.DropDown;
    sendStatus: kintone.fieldTypes.RadioButton;
    mail_number: kintone.fieldTypes.SingleLineText;
    mail_main: kintone.fieldTypes.MultiLineText;
    日付: kintone.fieldTypes.Date;
  }
  interface SavedAppFields extends AppFields {
    $id: kintone.fieldTypes.Id;
    $revision: kintone.fieldTypes.Revision;
    更新者: kintone.fieldTypes.Modifier;
    作成者: kintone.fieldTypes.Creator;
    レコード番号: kintone.fieldTypes.RecordNumber;
    更新日時: kintone.fieldTypes.UpdatedTime;
    作成日時: kintone.fieldTypes.CreatedTime;
  }
}
