import React from 'react'
import image from '../../img/backapp.b46ef3a1.jpg'

// eslint-disable-next-line react/prop-types
const BackGround = ({ children }) => {
  return (
    <div
      style={{
        position: 'relative',
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        overflow: 'hidden'
      }}
    >
      {children}
    </div>
  )
}

export default BackGround
