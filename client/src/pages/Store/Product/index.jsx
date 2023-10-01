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
import { useLoadingContext, useUserContext } from '~/hook';

function ProductModal({ product, onHide, show, getProductsByStore }) {
  const imageRef = useRef();
  const [user] = useUserContext();

  const [loading, setLoading] = useLoadingContext();

  const [cates, setCates] = useState([]);
  const [data, setData] = useState({
    storeId: user.id,
    categoryId: '',
    name: '',
    description: '',
    price: 0,
    mode: 'create ',
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
    if (loading) return;
    (async () => {
      let form = new FormData();

      for (let field in data) form.append(field, data[field]);

      form.append('image', imageRef.current.files[0]);

      setLoading(true);
      await authApis()
        .post(endpoints.products, form)
        .then((res) => {
          getProductsByStore();
          onHide();
          setData({
            storeId: user.id,
            categoryId: '',
            name: '',
            description: '',
            price: 0,
            mode: 'create',
          });
        })
        .catch((err) =>
          alert(
            'Có lỗi xảy ra, vui lòng kiểm tra lại! Các trường ít nhất phải có 5 kí tự, hình ảnh không được để trống!'
          )
        )
        .finally(() => setLoading(false));
    })();
  };

  const deleteProduct = async (id) => {
    if (confirm('Bạn chắc chắn muốn xoá? Hành động này không thể hoàn tác!'))
      await authApis()
        .delete(endpoints.products + id)
        .then((res) => {
          getProductsByStore();
          onHide();
        })
        .catch((err) => console.log(err));
  };

  const handleDelete = () => {
    deleteProduct(product.id);
  };

  useEffect(() => {
    getCates();
  }, []);

  useEffect(() => {
    product
      ? setData({
          storeId: user.id,
          categoryId: product?.categoryId.id,
          name: product?.name,
          description: product?.description,
          price: parseInt(product?.price),
          mode: 'update',
          image: product?.image,
          id: product?.id,
        })
      : setData({
          storeId: user.id,
          categoryId: '',
          name: '',
          description: '',
          price: 0,
          mode: 'create',
        });
  }, [product]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{product ? 'Chỉnh sửa' : 'Thêm'} sản phẩm</Modal.Title>
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
        {product && (
          <Button variant='danger' onClick={handleDelete}>
            Xoá
          </Button>
        )}
        <Button variant='primary' onClick={handleCreateProduct}>
          {product ? 'Chỉnh sửa' : 'Thêm'} sản phẩm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductModal;
