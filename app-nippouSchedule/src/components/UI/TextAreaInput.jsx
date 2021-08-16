import FullWidth from '../containers/FullWidth';

const TextAreaInput = ({ id }) => (
  <FullWidth>
    <label htmlFor={id}>
      行動内容:
      <textarea id={id} rows="4" />
    </label>
  </FullWidth>
);

export default TextAreaInput;
