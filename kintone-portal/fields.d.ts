declare namespace kintone.types {
  interface Fields {
    文字列＿タイトル: kintone.fieldTypes.SingleLineText;
    リッチ＿内容: kintone.fieldTypes.RichText;
    日時＿終了: kintone.fieldTypes.DateTime;
    日時＿開始: kintone.fieldTypes.DateTime;
    ドロップダウン＿種類: kintone.fieldTypes.DropDown;
    所属: kintone.fieldTypes.DropDown;
    ラジオ＿投稿期間: kintone.fieldTypes.RadioButton;
    状態: kintone.fieldTypes.RadioButton;

    添付ファイル: kintone.fieldTypes.File;
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
