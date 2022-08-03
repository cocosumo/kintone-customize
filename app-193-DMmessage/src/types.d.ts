interface IEvent {
  record :kintone.types.SavedAppFields
}

interface MailObj {
  mailUrl :string,
  mailMain : string
}

declare module 'react-dom/client';