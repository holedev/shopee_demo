import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import styles from './Store.module.css';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useUserContext } from '../../hook';
import { authApis, axiosAPI, endpoints } from '~/config/axiosAPI';
import {
  Alert,
  Badge,
  Image,
  Button,
  Row,
  Card,
  Col,
  Form,
  FloatingLabel,
} from 'react-bootstrap';
import StarRating from '~/components/StarRating';
import Product from './Product';
import axios from 'axios';

function Store() {
  const { id } = useParams();
  const [user, dispatch] = useUserContext();

  const [rating, setRating] = useState(4);
  const [productModal, setProductModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [q] = useSearchParams();

  const getProductsByStore = async () => {
    let endpoint = `${endpoints.products}get-by-store/${id}/`;
    await axiosAPI
      .get(endpoint)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getStores();
  }, []);

  useEffect(() => {
    getProductsByStore();
  }, [q]);

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

        <div className={styles.bodyRight}>
          <div className={styles.bodyRightFilter}>
            <Button onClick={() => setProductModal(true)} variant='primary'>
              Thêm sản phẩm
            </Button>
          </div>
          <div className={styles.productList}>
            <Row>
              {products.length > 0 ? (
                products.map((p) => {
                  return (
                    <Col key={p.id} xs={12} md={3} className='my-2'>
                      <Card style={{ width: '100%' }}>
                        <Card.Img
                          height={200}
                          width={200}
                          variant='top'
                          src={p.image}
                          style={{
                            objectFit: 'contain',
                            padding: '4px 12px',
                          }}
                        />
                        <Card.Body>
                          <Card.Title>{p.name}</Card.Title>
                          <Card.Text>{p.price} VNĐ</Card.Text>
                          <Link
                            className='btn btn-info'
                            style={{ marginRight: '5px' }}
                            variant='primary'
                          >
                            Xem chi tiết
                          </Link>
                          <Button variant='success' onClick={() => order(p)}>
                            Đặt hàng
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })
              ) : (
                <h3 className='text-center'>Cửa hàng chưa có sản phẩm nào!</h3>
              )}
            </Row>
          </div>

          <Product show={productModal} onHide={() => setProductModal(false)} />
        </div>
      </section>
    </div>
  );
}

export default Store;
