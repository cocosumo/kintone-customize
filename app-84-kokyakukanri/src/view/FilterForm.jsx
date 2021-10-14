import { isMobile } from '../../../kintone-api/api';

const Select = ({
  containerName, labelId, labelText, selectId,
}) => (
  <div className={containerName}>
    <label id={labelId} htmlFor={selectId}>
      {labelText}
      &nbsp;
    </label>
    <select
      id={selectId}
      aria-label={labelText}
    />
  </div>
);

const FilterForm = () => (
  <div className="ListBoxGroup">
    <Select
      containerName="ShopListBox"
      labelId="my_textShop"
      selectId="my_selectShop"
      labelText="店舗名："
    />
    {isMobile() && <br />}
    <Select
      containerName="EmpListBox"
      labelId="my_textEmp"
      selectId="my_selectEmp"
      labelText="担当名："
    />
  </div>
);

export default FilterForm;
