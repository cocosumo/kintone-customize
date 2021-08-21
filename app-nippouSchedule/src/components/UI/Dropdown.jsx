import Select from 'react-select';
import actionTypeData from '../../static/actionTypeData';

const Dropdown = ({ id, label, initialValue }) => {
  const optionData = actionTypeData();

  const options = optionData.map(({ type }) => ({
    value: type,
    label: type,
  }));

  const defaultValue = initialValue ? { value: initialValue, label: initialValue } : options[0];
  console.log(initialValue, 'hello');
  return (
    <>
      <label htmlFor={id} className="form__label">
        {label}
      </label>
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
