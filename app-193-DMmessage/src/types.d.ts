interface IEvent {
  record :kintone.types.SavedAppFields,
  type :string
}

interface MailObj {
  mailTitle: string,
  mailUrl :string,
  mailMain : string
}

declare module 'react-dom/client';