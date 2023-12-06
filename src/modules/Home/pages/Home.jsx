/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useState
} from 'react'
import Banner from '../components/Banner'
import Cinema from '../components/Cinema'
import QuickTicket from '../components/QuickTicket'
import MovieShowing from '../components/MovieShowing'
import Promotion from '../components/Promotion'
import AppIntroduction from 'components/AppIntroduction'
import Footer from 'components/footer'
import { Divider } from 'antd'
// import Cinema2 from "../components/Cinema2";

const Home = () => {
  const [
    antLayoutWidth,
    setAntLayoutWidth
  ] = useState('')

  useEffect(() => {
    const getAntLayoutWidth = document
      .querySelector(
        'section.ant-layout'
      )
      ?.getBoundingClientRect().width
      window.addEventListener('resize', (event) => {
        const getAntLayoutWidth = document
      .querySelector(
        'section.ant-layout'
      )
      ?.getBoundingClientRect().width 
      setAntLayoutWidth(
        String(getAntLayoutWidth)
      )      })
    setAntLayoutWidth(
      String(getAntLayoutWidth)
    )
  })
  return (
    <div className='bg-white '>
      <Banner />
      <div
        className='container'
        style={{
          maxWidth: '60rem!important'
        }}
      >
        {/* <QuickTicket /> */}
        <MovieShowing />

        <div
          className={`line-break my-8 left-1/2 -translate-x-1/2 relative`}
          style={{
            width: `${antLayoutWidth}px`
          }}
        ></div>
        <Cinema />
        <div
          className={`line-break my-8 left-1/2 -translate-x-1/2 relative`}
          style={{
            width: `${antLayoutWidth}px`
          }}
        ></div>
        <Promotion />

        <AppIntroduction />

        <Footer />
      </div>
    </div>
  )
}

export default Home
