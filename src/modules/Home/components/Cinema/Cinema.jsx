import movieAPI from "apis/movieAPI";
import useRequest from "hooks/useRequest";
import CinemaDetail from "./CinemaDetail";
import { useState } from "react";
import "./cinema.css";
import styled from "styled-components";

const Cinema = () => {
  const [cinemaDetails, setCinemaDetails] = useState([]);
  const {
    data: cinemas,
    isLoading,
    error,
  } = useRequest(() => movieAPI.getCinema());

  const cinemaDetail = (cinemaId) => {
    setCinemaDetails(cinemaId);
  };

  return (
    <div>
      <CinemaStyle>
        <div className="cinema-real">
          {cinemas?.map((cinema) => {
            return (
              <div key={cinema.maHeThongRap}>
                <div className="container">
                  <div
                    className="cinemalogo"
                    onClick={() => cinemaDetail(cinema.maHeThongRap)}
                  >
                    <img src={cinema.logo} alt="" srcset="" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CinemaStyle>

      <CinemaDetail cinemaId={cinemaDetails} />
    </div>
  );
};

export default Cinema;
const CinemaStyle = styled.div`
  background-image: url("https://img.freepik.com/free-vector/open-clapper-board-with-film-strip-background-design_1017-26102.jpg?w=2000");
  background-size: cover;
  
  .cinema-real {
    padding-top: 130px;
    padding-bottom: 130px;
    background-color: rgba(0, 0, 0, 0.6);
   .cinemalogo{
    margin-bottom: 20px;
    img{
      cursor: pointer;
      width: 100px;
      height: 100px;
    }
   }
  }
`;
