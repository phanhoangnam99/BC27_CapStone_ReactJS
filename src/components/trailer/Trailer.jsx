import ReactPlayer from "react-player";
import React from "react";
import { Button, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";


const Trailer = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box position="absolute" top="5%" left="12%">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <ReactPlayer height="650px" width="1100px"
              url="https://www.youtube.com/watch?v=hjvRIpU6acQ"
              controls
              playing
            />
          </Typography>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Click me
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Trailer;
