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
  Pagination,
} from 'react-bootstrap';
import StarRating from '~/components/StarRating';
import Product from './Product';
import { handleMoneyVND } from '~/utiils/money';
import { useRef } from 'react';
import Rating from './Rating';

function Store() {
  const { id } = useParams();
  const [user, dispatch] = useUserContext();
  const [q] = useSearchParams();
  const nav = useNavigate();

  const timeoutRef = useRef(null);
  const [filter, setFilter] = useState({
    price: '',
    kw: '',
    sort: 'name',
  });
  const [pageCount, setPageCount] = useState(null);
  const [activePage, setActivePage] = useState(0);
  const [store, setStore] = useState(null);
  const [rating, setRating] = useState(0);
  const [productModal, setProductModal] = useState(false);
  const [ratingModal, setRatingModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);

  const getStore = async () => {
    let endpoint = `${endpoints.users}get-store-by-id/${id}/`;
    await authApis()
      .get(endpoint)
      .then((res) => {
        setStore(res.data);
        setRating(Math.floor(res.data.rating));
      })
      .catch((err) => {
        if (err.response.status === 500) {
        }
      });
  };

  const getProductsByStore = async () => {
    let endpoint = `${endpoints.products}get-by-store/${id}/` + getURLFilter();
    await axiosAPI
      .get(endpoint)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  const getURLFilter = () => {
    let searchParams = `?page=${activePage ? activePage : ''}&sort=${
      filter.sort
    }`;
    if (filter.price.trim()) searchParams += `&price=${filter.price}`;
    if (filter.kw.trim()) searchParams += `&kw=${filter.kw}`;
    return searchParams;
  };

  const handleNavPage = (value) => {
    setActivePage(value);
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

  const handleEdit = (p) => {
    setProduct(p);
    setProductModal(true);
  };

  useEffect(() => {
    nav(getURLFilter());
  }, [filter.price, filter.sort, activePage]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      nav(getURLFilter());
    }, 500);
  }, [filter.kw]);

  useEffect(() => {
    setActivePage(q.get('page'));
    getStore();
    setFilter({
      price: q.get('price') || '',
      sort: q.get('sort') || filter.sort || '',
      kw: q.get('kw') || '',
    });
  }, []);

  useEffect(() => {
    getProductsByStore();
  }, [q]);

  if (store && !store.user.active) {
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
          {store && (
            <>
              <Image src={store?.user.avatar} sizes='sm' fluid thumbnail />
              <h2 className='text-center d-flex align-items-center justify-content-between mt-2'>
                {`${store?.user.lastName} ${store?.user.firstName}`}
              </h2>

              {store.user.active ? (
                <Badge bg='success'>Hoạt động</Badge>
              ) : (
                <Badge bg='danger'>Khoá</Badge>
              )}

              <div className='d-flex align-items-center gap-3'>
                <StarRating rating={rating} readonly />
                <Badge
                  style={{
                    marginTop: '4px',
                    height: '20px',
                  }}
                  bg='info'
                >
                  {store.rating}
                </Badge>
              </div>
              {user.id !== store.user.id && (
                <>
                  <Button
                    onClick={() => setRatingModal(true)}
                    className='mt-2'
                    variant='info'
                  >
                    Đánh giá chi tiết
                  </Button>
                  <Button className='mt-2'>Nhắn tin ngay</Button>
                </>
              )}
            </>
          )}
        </ul>

        <div className={styles.bodyRight}>
          <div className={styles.bodyRightFilter}>
            {user.id === store?.user?.id && (
              <>
                <Button onClick={() => setProductModal(true)} variant='primary'>
                  Thêm sản phẩm
                </Button>
              </>
            )}
            <div className='d-flex ms-auto justify-content-center align-items-center'>
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
            <Form className='ms-2 d-flex gap-2'>
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
            <Row>
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
                            Chi tiết
                          </Link>
                          <Button
                            variant='success'
                            onClick={() => handleEdit(p)}
                          >
                            Chỉnh sửa
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

          <Product
            getProductsByStore={getProductsByStore}
            product={product}
            show={productModal}
            onHide={() => {
              setProductModal(false);
              setProduct(null);
            }}
          />
          <Rating
            getStore={getStore}
            show={ratingModal}
            onHide={() => {
              setRatingModal(false);
            }}
          />
        </div>
      </section>
    </div>
  );
}

export default Store;
