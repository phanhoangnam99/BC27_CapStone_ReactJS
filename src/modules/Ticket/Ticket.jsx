import movieAPI from "apis/movieAPI";
import useRequest from "hooks/useRequest";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import "./ticket.scss";

const Ticket = () => {
  const [selectChair, setSelectChair] = useState([]);
  console.log(selectChair);

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

  const handleChair = (chair) => {
    const newSelect = selectChair.concat(chair);
    setSelectChair(newSelect);
  };
  console.log(ticket)
  let total = 0;
  return (
    <div className="all">
      <div className="movieTicket container">
        <Chairs>
          {ticket.danhSachGhe.map((chairs) => {
            return (
              <div onClick={() => handleChair(chairs)} className="grid-item">
                {chairs.tenGhe}
              </div>
            );
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
          <div>
            <span>Giờ Chiếu: {ticketInfo.gioChieu}</span>
          </div>
          <div>
            {selectChair.map((chair) => {
              return (
                <div>
                  <span>
                    Số ghế: {chair.tenGhe}
                    {"  "}
                  </span>
                  <span>Giá vé: {chair.giaVe}</span>
                  <span style={{display:"none"}}>
                    {total = total + chair.giaVe}
                  </span>
                </div>
              );
            })}
          </div>
          <span>Tổng tiền: {total}</span>
        </TicketInfo>
      </div>
    </div>
  );
};

export default Ticket;

const Chairs = styled.div`
  width: 70%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  padding: 20px;
  text-align: center;
  .grid-item {
    border: 1px solid orange;
  }
`;

const TicketInfo = styled.div`
  border: 1px solid #fff;
  text-align: center;
`;
