const Notification = ({ notiMessage }) => {
  const notiStyle = {
    color: notiMessage.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  return notiMessage.text === null 
    ? <></>
    : <div style={notiStyle}>{notiMessage.text}</div>;
};

export default Notification;
