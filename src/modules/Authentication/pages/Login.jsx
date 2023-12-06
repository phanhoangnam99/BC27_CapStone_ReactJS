/* eslint-disable no-unused-vars */
import { Avatar, Button, Checkbox, Form, Input, notification } from 'antd'
// import authAPI from "apis/authAPI";
// import useRequest from "hooks/useRequest";
import { useForm } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../slices/authSlice'
import { Content } from 'antd/lib/layout/layout'
import './style.css'
import { UserOutlined } from '@ant-design/icons'
import React from 'react'

const Login = () => {
  const {
    handleSubmit
    // Sử dụng kết hợp với Controller thay thế cho register đối với các trường hợp component không hỗ trợ ref
  } = useForm({
    defaultValues: {
      taiKhoan: '',
      matKhau: ''
    },
    mode: 'onTouched'
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  // const { data: handleLogin, isLoading } = useRequest(
  //   (values) => authAPI.login(values),
  //   {
  //     isManual: true,
  //   }
  // );
  // const onSubmit = async (values) => {
  //   try {
  //     const data = await handleLogin(values);
  //     // Thành công lưu thông tin đăng nhập vào localStorage
  //     localStorage.setItem("user", JSON.stringify(data));
  //     // Chuyển user về trang home
  //     navigate("/");
  //     notification.success({
  //       message: "Đăng nhập thành công",
  //     });
  //   } catch (error) {
  //     notification.error({
  //       message: "Đăng nhập thất bại",
  //       description: error,
  //     });
  //   }
  // };

  const onSubmit = async (values) => {
    try {
      // chờ cho action login thành công
      await dispatch(login(values)).unwrap()
      // Chuyển user về trang home
      setTimeout(() => {
        navigate('/')
      }, 2000)
      notification.success({
        message: 'Đăng nhập thành công'
      })
    } catch (error) {
      notification.error({
        message: 'Đăng nhập thất bại',
        description: error
      })
    }
  }

  // Đã đăng nhập
  if (user) {
    return <Navigate to='/' />
  }

  const onFinish = (values) => {
    handleSubmit(onSubmit(values))
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      <Content
        style={{
          position: 'relative',
          top: '100px',
          maxWidth: '444px',
          background: '#fff',
          margin: '0 auto',
          borderRadius: '5px'
        }}
      >
        <div className='flex justify-center'>
          {/* <Avatar  style={{ marginTop: '20px', backgroundColor: 'rgb(245, 106, 0)' }} icon={<UserOutlined />} /> */}
          <svg
            className=' mt-5 h-12 w-12 p-1  bg-[orange] rounded-full'
            focusable='false'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
          </svg>
        </div>
        <div className='flex justify-center mb-4'>
          <p className='text-xl font-bold'>Đăng nhập</p>
        </div>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item
            style={{ justifyContent: 'center' }}
            name='taiKhoan'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input style={{ height: '50px' }} placeholder='Tài khoản' />
          </Form.Item>

          <Form.Item
            style={{ justifyContent: 'center' }}
            name='matKhau'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password style={{ height: '50px' }} placeholder='Mật khẩu' />
          </Form.Item>

          <Form.Item name='remember' valuePropName='checked' wrapperCol={{ span: 16 }}>
            <Checkbox>Nhớ tài khoản</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 16 }}>
            <Button
              style={{ background: '#fb4226', color: '#fff', marginBottom: '20px', width: '100%' }}
              htmlType='submit'
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <div className='flex justify-end'>
          <a
            href='/'
            style={{ marginRight: '10px', marginBottom: '10px', color: 'blue', textDecoration: 'underline' }}
            onClick={() => navigate('/register')}
          >
            Bạn chưa có tài khoản ? Đăng ký ngay
          </a>
        </div>
      </Content>
    </>
  )
}

export default Login
