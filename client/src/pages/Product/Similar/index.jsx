import { MDBCardImage } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { Badge, Button, Card, Col, Modal, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { authApis, endpoints } from '~/config/axiosAPI';
import { handleMoneyVND } from '~/utiils/money';

function Similar({ show, onHide, product }) {
  const nav = useNavigate();
  const [data, setData] = useState([]);

  const getData = async () => {
    await authApis()
      .get(endpoints.products + `get-similar-pro/${product?.categoryId?.id}/`)
      .then((res) => setData(res.data.filter((item) => item.id != product.id)))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (product?.id) {
      getData();
    }
  }, [product?.id]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Một số sản phẩm cùng loại</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className=''>
          {data.length > 0 ? (
            data.map((item) => {
              return (
                <Col
                  onClick={() => {
                    nav('/products/' + item.id);
                    onHide();
                  }}
                  key={item.id}
                  className='mt-4'
                  lg={12}
                >
                  <Card>
                    <Card.Body>
                      <MDBCardImage
                        src={item.image}
                        alt='avatar'
                        width='40'
                        height='120'
                        style={{
                          objectFit: 'contain',
                          objectPosition: 'center',
                        }}
                      />
                      <Card.Title className='mt-2'>{item.name}</Card.Title>
                      <Card.Text>{item.description}</Card.Text>
                      <Card.Text className='d-flex justify-content-between align-items-center'>
                        <b>{handleMoneyVND(item.price)}</b>
                        <Badge
                          style={{
                            fontSize: '16px',
                          }}
                          pill
                          bg='info'
                        >
                          {item.price - product.price < 0
                            ? `Tiết kiệm đến ${handleMoneyVND(
                                product.price - item.price
                              )}`
                            : ''}
                        </Badge>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          ) : (
            <h4>Không có sản phẩm cùng loại!</h4>
          )}
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Similar;
