import React, { useEffect, useState } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { useUserContext } from '~/hook';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { authApis, endpoints } from '~/config/axiosAPI';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePhone } from '~/utiils/validate';

export default function Profile() {
  const nav = useNavigate();

  const [user] = useUserContext();
  const [profileModal, setProfileModal] = useState(false);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  const handleChange = (val, field) => {
    setProfile((prev) => {
      return {
        ...prev,
        [field]: val,
      };
    });
  };

  const handleUpdate = async () => {
    if (!validateEmail(profile.email)) return alert('Email không hợp lệ!');
    if (!validatePhone(profile.phone))
      return alert('Số điện thoại phải gồm 10 số!');

    profile.id = user.id;
    profile.username = user.username;
    profile.userRole = user.userRole;

    await authApis()
      .patch(endpoints.users + 'update-user/', profile)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setProfile({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      phone: user.phone || '',
      email: user.email || '',
    });
  }, []);

  return (
    <section
      style={{
        backgroundColor: '#eee',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <MDBRow
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
        className='p-4'
      >
        <MDBCol lg='4'>
          <MDBCard className='mb-4'>
            <MDBCardBody className='text-center'>
              <MDBCardImage
                src={user?.avatar}
                alt='avatar'
                className='rounded-circle'
                style={{ width: '150px' }}
                fluid
              />
              <p className='text-muted mb-1'>
                <b>
                  {user?.lastName} {user?.firstName}
                </b>
              </p>
              <div className='d-flex justify-content-center mb-2'>
                <MDBBtn
                  onClick={
                    user.userRole == 'ROLE_STORE'
                      ? () => nav('/store/' + user?.id)
                      : null
                  }
                >
                  {user.userRole}
                </MDBBtn>
                {user.userRole == 'ROLE_STORE' && (
                  <MDBBtn
                    onClick={() => nav('/stats/' + user?.id)}
                    className='ms-2'
                  >
                    Xem thống kê
                  </MDBBtn>
                )}
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol lg='8'>
          <MDBCard className='mb-4'>
            <MDBCardBody>
              <MDBRow>
                <MDBCol sm='3'>
                  <MDBCardText>Họ tên</MDBCardText>
                </MDBCol>
                <MDBCol sm='9'>
                  <MDBCardText className='text-muted'>
                    {user?.lastName} {user?.firstName}
                  </MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm='3'>
                  <MDBCardText>Email</MDBCardText>
                </MDBCol>
                <MDBCol sm='9'>
                  <MDBCardText className='text-muted'>
                    {user?.email}
                  </MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm='3'>
                  <MDBCardText>Số điện thoại</MDBCardText>
                </MDBCol>
                <MDBCol sm='9'>
                  <MDBCardText className='text-muted'>
                    {user?.phone}
                  </MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm='3'>
                  <MDBCardText>Trạng thái</MDBCardText>
                </MDBCol>
                <MDBCol sm='9'>
                  <MDBCardText className='text-muted'>
                    {user?.active ? 'Hoạt động' : 'Khoá'}
                  </MDBCardText>
                </MDBCol>
              </MDBRow>
              {/* <MDBRow className='mt-3'>
                <Button onClick={() => setProfileModal(true)}>
                  Cập nhật thông tin
                </Button>
              </MDBRow> */}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <Modal show={profileModal} onHide={() => setProfileModal(false)}>
        <Modal.Body>
          <Form>
            <h3 className='text-center'>Cập nhật thông tin</h3>
            <FloatingLabel className='mb-3' label='Họ'>
              <Form.Control
                value={profile.firstName}
                onChange={(e) => handleChange(e.target.value, 'firstName')}
                type='text'
                placeholder=''
              />
            </FloatingLabel>
            <FloatingLabel className='mb-3' label='Tên'>
              <Form.Control
                value={profile.lastName}
                onChange={(e) => handleChange(e.target.value, 'lastName')}
                type='text'
                placeholder=''
              />
            </FloatingLabel>
            <FloatingLabel
              controlId='floatingInput'
              label='Email'
              className='mb-3'
            >
              <Form.Control
                value={profile.email}
                onChange={(e) => handleChange(e.target.value, 'email')}
                type='email'
                placeholder='name@example.com'
              />
            </FloatingLabel>
            <FloatingLabel className='mb-3' label='Số điện thoại'>
              <Form.Control
                value={profile.phone}
                onChange={(e) => handleChange(e.target.value, 'phone')}
                type='text'
                placeholder=''
              />
            </FloatingLabel>

            <Button
              onClick={handleUpdate}
              style={{
                width: '100%',
              }}
            >
              Cập nhật
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </section>
  );
}
