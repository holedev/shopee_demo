import clsx from 'clsx';
import styles from './StarRating.module.css';
import { useState } from 'react';

const StarRating = ({ rating, setRating, readonly }) => {
  const [hover, setHover] = useState(rating);
  return (
    <div className={styles.wrapper}>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            className={clsx(styles.button, {
              [styles.on]: index <= ((rating && hover) || hover),
              [styles.off]: index > ((rating && hover) || hover),
              [styles.disableHover]: readonly,
            })}
            type='button'
            key={index}
            onClick={!readonly ? () => setRating(index) : null}
            onMouseEnter={!readonly ? () => setHover(index) : null}
            onMouseLeave={!readonly ? () => setHover(rating) : null}
            onDoubleClick={
              !readonly
                ? () => {
                    setRating(0);
                    setHover(0);
                  }
                : null
            }
          >
            <span className={styles.star}>&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
