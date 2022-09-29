import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { handleList } from './slices/seatSlice';
import styled from "styled-components";
import { Button } from './style'

const Seat = ({ data }) => {
    const dispatch = useDispatch()
    const { list } = useSelector((state) => state.seat)
    const [isSelected, setIsSelected] = useState(false)
    const handleSeat = (seat) => {
        dispatch(handleList(seat))
        setIsSelected(!isSelected)
    };
    return (
        <>



            <Button isSelected={isSelected} type={data.loaiGhe} isBooked={data.daDat} onClick={() => handleSeat(data)} >{data.tenGhe}</Button>



        </>
    )
}

export default Seat



