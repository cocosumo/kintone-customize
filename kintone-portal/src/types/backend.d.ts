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

interface FileObject {
  URL: string,
  type: string,
  size: number
}

interface FileObject {
  status?: string,
  statusText?: string
}