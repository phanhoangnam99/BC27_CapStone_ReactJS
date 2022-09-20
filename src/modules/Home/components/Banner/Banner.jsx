// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getBanners } from "../../slices/bannerSlice";

import useRequest from "hooks/useRequest";
import movieAPI from "apis/movieAPI";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { useState } from "react";
import { Slide } from "react-slideshow-image";
import { FaPlay } from "react-icons/fa";

import "react-slideshow-image/dist/styles.css";
import Featured from "components/featured/Featured";
import { Modal, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";

const TRAILERS = [
  "https://www.youtube.com/watch?v=L7ZBrFWVseU",
  "https://www.youtube.com/watch?v=QRYkdcj5iTs",
  "https://www.youtube.com/watch?v=TOFxa0w_gAo",
];

const Banner = () => {
  // const dispatch = useDispatch();
  // const { banners, isLoading, error } = useSelector((state) => state.banner);
  // useEffect(() => {
  //   dispatch(getBanners());
  // }, []);

  const [open, setOpen] = useState(false);
  const [play, setPlay] = useState(false);
  const handleMouseEnter = () => {
    setPlay(true);
  };
  const handleMouseLeave = () => {
    setPlay(false);
  };

  const {
    data: banners,
    isLoading,
    error,
  } = useRequest(() => movieAPI.getBanners());
  console.log(banners);
  const bannersMapped = banners?.map((banner, index) => {
    return { ...banner, trailer: TRAILERS[index] };
  });

  // console.log(bannersMapped);
  if (!banners) {
    return null;
  }
  return (
    <div className="alo">
      <Slide>
        {banners.map((banner, index) => {
          console.log(index);

          return (
            <>
              <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box position="absolute" top="5%" left="12%">
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    <ReactPlayer
                      height="650px"
                      width="1100px"
                      url={TRAILERS[index]}
                      controls
                      playing
                    />
                  </Typography>
                  <Button variant="contained" onClick={() => setOpen(false)}>
                    Click me
                  </Button>
                </Box>
              </Modal>
              <img
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                key={banner.maBanner}
                src={banner.hinhAnh}
                alt={`banner-${banner.maBanner}`}
                width="100%"
                height="600px"
              />
              <button onClick={()=>setOpen(true)} className="btn btn-success">Play</button>
            </>
          );
        })}
      </Slide>
    </div>
  );
};

export default Banner;

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
