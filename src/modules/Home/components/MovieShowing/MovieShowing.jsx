import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef, useState } from "react";
import useRequest from "hooks/useRequest";
import movieAPI from "apis/movieAPI";
import { useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { Modal, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import ReactPlayer from "react-player";

const MovieShowing = () => {
  // useNavigate là một hook dùng để điều hướng url
  const navigate = useNavigate();
  const movieRef = useRef();
  const [dragDown, setDragDown] = useState(0);
  const [dragMove, setDragMove] = useState(0);
  const [isDrag, setIsDrag] = useState(false);
  // const [style, setStyle] = useState(false);
  // const [open, setOpen] = useState(false)
  const scroll = (scroolOffset) => {
    // const maxScrollLeft = sliderRef.current.scrollWidth - sliderRef.current.clientWidth
    // console.log(maxScrollLeft)
    // // console.log(sliderRef.current.scrollWidth);
    // // console.log(sliderRef.current.clientWidth);
    // if (sliderRef.current.scrollLeft < maxScrollLeft){
    //   SmoothHorizontalScrolling(sliderRef.current, 250,movieRef.current.clientWidth,sliderRef.current.scrollLeft)
    //   console.log('alo')
    // }
    movieRef.current.scrollLeft += scroolOffset;
    console.log(scroolOffset);
  };
  const {
    data: movies,
    isLoading,
    error,
  } = useRequest(() => movieAPI?.getMovies());
  useEffect(() => {
    if (isDrag) {
      if (dragMove < dragDown) scroll(550);
      if (dragMove > dragDown) scroll(-550);
    }
  }, [dragDown, dragMove, isDrag]);

  const goToMovie = (movieId) => {
    navigate(`/movie/${movieId}`);
  };
  const onDragStart = (e) => {
    setIsDrag(true);
    setDragDown(e.screenX);
  };
  const onDragEnd = (e) => {
    setIsDrag(false);
  };
  const onDragEnter = (e) => {
    setDragMove(e.screenX);
  };

  return (
    <MovieContainer draggable="false">
      <MoviesSlider
        ref={movieRef}
        draggable="true"
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragEnter={onDragEnter}
      >
        {movies?.map((movie) => {
          return (
            <div
              key={movie.maPhim}
              className="movieItem"
              onClick={() => goToMovie(movie.maPhim)}
              draggable="false"
            >
              <img
                src={movie.hinhAnh}
                alt={movie.tenPhim}
                draggable="false"
                // onMouseEnter={(e) => {
                //   setStyle(true);
                // }}
                // onMouseLeave={(e) => {
                //   setStyle(setStyle(false));
                
              />
              {/* {style && (
                <ButtonDesign onClick={()=>setOpen(true)}>
                  <button className="btn btn-outline-light">
                    <FaPlay />
                  </button>
                </ButtonDesign>
              )} */}
              <div className="movieName">{movie.tenPhim}</div>
              <button onClick={() => goToMovie(movie.maPhim)}>Chi tiết</button>
            </div>
          );
        })}
      </MoviesSlider>
      <div className="btnLeft" onClick={() => scroll(-650)}>
        <FaChevronLeft />
      </div>
      <div className=" btnRight" onClick={() => scroll(650)}>
        <FaChevronRight />
      </div>
      {/* <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box position="absolute" top="5%" left="12%">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <ReactPlayer
              height="650px"
              width="1100px"
              url={movies.trailer}
              controls
              playing
            />
          </Typography>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Click me
          </Button>
        </Box>
      </Modal> */}
    </MovieContainer>
  );
};
const MovieContainer = styled.div`
  background-color: #000000;
  color: #ffff;
  padding: 20px 20px 0;
  position: relative;
  width: 100%;
  height: 100%;
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
`;
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
`;

const ButtonDesign = styled.div`
  position: absolute;
  top: 45%;
  left: 45%;

  button {
    border-radius: 50%;
    padding: 15px 20px;
    border: 5px solid;
    font-size: x-large;
  }
`;
export default MovieShowing;
