import React from 'react'
import styled, { css } from 'styled-components'



export const Button =
  styled.button`



background:${({ isSelected }) => (isSelected ? '#6bee6c!important' : "white")};
width:35px;
padding:0px 5px;
height:30px;
border-radius:5px;
color:black;
padding:0;

${(props) => props.isBooked === true && css`
background-color:red!important;
padding:0px 5px;
border-radius:5px;

pointer-events:none;

`};

${(props) => props.type === "Vip" && css`
background:orange
`};



${(props) => props.variant === "book-btn" && css`
  background:orange;
padding:0px 5px;
border-radius:5px;
width:150px;
height:50px;
text-align:center;
margin-top:10px;
margin:0 auto;


`}

`


export const Square = styled.div`
width: 40px;
  height:40px;
  background: red;
  border-radius:5px;

  ${(props) => props.variant === 'selected' && css`
  background:#6bee6c
  
  
  
  `}

  ${(props) => props.variant === 'available' && css`
  background:#efeeee
  
  
  
  `}
  ${(props) => props.variant === 'vip' && css`
  background:orange;
  
  
  
  `}
`
export const Screen = styled.div`
border-bottom: 40px solid orange;
      border-left: 25px solid transparent;
      border-right: 25px solid transparent;
      height: 0;
      width: 100%;
      filter: drop-shadow(0px 16px 13px white);
      `
