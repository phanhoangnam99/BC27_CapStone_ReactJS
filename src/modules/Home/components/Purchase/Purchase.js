/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import {
  CogIcon,
  UserIcon,
  BuildingLibraryIcon
} from '@heroicons/react/24/outline'

import { Stepper, Step, Button, Typography } from '@material-tailwind/react'
import { AppContext } from 'contexts/app.context'
import TicketSummary from '../TicketSummary'
import QuantityController from 'components/QuantityController'

export default function Purchase() {
  let foodData = [
    {
      image:
        'https://www.galaxycine.vn/_next/image/?url=https%3A%2F%2Fcdn.galaxycine.vn%2Fmedia%2F2023%2F11%2F10%2Fwishcombo-co-online-01_1699614547904.jpg&w=384&q=75',
      name: '      iLy Wish     Tumbler      ',
      desc: '01 Ly Wish Tumbler + 01 Ly nước ngọt size L',
      price: '219000',
      buy_count: 0
    },

    {
      image:
        'https://www.galaxycine.vn/_next/image/?url=https%3A%2F%2Fcdn.galaxycine.vn%2Fmedia%2F2023%2F11%2F10%2Fwishcombo-co-online-02_1699614846550.jpg&w=384&q=75',
      name: 'iCombo Wish 1',
      desc: '1 Ly Wish Tumbler + 01 ly nước ngọt size L + 01 Hộp bắp + FREE Up Vị bất kỳ',
      price: '249000',
      buy_count: 0
    },
    {
      image:
        'https://www.galaxycine.vn/_next/image/?url=https%3A%2F%2Fcdn.galaxycine.vn%2Fmedia%2F2023%2F11%2F10%2Fwishcombo-co-online-03_1699614856486.jpg&w=384&q=75',
      name: 'iCombo Wish 2',
      desc: '1 Ly Wish Tumbler + 02 ly nước ngọt size L + 01 Hộp bắp + FREE Up Vị bất kỳ',
      price: '269000',
      buy_count: 0
    },
    {
      image:
        'https://www.galaxycine.vn/_next/image/?url=https%3A%2F%2Fcdn.galaxycine.vn%2Fmedia%2F2023%2F10%2F13%2Fcombo299k-transdd-coonline-new-01_1697166695374.jpg&w=384&q=75',
      name: 'iCombo D&amp;D Dice Tower Promotion 299K',
      desc: '01 Ly D&D Dice Tower',
      price: '299000',
      buy_count: 0
    },
    {
      image:
        'https://www.galaxycine.vn/_next/image/?url=https%3A%2F%2Fcdn.galaxycine.vn%2Fmedia%2F2023%2F10%2F13%2Fcombo299k-transdd-coonline-new-02_1697166681809.jpg&w=384&q=75',
      name: 'iCombo Optimus Prime Promotion 299K',
      desc: '01 Optimus Prime Container',
      price: '299000',
      buy_count: 0
    },
    {
      image:
        'https://www.galaxycine.vn/_next/image/?url=https%3A%2F%2Fcdn.galaxycine.vn%2Fmedia%2F2023%2F3%2F31%2Fmenuboard-combo1-2-2022-coonline-combo2_1680280172153.jpg&w=384&q=75',
      name: 'iCombo 2 Big Extra STD',
      desc: '02 Ly nước ngọt size L + 01 Hộp bắp + 1 Snack',
      price: '129000',
      buy_count: 0
    },
    {
      image:
        'https://www.galaxycine.vn/_next/image/?url=https%3A%2F%2Fcdn.galaxycine.vn%2Fmedia%2F2023%2F3%2F31%2Fcombo-1-2-co-combo2_1680280070233.jpg&w=384&q=75',
      name: 'iCombo 2 Big STD',
      desc: '02 Ly nước ngọt size L + 01 Hộp bắp',
      price: '109000',
      buy_count: 0
    },
    {
      image:
        'https://www.galaxycine.vn/_next/image/?url=https%3A%2F%2Fcdn.galaxycine.vn%2Fmedia%2F2023%2F3%2F31%2Fmenuboard-combo1-2-2022-coonline-combo1_1680280126585.jpg&w=384&q=75',
      name: 'iCombo 1 Big Extra STD',
      desc: '1 Ly nước ngọt size L + 01 Hộp bắp + 1 Snack',
      price: '109000',
      buy_count: 0
    },
    {
      image:
        'https://www.galaxycine.vn/_next/image/?url=https%3A%2F%2Fcdn.galaxycine.vn%2Fmedia%2F2023%2F3%2F31%2Fcombo-1-2-co-combo1_1680279990724.jpg&w=384&q=75',
      name: 'iCombo 1 Big STD',
      desc: '01 Ly nước ngọt size L + 01 Hộp bắp',
      price: '89000',
      buy_count: 0
    },
    {
      image:
        'https://www.galaxycine.vn/_next/image/?url=https%3A%2F%2Fcdn.galaxycine.vn%2Fmedia%2F2023%2F6%2F8%2Fcombooptimus-co-onl1_1686238609745.jpg&w=384&q=75',
      name: 'iCombo Optimus Prime 1',
      desc: '01 OP Head + 01 ly nước ngọt size L + 01 Hộp bắp + FREE Up Vị bất kỳ',
      price: '369000',
      buy_count: 0
    },
    {
      image:
        'https://www.galaxycine.vn/_next/image/?url=https%3A%2F%2Fcdn.galaxycine.vn%2Fmedia%2F2023%2F6%2F8%2Fcombooptimus2-co-onl_1686238595708.jpg&w=384&q=75',
      name: 'iCombo Optimus Prime 2',
      desc: '01 OP Head + 02 ly nước ngọt size L + 01 Hộp bắp + FREE Up Vị bất kỳ',
      price: '379000',
      buy_count: 0
    },
    {
      image:
        'https://www.galaxycine.vn/_next/image/?url=https%3A%2F%2Fcdn.galaxycine.vn%2Fmedia%2F2023%2F6%2F15%2Fgoi-galaxy-play-mobile-10k_1686840452914.jpg&w=384&q=75',
      name: 'Gói Galaxy Play Mobile',
      desc: '1 tháng xem phim Online',
      price: '10000',
      buy_count: 0
    },
    {
      image:
        'https://www.galaxycine.vn/_next/image/?url=https%3A%2F%2Fcdn.galaxycine.vn%2Fmedia%2F2023%2F6%2F15%2Fgoi-galaxy-play-sieu-viet-50k_1686840459689.jpg&w=384&q=75',
      name: 'Goi Galaxy Play Sieu Viet',
      desc: '2 tháng xem phim Online Độc quyền phim Việt chiếu rạp',
      price: '50000',
      buy_count: 0
    }
  ]

  const [tempFoodData, setTempFoodData] = useState([])
  const { film } = useContext(AppContext)
  const [total, setTotal] = useState(0)
  const [foodTotal, setFoodTotal] = useState(0)
  const [seatList, setSeatList] = useState({
    maLichChieu: film.maPhim
  })

  const [seatTotal, setSeatTotal] = useState(0)
  const [selectedSeats, setSelectedSeats] = useState([])

  const [step, setStep] = useState(2)

  const [choosenFood, setChoosenFood] = useState([])
  const handleQuantity = (foodIndex, value) => {
    const choosenFoodData =
      tempFoodData.length !== 0 ? tempFoodData[foodIndex] : foodData[foodIndex]
    const updateFood = { ...choosenFoodData, buy_count: value }

    let updatedChoosenFood =
      tempFoodData.length !== 0 ? [...tempFoodData] : [...choosenFood]

    if (value > 0) {
      if (Array.isArray(updatedChoosenFood)) {
        const exist = updatedChoosenFood.find(
          (food) => food.name === updateFood.name
        )
        if (exist) {
          console.log('Food exists')
          updatedChoosenFood = updatedChoosenFood.map((food) =>
            food.name === exist.name ? { ...food, buy_count: value } : food
          )
        } else {
          console.log('Food does not exist')
          updatedChoosenFood.push(updateFood)
        }
      }
    } else {
      const name = choosenFoodData.name
      console.log(name)
      if (Array.isArray(updatedChoosenFood)) {
        updatedChoosenFood = updatedChoosenFood.filter(
          (food) => food.name !== name
        )
      }
    }

    setChoosenFood(updatedChoosenFood)

    const total = updatedChoosenFood.reduce(
      (acc, curr) => acc + curr.price * curr.buy_count,
      0
    )

    setFoodTotal(total)
  }

  useEffect(() => {
    if (choosenFood.length > 0) {
      const updatedFoodData = foodData.map((foodItem) => {
        const chosenItem = choosenFood.find(
          (chosen) => chosen.name.trim() === foodItem.name.trim()
        )
        if (chosenItem) {
          return { ...foodItem, buy_count: chosenItem.buy_count }
        }
        return foodItem
      })

      setTempFoodData(updatedFoodData)
    }
  }, [choosenFood])

  useEffect(() => {
    if (seatList?.danhSachVe) {
      setTotal(
        seatList?.danhSachVe?.reduce((acc, current) => acc + current?.giaVe, 0)
      )
      setSeatTotal(
        seatList?.danhSachVe?.reduce((acc, current) => acc + current?.giaVe, 0)
      )
    }
  }, [seatList])

  const handleChooseSeat = (seat) => {
    let price = 0
    if (
      35 <= seat &&
      seat <= 142 &&
      (seat - 35) % 16 >= 0 &&
      (seat - 35) % 16 <= 11
    ) {
      price = 105000
    } else {
      price = 75000
    }
    const exist = selectedSeats.find((element) => element === seat)
    if (!exist) {
      if (!seatList.danhSachVe) {
        const updateSeat = [{ maGhe: seat, giaVe: price }]

        setSeatList({
          ...seatList,
          danhSachVe: updateSeat
        })

        selectedSeats.push(seat)
      } else {
        const updateSeat = [
          ...seatList.danhSachVe,
          { maGhe: seat, giaVe: price }
        ]
        setSeatList({
          ...seatList,
          danhSachVe: updateSeat
        })
        selectedSeats.push(seat)
      }
    } else {
      const updateSeat = seatList.danhSachVe.filter(
        (element) => element.maGhe !== seat
      )

      setSeatList({
        ...seatList,
        danhSachVe: updateSeat
      })

      setSelectedSeats(selectedSeats.filter((element) => element !== seat))
    }
  }

  //Number of seats
  const numberOfElements = 160 // For example purposes, change this to the desired total number of elements

  // Render seats
  const elements = []
  for (let i = 1; i <= numberOfElements; i++) {
    elements.push(
      <React.Fragment key={i}>
        <div className='my-created-div'>
          {/* You can add content or manipulate attributes for each div here */}
          <button
            onClick={() => handleChooseSeat(i)}
            className={`md:h-6 h-4 border rounded md:text-s text-[10px] transition duration-200 ease-in-out text-white md:w-6 w-4 border-grey-20 ${
              selectedSeats.includes(i)
                ? 'bg-orange'
                : 'xl:hover:bg-orange xl:hover:border-orange'
            } ${
              35 <= i && i <= 142 && (i - 35) % 16 >= 0 && (i - 35) % 16 <= 11
                ? '!border-[#f2c94c]'
                : ''
            }`}
          >
            <span className='inline-block md:w-5 w-4 text-center '>{i}</span>
          </button>
        </div>
        {(i + 1) % 16 === 0 && i !== numberOfElements - 1 && <br />}{' '}
        {/* Add a <br> after every 16th div */}
      </React.Fragment>
    )
  }

  return (
    <div className='md:container'>
      {/* ==================================STEP 2======================== */}

      {step === 2 && (
        <div className='relative'>
          <div>
            <ul className='flex justify-center font-semibold text-[12px] md:text-base flex-nowrap '>
              <li className='pt-4 mb-4 pl-0 text-blue-400'>
                <button className='md:!mx-3 !mx-1 !ml-0'>
                  Chọn phim / Rạp / Suất
                </button>
                <div className='relative mt-4 h-[2px] before:inline-block before:w-full before:absolute before:left-0 before:h-[2px] before:bg-grey-300 after:inline-block after:absolute after:left-0 after:h-[2px] after:bg-blue-800 after:w-full' />
              </li>
              <li className='pt-4 mb-4 pl-0 text-blue-800'>
                <button className='md:!mx-3 !mx-1 !ml-0'>Chọn ghế</button>
                <div className='relative mt-4 h-[2px] before:inline-block before:w-full before:absolute before:left-0 before:h-[2px] before:bg-grey-300 after:inline-block after:absolute after:left-0 after:h-[2px] after:bg-blue-800 after:w-full' />
              </li>
              <li className='pt-4 mb-4 pl-0 text-[#d0d0d0] '>
                <button className='md:!mx-3 !mx-1 !ml-0'>Chọn thức ăn</button>
                <div className='relative mt-4 h-[2px] before:inline-block before:w-full before:absolute before:left-0 before:h-[2px] before:bg-gray-300 ' />
              </li>
              <li className='pt-4 mb-4 pl-0 text-[#d0d0d0] '>
                <button className='md:!mx-3 !mx-1 !ml-0'>Thanh toán</button>
                <div className='relative mt-4 h-[2px] before:inline-block before:w-full before:absolute before:left-0 before:h-[2px] before:bg-gray-300 ' />
              </li>
              <li className='pt-4 mb-4 pl-0 text-[#d0d0d0] '>
                <button className='md:!mx-3 !mx-1 !ml-0'>Xác nhận</button>
                <div className='relative mt-4 h-[2px] before:inline-block before:w-full before:absolute before:left-0 before:h-[2px] before:bg-gray-300 ' />
              </li>
            </ul>
          </div>
          {/* ======================PART 2 ======================== */}
          <div className='bg-gray-200 w-[100vw] -translate-x-1/2 left-1/2 relative'>
            <div className='pt-4 md:mx-auto  screen1390:max-w-screen-xl xl:max-w-screen-screen1200 lg:max-w-4xl md:max-w-4xl md:px-0 sm:px-[45px]  grid xl:grid-cols-3 grid-cols-1'>
              <div className='col-span-2 xl:!order-first order-last xl:h-full h-[full] overflow-hidden xl:overflow-auto xl:pb-10 pb-32'>
                <div className='bg-white md:px-6 py-4 px-2 rounded md:mb-8 w-full'>
                  <div className='md:block flex flex-wrap justify-center w-full h-full overflow-auto'>
                    <ul className='seat__layout-rows md:mb-8 w-auto grid grid-cols-1 items-center  flex-auto'>
                      <li className='flex justify-between mb-3 md:gap-0 gap-1 flex-nowrap'>
                        <div className=' px-14 flex flex-wrap md:gap-2 gap-1 grow justify-center min-w-[398px]  flex-1'>
                          {elements}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className='seat__layout-screen'>
                    <p className='text-s text-center text-grey-50'>Màn hình</p>
                    <div className='border-2 !border-orange-400	 mt-3' />
                    <div className='text-sm flex md:flex-row flex-col-reverse justify-between items-center py-9 gap-2'>
                      <div className='flex gap-5'>
                        <div>
                          <span className='w-5 h-5 rounded bg-gray-300 inline-block align-middle' />
                          <span className='ml-2'>Ghế đã bán</span>
                        </div>
                        <div>
                          <span className='w-5 h-5 rounded bg-orange inline-block align-middle' />
                          <span className='ml-2'>Ghế đang chọn</span>
                        </div>
                      </div>
                      <div className='flex gap-5'>
                        <div>
                          <span className='w-5 h-5 rounded border !border-[#f2c94c] inline-block align-middle' />
                          <span className='ml-2'>Ghế VIP</span>
                        </div>
                        <div>
                          <span className='w-5 h-5 rounded border border-grey-20 inline-block align-middle' />
                          <span className='ml-2'>Ghế đơn</span>
                        </div>
                        <div>
                          <span className='w-[46px] h-5 rounded border !border-[#034ea2] inline-block align-middle' />
                          <span className='ml-2'>Ghế đôi</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ==============================TICKET SUMMARY====================================== */}
              <TicketSummary
                seatTotal={seatTotal}
                selectedSeats={selectedSeats}
                setStep={setStep}
                step={step}
                total={seatTotal + foodTotal}
              />
            </div>
          </div>
        </div>
      )}

      {/* ==================================STEP 3======================== */}
      {step === 3 && (
        <div className='relative'>
          <div>
            <ul className='flex justify-center font-semibold text-[12px] md:text-base flex-nowrap '>
              <li className='pt-4 mb-4 pl-0 text-blue-400'>
                <button className='md:!mx-3 !mx-1 !ml-0'>
                  Chọn phim / Rạp / Suất
                </button>
                <div className='relative mt-4 h-[2px] before:inline-block before:w-full before:absolute before:left-0 before:h-[2px] before:bg-grey-300 after:inline-block after:absolute after:left-0 after:h-[2px] after:bg-blue-800 after:w-full' />
              </li>
              <li className='pt-4 mb-4 pl-0 text-blue-400'>
                <button className='md:!mx-3 !mx-1 !ml-0'>Chọn ghế</button>
                <div className='relative mt-4 h-[2px] before:inline-block before:w-full before:absolute before:left-0 before:h-[2px] before:bg-grey-300 after:inline-block after:absolute after:left-0 after:h-[2px] after:bg-blue-800 after:w-full' />
              </li>
              <li className='pt-4 mb-4 pl-0 text-blue-800 '>
                <button className='md:!mx-3 !mx-1 !ml-0'>Chọn thức ăn</button>
                <div className='relative mt-4 h-[2px] before:inline-block before:w-full before:absolute before:left-0 before:h-[2px] before:bg-grey-300 after:inline-block after:absolute after:left-0 after:h-[2px] after:bg-blue-800 after:w-full' />
              </li>
              <li className='pt-4 mb-4 pl-0 text-[#d0d0d0] '>
                <button className='md:!mx-3 !mx-1 !ml-0'>Thanh toán</button>
                <div className='relative mt-4 h-[2px] before:inline-block before:w-full before:absolute before:left-0 before:h-[2px] before:bg-gray-300 ' />
              </li>
              <li className='pt-4 mb-4 pl-0 text-[#d0d0d0] '>
                <button className='md:!mx-3 !mx-1 !ml-0'>Xác nhận</button>
                <div className='relative mt-4 h-[2px] before:inline-block before:w-full before:absolute before:left-0 before:h-[2px] before:bg-gray-300 ' />
              </li>
            </ul>
          </div>
          {/* ======================PART 2 ======================== */}
          <div className='bg-gray-200 w-[100vw] -translate-x-1/2 left-1/2 relative'>
            <div className='pt-4 md:mx-auto  screen1390:max-w-screen-xl xl:max-w-screen-screen1200 lg:max-w-4xl md:max-w-4xl md:px-0 sm:px-[45px]  grid xl:grid-cols-3 grid-cols-1'>
              <div className='col-span-2 xl:!order-first order-last xl:h-full h-[full] overflow-hidden xl:overflow-auto xl:pb-10 pb-32'>
                <div className='bg-white p-4 md:h-full h-[80vh] overflow-auto'>
                  <h3 className='text-l mb-4 font-semibold'>Chọn Combo</h3>
                  <ul className='concession__list'>
                    {tempFoodData.length === 0
                      ? foodData.map((food, index) => (
                          <li className='flex mb-5' key={index}>
                            <img
                              alt={`${food.name}`}
                              loading='lazy'
                              width={150}
                              height={100}
                              decoding='async'
                              data-nimg={1}
                              className='inline-block rounded-md  w-[150px] h-[100px] object-cover duration-500 ease-in-out group-hover:opacity-100 scale-100 blur-0 grayscale-0)'
                              src={`${food.image}`}
                              style={{
                                color: 'transparent'
                              }}
                            />
                            <div className='ml-4 flex-1'>
                              <h4 className='text-sm font-semibold mb-1'>
                                {food.name}
                              </h4>
                              <div className='text-s'>{food.desc}</div>
                              <div className='flex justify-between mt-2 text-sm'>
                                <div>
                                  <strong>Giá: </strong>
                                  <span className='inline-block font-bold '>
                                    {`${food.price} đ`}
                                  </span>
                                </div>
                                <QuantityController
                                  value={food.buy_count}
                                  onIncrease={(value) => {
                                    handleQuantity(index, value)
                                  }}
                                  onDecrease={(value) => {
                                    handleQuantity(index, value)
                                  }}
                                />
                              </div>
                            </div>
                          </li>
                        ))
                      : (() => {
                          console.log(tempFoodData.length)
                          return tempFoodData.map((food, index) => (
                            <li className='flex mb-5' key={index}>
                              <img
                                alt={`${food.name}`}
                                loading='lazy'
                                width={150}
                                height={100}
                                decoding='async'
                                data-nimg={1}
                                className='inline-block rounded-md  w-[150px] h-[100px] object-cover duration-500 ease-in-out group-hover:opacity-100 scale-100 blur-0 grayscale-0)'
                                src={`${food.image}`}
                                style={{
                                  color: 'transparent'
                                }}
                              />
                              <div className='ml-4 flex-1'>
                                <h4 className='text-sm font-semibold mb-1'>
                                  {food.name}
                                </h4>
                                <div className='text-s'>{food.desc}</div>
                                <div className='flex justify-between mt-2 text-sm'>
                                  <div>
                                    <strong>Giá: </strong>
                                    <span className='inline-block font-bold '>
                                      {`${food.price.toLocaleString(
                                        'de-DE'
                                      )} đ`}
                                    </span>
                                  </div>
                                  <QuantityController
                                    value={food.buy_count}
                                    onIncrease={(value) => {
                                      handleQuantity(index, value)
                                    }}
                                    onDecrease={(value) => {
                                      handleQuantity(index, value)
                                    }}
                                  />
                                </div>
                              </div>
                            </li>
                          ))
                        })()}
                  </ul>
                </div>
              </div>
              {/* ==============================TICKET SUMMARY====================================== */}
              <TicketSummary
                seatTotal={seatTotal}
                selectedSeats={selectedSeats}
                setStep={setStep}
                step={step}
                total={seatTotal + foodTotal}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
