/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Trailer from 'components/Trailer'
import path from 'constants/path'
import React from 'react'
import { Link } from 'react-router-dom'
import { generateNameId } from 'utils/utils'

export default function Film({ movie, key: index , }) {
  return (
    movie && (
      <div className='col-span-1 group    ' key={index}>
        <div className='max-w-sm  h-full'>
          <div className='card-header relative h-auto shadow-lg group  '>
            <Link
              to={`${path.home}dat-ve/${generateNameId({
                name: `${movie.tenPhim}`,
                id: movie?.maPhim
              })}`}
            >
              <img
                className='w-full h-auto rounded-lg   group-hover:md:scale-105 transition-all duration-500 object-cover  ease-in-out group-hover:opacity-100
scale-100 blur-0 grayscale-0)'
                src={`${movie.hinhAnh}`}
                alt={`${movie.biDanh}`}
              />
            </Link>
            <Link
              to={`${path.home}dat-ve/${generateNameId({
                name: `${movie.tenPhim}`,
                id: movie?.maPhim
              })}`}
            >
              <div className='absolute bg-black/50 w-full h-full  z-1 top-0 transition ease-in-out duration-500 rounded-lg	 group-hover:!opacity-100 group-hover:md:scale-105 opacity-0 hidden  lg:block'>
                <div className='card__hover__content flex flex-col justify-center items-center w-full h-full gap-3'>
                  <button
                    type='button'
                    className='text-white bg-[#f26b38] w-[120px] h-[40px] hover:bg-[#fb9440] rounded text-sm justify-center py-2.5 text-center inline-flex items-center dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440]'
                  >
                    <img
                      alt='Logo Buy Ticket'
                      loading='lazy'
                      decoding='async'
                      data-nimg={1}
                      className='mr-2 h-5 w-5'
                      src='https://galaxycine.vn/_next/static/media/Vector-1.319a0d2b.svg'
                      style={{
                        color: 'transparent',
                      
                      }}
                    />
                    Mua vé
                  </button>

                  <Link onClick={(event) => event.preventDefault()} >
                    <Trailer url={movie.trailer}></Trailer>
                  </Link>
                </div>
              </div>
            </Link>
          </div>

          <div className='font-bold text-md mb-2 mt-3'>{movie.tenPhim}</div>
          {/* <div className='px-6 py-4 '>
    <p className='text-gray-700 text-md line-clamp-3'>{movie.moTa}</p>
  </div> */}
        </div>
      </div>
    )
  )
}
