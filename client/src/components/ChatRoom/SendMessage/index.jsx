import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { db } from '~/config/firebase';
import styles from './SendMessage.module.css';
import { Button } from 'react-bootstrap';

const SendMessage = () => {
  const [value, setValue] = useState('');
  const { currentUser } = getAuth();

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (value.trim() === '') {
      alert('Enter valid message!');
      return;
    }

    try {
      const { uid, displayName, photoURL } = currentUser;
      await addDoc(collection(db, 'messages'), {
        text: value,
        name: displayName,
        avatar: photoURL,
        createdAt: serverTimestamp(),
        uid,
      });
    } catch (error) {}
    setValue('');
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSendMessage} className={styles.form}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={styles.input}
          type='text'
        />
        <Button type='submit' className={styles.btn}>
          Send
        </Button>
      </form>
    </div>
  );
};

export default SendMessage;
