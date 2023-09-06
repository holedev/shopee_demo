import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../store/UserContext';
import { google } from '../../assets/img';
import styles from './Login.module.css';
import { Form, FormControl } from 'react-bootstrap';
import { axiosAPI, endpoints } from '~/config/axiosAPI';

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  const [role, setRole] = useState('ROLE_USER');

  const handleLoginGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    console.log(res);
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
  };

  // useEffect(() => {
  //   const uid = localStorage.getItem('uid') || null;
  //   if (uid != null || uid != undefined) {
  //     navigate('/');
  //   }
  // }, [user?.uid]);

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
