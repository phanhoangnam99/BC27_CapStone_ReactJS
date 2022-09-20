import { useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import useRequest from "hooks/useRequest";
import movieAPI from "apis/movieAPI";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { Box } from "@mui/system";
import { Button, Modal, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import "./overview.scss";

import Featured from "components/featured/Featured";

const Overview = ({ movieId }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate()

  const {
    data: movie,
    isLoading,
    error,
  } = useRequest(() => movieAPI?.getMovieDetails(movieId));

  if (!movie) {
    return null;
  }

  return (
    <MoviesDetail>
      <div
        className="overview"
        style={{
          backgroundImage: `url(${movie.hinhAnh})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "800px",
        }}
      >
        <div className="overmain">
          <div className="movieInfo">
            <h1 className="movieTitle">{movie.tenPhim}</h1>
            <span className="rating">Rating: {movie.danhGia}/10</span>
            <p className="releaseDate">
              Ngày khởi chiếu:{" " + movie.ngayKhoiChieu}
            </p>
            <div className="review">Giới thiệu: {movie.moTa}</div>
          </div>
        </div>
      </div>

      <ButtonDesign onClick={() => setOpen(true)}>
        <button className="btn btn-outline-light btn-lg">
          <AiFillPlayCircle />
          {"  "} Trailer
        </button>
      </ButtonDesign>
      <ButtonDesign onClick={() => setOpen(true)}>
        <button className="btn btn-outline-light btn-lg">
          <AiFillPlayCircle />
          {"  "} Trailer
        </button>
      </ButtonDesign>
      <Modal
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
              url={movie.trailer}
              controls
              playing
            />
          </Typography>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Click me
          </Button>
        </Box>
      </Modal>
    </MoviesDetail>
  );
};

export default Overview;

const MoviesDetail = styled.div`
  .overview {
    .overmain {
      position: relative;
      width: 70%;
      height: 100%;
      background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.9) 60%,
        transparent
      );

      @media screen and (max-width: 1184px) {
        background: linear-gradient(
          to right,
          rgba(0, 0, 0, 0.94) 40%,
          rgba(0, 0, 0, 0.733),
          transparent
        );
        width: 88%;
      }
      @media screen and (max-width: 980px) {
        background: linear-gradient(
          to right,
          rgba(0, 0, 0, 0.95) 50%,
          transparent
        );
        width: 100%;
      }
      @media screen and (max-width: 800px) {
        background: linear-gradient(
          900deg,
          rgba(0, 0, 0, 0.88) 60%,
          transparent
        );
        width: 100%;
      }

      .movieInfo {
        width: 65%;
        height: 100%;
        padding-left: 24px;
        color: #fff;
        font-size: 20px;
        padding-top: 110px;
        @media screen and (max-width: 600px) {
          font-size: 16px;
          width: 80%;
        }
        .movieTitle {
          margin-top: 30px;
          color: #fff;
        }
        .rating {
          margin-top: 20px;
          display: flex;

          color: rgb(38, 183, 38);
        }
        .releaseDate {
          margin-top: 12px;
        }
        .review {
          margin-top: 20px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.4;
          font-size: 18px;
          @media screen and (max-width: 600px) {
            font-size: 14px;
          }
        }
      }
    }
  }
`;

const ButtonDesign = styled.div`
  position: absolute;
  top: 500px;
  left: 100px;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: 500;
  button {
    padding: 10px 60px;
    font-size: 25px;
  }
`;

//     <section className="movieInfo">
//       <div className="full__background">
//         <img
//           src={phimItem.hinhAnh}
//           alt={phimItem.hinhAnh}
//           style={{ height: "450px" }}
//         />
//         <div className="overlay__gradient" />
//         <div className="play__mobile">
//           <i className="fa fa-play" />
//         </div>
//         <div className="rating__point">
//           <p className="film__point">{countRatingMark(phimItem.danhGia)}</p>
//           <div className="rating__stars">{renderStar(phimItem.danhGia)}</div>
//         </div>
//       </div>
//       <div className="form__info container">
//         <div className="row">
//           <div className="movie__poster text-left col-3">
//             <div
//               style={{ width: 220, height: 300 }}
//               className="poster__img d-flex justify-content-center align-items-center"
//             >
//               <img
//                 className="w-100 h-100"
//                 src={phimItem.hinhAnh}
//                 alt={phimItem.hinhAnh}
//               />
//               <div className="play__btn" onClick={handleToggle}>
//                 <i className="fa fa-play" />
//               </div>
//             </div>
//           </div>
//           <div className="movie__info col-6">
//             <div>
//               <div className="showtime">
//                 {moment(phimItem.ngayKhoiChieu).format("DD-MM-yy")}
//               </div>
//               <div className="mb-3 d-flex justify-content-start align-items-center">
//                 <span className="age--C">{phimItem.maNhom}</span>
//                 <span className="name">{phimItem.tenPhim}</span>
//               </div>

//               <p className="during">120 phút</p>
//               <a href={"#movieTheater"}>
//                 <button className="bookTicket-btn">Mua Vé</button>
//               </a>
//             </div>
//           </div>
//           <div className="movie__rating d-flex justify-content-end col-3">
//             <div>
//               <div className="rating__point">
//                 {countRatingMark(phimItem.danhGia)}
//                 <div className="vongtronxanh"></div>
//               </div>
//               <div className="rating__stars">
//                 {renderStar(phimItem.danhGia)}
//               </div>
//               <div className="rating__text">
//                 {phimItem.danhGia} người đánh giá
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="film__infoMobile">
//         <div className="days">
//           {moment(phimItem.ngayKhoiChieu).format("DD-MM-yy")}
//         </div>
//         <div className="name">{phimItem.tenPhim}</div>
//         <div className="during">120 phút</div>
//       </div>
//       <ModalTrailer
//         trailer={phimItem.trailer}
//         maPhim={phimItem.maPhim}
//         open={open}
//         handleToggle={handleToggle}
//       />
//     </section>
//   );
// }
