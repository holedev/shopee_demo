import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import styles from './Home.module.css';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useUserContext } from '../../hook';
import { authApis, axiosAPI, endpoints } from '~/config/axiosAPI';
import { Button, Card, Col, Form, Pagination, Row } from 'react-bootstrap';
import axios from 'axios';

function Home() {
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(null);
  const [activePage, setActivePage] = useState(0);
  const [q] = useSearchParams();

  const getStores = async () => {
    let endpoint = `${endpoints.user}get-stores/`;
    await authApis
      .get(endpoint)
      .then((res) => setStores(res.data))
      .catch((err) => console.log(err));
  };

  const getProductsByStore = async () => {
    let endpoint = `${endpoints.products}`;
    await axiosAPI
      .get(endpoint)
      .then((res) => {
        setProducts(res.data.products);
        setPageCount(res.data.pageNumber);
      })
      .catch((err) => console.log(err));
  };

  const handleNavPage = (value) => {
    
  };

  useEffect(() => {
    getStores();
  }, []);

  useEffect(() => {
    getProductsByStore();
  }, []);

  useEffect(() => {
    setActivePage(q.get('page'));
  }, [q]);

  return (
    <div className={clsx(styles.wrapper)}>
      <div className={styles.filter}>
        <Form className='ms-auto d-flex gap-2'>
          <Form.Select size='small' id='cates' aria-label=''>
            <option value=''>Chọn cửa hàng</option>
            {stores.length > 0 ? (
              stores.map((s) => (
                <option key={s[0]} value={s[0]}>
                  {s[2]} {s[1]}
                </option>
              ))
            ) : (
              <option value=''>Hiện chưa có danh mục nào!</option>
            )}
          </Form.Select>
          <Form.Select size='small' id='cates' aria-label=''>
            <option value=''>Mức giá</option>
            <option value='1'>Dưới 100.000 VNĐ</option>
            <option value='2'>100.000 VNĐ - 200.000 VNĐ</option>
            <option value='3'>200.000 VNĐ - 500.000 VNĐ</option>
            <option value='4'>500.000 VNĐ - 1.000.000 VNĐ</option>
            <option value='4'>Trên 1.000.000 VNĐ</option>
          </Form.Select>
          <Form.Control
            type='text'
            placeholder='Tên sản phẩm ...'
            className=' mr-sm-2'
          />
        </Form>
      </div>
      <div className={styles.productList}>
        <Row style={{ width: '100%' }}>
          {products.length > 0 ? (
            products.map((p) => {
              return (
                <Col key={p.id} xs={12} md={3} className='my-2'>
                  <Card style={{ width: '100%' }}>
                    <Card.Img
                      height={160}
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
        <div className='d-flex justify-content-center'>
          {pageCount > 1 && (
            <Pagination>
              <Pagination.Item
                key={0}
                value='0'
                active={!activePage ? true : false}
                onClick={(e) => handleNavPage(0)}
              >
                Tất cả
              </Pagination.Item>
              {Array(pageCount)
                .fill()
                .map((_, i) => {
                  return (
                    <Pagination.Item
                      key={i + 1}
                      value={i + 1}
                      active={activePage == i + 1 ? true : false}
                      onClick={() => handleNavPage(i + 1)}
                    >
                      {i + 1}
                    </Pagination.Item>
                  );
                })}
            </Pagination>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
