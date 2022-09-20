import axiosClient from "apis/axiosClient";
import movieAPI from "apis/movieAPI";
import useRequest from "hooks/useRequest";
import { useEffect, useState } from "react";

const CinemaDetail = ({ cinemaId }) => {
  const [data, setData] = useState(null);

const [change,setChange] = useState(false)
  console.log(data);

  useEffect(() => {
    setData(null);
    setChange(!change);
    getCine()
  },[cinemaId] );

  const getCine = async () => {
    try {
      const content = await axiosClient.get(
        "QuanLyRap/LayThongTinCumRapTheoHeThong",
        {
          params: {
            maHeThongRap: cinemaId,
          },
        }
      );
      setData(content);
      console.log(content);
    } catch (error) {
      console.log(error);
    }
  };

  // const {
  //   data: cinemaDetail,
  //   isLoading,
  //   error,
  // } = useRequest(() => movieAPI.getCinemaDetails(cinemaId), { isManual: true,deps:[change] });

  // if (!cinemaId) {
  //   return null;
  // }

  return <>alo</>;
};

export default CinemaDetail;
