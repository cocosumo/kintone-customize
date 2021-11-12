
type Fields = kintone.types.Fields

interface SaveFields {
  record: kintone.types.SavedFields,
  error?: string,
  type: string,
  appId: string,
  recordId: string
}

type AgentsTable = ここすも担当者 | ゆめてつ担当者

interface TableRow {
  id: string;
  value: any
}

interface Table {
  type: 'SUBTABLE',
  value: TableRow[],
  error?: string
}

interface ここすも担当者 extends Table {

}

interface ゆめてつ担当者 extends Table {

}