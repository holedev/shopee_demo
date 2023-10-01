import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import styles from './Home.module.css';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useCartContext, useLoadingContext, useUserContext } from '../../hook';
import { authApis, axiosAPI, endpoints } from '~/config/axiosAPI';
import { Button, Card, Col, Form, Pagination, Row } from 'react-bootstrap';
import axios from 'axios';
import { handleMoneyVND } from '~/utiils/money';
import cookie from 'react-cookies';

function Home() {
  const [q] = useSearchParams();
  const nav = useNavigate();
  const [loading, setLoading] = useLoadingContext();
  const [cart, dispatchCart] = useCartContext();

  const timeoutRef = useRef(null);
  const [filter, setFilter] = useState({
    store: '',
    price: '',
    kw: '',
    sort: 'name',
  });
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(null);
  const [activePage, setActivePage] = useState(0);

  const getURLFilter = () => {
    let searchParams = `?page=${activePage ? activePage : ''}&sort=${
      filter.sort
    }`;
    if (filter.store.trim()) searchParams += `&store=${filter.store}`;
    if (filter.price.trim()) searchParams += `&price=${filter.price}`;
    if (filter.kw.trim()) searchParams += `&kw=${filter.kw}`;

    return searchParams;
  };

  const getStores = async () => {
    if (loading) return;
    let endpoint = `${endpoints.users}get-stores/`;

    setLoading(true);
    await authApis()
      .get(endpoint)
      .then((res) => setStores(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const getProducts = async () => {
    if (loading) return;
    let endpoint = `${endpoints.products}` + getURLFilter();
    setLoading(true);
    await authApis()
      .get(endpoint)
      .then((res) => {
        setProducts(res.data.products);
        setPageCount(res.data.pageNumber);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const handleFilter = (val, field) => {
    setFilter((prev) => {
      return {
        ...prev,
        [field]: val,
      };
    });
    setActivePage(0);
  };

  const order = (p) => {
    dispatchCart({
      type: 'inc',
      payload: 1,
    });

    let cart = cookie.load('cart') || null;
    if (cart === null) cart = {};

    if (p.id in cart) {
      cart[p.id]['quantity'] += 1;
    } else {
      cart[p.id] = {
        id: p.id,
        name: p.name,
        unitPrice: p.price,
        quantity: 1,
      };
    }

    cookie.save('cart', cart);
  };

  useEffect(() => {
    nav(getURLFilter());
  }, [filter.store, filter.price, filter.sort, activePage]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      nav(getURLFilter());
    }, 500);
  }, [filter.kw]);

  const handleNavPage = (value) => {
    setActivePage(value);
  };

  useEffect(() => {
    setActivePage(q.get('page'));
    getStores();
    setFilter({
      price: q.get('price') || '',
      store: q.get('store') || '',
      sort: q.get('sort') || filter.sort || '',
      kw: q.get('kw') || '',
    });
  }, []);

  useEffect(() => {
    getProducts();
  }, [q]);

  return (
    <div className={clsx(styles.wrapper)}>
      <div className={styles.filter}>
        <div className='d-flex justify-content-center align-items-center'>
          {pageCount > 1 && (
            <Pagination
              style={{
                marginBottom: 0,
              }}
            >
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
        <Form className='ms-auto d-flex gap-2'>
          <Form.Select
            value={filter.sort}
            onChange={(e) => handleFilter(e.target.value, 'sort')}
            size='small'
            id='sort'
            aria-label=''
          >
            <option value='name'>Xếp theo tên</option>
            <option value='price'>Xếp theo giá</option>
          </Form.Select>
          <Form.Select
            value={filter.store}
            onChange={(e) => handleFilter(e.target.value, 'store')}
            size='small'
            id='store'
            aria-label=''
          >
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

          <Form.Select
            value={filter.price}
            onChange={(e) => handleFilter(e.target.value, 'price')}
            size='small'
            id='price'
            aria-label=''
          >
            <option value=''>Mức giá</option>
            <option value='1'>Dưới 100.000 VNĐ</option>
            <option value='2'>100.000 VNĐ - 200.000 VNĐ</option>
            <option value='3'>200.000 VNĐ - 500.000 VNĐ</option>
            <option value='4'>500.000 VNĐ - 1.000.000 VNĐ</option>
            <option value='5'>Trên 1.000.000 VNĐ</option>
          </Form.Select>
          <Form.Control
            value={filter.kw}
            onChange={(e) => handleFilter(e.target.value, 'kw')}
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
              const url = `/products/${p.id}`;
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
                        objectPosition: 'center',
                      }}
                    />
                    <Card.Body>
                      <Card.Title className={styles.cardTitle}>
                        {p.name}
                      </Card.Title>
                      <Card.Text>{handleMoneyVND(p.price)}</Card.Text>
                      <Link
                        to={url}
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
            <h3 className='text-center'>Không tìm thấy sản phẩm phù hợp!</h3>
          )}
        </Row>
      </div>
    </div>
  );
}

export default Home;
