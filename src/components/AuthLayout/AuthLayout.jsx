import React from 'react'
import { Layout } from 'antd'
import BackGround from './BackGround'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    // <Row>
    //   <Col span={14}>
    //     <h1>Background Image</h1>
    //   </Col>
    //   <Col span={8}>
    //     <Outlet />
    //   </Col>
    // </Row>
    <Layout>
      <BackGround>
        <Outlet />
      </BackGround>
    </Layout>
  )
}

export default AuthLayout
