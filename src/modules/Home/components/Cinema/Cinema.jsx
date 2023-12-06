/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import movieAPI from 'apis/movieAPI'
import useRequest from 'hooks/useRequest'
import React, { useState, useEffect, Children, useMemo } from 'react'
import './cinema.css'
import styled from 'styled-components'
import CinemaDetail from './CinemaDetail'
import { Space, Tabs, theme } from 'antd'
import 'antd/dist/antd.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import promotionAPI from 'apis/promotionAPI'

// const Cinema = () => {
//   useEffect(() => {
//     handleChooseCinemaBranch('BHDStar')
//   }, [])

//   const [cinemaDetails, setCinemaDetails] = useState()
//   const [displayDetails, setDisplay] = useState(false)
//   const [edit, setEdit] = useState('')
//   const [render, setRender] = useState(true)
//   const { data: cinemas } = useRequest(() => movieAPI.getCinema())
//   const { data: branches } = useRequest(() => movieAPI.getCinemaBranchDetail(edit?.maHeThongRap), {
//     deps: [edit?.maHeThongRap]
//   })
// const [isFocusButton, setIsFocusButton] = useState({})

//   const cinemaDetail = (cinemaId) => {
//     setCinemaDetails(cinemaId)
//     setDisplay(true)
//   }

//   const handleChooseCinemaBranch = (branch) => {
//     setEdit((prev) => ({ ...prev, maHeThongRap: branch }))
//     try {
//       // console.log(branches)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   // useEffect(() => {}, [isFocusButton.firstSlideFocus])
//   // useEffect(()=>{
//   //   if(cinemaDetails){
//   //     setDisplay(true)
//   //   }else{
//   //     setDisplay(false)
//   //   }
//   // }, [cinemaDetails])

//   // const focusButton = ()=>{
//   // const el  = document.getElementById()
//   // }

//   const handleIsFocusButton = (cinema) => {
//     if (isFocusButton.length > 0) {
//       return isFocusButton[0] === edit.maHeThongRap && isFocusButton[0] === cinema
//     }
//     return false
//   }

//   const onChange = (key) => {
//     handleChooseCinemaBranch(key)
//   }

//   const onChangeBranch = (key) => {}

//   const itemFirstSlide = cinemas?.map((cinema, index) => ({
//     key: cinema.maHeThongRap,
//     label: (
//       <span>
//         <img src={cinema.logo} alt={cinema.tenHeThongRap} className='h-8 w-8' />
//       </span>
//     ),
//     children: (
//       <div className='w-full'>
//         <Tabs
//           tabPosition={'left'}
//           defaultActiveKey='BHDStar'
//           style={{
//             height: '20rem'
//           }}
//           tabBarStyle={{
//             width: '50%'
//           }}
//           id='secondSlide'
//           items={branches?.[0].lstCumRap?.map((branch) => ({
//             key: branch.tenCumRap,
//             label: (
//               <div className='w-full flex-basis-full flex'>
//                 <div className='border-b-4 w-full text-left focus:text-black'>
//                   <div className='flex flex-wrap'>
//                     <div>{branch.tenCumRap}</div>
//                     <div className='basis-full h-0'></div>
//                     <div className='text-ellipsis overflow-hidden'>{branch.diaChi}</div>
//                   </div>
//                 </div>
//               </div>
//             ),
//             children: (
//               <Tabs
//                 tabPosition={'left'}
//                 defaultActiveKey='BHDStar'
//                 style={{
//                   height: '20rem'
//                 }}
//                 items={branch.danhSachPhim.map((film) => ({
//                   key: film.tenPhim,
//                   label: (
//                     <div>
//                       <span>{film.tenPhim}</span>
//                     </div>
//                   )
//                 }))}
//               />
//             )
//           }))}
//           onChange={onChangeBranch}
//         />
//       </div>
//     )
//   }))
//   console.log(branches)
//   return (
//     <div>
//       {/* <div className='container'> */}
//       {/* <div className='grid grid-cols-12'> */}
//       {/* <div className=' col-span-1 w-full mt-5 text-gray-900 bg-white border border-gray-200 flex flex-col'> */}
//       {/* {cinemas &&
//               cinemas.map((cinema) => (
//                 <CinemaButton
//                   isFocused={handleIsFocusButton(cinema.maHeThongRap)}
//                   key={cinema.maHeThongRap}
//                   type='button'
//                   className='  inline-flex items-center px-4 py-3  bg-white border-t border-b border-gray-200 hover:bg-gray-100  focus:z-10 '
//                   onClick={() => {
//                     handleChooseCinemaBranch(cinema.maHeThongRap)
//                     setIsFocusButton([cinema.maHeThongRap])
//                     setRender((prev) => {
//                       return !prev
//                     })
//                   }}

//                   // style={{'focus:':{boxShadow:'1px 0px blue'}}}
//                 >
//                   <img src={`${cinema.logo}`} className='h-full w-full' alt='' />
//                 </CinemaButton>
//               ))} */}
//       <div className='b-1 border-black'>
//         <Tabs
//           tabPosition={'left'}
//           defaultActiveKey='BHDStar'
//           style={{
//             height: '20rem',
//           }}
//           items={itemFirstSlide}
//           onChange={onChange}
//         />
//       </div>
//       {/* </div> */}
//       {/* <div className='col-span-3 w-full mt-5 text-gray-900 bg-white border border-gray-200'>
//             {branches &&
//               branches.map((branch) => (
//                 <CinemaButton
//                   isFocused={handleIsFocusButton(branch.maHeThongRap)}
//                   key={branch.maHeThongRap}
//                   type='button'
//                   className='  inline-flex items-center px-4 py-3  bg-white border-t border-b border-gray-200 hover:bg-gray-100  focus:z-10 '
//                   onClick={() => {
//                     handleChooseCinemaBranch(branch.maHeThongRap)
//                     setIsFocusButton([branch.maHeThongRap])
//                     setRender((prev) => {
//                       return !prev
//                     })
//                   }}

//                   // style={{'focus:':{boxShadow:'1px 0px blue'}}}
//                 >
//                   <div>{branch.tenCumRap}</div>
//                 </CinemaButton>
//               ))}
//           </div>
//           <div className='col-span-6 w-full mt-5 text-gray-900 bg-white border border-gray-200'>
//             <button
//               type='button'
//               className='relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white'
//             >
//               <svg
//                 className='w-3 h-3 mr-2.5'
//                 aria-hidden='true'
//                 xmlns='http://www.w3.org/2000/svg'
//                 fill='currentColor'
//                 viewBox='0 0 20 20'
//               >
//                 <path d='M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z' />
//               </svg>
//             </button>
//             <button
//               type='button'
//               className='relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white'
//             >
//               <svg
//                 className='w-3 h-3 mr-2.5'
//                 aria-hidden='true'
//                 xmlns='http://www.w3.org/2000/svg'
//                 fill='none'
//                 viewBox='0 0 20 20'
//               >
//                 <path
//                   stroke='currentColor'
//                   strokeLinecap='round'
//                   strokeLinejoin='round'
//                   strokeWidth={2}
//                   d='M7.75 4H19M7.75 4a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 4h2.25m13.5 6H19m-2.25 0a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 10h11.25m-4.5 6H19M7.75 16a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 16h2.25'
//                 />
//               </svg>
//             </button>
//             <button
//               type='button'
//               className='relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white'
//             >
//               <svg
//                 className='w-3 h-3 mr-2.5'
//                 aria-hidden='true'
//                 xmlns='http://www.w3.org/2000/svg'
//                 viewBox='0 0 20 18'
//                 fill='currentColor'
//               >
//                 <path
//                   d='M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z'
//                   fill='currentColor'
//                 />
//                 <path
//                   d='M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z'
//                   fill='currentColor'
//                 />
//               </svg>
//             </button>
//             <button
//               type='button'
//               className='relative inline-flex items-center w-full px-4 py-2 text-sm font-medium rounded-b-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white'
//             >
//               <svg
//                 className='w-3 h-3 mr-2.5'
//                 aria-hidden='true'
//                 xmlns='http://www.w3.org/2000/svg'
//                 fill='currentColor'
//                 viewBox='0 0 20 20'
//               >
//                 <path d='M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z' />
//                 <path d='M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z' />
//               </svg>
//             </button>
//           </div> */}
//       {/* </div> */}
//       {/* </div> */}
//     </div>
//   )
// }

const Cinema = () => {
  const { data: getReview } = useRequest(() => {
    try {
      return movieAPI.getMovieCorner('review', 'preview')
    } catch (error) {
      console.log(error)
    }
  })

  const { data: getFilmNews } = useRequest(() => {
    try {
      return movieAPI.getMovieCorner('film')
    } catch (error) {
      console.log(error)
    }
  })

  const items = [
    {
      key: '1',
      label: 'Bình luận phim',
      children: (
        <div className='md:text-center text-black transition-all duration-300'>
          <div className='mt-8'>
            <div className='grid md:grid-cols-2 md:gap-x-6 gap-4'>
              <article className='flex flex-col gap-y-4'>
                <aside className='  max-h-[100%] group transition-all duration-300 ease-in-out md:hover:text-blue-10'>
                  <a
                    className='h-full block decoration-black'
                    href={`https://www.galaxycine.vn/binh-luan-phim/${getReview?.[0]?.slug}`}
                  >
                    <img
                      alt={`${getReview?.[0]?.name}`}
                      loading='lazy'
                      width={445}
                      height={300}
                      decoding='async'
                      data-nimg={1}
                      className=' rounded-lg md:rounded md:w-full w-full h-[232px] md:h-[215px] lg:h-[300px] xl:h-full max-h-[400px] group-hover:md:scale-105 transition-all duration-300 object-fill  duration-500 ease-in-out group-hover:opacity-100
  scale-100 blur-0 grayscale-0)'
                      src={`${getReview?.[0]?.imageLandscape}`}
                      style={{ color: 'transparent' }}
                    />
                  </a>
                </aside>
                <aside className='descriptions text-left mt-4 md:mt-3'>
                  <a
                    className='text-xl font-bold md:hover:text-blue-10 transition-all duration-300 overflow-hidden'
                    href='https://www.galaxycine.vn/binh-luan-phim/review-nguoi-vo-cuoi-cung-man-ket-hop-an-tuong-giua-victor-vu---kaity-nguyen/'
                  >
                    {/* [Review] Người Vợ Cuối Cùng: Màn Kết Hợp Ấn Tượng Giữa Victor Vũ - Kaity Nguyễn! */}
                    {getReview?.[0]?.name}
                  </a>
                </aside>
              </article>
              <article className='flex flex-col gap-y-4'>
                {getReview &&
                  getReview.map(
                    (review, index) =>
                      index !== 0 && (
                        <aside
                          key={review.name}
                          className='flex gap-x-4 w-full max-h-[80px] md:max-h-[123px] group transition-all duration-300 ease-in-out md:hover:text-blue-10'
                        >
                          <a
                            className='w-[30%] md:w-[35%]'
                            href={`https://galaxycine.vn/binh-luan-phim/${review.slug}`}
                          >
                            <img
                              alt={`${review.name}`}
                              loading='lazy'
                              width={195}
                              height={150}
                              decoding='async'
                              data-nimg={1}
                              className='rounded-lg md:rounded md:w-[195px] md:h-full w-[120px] h-[75px] group-hover:md:scale-105 transition-all duration-300 object-cover object-cover duration-500 ease-in-out group-hover:opacity-100
scale-100 blur-0 grayscale-0)'
                              src={`${review.imageLandscape}`}
                              style={{ color: 'transparent' }}
                            />
                          </a>
                          <aside
                            className='descriptions title__movie text-left w-[70%] md:w-[65%]'
                            style={{ marginTop: 0, lineHeight: '120%' }}
                          >
                            <a
                              className='text-sm md:text-base xl:text-xl font-normal md:font-bold hover:text-blue-10 transition-all duration-300 overflow-hidden leading-normal'
                              href={`https://galaxycine.vn/binh-luan-phim/${review.slug}`}
                            >
                              {review.name}
                            </a>
                          </aside>
                        </aside>
                      )
                  )}
              </article>
            </div>
          </div>
        </div>
      )
    },
    {
      key: '2',
      label: 'Blog điện ảnh',
      children: (
        <div className='md:text-center text-black transition-all duration-300'>
          <div className='mt-8'>
            <div className='grid md:grid-cols-2 md:gap-x-6 gap-4'>
              <article className='flex flex-col gap-y-4'>
                <aside className='max-h-[100%] group transition-all duration-300 ease-in-out md:hover:text-blue-10'>
                  <a className='h-full block' href={`https://galaxycine.vn/movie-blog/${getFilmNews?.[0].slug}`}>
                    <img
                      alt={`${getFilmNews?.[0].name}`}
                      loading='lazy'
                      width={445}
                      height={300}
                      decoding='async'
                      data-nimg={1}
                      className='  rounded-lg md:rounded md:w-full w-full h-[232px] md:h-[215px] lg:h-[300px] xl:h-full max-h-[400px] group-hover:md:scale-105 transition-all duration-300 object-cover object-cover duration-500 ease-in-out group-hover:opacity-100
scale-100 blur-0 grayscale-0)'
                      src={`${getFilmNews?.[0].imageLandscape}`}
                      style={{ color: 'transparent' }}
                    />
                  </a>
                </aside>
                <aside className='descriptions text-left mt-4 md:mt-3'>
                  <a
                    className='text-xl font-bold md:hover:text-blue-10 transition-all duration-300 overflow-hidden'
                    href={`https://galaxycine.vn/movie-blog/${getFilmNews?.[0].slug}`}
                  >
                    {getFilmNews?.[0].name}
                  </a>
                </aside>
              </article>
              <article className='flex flex-col gap-y-4'>
                {getFilmNews &&
                  getFilmNews.map(
                    (news, index) =>
                      index !== 0 && (
                        <aside
                          key={news.name}
                          className='flex gap-x-4 w-full max-h-[80px] md:max-h-[123px] group transition-all duration-300 ease-in-out md:hover:text-blue-10'
                        >
                          <a className='w-[30%] md:w-[35%]' href={`https://galaxycine.vn/movie-blog/${news.slug}`}>
                            <img
                              alt={`${news.name}`}
                              loading='lazy'
                              width={195}
                              height={150}
                              decoding='async'
                              data-nimg={1}
                              className='rounded-lg md:rounded md:w-[195px] md:h-full w-[120px] h-[75px] group-hover:md:scale-105 transition-all duration-300 object-cover object-cover duration-500 ease-in-out group-hover:opacity-100
   scale-100 blur-0 grayscale-0)'
                              src={`${news.imageLandscape}`}
                              style={{ color: 'transparent' }}
                            />
                          </a>
                          <aside
                            className='descriptions title__movie text-left w-[70%] md:w-[65%]'
                            style={{ marginTop: 0, lineHeight: '120%' }}
                          >
                            <a
                              className='text-sm md:text-base xl:text-xl font-normal md:font-bold hover:text-blue-10 transition-all duration-300 overflow-hidden leading-normal'
                              href={`https://galaxycine.vn/movie-blog/${news.slug}`}
                            >
                              {news.name}
                            </a>
                          </aside>
                        </aside>
                      )
                  )}
              </article>
              
            </div>
          </div>
        </div>
      )
    }
  ]

  const renderTabBar = (props, DefaultTabBar) => (
    <div className=''>
      <div className='flex  items-center justify-start gap 4'>
        <div className='flex items-center text-xs md:text-xl font-bold md:px-4 border-l-4 border-l-blue-500 uppercase my-5'>
          Góc điện ảnh
        </div>
      </div>
      <DefaultTabBar {...props} />
    </div>
  )

  const OperationsSlot = {
    left: (
      <div className='md:block hidden'>
        <div className='flex  items-center justify-start gap 4'>
          <div className='flex md:mr-8 items-center md:text-xl font-bold px-2 border-l-4 border-l-blue-500 uppercase my-5'>
            Góc điện ảnh
          </div>
        </div>
      </div>
    )
  }

  return (
    // <div className='grid grid-cols-2 gap-4'>
    //   <div className='row-span-3'>
    //     <img
    //       src='https://cdn.galaxycine.vn/media/2023/11/4/nguoi-vo-cuoi-cung-man-ket-hop-an-tuong-giua-victor-vu---kaity-nguyen-2_1699073648043.jpg'
    //       alt=''
    //       className='h-10 w-10'
    //     />
    //     <span>[Review] Người Vợ Cuối Cùng: Màn Kết Hợp Ấn Tượng Giữa Victor Vũ - Kaity Nguyễn!</span>
    //   </div>

    //     <img
    //     className='h-11 w-11'
    //       src='https://cdn.galaxycine.vn/media/2023/11/4/nguoi-vo-cuoi-cung-man-ket-hop-an-tuong-giua-victor-vu---kaity-nguyen-2_1699073648043.jpg'
    //       alt=''
    //     />
    //     <img
    //     className='h-11 w-11'
    //       src='https://cdn.galaxycine.vn/media/2023/11/4/nguoi-vo-cuoi-cung-man-ket-hop-an-tuong-giua-victor-vu---kaity-nguyen-2_1699073648043.jpg'
    //       alt=''
    //     />
    //     <img
    //     className='h-11 w-11'
    //       src='https://cdn.galaxycine.vn/media/2023/11/4/nguoi-vo-cuoi-cung-man-ket-hop-an-tuong-giua-victor-vu---kaity-nguyen-2_1699073648043.jpg'
    //       alt=''
    //     />
    // </div>
    <div
      className='my-8'
      // 'my-0 mx-auto py-8 md:py-12 screen1390:max-w-screen-xl xl:max-w-screen-screen1200 lg:max-w-4xl md:max-w-4xl md:px-4 sm:px-[45px] px-[16px]'
    >
      <Tabs
        // renderTabBar={renderTabBar}
        popupClassName='font-bold'
        tabBarExtraContent={OperationsSlot}
        items={items}
        animated={true}
      />
    </div>
  )
}

export default Cinema

const CinemaButton = styled.button`
  ${(props) =>
    props.isFocused &&
    `{
    box-shadow: 1px 0px green;
  }`}
`
