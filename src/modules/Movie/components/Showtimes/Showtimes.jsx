/* eslint-disable react/prop-types */

import movieAPI from 'apis/movieAPI'
import useRequest from 'hooks/useRequest'
import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import Moment from 'react-moment'
import './showtime.scss'

const Showtimes = ({ movieId }) => {
  const { data: lichChieus } = useRequest(() => movieAPI.getLichChieu(movieId))
  const [filter, setFilter] = useState([null])
  const [displayFilter, setDisplayFilter] = useState(false)
  const [time, setTime] = useState(false)
  const navigate = useNavigate()

  console.log(filter)

  if (!lichChieus) {
    return null
  }

  console.log(lichChieus)
  const rap = lichChieus.heThongRapChieu
  console.log(rap)

  const cinemaDetail = (maHeThong) => {
    const updatedList = rap.filter((x) => x.maHeThongRap === maHeThong)
    setFilter(updatedList)

    setDisplayFilter(true)
  }

  const movieTicket = (ticketId) => {
    navigate(`/ticket/${ticketId}`)
  }
  if (!filter) {
    return null
  }
  return (
    <div className='showTime container'>
      <table className='table' style={{ color: 'white' }}>
        <thead>
          <tr>
            <th scope='col'>Hệ thống rạp chiếu</th>
            <th scope='col'>Địa điểm</th>
          </tr>
        </thead>
        <tbody>
          {rap.map((cinema) => {
            return (
              <tr key={cinema.maCumRap}>
                <td onClick={() => cinemaDetail(cinema.maHeThongRap)} className='logo' style={{ display: 'flex' }}>
                  <div>
                    <img src={cinema.logo} alt={cinema.maCumRap} />
                  </div>

                  <div className='nameRap'>
                    <p>{cinema.tenHeThongRap}</p>
                    <button className='btn btn-outline-warning'>Địa chỉ</button>
                  </div>
                </td>

                {displayFilter && (
                  <td>
                    <div>
                      {filter.map((cumRap) => {
                        return (
                          <div className='rapInfo' key={cumRap.cumRapChieu}>
                            {cumRap.cumRapChieu.map((thongTinRap) => {
                              return (
                                <>
                                  <div onClick={() => setTime(true)} className='rapInfo-Name' aria-hidden='true'>
                                    <div>
                                      <img src={thongTinRap.hinhAnh} alt='' />
                                      <span>{thongTinRap.tenCumRap}</span>
                                    </div>
                                    <div>
                                      <span>{thongTinRap.diaChi}</span>
                                      <button style={{ marginLeft: '50px' }} className='btn btn-outline-warning'>
                                        Giờ chiếu
                                      </button>
                                    </div>
                                    <div className='time'>
                                      {time &&
                                        thongTinRap.lichChieuPhim.map((dayTime) => {
                                          return (
                                            <>
                                              <div>
                                                <Moment>{dayTime.ngayChieuGioChieu}</Moment>
                                                <button
                                                  style={{ marginLeft: '50px' }}
                                                  onClick={() => movieTicket(dayTime.maLichChieu)}
                                                  className='btn btn-warning'
                                                >
                                                  Đặt vé
                                                </button>
                                              </div>
                                            </>
                                          )
                                        })}
                                    </div>
                                  </div>
                                </>
                              )
                            })}
                          </div>
                        )
                      })}
                    </div>
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Showtimes
