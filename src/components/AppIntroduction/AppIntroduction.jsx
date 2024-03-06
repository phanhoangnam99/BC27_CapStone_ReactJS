/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
import { Carousel } from 'antd'
import React from 'react'
import Slider from 'react-slick'

export default function AppIntroduction() {
  const images = [
    'https://www.galaxycine.vn/_next/static/media/Splash.de33f19c.png',
    'https://www.galaxycine.vn/_next/static/media/screen-slider-iphone.3339b3ed.png',
    'https://www.galaxycine.vn/_next/static/media/Profile.767d60ee.png',
    'https://www.galaxycine.vn/_next/static/media/MovieDetail.52d031b0.png'
  ]

  const settings = {
    // autoplay: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    accessibility: false,
    arrows: false,
    adaptiveHeight: true,
    className: 'w-full h-full'
  }
  return (
    <>
      <div
        id='AppIntroduction'
        className="  advertise bg-[url('https://www.galaxycine.vn/_next/static/media/bg-icon-iphone-x.3b4bcdb7.svg')] w-full md:block hidden absolute left-[50%] -translate-x-[50%]"
      >
        <div className='advertise__wrap my-0 mx-auto py-12 screen1390:max-w-screen-xl xl:max-w-screen-screen1200 lg:max-w-6xl'>
          <div className='advertise__container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-2 gap-6'>
            <div className='advertise__left my-o mx-auto relative z-20 md:block hidden '>
              <img
                alt='img-iphone'
                loading='lazy'
                width={200}
                height={409}
                decoding='async'
                data-nimg={1}
                className='img-atr relative z-50'
                style={{ color: 'transparent' }}
                src='https://www.galaxycine.vn/_next/static/media/Frame-iphone-x.78ef1223.svg'
              ></img>
              <div className='absolute z-1 w-[92%] h-[100%] top-[10px] overflow-hidden left-[10px] rounded-3xl '>
                {/* <img src={`${images[0]}`} alt="" /> */}
                {/* <Slider {...settings} >
                  {images.map((image, index) => (
                    <div key={index} className=''>
                      <img alt={image} src={image} className='top-[5px] h-auto w-auto'></img>
                    </div>
                  ))}
                </Slider> */}

                <Carousel autoplay effect dots={false} fade>
                  {images.map((image, index) => (
                    <div key={index} className=' '>
                      <img
                        alt={image}
                        src={image}
                        className='top-[5px] h-auto w-auto '
                      ></img>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
            <div className='advertise__right flex items-center px-7'>
              <div className='advertise__right__content'>
                <h1 className='text-3xl text-white mb-4'>
                  Đặt Vé Online - Không Lo Trễ Nải
                </h1>
                <p className='text-sm text-white mb-5'>
                  Ghét đông đúc ồn ào? Lười xếp hàng mua vé? Hãy quên đi cách
                  mua vé giấy truyền thống tốn thời gian hay xếp hàng lấy vé
                  online phiền toái.
                </p>
                <div className='app__qr flex items-end'>
                  <span className='qr__code'>
                    <img
                      alt='Icon QR'
                      loading='lazy'
                      width={150}
                      height={150}
                      decoding='async'
                      data-nimg={1}
                      style={{ color: 'transparent' }}
                      src='https://galaxycine.vn/_next/static/media/glx-qr-code-1.218ae7da.svg'
                    />
                  </span>
                  <span className='text-white text-sm m-4  font-light'>
                    <i>OR</i>
                  </span>
                  <ul className='list-none mb-0'>
                    <li className='inline-block'>
                      <a
                        className='inline-block'
                        target='_blank'
                        href='https://apps.apple.com/vn/app/id593312549'
                      >
                        <img
                          alt='Icon App Store'
                          loading='lazy'
                          width={140}
                          height={120}
                          decoding='async'
                          data-nimg={1}
                          className='w-auto h-auto'
                          style={{ color: 'transparent' }}
                          src='http://galaxycine.vn/_next/static/media/icon-ios-app-store.65ed00df.svg'
                        />
                      </a>
                    </li>
                    <li className='inline-block ml-1'>
                      <a
                        className='inline-block'
                        target='_blank'
                        href='https://play.google.com/store/apps/details?id=com.galaxy.cinema&hl=vi'
                        rel='noreferrer'
                      >
                        <img
                          alt='Icon Google App Store'
                          loading='lazy'
                          width={150}
                          height={140}
                          decoding='async'
                          data-nimg={1}
                          className='w-auto h-auto'
                          style={{ color: 'transparent' }}
                          src='https://galaxycine.vn/_next/static/media/icon-google-app-store.f4c38402.svg'
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
