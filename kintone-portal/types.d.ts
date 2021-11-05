
type Announcements = kintone.types.SavedFields[] | undefined

interface GroupAnnouncements {
  news: kintone.types.SavedFields[],
  events: kintone.types.SavedFields[]
}