import movieAPI from "apis/movieAPI";
import useRequest from "hooks/useRequest";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import "./ticket.scss";

const Ticket = () => {
  const [displayMap, setDisplayMap] = useState(true);

  const param = useParams();
  const { ticketId } = param;

  const {
    data: ticket,
    isLoading,
    error,
  } = useRequest(() => movieAPI?.getTicket(ticketId));
  //   const chairs = ticket.thongTinPhim
  if (!ticket) {
    return null;
  }

  const ticketInfo = ticket.thongTinPhim;

  return (
    <div className="movieTicket container">
      <Chairs>
        {ticket.danhSachGhe.map((chairs) => {
          return <div className="grid-item">{chairs.tenGhe}</div>;
        })}
      </Chairs>
      <TicketInfo>
        <div>
          <h1>{ticketInfo.tenPhim}</h1>
        </div>
        <div>
          <span>Địa chỉ: {ticketInfo.diaChi}</span>
        </div>
        <div>
          <span>Tên cụm rạp: {ticketInfo.tenCumRap}</span>
        </div>
        <div>
          <span>
            Rạp:
            {ticketInfo.tenRap}
          </span>
        </div>
        <div>
          <span>
            Ngày chiếu: 
            {ticketInfo.ngayChieu}
          </span>
        </div>
        <div><span>Giờ Chiếu: {ticketInfo.gioChieu}</span></div>
      </TicketInfo>
    </div>
  );
};

export default Ticket;

const Chairs = styled.div`
  width: 70%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  padding: 20px;
  text-align: center;
  .grid-item {
    border: 1px solid rgba(0, 0, 0, 0.8);
  }
`;

const TicketInfo = styled.div`
  border: 1px solid black;
`;
