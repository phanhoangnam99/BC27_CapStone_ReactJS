import movieAPI from "apis/movieAPI";
import useRequest from "hooks/useRequest";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import "./ticket.scss";
import Seat from "./Seat"


import { handleList, handleBooking } from './slices/seatSlice'
import { Button, Screen, Square } from "./style";
import { useForm } from "react-hook-form";
import { notification } from "antd";

const Ticket = () => {
  const { user } = useSelector((state) => state.auth)

  const [ticketInfo, setInfo] = useState(null)
  const param = useParams();
  const { ticketId } = param;
  const { list, submitList } = useSelector((state) => state.seat)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    data: ticket,
    isLoading,
    error,
  } = useRequest(() => movieAPI.getTicket(ticketId));

  useEffect(() => {
    setInfo(ticket?.thongTinPhim)
    setValue("maLichChieu", ticket?.thongTinPhim.maLichChieu)
  }, [ticket])

  useEffect(() => {
    setValue("danhSachVe", submitList)

  }, [submitList])

  const { register, handleSubmit, setValue, } = useForm({
    defaultValues: {
      maLichChieu: '',
      danhSachVe: '',
    }
  })


  const { data: handleBookTicket } = useRequest(
    (values) => movieAPI.bookTicket(values),
    { isManual: true }
  );

  const onSubmit = async (values) => {
    try {
      dispatch(handleBooking(ticket))

      await handleBookTicket(values)

      navigate('/ticket/success')

    } catch (error) {
      console.log(error)
    }
  }





  if (!user) {
    notification.error({
      message: 'Bạn chưa đăng nhập'
    })

      return <Navigate to='/login' />


  }
  else if (user) {


    let total = 0;
    if (list.length !== 0) {
      return (
        <div className="all">
          <div className="movieTicket container">

            <div className="mt-4 w-50 row d-flex flex-nowrap align-items-center">
              <div className='' >

                <div className='row' >
                  <h1 className='d-flex justify-content-center text-white'>Màn hình</h1>
                  <Screen className="mb-3" />
                  {ticket?.danhSachGhe.map((position, index) => {
                    return (
                      <div key={position.tenGhe} className='col-sm-1 my-3'>
                        <Seat data={position}></Seat>
                      </div>

                    )
                  })}

                </div>
              </div>
            </div>

            <div className='w-50 ms-5' >
              <div className='d-flex align-items-center mb-2'>
                <Square variant='booked' />
                <h5 className='ms-4 text-white'> Ghế đã đặt</h5>
              </div>
              <div className='d-flex align-items-center mb-2'>
                <Square variant='selected' />
                <h5 className='ms-4 text-white'> Ghế đang chọn</h5>

              </div>
              <div className='d-flex align-items-center mb-2'>
                <Square variant='vip' />
                <h5 className='ms-4 text-white'> Ghế VIP</h5>

              </div>
              <div className='d-flex align-items-center mb-2'>

                <Square variant='available' />
                <h5 className='ms-4 text-white'> Ghế chưa đặt  </h5>

              </div>
              <TicketInfo style={{ height: '100vh', overflowY: "scroll" }}>

                <div>
                  <h1>{ticketInfo?.tenPhim}</h1>
                </div>
                <div>
                  <span>Địa chỉ: {ticketInfo?.diaChi}</span>
                </div>
                <div>
                  <span>Tên cụm rạp: {ticketInfo?.tenCumRap}</span>
                </div>
                <div>
                  <span>
                    Rạp:
                    {ticketInfo?.tenRap}
                  </span>
                </div>
                <div>
                  <span>
                    Ngày chiếu:
                    {ticketInfo?.ngayChieu}
                  </span>
                </div>
                <div>
                  <span>Giờ Chiếu: {ticketInfo?.gioChieu}</span>
                </div>
                <div>
                  {list.map((seat) => {
                    return (
                      <div key={seat.tenGhe}>
                        <span>
                          Số ghế: {seat.tenGhe}
                          {"  "}
                        </span>
                        <span>Giá vé: {Math.round(seat.giaVe)}</span>
                        <span style={{ display: "none" }}>
                          {total = total + seat.giaVe}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <p>Tổng tiền: {Math.round(total)}</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Button variant='book-btn'> Xác nhận đặt vé</Button>
                </form>


              </TicketInfo>
            </div>
          </div >
        </div >
      );
    }
    else {
      return (
        <div className="all">
          <div className="movieTicket container">

            <div className="mt-4 w-50 row d-flex flex-nowrap align-items-center">
              <div className='' >

                <div className='row' >
                  <h1 className='d-flex justify-content-center text-white'>Màn hình</h1>
                  <Screen className="mb-3" />
                  {ticket?.danhSachGhe.map((position, index) => {
                    return (
                      <div key={position.tenGhe} className='col-sm-1 my-3'>
                        <Seat data={position}></Seat>
                      </div>

                    )
                  })}

                </div>
              </div>
            </div>

            <div className='w-50 ms-5' >
              <div className='d-flex align-items-center mb-2'>
                <Square variant='booked' />
                <h5 className='ms-4 text-white'> Ghế đã đặt</h5>
              </div>
              <div className='d-flex align-items-center mb-2'>
                <Square variant='selected' />
                <h5 className='ms-4 text-white'> Ghế đang chọn</h5>

              </div>
              <div className='d-flex align-items-center mb-2'>
                <Square variant='vip' />
                <h5 className='ms-4 text-white'> Ghế VIP</h5>

              </div>
              <div className='d-flex align-items-center mb-2'>

                <Square variant='available' />
                <h5 className='ms-4 text-white'> Ghế chưa đặt  </h5>

              </div>
              <TicketInfo style={{ height: '100vh', overflowY: "scroll" }}>

                <div>
                  <h1>{ticketInfo?.tenPhim}</h1>
                </div>
                <div>
                  <span>Địa chỉ: {ticketInfo?.diaChi}</span>
                </div>
                <div>
                  <span>Tên cụm rạp: {ticketInfo?.tenCumRap}</span>
                </div>
                <div>
                  <span>
                    Rạp:
                    {ticketInfo?.tenRap}
                  </span>
                </div>
                <div>
                  <span>
                    Ngày chiếu:
                    {ticketInfo?.ngayChieu}
                  </span>
                </div>
                <div>
                  <span>Giờ Chiếu: {ticketInfo?.gioChieu}</span>
                </div>
                <div>
                  {list.map((seat) => {
                    console.log(seat)
                    console.log(list)
                    return (
                      <div key={seat.tenGhe}>
                        <span>
                          Số ghế: {seat.tenGhe}
                          {"  "}
                        </span>
                        <span>Giá vé: {seat.giaVe}</span>
                        <span style={{ display: "none" }}>
                          {total = total + seat.giaVe}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <p>Tổng tiền: {total}</p>

              </TicketInfo>
            </div>
          </div >
        </div >
      );
    }
  }
}

export default Ticket;



const TicketInfo = styled.div`
  border: 1px solid #fff;
  text-align: center;
`;
