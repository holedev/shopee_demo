import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import styles from './Home.module.css';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useUserContext } from '../../hook';

function Home() {
  return (
    <div className={clsx(styles.wrapper, 'grid')}>
      <section className={styles.body}>
        <ul className={styles.bodyLeft}></ul>

        <div className={styles.bodyRight}></div>
      </section>
    </div>
  );
}

export default Home;
