import { Button } from "antd";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import './header.css'
const Header = () => {

  const navigate = useNavigate()
  return (
    <Navbar>
      <div className="conntainer">
        <div className="left">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPQDYau3Hs4-xw1i8jVSUY4BlF4FLmg8lQqg&usqp=CAU"
            alt=""
          />
          <span onClick={()=>navigate('/')}>Homepage</span>
          <span>Movies</span>
          <span onClick={() => navigate('/login')}>Login</span>
          <span onClick={()=>navigate('/register')} > Register</span>
        </div>
        <div className=""></div>
      </div>
    </Navbar >
  );
};

export default Header;

const Navbar = styled.div`
  width: 100%;
  color: #ffff;
  position: fixed;
  top: 0;
  z-index: 30;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12),
    0 4px 4px rgba(0, 0, 0, 0.12), 0 8px 8px rgba(0, 0, 0, 0.12),
    0 16px 16px rgba(0, 0, 0, 0.12);
  .left {
    display: flex;
    align-items: center;
    padding: 0px 50px;

    img {
      height: 25px;
    }

    span {
      margin-right: 20px;
      cursor: pointer;
      font-size: 18px;
    }
  }
`;
