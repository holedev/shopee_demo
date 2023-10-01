import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Image,
  Row,
} from 'react-bootstrap';
import styles from './Product.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { authApis, axiosAPI, endpoints } from '~/config/axiosAPI';
import { useEffect } from 'react';
import { handleMoneyVND } from '~/utiils/money';
import Comment from './Comment';
import { useCartContext, useLoadingContext, useUserContext } from '~/hook';
import Similar from './Similar';
import cookie from 'react-cookies';

function Product() {
  const { id } = useParams();
  const nav = useNavigate();
  const [user, dispatch] = useUserContext();

  const [cart, dispatchCart] = useCartContext();
  const [loading, setLoading] = useLoadingContext();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState({
    productId: id,
    content: '',
  });
  const [infoComment, setInfoComment] = useState(
    `Bình luận với tư cách ${user.firstName}`
  );
  const [product, setProduct] = useState(null);
  const [show, setShow] = useState(false);

  const getComments = async () => {
    setLoading(true);
    await authApis()
      .get(endpoints.comments + `products/${id}/`)
      .then((res) => {
        const arr = [];
        res.data?.forEach((item) => {
          if (!item[4]) {
            const obj = {
              id: item[0],
              content: item[1],
              createDate: item[2],
              author: {
                ...item[3],
                fullName: `${item[3].lastName} ${item[3].firstName}`,
              },
              reply: [],
            };
            arr.push(obj);
          }
        });
        arr.sort((a, b) => b.createDate - a.createDate);
        res.data?.forEach((item) => {
          if (item[4]) {
            const obj = {
              id: item[0],
              content: item[1],
              createDate: item[2],
              author: {
                ...item[3],
                fullName: `${item[3].lastName} ${item[3].firstName}`,
              },
              parent: item[4],
              level: item[5],
            };

            const data = arr.find((item) => item.id == obj.parent);
            data?.reply.push(obj);
            data?.reply.sort((a, b) => b.createDate - a.createDate);
          }
        });
        setComments(arr);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const getProduct = async () => {
    setLoading(true);
    await authApis()
      .get(endpoints.products + id + '/')
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const handleComment = async () => {
    if (loading) return;
    setLoading(true);
    await authApis()
      .post(endpoints.comments, comment)
      .then((res) => {
        getComments();
        setInfoComment(`Bình luận với tư cách ${user.firstName}`);
        setComment({
          productId: id,
          content: '',
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const handleDeleteCmt = (val) => {
    const data = comments.filter((item) => item.id != val);
    data.forEach((item) => {
      item.reply = item.reply.filter((i) => i.id != val);
    });

    setComments(data);
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
    getComments();
    getProduct();
    setComment({
      productId: id,
      content: '',
    });
  }, [id]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftLayout}>
        {product && (
          <>
            <Row className={styles.productDetails}>
              <Col md={7}>
                <Image
                  style={{
                    maxHeight: '700px',
                    objectFit: 'contain',
                    objectPosition: 'center',
                  }}
                  fluid
                  src={product.image}
                  alt={product.name}
                />
              </Col>
              <Col md={5}>
                <h2 className={styles.productName}>{product.name}</h2>
                <p
                  style={{
                    textAlign: 'justify',
                  }}
                >
                  {product.description}
                </p>
                <div className='d-flex align-items-center justify-content-between'>
                  <p style={{ marginBottom: 0 }}>
                    Giá:{' '}
                    <b style={{ fontSize: '20px' }}>
                      {handleMoneyVND(product.price)}
                    </b>
                  </p>
                  <Button onClick={() => order(product)} variant='primary'>
                    Thêm vào giỏ hàng
                  </Button>
                </div>
                <Button
                  onClick={() => nav('/store/' + product.storeId.id)}
                  style={{
                    marginTop: '20px',
                    width: '100%',
                  }}
                >
                  Xem cửa hàng
                </Button>
              </Col>
            </Row>
            <Button onClick={() => setShow(true)} className='mt-4'>
              So sánh với các sản phẩm tương tự khác
            </Button>
          </>
        )}
      </div>
      <div className={styles.rightLayout}>
        <div
          style={{
            paddingTop: '8px',
            position: 'sticky',
            top: 0,
            background: '#ccc',
          }}
        >
          <h3 className='text-center'>Bình luận</h3>
          <FloatingLabel label={infoComment}>
            <Form.Control
              as='textarea'
              value={comment.content}
              onChange={(e) =>
                setComment({ ...comment, content: e.target.value })
              }
              placeholder='Thêm bình luận'
              style={{ height: '100px' }}
            />
            <Button
              onClick={handleComment}
              type='submit'
              className='mt-2 w-100'
            >
              Gửi
            </Button>
          </FloatingLabel>
        </div>
        <div className={styles.commentList}>
          {comments.length > 0 ? (
            comments.map((item) => (
              <Comment
                key={item.id}
                value={item}
                reply={item.reply}
                setInfoComment={setInfoComment}
                setComment={setComment}
                handleDeleteCmt={handleDeleteCmt}
              />
            ))
          ) : (
            <h4 className='text-center'>Chưa có bình luận nào!</h4>
          )}
        </div>
      </div>
      <Similar show={show} product={product} onHide={() => setShow(false)} />
    </div>
  );
}

export default Product;
