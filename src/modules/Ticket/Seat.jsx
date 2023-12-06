/* eslint-disable react/prop-types */

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { handleList } from './slices/seatSlice'
import { Button } from './style'

const Seat = ({ data }) => {
  const dispatch = useDispatch()

  const [isSelected, setIsSelected] = useState(false)
  const handleSeat = (seat) => {
    dispatch(handleList(seat))
    setIsSelected(!isSelected)
  }
  return (
    <>
      <Button isSelected={isSelected} type={data.loaiGhe} isBooked={data.daDat} onClick={() => handleSeat(data)}>
        {data.tenGhe}
      </Button>
    </>
  )
}

export default Seat
