import './Message.css';
import PropTypes from 'prop-types';

const Message = (props) => {
  const {children, isSuccess} = props;
  console.log('rendering messsage');
  return (
    <div className={`react-message ${isSuccess ? 'success' : 'error'}`}>
      {children}
    </div>
  );
};

export default Message;

Message.propTypes = {
  children: PropTypes.node,
  isSuccess: PropTypes.bool
};
