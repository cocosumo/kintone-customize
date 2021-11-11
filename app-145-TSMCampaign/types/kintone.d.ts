
type Fields = kintone.types.Fields

interface SaveFields {
  record: kintone.types.SavedFields,
  error?: string
}

type AgentsTable = ここすも担当者 | ゆめてつ担当者


interface Table {
  type: 'SUBTABLE',
  value: Array<{
    id: string;
    value: any
  }>,
  error?: string
}

interface ここすも担当者 extends Table {

}

interface ゆめてつ担当者 extends Table {

}