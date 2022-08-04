interface IEvent {
  record :kintone.types.SavedAppFields,
  type :string
}

interface MailObj {
  mailUrl :string,
  mailMain : string
}

declare module 'react-dom/client';