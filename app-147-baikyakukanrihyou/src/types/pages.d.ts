interface IndexEvent {
  records: KintoneTypes.Data,
  type: string,
  viewType: string,
  viewId: string
}

interface RecordShowEvent {
  record: KintoneTypes.SavedData,
  type: string,
}

interface FieldChangeEvent extends RecordShowEvent {
  change?: kintone.fieldTypes.SingleLineText
}