/* eslint-disable react/prop-types */
import { AppContext } from 'contexts/app.context'
import React, { useContext } from 'react'

export default function TicketSummary({
  selectedSeats,
  seatTotal,
  setStep,
  step,
  total,
  choosenFood,
  foodTotal
}) {
  const { film } = useContext(AppContext)
  return (
    <div className='col-span-1 xl:pl-4 xl:order-none order-first py-4'>
      <div className='booking__summary md:mb-4'>
        <div className='h-[6px] bg-orange rounded-t-lg' />
        <div className='bg-white p-3 grid grid-cols-3 xl:gap-2 items-center'>
          <div className='row-span-2 md:row-span-1 xl:row-span-2 block md:hidden xl:block'>
            <img
              alt={`${film?.tenPhim}`}
              loading='lazy'
              width={100}
              height={150}
              decoding='async'
              data-nimg={1}
              className='xl:w-full xl:h-full  md:w-[80px] md:h-[120px] w-[90px] h-[110px] rounded object-cover object-cover duration-500 ease-in-out group-hover:opacity-100
scale-100 blur-0 grayscale-0)'
              src={`${film.hinhAnh}`}
              style={{
                color: 'transparent'
              }}
            />
          </div>
          <div className='row-span-2 md:row-span-1 xl:row-span-2 hidden md:block xl:hidden'>
            <img
              alt={`${film.tenPhim}`}
              loading='lazy'
              width={100}
              height={150}
              decoding='async'
              data-nimg={1}
              className=' w-[220px] h-[150px] rounded object-cover object-cover duration-500 ease-in-out group-hover:opacity-100
grayscale-[90%])'
              src={`${film.hinhAnh}`}
              style={{
                color: 'transparent'
              }}
            />
          </div>
          <div className='flex-1 col-span-2 md:col-span-1 row-span-1 xl:col-span-2'>
            <h3 className='text-sm xl:text-base font-bold xl:mb-2 '>
              Điều Ước
            </h3>
            <p className='text-sm xl:block inline-block'>2D Lồng Tiếng</p>
            <div className='xl:mt-2 ml-2 xl:ml-0 xl:block inline-block' />
          </div>

          <div className='col-span-2 md:col-span-1 xl:col-span-3'>
            {' '}
            <div>
              <div className='xl:mt-4 text-sm xl:text-base'>
                <strong>Galaxy Quang Trung</strong>
                <span> - </span>
                <span className='text-sm xl:text-base'>RAP 7</span>
              </div>
              <div className='xl:mt-2 text-sm xl:text-base'>
                <span>Suất: </span>
                <strong>13:45</strong>
                <span> - </span>
                <span className='capitalize text-sm'>
                  thứ năm, <strong>30/11/2023</strong>
                </span>
              </div>
            </div>
            {selectedSeats.length !== 0 && (
              <div className='xl:block hidden'>
                <div className='my-4 border-t border-gray-400 border-dashed xl:block hidden' />
                <div className='flex justify-between text-sm mt-2'>
                  <div className='max-w-[70%]'>
                    <strong>{selectedSeats.length + 'x'}</strong>
                    <span>{` Ghế`}</span>
                    <div className='inline-flex flex-wrap w-[80%]'>
                      <span>Ghế:</span>
                      {selectedSeats.map((seat) => (
                        <strong key={seat} className='px-1'>
                          {seat}
                        </strong>
                      ))}
                    </div>
                  </div>
                  <span className='inline-block font-bold text-xs '>
                    {`${seatTotal.toLocaleString('de-DE')} ₫`}
                  </span>
                </div>
              </div>
            )}
            {/* FOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOD */}
            {choosenFood?.length !== 0 && (
              <div className='xl:block hidden'>
                <div className='my-4 border-t border-gray-400 border-dashed xl:block hidden' />
                <div className='flex justify-between text-sm mt-2'>
                  <div className='max-w-[70%]'>
                    {choosenFood?.map((food) => (
                      <div key={food.name}>
                        <strong>{`${food.buy_count}x`}</strong>
                        <span>{` ${food.name}`}</span>
                      </div>
                    ))}
                  </div>
                  <span className='inline-block font-bold text-xs '>
                    {`${foodTotal?.toLocaleString('de-DE')} ₫`}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className='my-4 border-t border-gray-400 col-span-3  border-dashed xl:grid hidden' />
          <div className='xl:flex hidden justify-between col-span-3'>
            <strong className='text-base'>Tổng cộng</strong>
            <span className='inline-block font-bold text-orange '>
              {`${total.toLocaleString('de-DE')} ₫`}
            </span>
          </div>
        </div>
        <div className='mt-8 xl:flex hidden'>
          <button
            className='w-1/2 mr-2 py-2 text-orange'
            onClick={() => setStep(step - 1)}
          >
            <span>Quay lại</span>
          </button>
          <button
            className='w-1/2 ml-2 py-2  bg-orange text-white border rounded-md hover:bg-orange-20'
            onClick={() => setStep(step + 1)}
          >
            <span>Tiếp tục</span>
          </button>
        </div>
      </div>
      <div className='fixed bottom-0 left-0 w-full z-100 bg-white xl:hidden transition-all duration-500 ease-in-out overflow-hidden max-h-[90vh] h-max  min-h-max pb-12 pt-2 border border-[#DFDFDF] rounded-t-xl opacity-100'>
        <div className='rounded opacity-100  w-full'>
          <img
            alt='Icon show'
            loading='lazy'
            width={45}
            height={20}
            decoding='async'
            data-nimg={1}
            className='absolute -top-[6%] left-[50%] -translate-x-[50%] brightness-90 grayscale-[20%] z-100'
            src='/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Fdelete.addc939e.png&w=96&q=75'
            style={{
              color: 'transparent'
            }}
          />
        </div>
        <div className='grid grid-cols-3 items-center px-4 mb-2 transition opacity-0 relative overflow-hidden  opacity-100'>
          <div className='col-span-3' />
          <div className='fixed bottom-0 '>
            <div className='justify-start  items-center gap-1 flex col-span-2 w-full h-14   fixed bottom-0 left-4 bg-white'>
              <strong className='text-sm font-normal text-grey-10'>
                Tổng cộng:{' '}
              </strong>
              <span className='inline-block font-bold text-orange '>
                {`${total} ₫`}
              </span>
            </div>
            <div className='text-right fixed bottom-0 right-4 h-14 flex items-center'>
              <div>
                <button
                  className='w-[65px] h-10 py-2 bg-transparent text-orange text-sm rounded-md'
                  onClick={() => setStep(step - 1)}
                >
                  <span>Quay lại</span>
                </button>
                <button
                  className='w-[80px] h-10 py-2 bg-orange  text-white border text-sm rounded-md hover:bg-orange-20 w-[80px]'
                  onClick={() => setStep(step + 1)}
                >
                  <span>Tiếp tục</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
