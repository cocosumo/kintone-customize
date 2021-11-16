interface FetchedRecords {
  records : KintoneTypes.SavedData[]
}

interface GroupedRecords {
  [key : string] : any
}

interface ShopRecords {
  records: Shop[]
}

type Shop = {
  area : any,
  店舗名: any
}