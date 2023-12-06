/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { FaChevronLeft, FaChevronRight, FaWindows } from 'react-icons/fa'
import React, { useRef, useState, useEffect, useMemo } from 'react'
import useRequest from 'hooks/useRequest'
import movieAPI from 'apis/movieAPI'
import Pagination from '../Pagination'
import 'animate.css'
import Trailer from 'components/Trailer'
import { Button } from 'antd'
import Film from '../Film/Film'

export default function MovieShowing() {
  // useNavigate là một hook dùng để điều hướng url
  const navigate = useNavigate()

  console.log('render')
  const [toggleBtn, setToggleBtn] = useState(true)
  const [hideBtn, setHideBtn] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [showMore, setShowMore] = useState(false)
  // const [style, setStyle] = useState(false);
  // const [open, setOpen] = useState(false)

  const { data: movies } = useRequest(() => movieAPI?.getMovies())

  // const moreFilmEl = document.getElementById('more-film')
  const toggleBtnEl = document.getElementById('toggle-btn')
  const hideBtnEl = document.getElementById('hide-btn')
  // toggleBtnEl?.addEventListener('click', () => {
  //   // moreFilmEl?.classList.toggle('hidden')
  //   // setToggleBtn((prev)=>!prev)
  //   // setHideBtn((prev)=>!prev)
  // })
  // hideBtnEl?.addEventListener('click', () => {
  //   // moreFilmEl?.classList.toggle('hidden')
  //   setShowMore(!showMore)

  // })

  const toggleShowMore = () => {
    // console.log(moreFilmEl)
    console.log(toggleBtnEl)
    console.log(hideBtnEl)
    if (toggleBtn) {
      setScrollY(window.scrollY)
    } else if (hideBtn) {
      window.scrollTo(0, scrollY)
    }
    setShowMore(!showMore)
    setToggleBtn((prev) => !prev)
    setHideBtn((prev) => !prev)

    // moreFilmEl &&

    //   toggleBtnEl?.addEventListener('click', () => {
    //     // moreFilmEl?.classList.toggle('hidden')
    //     toggleBtnEl?.classList.toggle('hidden')
    //     hideBtnEl?.classList.toggle('hidden')
    //   })

    // hideBtnEl?.addEventListener('click', () => {
    //   // moreFilmEl?.classList.toggle('hidden')
    //   toggleBtnEl?.classList.toggle('hidden')
    //   hideBtnEl?.classList.toggle('hidden')
    // })
  }

  return (
    // <MovieContainer draggable='false'>
    //   <MoviesSlider
    //     ref={movieRef}
    //     draggable='true'
    //     onDragStart={onDragStart}
    //     onDragEnd={onDragEnd}
    //     onDragEnter={onDragEnter}
    //   >
    //     {movies?.map((movie) => {
    //       return (
    //         <div
    //           ref={movieRef}
    //           key={movie.maPhim}
    //           className='movieItem'
    //           onClick={() => goToMovie(movie.maPhim)}
    //           draggable='false'
    //           style={{ cursor: 'pointer' }}
    //           aria-hidden='true'
    //         >
    //           <img
    //             src={movie.hinhAnh}
    //             alt={movie.tenPhim}
    //             draggable='false'
    //             // onMouseEnter={(e) => {
    //             //   setStyle(true);
    //             // }}
    //             // onMouseLeave={(e) => {
    //             //   setStyle(setStyle(false));
    //           />

    //           <div className='movieName'>{movie.tenPhim}</div>
    //           <button className='chitiet' onClick={() => goToMovie(movie.maPhim)}>
    //             Chi tiết
    //           </button>
    //         </div>
    //       )
    //     })}
    //   </MoviesSlider>
    //   <div className='btnLeft' onClick={() => scroll(-650)} aria-hidden='true'>
    //     <FaChevronLeft />
    //   </div>
    //   <div className=' btnRight' onClick={() => scroll(650)} aria-hidden='true'>
    //     <FaChevronRight />
    //   </div>
    //   {/* <Modal
    //     open={open}
    //     onClose={() => setOpen(false)}
    //     aria-labelledby="modal-modal-title"
    //     aria-describedby="modal-modal-description"
    //   >
    //     <Box position="absolute" top="5%" left="12%">
    //       <Typography id="modal-modal-title" variant="h6" component="h2">
    //         <ReactPlayer
    //           height="650px"
    //           width="1100px"
    //           url={movies.trailer}
    //           controls
    //           playing
    //         />
    //       </Typography>
    //       <Button variant="contained" onClick={() => setOpen(false)}>
    //         Click me
    //       </Button>
    //     </Box>
    //   </Modal> */}
    // </MovieContainer>
    <div className='container pt-0'>
      <div className=''>
        <div className='flex  items-center justify-start gap 4'>
          <div className='flex mr-8 items-center md:text-xl font-bold px-4 border-l-4 border-l-blue-500 uppercase my-6'>
           Phim
          </div>
        </div>
      </div>
      <div className='grid   grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4  gap-7'>
        {movies &&
          movies?.map((movie, index) => {
            if (!showMore) {
              if (index <= 7) {
                return <Film movie={movie} key={index} />
              }
            } else {
              return <Film movie={movie} key={index} />
            }
          })}
      </div>
      <div>
        <button
          id='toggle-btn'
          onClick={() => toggleShowMore()}
          className={`${
            toggleBtn || 'hidden'
          } mt-4 text-blue-500 focus:outline-none`}
        >
          Read More
        </button>
        <button
          id='hide-btn'
          onClick={() => toggleShowMore()}
          className={`${
            hideBtn || 'hidden'
          } mt-4 text-blue-500 focus:outline-none`}
        >
          Hide
        </button>
      </div>

      {/* <Pagination /> */}
    </div>
  )
}
const MovieContainer = styled.div`
  background-color: #000000;
  color: #ffff;
  padding: 20px 20px 0;
  position: relative;
  width: 100%;
  height: 100%;
  .chitiet {
    background-color: #ffff;
    position: relative;
    top: -300px;
    right: -40%;
    display: none;
  }
  .btnLeft {
    position: absolute;
    top: 50%;
    left: 30px;
    z-index: 20;
    transform-origin: center;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100px;
    width: 50px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    transform: translateY(-20%);
    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
    &:hover svg {
      opacity: 1;
      transform: scale(1.2);
    }

    svg {
      opacity: 0.7;
      font-size: 50px;
      transition: all 0.3 linear;
    }
  }

  .btnRight {
    position: absolute;
    top: 50%;
    right: 30px;
    z-index: 20;
    transform-origin: center;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100px;
    width: 50px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    transform: translateY(-20%);
    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
    &:hover svg {
      opacity: 1;
      transform: scale(1.2);
    }

    svg {
      opacity: 0.7;
      font-size: 50px;
      transition: all 0.3 linear;
    }
  }
`
const MoviesSlider = styled.div`
  display: grid;
  gap: 6px;
  grid-template-columns: repeat(14, 300px);
  transition: all 0.3 linear;
  user-select: none;
  overflow-y: hidden;
  overflow-x: auto;
  overflow: hidden;
  padding-top: 28px;
  padding-bottom: 28px;
  // khi cuon se muot hon
  scroll-behavior: smooth;
  &:hover .movieItem {
    opacity: 0.5;
  }

  .movieItem {
    transform: scale(1);
    max-width: 400px;
    max-height: 500px;
    width: 100%;
    height: 100%;
    transition: all 0.3s linear;
    user-select: none;
    overflow: hidden;
    border-radius: 6px;
    transform: center left;
    position: relative;
    &:hover {
      opacity: 1;
      transform: scale(1.1);
      z-index: 10;
      /* .chitiet{
        display: block;
        transition: all 0.3s linear;
      } */
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      background-size: cover;
    }

    .movieName {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 4px;
      text-align: center;
      font-size: 14px;
      background-color: rgba(0, 0, 0, 0.65);
    }
  }
`

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
// `
