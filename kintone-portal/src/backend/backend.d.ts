interface KintoneAPIBody {
  query : string | '',
  app :number | string | null,
  fields ?: kintone.types.SavedFields[],
}

type Announcements = kintone.types.SavedFields[] | undefined

interface GroupAnnouncements {
  news: kintone.types.SavedFields[],
  events: kintone.types.SavedFields[]
}