import { useNoteContext } from '../../hook';
import styles from './Comment.module.css';

function Comment({ props }) {
  const [notes, setNotes] = useNoteContext();

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          Created at {props?.createdAt} by {props?.author}
        </div>
      </div>
      <div className={styles.content}>{props.content}</div>
    </div>
  );
}

export default Comment;
