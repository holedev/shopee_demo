import { useContext, useState } from 'react';
import { Alert, Button, Form, Modal, Table } from 'react-bootstrap';
import cookie, { load } from 'react-cookies';
import { Link } from 'react-router-dom';
import { authApis, endpoints } from '~/config/axiosAPI';
import { useCartContext, useLoadingContext, useUserContext } from '~/hook';
import { handleMoneyVND } from '~/utiils/money';
import styles from './Cart.module.css';
import StripePayment from './StripePayment';

function Cart() {
  const [user] = useUserContext();
  const [, cartDispatch] = useCartContext();
  const [loading, setLoading] = useLoadingContext();

  const [cart, setCart] = useState(cookie.load('cart') || null);
  const [stripeModal, setStripeModal] = useState(false);

  const deleteItem = (item) => {
    if (item.id in cart) {
      cartDispatch({
        type: 'dec',
        payload: item.quantity,
      });

      setCart((current) => {
        delete current[item.id];
        return current;
      });
      cookie.save('cart', cart);
    }
  };

  const getTotalPrice = () => {
    return Object.values(cart).reduce(
      (acc, current) => acc + current['quantity'] * current['unitPrice'],
      0
    );
  };

  const updateItem = () => {
    cookie.save('cart', cart);

    cartDispatch({
      type: 'update',
      payload: Object.values(cart).reduce(
        (init, current) => init + current['quantity'],
        0
      ),
    });
  };

  const pay = () => {
    if (loading) return;
    setLoading(true);
    const process = async () => {
      await authApis()
        .post(endpoints.pay, cart)
        .then((res) => {
          if (res.status === 200) {
            cookie.remove('cart');
            setCart([]);

            cartDispatch({
              type: 'update',
              payload: 0,
            });
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    };

    process();
  };

  if (cart === null)
    return (
      <Alert
        style={{ height: 'fit-content', marginTop: '20px' }}
        variant='info'
      >
        Không có sản phẩm trong giỏ!
      </Alert>
    );

  if (cart.length === 0)
    return (
      <Alert
        style={{ height: 'fit-content', marginTop: '20px' }}
        hei
        variant='info'
      >
        Thanh toán thành công!
      </Alert>
    );

  return (
    <div className={styles.wrapper}>
      <Modal show={stripeModal} onHide={() => setStripeModal(false)}>
        <StripePayment
          setStripeModal={setStripeModal}
          pay={pay}
          getTotalPrice={getTotalPrice}
        />
      </Modal>
      <h1 className='text-center text-info mt-2'>GIỎ HÀNG</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên sản phẩm</th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Object.values(cart).map((c) => {
            return (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{handleMoneyVND(c.unitPrice)}</td>
                <td>
                  <Form.Control
                    type='number'
                    value={cart[c.id]['quantity']}
                    onBlur={updateItem}
                    onChange={(e) =>
                      setCart({
                        ...cart,
                        [c.id]: {
                          ...cart[c.id],
                          quantity: parseInt(e.target.value),
                        },
                      })
                    }
                  />
                </td>
                <td>
                  <Button variant='danger' onClick={() => deleteItem(c)}>
                    &times;
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {user === null ? (
        <p>
          Vui lòng <Link to='/login?next=/cart'>đăng nhập</Link> để thanh toán!
        </p>
      ) : (
        <div>
          <h4 className='d-flex px-4'>
            Tổng tiền:{' '}
            <span className='ms-auto'>{handleMoneyVND(getTotalPrice())}</span>
          </h4>
          <div className='d-flex gap-4 align-items-center'>
            <Button
              onClick={pay}
              variant='info'
              style={{
                width: '100%',
              }}
              className='mt-2 mb-2'
            >
              Thanh toán trực tiếp
            </Button>
            hoặc
            <Button
              onClick={() => setStripeModal(true)}
              variant='success'
              style={{
                width: '100%',
              }}
              className='mt-2 mb-2'
            >
              Thanh toán với Stripe
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
