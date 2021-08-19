const TextAreaInput = ({ id }) => (
  <>
    <label htmlFor={id} className="form__label">
      行動内容:
      <textarea id={id} className="form__input form__input_text-area" rows="4" />
    </label>

  </>

);

export default TextAreaInput;
