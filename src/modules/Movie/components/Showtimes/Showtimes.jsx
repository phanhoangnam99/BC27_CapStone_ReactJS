import movieAPI from "apis/movieAPI";
import useRequest from "hooks/useRequest";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./showtime.scss";

const Showtimes = ({ movieId }) => {
  const {
    data: lichChieus,
    isLoading,
    error,
  } = useRequest(() => movieAPI.getLichChieu(movieId));
  const [filter, setFilter] = useState([null]);
  const [displayFilter, setDisplayFilter] = useState(false);
  const [time, setTime] = useState(false);
  const navigate = useNavigate();

  console.log(filter);

  if (!lichChieus) {
    return null;
  }
  console.log(lichChieus);
  const rap = lichChieus.heThongRapChieu;
  console.log(rap);

  const cinemaDetail = (maHeThong) => {
    const updatedList = rap.filter((x) => x.maHeThongRap === maHeThong);
    setFilter(updatedList);

    setDisplayFilter(true);
  };

  const movieTicket = (ticketId) => {
    navigate(`/ticket/${ticketId}`)
  };
  if (!filter) {
    return null;
  }
  return (
    <div className="showTime">
      {rap.map((cinema) => {
        return (
          <div className="container">
            <div className="logo">
              <img
                src={cinema.logo}
                alt={cinema.maCumRap}
                onClick={() => cinemaDetail(cinema.maHeThongRap)}
              />
            </div>
            <div className="nameRap">
              <p>{cinema.tenHeThongRap}</p>
            </div>

            {displayFilter && (
              <div>
                {filter.map((cumRap) => {
                  return (
                    <div className="rapInfo">
                      {cumRap.cumRapChieu.map((thongTinRap) => {
                        return (
                          <>
                            <div className="rapInfo-Name">
                              <div></div>
                              <img src={thongTinRap.hinhAnh} alt="" />
                              <span onClick={() => setTime(true)}>
                                {thongTinRap.tenCumRap}
                              </span>
                              <span>{thongTinRap.diaChi}</span>
                              {time &&
                                thongTinRap.lichChieuPhim.map((dayTime) => {
                                  return (
                                    <div
                                      onClick={() =>
                                        movieTicket(dayTime.maLichChieu)
                                      }
                                    >
                                      {dayTime.ngayChieuGioChieu}
                                    </div>
                                  );
                                })}
                            </div>
                          </>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Showtimes;
