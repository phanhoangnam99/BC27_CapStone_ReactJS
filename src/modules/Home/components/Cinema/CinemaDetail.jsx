import axiosClient from "apis/axiosClient";
import movieAPI from "apis/movieAPI";
import useRequest from "hooks/useRequest";
import React, { useEffect, useState } from "react";
import "./cinemaDetail.scss";

const CinemaDetail = ({ cinema }) => {
  const [data, setdata] = useState(null);
  const [selectCine, setSelectCine] = useState();
  console.log(selectCine);

  // useEffect(() => {
  //   window.location.reload();
  // }, [cinema]);

  useEffect(() => {
    getCine(cinema);
  }, [cinema]);
  // const {
  //   data: cinemaInfo,
  //   isLoading,
  //   error,
  // } = useRequest(() => movieAPI.getCinemaDetails(cinemaId));
  // console.log(cinemaInfo);
  const getCine = async () => {
    try {
      const content = await axiosClient.get(
        "QuanLyRap/LayThongTinLichChieuHeThongRap",
        {
          params: {
            maHeThongRap: cinema,
          },
        }
      );
      setdata(content);
    } catch (error) {
      console.log(error);
    }
  };

  const filterMovie = (cine) => {
    const listMovie = data.map((cinema) => {
      return cinema.lstCumRap.map((cinemaId) => {
        return cinemaId;
      });
    });
    const updateList = listMovie.filter((x) => x.maCumRap === cine);
    console.log(updateList);
  };

  console.log(data);

  if (!data) {
    return null;
  }
  // const cine = cinemaInfo.tenCumRap
  // console.log(cine)
  return (
    <div className="cinemaDetail">
      <table className="table">
        {data.map((cine) => {
          return (
            <tbody>
              <tr key={cine.maHeThongRap}>
                <td>
                  <h1>{cine.tenHeThongRap}</h1>
                </td>
                ;
              </tr>
              {cine.lstCumRap.map((list) => {
                return (
                  <>
                    <tr>
                      <td>
                        <img
                          src={list.hinhAnh}
                          alt=""
                          style={{ width: "150px", height: "150px" }}
                        />
                      </td>
                      <td>
                        <h3>{list.tenCumRap}</h3>
                        <p>{list.diaChi}</p>
                        <button
                          className="btn btn-warning"
                          onClick={() => filterMovie(list.maCumRap)}
                        >
                          Chi tiết
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default CinemaDetail;
