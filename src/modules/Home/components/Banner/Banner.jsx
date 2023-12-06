/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getBanners } from "../../slices/bannerSlice";

import useRequest from 'hooks/useRequest'
import movieAPI from 'apis/movieAPI'
import ReactPlayer from 'react-player'
import React, { useEffect, useState } from 'react'
import { Slide } from 'react-slideshow-image'

import 'react-slideshow-image/dist/styles.css'
import { Modal, Typography, Button } from '@mui/material'
import { Box } from '@mui/system'
import './banner.scss'
import OwlCarousel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import Slider from 'react-slick'
import { Carousel } from '@material-tailwind/react'

const TRAILERS = [
  'https://www.youtube.com/watch?v=L7ZBrFWVseU',
  'https://www.youtube.com/watch?v=QRYkdcj5iTs',
  'https://www.youtube.com/watch?v=TOFxa0w_gAo'
]

export const getHeadersHeight = () => {
  return String(
    document.getElementById('navbar')?.getBoundingClientRect().height
  )
}

const slideImages = [
  'https://s3img.vcdn.vn/123phim/2021/04/lat-mat-48h-16177782153424.png'
]

const Banner = () => {
  const [, setRender] = useState(false)
  const { data: banners } = useRequest(async () => await movieAPI.getBanners())

  // const dispatch = useDispatch();
  // const { banners, isLoading, error } = useSelector((state) => state.banner);
  // useEffect(() => {
  //   dispatch(getBanners());
  // }, []);

  const [open, setOpen] = useState(false)
  const [, setPlay] = useState(false)

  useEffect(() => {
    setRender((prev) => !prev)
  }, [banners])

  const handleMouseEnter = () => {
    setPlay(true)
  }
  const handleMouseLeave = () => {
    setPlay(false)
  }

  // const bannersMapped = banners?.map((banner, index) => {
  //   return { ...banner, trailer: TRAILERS[index] };
  // });

  // console.log(bannersMapped);
  if (!banners) {
    return null
  }

  const settings = {
    autoplay: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    centerMode: true,
    className: 'center',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          stagePadding: 0
        }
      }
    ]
  }

  return (
    <div className='inline-block w-full' style={{ '': '' }}>
      <OwlCarousel
        className='owl-theme'
        loop
        width={100}
        margin={40}
        items={1}
        dots={false}
        nav={false}
        autoplay
        responsive={{
          1440: {
            items: 1,
            stagePadding: 150
          }
        }}
      >
        {banners.map((banner, index) => {
          return (
            <div
              key={index}
              className={`sm:h-[23rem] md:h-[27rem] xl:h-[70vh]  h-[150px]   relative`}
            >
              <img
                // onMouseEnter={handleMouseEnter}
                // onMouseLeave={handleMouseLeave}
                // key={banner.maBanner}
                src={banner.hinhAnh}
                // alt={`banner-${banner.maBanner}`}
                alt=''
                className='max-h-full h-[100%]    object-fill '
              />
            </div>
          )
        })}
      </OwlCarousel>
      {/* <div className='slide-container' style={{height:'30rem'}}>
        <Slide {...properties}>
          {slideImages.map((each, index) => (
            <div key={index} className='each-slide flex align-center justify-center background-cover height-[300px]' >
              <img className='lazy' src={each} alt='sample' />
            </div>
          ))}
        </Slide>
      </div> */}

      {/* <div className='slide-container buttons'>
        <button onClick={this.back} type='button'>
          Go Back
        </button>
        <button onClick={this.next} type='button'>
          Go Next
        </button>
      </div> */}
    </div>
  )
}

export default Banner

// const ButtonDesign = styled.div`
//   position: absolute;
//   top: 45%;
//   left: 45%;

//   button {
//     border-radius: 50%;
//     padding: 15px 20px;
//     border: 5px solid;
//     font-size: x-large;
//   }
// `;
