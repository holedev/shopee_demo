import { useNavigate } from 'react-router-dom';
import { logo } from '../../assets/img';
import styles from './Header.module.css';
import { useUserContext } from '../../hook';

function Header() {
  const navigate = useNavigate();
  const [user] = useUserContext();

  const handleLogout = () => {
    user?.auth.signOut();
    navigate('/auth');
    localStorage.removeItem('uid');
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <div className={styles.headerLogo}>
          <img className={styles.headerLogoImg} src={logo} alt='LOGO' />
        </div>
      </div>
      <div className={styles.search}>
        <input
          type='text'
          placeholder='Search (only UI)'
          className={styles.searchInp}
        />
      </div>
      <div className={styles.headerRight}>
        {user && (
          <div className={styles.user}>
            <div className={styles.userAvt}>
              <img
                className={styles.userAvtImg}
                src={user?.photoURL}
                alt='avatar'
              />
            </div>
            <div className={styles.userName}>{user?.displayName}</div>
          </div>
        )}
        <button onClick={handleLogout} className={styles.btnLogout}>
          Đăng xuất
        </button>
      </div>
    </header>
  );
}

export default Header;
