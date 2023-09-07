import { useNavigate, useParams } from 'react-router-dom';
import styles from './Store.module.css';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useUserContext } from '../../hook';
import { authApis, endpoints } from '~/config/axiosAPI';
import { Alert, Badge, Image } from 'react-bootstrap';
import StarRating from '~/components/StarRating';

function Store() {
  const { id } = useParams();
  const [user, dispatch] = useUserContext();
  const [rating, setRating] = useState(4);

  if (!user.active) {
    return (
      <Alert variant=''>
        <Alert.Heading>Tài khoản này hiện chưa được kích hoạt!</Alert.Heading>
        <p>
          Vui lòng liên hệ quản trị viên kích hoạt để có thể đăng bán các sản
          phẩm của bạn!
        </p>
        <hr />
      </Alert>
    );
  }

  return (
    <div className={clsx(styles.wrapper)}>
      <section className={styles.body}>
        <ul className={styles.bodyLeft}>
          <Image src={user?.avatar} sizes='sm' fluid thumbnail />
          <h2 className='text-center d-flex align-items-center justify-content-between mt-2'>
            {`${user?.lastName} ${user?.firstName}`}
            <Badge bg='success'>Hoạt động</Badge>
          </h2>
          <StarRating rating={rating} readonly />
        </ul>
        Store
        <div className={styles.bodyRight}></div>
      </section>
    </div>
  );
}

export default Store;
