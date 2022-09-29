import React from 'react'
import { Square } from './style'
import { Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faRegular } from "@fortawesome/free-solid-svg-icons"


import { handleBookAnother, clear } from './slices/seatSlice'
const Success = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const getRandomInit = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
  }
  const { list, total, listSuccess } = useSelector((state) => state.seat)

  const sortListSuccess = [...listSuccess.danhSachVe].sort((a, b) => a.tenGhe > b.tenGhe ? 1 : -1)

  const getListSuccess = sortListSuccess.map((seat) => {
    return (
      <div className='ms-5' >
        Ghế số: {seat.tenGhe} - Giá vé: {Math.round(seat.giaVe)}
      </div >

    )
  })

  const bookAnother = () => {
    dispatch(handleBookAnother())
    navigate(`/ticket/${listSuccess.thongTinPhim.maLichChieu}`)
  }



  return (
    <div className='container'>
      <div className='d-flex justify-content-center  ' style={{ marginTop: '100px' }} >
        <FontAwesomeIcon icon={faCircleCheck} style={{ width: '70px', height: '70px', color: 'green' }} />
      </div>

      <h3 className="w-100 text-center mt-5">Chúc mừng bạn đã đặt mua vé thành công. Vui lòng kiểm tra lại thông tin đặt vé dưới đây</h3>
      <div className='d-flex justify-content-start flex-column mt-5 ' >
        <h3>Mã đặt vé: {getRandomInit(111111, 999999)}</h3>
        <h3>Tên: {listSuccess.thongTinPhim.tenPhim}</h3>
        <h3>Cụm rạp:{listSuccess.thongTinPhim.tenCumRap} </h3>
        <h3 >Rạp: {listSuccess.thongTinPhim.tenRap} </h3>
        <h3>Giờ chiếu: {listSuccess.thongTinPhim.gioChieu} - Ngày: {listSuccess.thongTinPhim.ngayChieu}</h3>
        <h3>Thông tin vé:
          <br></br>
          {getListSuccess}</h3>
        <h3>Tổng cộng: {total} </h3>


      </div>
      <div className='my-5 w-100 d-flex justify-content-center'>
        <Button shape='round' type='primary' className='justify-content-center  text-white w-25 ' onClick={() => bookAnother()}> Đặt thêm vé</Button>
        <Button shape='round' danger type='primary' className='justify-content-center  text-red w-25 ' onClick={() => {navigate('/'); dispatch(clear())}
        }> Về trang chủ</Button>
      </div>
    </div>
  )
}

export default Success