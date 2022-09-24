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
    navigate(`/ticket/${ticketId}`);
  };
  if (!filter) {
    return null;
  }
  return (
    <div className="showTime container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Hệ thống rạp chiếu</th>
            <th scope="col">Địa điểm</th>
            <th scope="col">Khung giờ chiếu</th>
          </tr>
        </thead>
      </table>
      <tbody>
        {rap.map((cinema) => {
          return (
            <tr key={cinema.maCumRap}>
              <td
                onClick={() => cinemaDetail(cinema.maHeThongRap)}
                className="logo"
                style={{ display: "flex" }}
              >
                <div>
                  <img src={cinema.logo} alt={cinema.maCumRap} />
                </div>

                <div className="nameRap">
                  <p>{cinema.tenHeThongRap}</p>
                </div>
              </td>

              {displayFilter && (
                <td>
                  <div>
                    {filter.map((cumRap) => {
                      return (
                        <div className="rapInfo">
                          {cumRap.cumRapChieu.map((thongTinRap) => {
                            return (
                              <>
                                <div
                                  onClick={() => setTime(true)}
                                  className="rapInfo-Name"
                                >
                                  <img src={thongTinRap.hinhAnh} alt="" />
                                  <span>{thongTinRap.tenCumRap}</span>
                                  <span>{thongTinRap.diaChi}</span>

                                  <div className="time">
                                    {time &&
                                      thongTinRap.lichChieuPhim.map(
                                        (dayTime) => {
                                          return (
                                            <div
                                              onClick={() =>
                                                movieTicket(dayTime.maLichChieu)
                                              }
                                            >
                                              {dayTime.ngayChieuGioChieu}
                                            </div>
                                          );
                                        }
                                      )}
                                  </div>
                                </div>
                              </>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </div>
  );
};

export default Showtimes;
