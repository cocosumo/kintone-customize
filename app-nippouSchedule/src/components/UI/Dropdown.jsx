import Select from 'react-select';
import actionTypeData from '../../static/actionTypeData';

const Dropdown = ({ id, label, initialValue }) => {
  const optionData = actionTypeData();

  const options = optionData.map(({ type }) => ({
    value: type,
    label: type,
  }));
  console.log(initialValue);
  const defaultValue = initialValue ? { value: initialValue, label: initialValue } : options[0];

  return (
    <>
      <label htmlFor={id} className="form__label">
        {label}
      </label>
      {/* <select id={id} defaultValue={initialValue} className="form__input form__input_dropdown">
        {options}
      </select> */}
      <Select
        id={id}
        isSearchable={false}
        defaultValue={defaultValue}
        options={options}
      />
    </>
  );
};

export default Dropdown;
