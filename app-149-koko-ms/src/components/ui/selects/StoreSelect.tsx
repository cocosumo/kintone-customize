
import BasicSelect from './BasicSelect';

export default function StoreSelect() {
  /* TODO: Pull from database */
  const stores: Options = [
    {
      key: '1',
      text: '豊田店',
    },
    {
      key: '2',
      text: '八幡店',
    },
    {
      key: '3',
      text: '豊川店',
    },
  ];

  return (
    <BasicSelect label="店舗" options={stores} required />
  );
}