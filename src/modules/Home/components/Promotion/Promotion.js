/* eslint-disable no-unused-vars */
import promotionAPI from 'apis/promotionAPI'
import useRequest from 'hooks/useRequest'
import React from 'react'
import Slider from 'react-slick'

export default function Promotion() {
  const { data: promotions } = useRequest(async () => {
    try {
      return promotionAPI.getPromotion()
    } catch (error) {
      console.log(error)
    }
  })

  const settings = {
    autoplay: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 3,
    slidesToScroll: 1,

    useCSS: true,
    useTransform: true,
    responsive: [
    
      {
        breakpoint: 720,
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
    ],
  }
  return (
    <div className='pb-10'>
      <div className=''>
        <div className='flex  items-center justify-start gap 4'>
          <div className='flex mr-8 items-center md:text-xl font-bold px-4 border-l-4 border-l-blue-500 uppercase my-6'>
            Tin khuyến mãi
          </div>
        </div>
      </div>

      <Slider {...settings}>
        {promotions &&
          promotions.map((promotion) => (
            <div key={promotion.id}>
              <a href={`https://galaxycine.vn/khuyen-mai/${promotion.slug}`}>
                <div className='mx-4'>
                  <img src={promotion.imageLandscape} alt='' />
                </div>
                <div className='mx-4 text-center text-black text-md font-bold'>{promotion.name}</div>
              </a>
            </div>
          ))}
      </Slider>
      {/* 
      <Slider {...settings}>
        <div>
          <img src='http://placekitten.com/g/400/200' alt='' />
        </div>
        <div>
          <img src='http://placekitten.com/g/400/200' alt='' />
        </div>
        <div>
          <img src='http://placekitten.com/g/400/200' alt='' />
        </div>
        <div>
          <img src='http://placekitten.com/g/400/200' alt='' />
        </div>
      </Slider> */}
    </div>
  )
}
