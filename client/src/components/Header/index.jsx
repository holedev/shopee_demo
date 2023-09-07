import { useLocation, useNavigate } from 'react-router-dom';
import { logo } from '../../assets/img';
import styles from './Header.module.css';
import { useUserContext } from '../../hook';
import clsx from 'clsx';

function Header() {
  const navigate = useNavigate();
  const [user, dispatch] = useUserContext();
  const location = useLocation();

  const handleLogout = () => {
    user?.auth?.signOut();
    dispatch({
      type: 'logout',
    });
    navigate('/auth');
  };

  return (
    <header
      className={clsx(styles.header, {
        [styles.hide]: location.pathname === '/auth',
      })}
    >
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
                src={user?.avatar}
                alt='avatar'
              />
            </div>
            <div
              className={styles.userName}
            >{`${user?.lastName} ${user?.firstName}`}</div>
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
