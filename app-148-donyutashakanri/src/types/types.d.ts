
type GroupedRecordsArray = [string, KintoneTypes.SavedData[]]

interface GroupedRecords {
  [key : string] : KintoneTypes.SavedData[] | {[key : string] : any}
}

interface KintoneEditCreateEvent {
  record: KintoneTypes.SavedData
}