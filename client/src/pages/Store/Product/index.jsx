import { useEffect, useRef, useState } from 'react';
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Modal,
  Row,
} from 'react-bootstrap';
import { authApis, axiosAPI, endpoints } from '~/config/axiosAPI';
import { useUserContext } from '~/hook';

function ProductModal({ onHide, show }) {
  const imageRef = useRef();
  const [user] = useUserContext();

  const [cates, setCates] = useState([]);
  const [data, setData] = useState({
    storeId: user.id,
    categoryId: '',
    name: '',
    description: '',
    price: 0,
    mode: 'create',
  });

  const getCates = async () => {
    await axiosAPI
      .get(endpoints.categories)
      .then((res) => {
        setCates(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (value, field) => {
    setData({
      ...data,
      [field]: value,
    });
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    (async () => {
      let form = new FormData();

      for (let field in data) form.append(field, data[field]);

      form.append('image', imageRef.current.files[0]);

      await authApis.post(endpoints['products'], form).then((res) => onHide());
    })();
  };

  useEffect(() => {
    getCates();
  }, []);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm sản phẩm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3'>
            <FloatingLabel
              controlId='floatingInput'
              label='Danh mục'
              className='mb-3'
            >
              <Form.Select
                value={data.categoryId || ''}
                onChange={(e) => handleChange(e.target.value, 'categoryId')}
                id='cates'
                aria-label=''
              >
                {cates.length > 0 ? (
                  cates.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))
                ) : (
                  <option value=''>Hiện chưa có danh mục nào!</option>
                )}
              </Form.Select>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className='mb-3'>
            <FloatingLabel
              controlId='floatingInput'
              label='Tên sản phẩm'
              className='mb-3'
            >
              <Form.Control
                value={data.name || ''}
                onChange={(e) => handleChange(e.target.value, 'name')}
                type='text'
                placeholder='Tên sản phẩm'
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className='mb-3'>
            <FloatingLabel
              controlId='floatingInput'
              label='Mô tả'
              className='mb-3'
            >
              <Form.Control
                value={data.description || ''}
                onChange={(e) => handleChange(e.target.value, 'description')}
                as='textarea'
                placeholder=''
                style={{ height: '100px' }}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className='mb-3'>
            <FloatingLabel
              controlId='floatingInput'
              label='Giá (VNĐ)'
              className='mb-3'
            >
              <Form.Control
                value={data.price || ''}
                onChange={(e) => handleChange(e.target.value, 'price')}
                type='number'
                placeholder=''
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className='mb-3'>
            <FloatingLabel
              controlId='floatingInput'
              label='Ảnh sản phẩm'
              className='mb-3'
            >
              <Form.Control type='file' ref={imageRef} />
            </FloatingLabel>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Đóng
        </Button>
        <Button variant='primary' onClick={handleCreateProduct}>
          Thêm sản phẩm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductModal;
