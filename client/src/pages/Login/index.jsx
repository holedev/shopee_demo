import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../store/UserContext';
import { google } from '../../assets/img';
import styles from './Login.module.css';
import { Form, FormControl } from 'react-bootstrap';
import { authApis, axiosAPI, endpoints } from '~/config/axiosAPI';
import cookie from 'react-cookies';
import { useUserContext } from '~/hook';

function Login() {
  const nav = useNavigate();
  const [user, dispatch] = useUserContext(UserContext);
  const [role, setRole] = useState('ROLE_USER');

  const handleLoginGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);

    const data = res._tokenResponse;
    const dataLogin = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      username: data.email,
      active: role === 'ROLE_USER' ? true : false,
      userRole: role,
      avatar: data.photoUrl,
    };

    await axiosAPI
      .post(endpoints.login, dataLogin)
      .then((res) => {
        dispatch({
          type: 'login',
          payload: res.data,
        });

        res.data.user.userRole == 'ROLE_STORE'
          ? nav('/store/' + res.data.user.id)
          : nav('/');
      })
      .catch((err) => {
        console.log(err.response.data || err);
        alert(err.response.data || err);
      });
  };

  useEffect(() => {
    if (user?.id) {
      return nav('/');
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <Form.Select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className='flex-fill'
        aria-label='Default select example'
      >
        <option value='ROLE_USER'>Người dùng</option>
        <option value='ROLE_STORE'>Người bán hàng</option>
      </Form.Select>
      <button onClick={handleLoginGoogle} className={styles.btnLogin}>
        <img className={styles.loginLogo} src={google} alt='LOGO GOOGLE' />
        <div className={styles.loginText}>Login with Google</div>
      </button>
    </div>
  );
}

export default Login;
