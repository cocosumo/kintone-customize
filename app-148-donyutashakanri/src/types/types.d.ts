
declare let kintone: any;

type GroupedRecordsArray = [string, KintoneTypes.SavedData[]]

interface GroupedRecords {
  [key : string] : KintoneTypes.SavedData[] | {[key : string] : any}
}