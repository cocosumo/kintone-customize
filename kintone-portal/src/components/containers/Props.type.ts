
export type Props = {
  children?: React.ReactNode
};

export type NewsOrEvent = 'NEWS' | 'EVENTS'

export interface TitledContainer extends Props {
  title: NewsOrEvent,
  subTitle: string,
  dataCount?: string
}
