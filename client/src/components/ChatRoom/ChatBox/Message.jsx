import clsx from 'clsx';
import { getAuth } from 'firebase/auth';
import styles from './Chatbox.module.css';
import { Badge, Button } from 'react-bootstrap';

const Message = ({ message }) => {
  const { currentUser } = getAuth();

  return (
    <div
      className={clsx(styles.messageWrapper, {
        [styles.isMe]: message?.uid === currentUser?.uid,
      })}
    >
      <div className='d-flex'>
        <div
          style={{
            width: '30px',
            height: '30px',
          }}
        >
          <img
            style={{
              borderRadius: '50%',
              width: '100%',
              objectFit: 'cover',
            }}
            src={message.avatar}
          />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Badge
          pill
          className={clsx(styles.nameMessage, {
            [styles.isMe]: message?.uid === currentUser?.uid,
          })}
        >
          {message.name}
        </Badge>
        <div className={styles.contentMessage}>{message.text}</div>
      </div>
    </div>
  );
};

export default Message;
