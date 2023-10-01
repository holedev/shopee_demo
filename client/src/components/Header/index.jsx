import { useLocation, useNavigate } from 'react-router-dom';
import { cart as cartIcon, logo } from '../../assets/img';
import styles from './Header.module.css';
import { useCartContext, useUserContext } from '../../hook';
import clsx from 'clsx';
import cookie from 'react-cookies';
import { Badge, Image } from 'react-bootstrap';

function Header() {
  const nav = useNavigate();
  const [user, dispatch] = useUserContext();
  const location = useLocation();

  const [cart] = useCartContext();

  const handleLogout = () => {
    user?.auth?.signOut();
    dispatch({
      type: 'logout',
    });
    cookie.remove('user', { path: '/' });
    cookie.remove('token', { path: '/' });
    nav('/auth');
  };

  return (
    <header
      className={clsx(styles.header, {
        [styles.hide]: location.pathname === '/auth',
      })}
    >
      <div className={styles.headerLeft}>
        <div onClick={() => nav('/')} className={styles.headerLogo}>
          <img className={styles.headerLogoImg} src={logo} alt='LOGO' />
        </div>
      </div>

      <div className={styles.headerRight}>
        <div
          onClick={() => nav('/cart')}
          style={{
            width: '20px',
            height: '20px',
            marginRight: '20px',
            position: 'relative',
            cursor: 'pointer',
          }}
        >
          <img
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            src={cartIcon}
            alt='cart'
          />

          <Badge
            style={{
              position: 'absolute',
              top: -6,
              right: -10,
            }}
            pill
            bg='secondary'
          >
            {cart}
          </Badge>
        </div>
        {user && (
          <div
            onClick={() => nav('/profile/' + user?.id)}
            className={styles.user}
          >
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
