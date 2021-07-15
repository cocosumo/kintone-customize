import './Message.css';

const Message = (props) => {
  const { children } = props;
  console.log('rendering messsage');
  return (
    <div className="react message">
      {children}
    </div>
  );
};

export default Message;
