/* eslint-disable no-unused-vars */
import movieAPI from 'apis/movieAPI'
import Trailer from 'components/Trailer'
import useRequest from 'hooks/useRequest'
import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getIdFromNameId, setFilmToLS } from 'utils/utils'
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel
} from '@material-tailwind/react'
import { Button } from 'antd'
import path from 'constants/path'
import { AppContext } from 'contexts/app.context'

export default function FilmDetail() {
  const { setFilm } = useContext(AppContext)
  const { filmId } = useParams()
  const id = getIdFromNameId(filmId)
  const { data: movie } = useRequest(() => {
    return movieAPI.getFilmDetail(id)
  })

  const { data: movieSchedule } = useRequest(() => {
    return movieAPI.getSchedule(id)
  })
  const date = new Date(movie?.ngayKhoiChieu)

  const getDate = (value) => {
    const date = new Date(value)
    return date.toLocaleDateString('en-GB')
  }

  const getTime = (value) => {
    return new Date(value).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }
  setFilmToLS(movie)
  setFilm(movie)

  const data = []
  movieSchedule?.heThongRapChieu?.forEach((system) => {
    if (system?.maHeThongRap === 'Galaxy') {
      system?.cumRapChieu.forEach((branch) => {
        branch.lichChieuPhim.forEach((schedule) => {
          data.push({
            label: getDate(schedule?.ngayChieuGioChieu),
            value: getDate(schedule?.ngayChieuGioChieu),
            children: (
              <>
                <h3>{branch?.tenCumRap}</h3>
                <Link
                  to={`${path.home}purchase/${schedule.maLichChieu}`}
                  className='mr-4 my-4 bg-transparent hover:!bg-blue-800  font-semibold transition-all duration-500 ease-in-out hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                >
                  {getTime(schedule.ngayChieuGioChieu)}
                </Link>
              </>
            )
          })
        })
      })
    }
  })
  function dataProcess(data) {
    let mergedObjects = {}

    data.forEach((obj) => {
      if (!mergedObjects[obj.label]) {
        mergedObjects[obj.label] = {
          label: obj.label,
          value: obj.value,
          children: []
        }
      }
      mergedObjects[obj.label].children.push(obj.children)
    })

    // Convert the merged objects into an array
    let result = Object.values(mergedObjects)
    result.forEach((item) => {
      const childrenMap = new Map()
      const mergedChildren = []
      item.children.forEach((child) => {
        const heading = child.props.children[0].props.children
        if (!childrenMap.has(heading)) {
          childrenMap.set(heading, [])
        }
        childrenMap.get(heading).push(child.props.children[1])
      })

      childrenMap.forEach((buttons, heading) => {
        mergedChildren.push(
          <>
            <h3 className='my-4 font-bold' id='ec'>
              {heading}
            </h3>
            {buttons.map((button, index) => (
              <React.Fragment key={index}>{button}</React.Fragment>
            ))}
          </>
        )
      })
      item.children = mergedChildren
    })
    return result
  }

  let merged = dataProcess(data)
  console.log(merged)

  // data.push({
  //   label: schedule?.ngayChieuGioChieu,
  //   value: schedule?.ngayChieuGioChieu,
  //   children: (
  //     <>
  //       <h3>{cinema?.iaChi}</h3>
  //     </>
  //   )
  // })

  // data.append()

  return (
    movie && (
      <>
        <div className='sm:h-96 h-48 lg:h-full'>
          <div className='bg-black flex justify-center overflow-hidden h-full'>
            <div className='relative h-full '>
              <div
                className='relative w-[750px] h-full md:h-full lg:h-[500px]  object-fill object-cover duration-500 ease-in-out group-hover:opacity-100
      scale-100 blur-0 grayscale-0 '
              >
                <div className='relative h-full w-full'>
                  {/* =========BLUR LEFT=========== */}
                  <div className='absolute top-0 w-[25%] z-[100] left-[25%] h-full'>
                    <img
                      className='object-fill h-full  '
                      src='https://www.galaxycine.vn/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Fblur-left.7a4f1851.png&w=384&q=75'
                      alt=''
                    />
                  </div>
                  {/* =========BLUR LEFT=========== */}

                  <div className='relative h-full w-full'>
                    <div className='relative w-1/2 h-full mx-auto z-[2]'>
                      <img
                        src={`${movie.hinhAnh}`}
                        className='w-full h-full mx-auto md:h-full lg:h-[500px]  object-contain duration-500 ease-in-out group-hover:opacity-100'
                        alt=''
                      />
                    </div>
                    <div className='bg-[#0003] z-[50] top-0 absolute w-full h-full'></div>

                    <Trailer url={movie.trailer}>
                      <button className='absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 z-[99999]'>
                        <img
                          alt='play'
                          loading='lazy'
                          width={64}
                          height={64}
                          decoding='async'
                          data-nimg={1}
                          className='w-[40px] h-[40px] lg:w-[64px] lg:h-[64px] object-cover duration-500 ease-in-out group-hover:opacity-100
scale-100 blur-0 grayscale-0)'
                          src='https://www.galaxycine.vn/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Fbutton-play.2f9c0030.png&w=64&q=75'
                          style={{ color: 'transparent' }}
                        />
                      </button>
                    </Trailer>
                  </div>
                  {/* =========BLUR RIGHT=========== */}
                  <div className='absolute top-0 w-[25%] z-[100] right-[25%] h-full'>
                    <img
                      className='object-cover h-full  object-fill '
                      src='https://www.galaxycine.vn/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Fblur-right.52fdcf99.png&w=384&q=75'
                      alt=''
                    />
                  </div>
                  {/* =========BLUR RIGHT=========== */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-3 container'>
          <div className='grid grid-cols-3'>
            <div className=''>
              <img src={`${movie.hinhAnh}`} alt='' className='h-40 w-30' />
            </div>
            <div className='col-span-2 ml-4 flex flex-col justify-center'>
              <div>{movie.tenPhim}</div>
              <div>
                <div className='text-sm mt-2  font-semibold not-italic'>
                  <svg
                    width={12}
                    height={14}
                    viewBox='0 0 12 14'
                    fill='none'
                    className='inline-block align-baseline mr-1'
                  >
                    <path
                      d='M10.7143 1.75H9.42857V0.328125C9.42857 0.147656 9.28393 0 9.10714 0H8.03571C7.85893 0 7.71429 0.147656 7.71429 0.328125V1.75H4.28571V0.328125C4.28571 0.147656 4.14107 0 3.96429 0H2.89286C2.71607 0 2.57143 0.147656 2.57143 0.328125V1.75H1.28571C0.575893 1.75 0 2.33789 0 3.0625V12.6875C0 13.4121 0.575893 14 1.28571 14H10.7143C11.4241 14 12 13.4121 12 12.6875V3.0625C12 2.33789 11.4241 1.75 10.7143 1.75ZM10.5536 12.6875H1.44643C1.35804 12.6875 1.28571 12.6137 1.28571 12.5234V4.375H10.7143V12.5234C10.7143 12.6137 10.642 12.6875 10.5536 12.6875Z'
                      fill='#F58020'
                    />
                  </svg>
                  <span>{date.toLocaleDateString('es-CL')}</span>
                </div>
              </div>
              <div className='mt-2'>
                <div className='flex items-center text-[20px]'>
                  <svg
                    aria-hidden='true'
                    focusable='false'
                    data-prefix='fas'
                    data-icon='star'
                    className='text-orange h-5 w-5 mr-1'
                    role='img'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 576 512'
                  >
                    <path
                      fill='currentColor'
                      d='M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z'
                    />
                  </svg>
                  <span className=' mr-1'>{movie.danhGia}</span>
                </div>
              </div>
            </div>
          </div>
          <div className='movie__content mt-3 lg:mt-0'>
            <span className='border-l-4 border-solid border-blue-600 mr-2' />
            <h1 className='mb-4 text-base inline-block capitalize font-bold'>
              Nội dung phim
            </h1>
            <div className='block__wysiwyg text-black-10 text-sm font-normal not-italic content-text content__data'>
              <p>
                <span style={{ fontSize: 14 }}>{movie.moTa}</span>
              </p>
            </div>
          </div>

          <div className='mt-4'>
            <span className='border-l-4 border-solid border-blue-600 mr-2' />
            <h1 className='mb-4 text-base inline-block capitalize font-bold'>
              Lịch chiếu
            </h1>

            <Tabs value={`${merged[0]?.value}`}>
              <TabsHeader>
                {merged?.map(({ label, value }) => (
                  <Tab key={value} value={value}>
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody>
                {merged?.map(({ value, desc, children }) => (
                  <TabPanel key={value} value={value}>
                    {children}
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          </div>
        </div>
      </>
    )
  )
}
