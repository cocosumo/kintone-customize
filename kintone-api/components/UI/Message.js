import './Message.css';

const Message = (props) => {
  const { children, isSuccess } = props;
  console.log('rendering messsage');
  return (
    <div className={`react-message ${isSuccess ? 'success' : 'error'}`}>
      {children}
    </div>
  );
};

export default Message;
