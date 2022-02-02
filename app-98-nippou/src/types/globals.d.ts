declare let kintone : any;

interface SelectedTime {
  id: string
}

interface KintoneTableRow {
  id?: number,
  value: {
    [key: string] : { type: string, value: string }
    reportStartTime : { type: 'TIME', value: string }
  }
}

export type KintoneTable = KintoneTableRow[];
