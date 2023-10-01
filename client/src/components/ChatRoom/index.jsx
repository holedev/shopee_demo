import ChatBox from './ChatBox';
import SendMessage from './SendMessage';
import styles from './ChatRoom.module.css';
import { Badge } from 'react-bootstrap';
import { useState } from 'react';
import clsx from 'clsx';
import { useUserContext } from '~/hook';

const ChatRoom = () => {
  const [user] = useUserContext();
  const [open, setOpen] = useState(false);

  return (
    <div
      className={clsx(styles.wrapper, {
        [styles.hide]: !open,
        [styles.none]: !user?.id,
      })}
    >
      <div
        onClick={() => setOpen(!open)}
        style={{
          height: '40px',
          background: 'blue',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Badge bg='success'>!</Badge>
      </div>

      {open && (
        <>
          <ChatBox />
          <SendMessage />
        </>
      )}
    </div>
  );
};

export default ChatRoom;
