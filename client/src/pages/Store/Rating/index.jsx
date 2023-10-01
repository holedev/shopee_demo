import { Button, Form, Modal } from 'react-bootstrap';
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
} from 'mdb-react-ui-kit';
import StarRating from '~/components/StarRating';
import { useEffect, useState } from 'react';
import { authApis, endpoints } from '~/config/axiosAPI';
import { useParams } from 'react-router-dom';

function Rating({ onHide, show, getStore }) {
  const { id } = useParams();
  const [rating, setRating] = useState(null);
  const [ratingText, setRatingText] = useState('');
  const [comments, setComments] = useState([]);

  const ratingF = async () => {
    await authApis()
      .post(endpoints.users + `rating-store/${id}/`, {
        value: rating,
      })
      .then((res) => {
        setRating(res.data);
        getStore();
      })
      .catch((err) => console.log(err));
  };

  const getRating = async () => {
    await authApis()
      .get(endpoints.users + `rating-store/${id}/`)
      .then((res) => {
        if (res.data == -1) {
          setRating(0);
          return;
        }
        setRating(res.data);
      })
      .catch((err) => console.log(err));
  };

  const addRatingText = async () => {
    await authApis()
      .post(endpoints.comments, {
        storeId: id,
        content: ratingText,
      })
      .then((res) => {
        setRatingText('');
        const obj = {
          id: res.data.id,
          content: res.data.content,
          createdDate: res.data.createdDate,
          author: {
            ...res.data.userId,
            fullName: `${res.data.userId.lastName} ${res.data.userId.firstName}`,
          },
        };
        const data = [...comments, obj].sort(
          (a, b) => b.createdDate - a.createdDate
        );
        setComments(data);
      })
      .catch((err) => console.log(err));
  };

  const getRatingComments = async () => {
    await authApis()
      .get(endpoints.comments + `stores/${id}/`)
      .then((res) => {
        console.log(res.data);
        const data = res.data?.map((item) => {
          return {
            id: item[0],
            content: item[1],
            createdDate: item[2],
            author: {
              ...item[3],
              fullName: `${item[3].lastName} ${item[3].firstName}`,
            },
          };
        });

        setComments(data.sort((a, b) => b.createdDate - a.createdDate));
      })
      .catch((err) => console.log(err));
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    addRatingText();
  };

  useEffect(() => {
    if (rating != null) ratingF();
  }, [rating]);

  useEffect(() => {
    getRatingComments();
    getRating();
  }, []);

  return (
    <Modal className='d-flex' show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Đánh giá cửa hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          width: '500px',
        }}
      >
        {rating !== null && (
          <StarRating rating={rating} setRating={setRating} />
        )}
        <MDBContainer
          style={{
            height: '60vh',
            overflowY: 'scroll',
            width: '100%',
          }}
          className='mt-2'
        >
          <MDBRow className='justify-content-center'>
            <MDBCol md='12' lg='12'>
              <MDBCard
                className='shadow-0 border'
                style={{ backgroundColor: '#f0f2f5', position: 'relative' }}
              >
                <MDBCardBody>
                  <Form onSubmit={handleAddComment}>
                    <MDBInput
                      value={ratingText}
                      onChange={(e) => setRatingText(e.target.value)}
                      wrapperClass='mb-4'
                      placeholder='Cửa hàng này tốt chứ?'
                      label='+ Thêm đánh giá'
                    />
                  </Form>

                  {comments.length > 0 ? (
                    comments.map((item) => {
                      return (
                        <MDBCard key={item.id} className='mb-4'>
                          <MDBCardBody>
                            <p>{item.content}</p>

                            <div className='d-flex justify-content-between'>
                              <div className='d-flex flex-row align-items-center'>
                                <MDBCardImage
                                  src={item.author.avatar}
                                  alt='avatar'
                                  width='40'
                                  height='40'
                                />
                                <p
                                  style={{
                                    whiteSpace: 'nowrap',
                                  }}
                                  className='small mb-0 ms-2'
                                >
                                  {item.author.lastName} {item.author.firstName}
                                </p>
                              </div>
                            </div>
                          </MDBCardBody>
                        </MDBCard>
                      );
                    })
                  ) : (
                    <h2>Chưa có đánh giá!</h2>
                  )}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Rating;
