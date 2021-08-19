import actionTypeData from '../../static/actionTypeData';

const Dropdown = ({ id, label, initialValue }) => {
  const optionData = actionTypeData();
  const options = optionData.map(({ type, color, bgColor }) => (
    <option
      key={type}
      data-color={color}
      data-bgcolor={bgColor}
      value={type}
    >
      {type}
    </option>
  ));
  console.log(initialValue);
  return (
    <>
      <label htmlFor={id} className="form__label">
        {label}
      </label>
      <select id={id} defaultValue={initialValue} className="form__input form__input_dropdown">
        {options}
      </select>
    </>
  );
};

export default Dropdown;
