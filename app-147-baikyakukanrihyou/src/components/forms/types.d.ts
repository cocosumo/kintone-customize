
interface MonthAndStoreForm {
  reportDate: Date,
  stores: string[]
}

interface MonthAndStoreProps {
  monthAndStore: MonthAndStoreForm,
  setMonthAndStore: Dispatch<SetStateAction<MonthAndStoreForm | null>>
  groupedRecords: GroupedRecords
}