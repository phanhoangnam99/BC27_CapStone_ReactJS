/* eslint-disable react/prop-types */
import React, { useState } from 'react'

export default function QuantityController({ value, onIncrease, onDecrease }) {
  const [localValue, setLocalValue] = useState(0)

  const increase = () => {
    let _value = value || localValue + 1
    onIncrease && onIncrease(_value)
    setLocalValue(_value)
  }
  const decrease = () => {
    let _value = value || localValue - 1
    onDecrease && onDecrease(_value)

    setLocalValue(_value)
  }

  return (
    <div className='flex bg-white border-md rounded shadow-sm '>
      <div className='md:py-1 md:px-2 rounded outline-none flex items-center'>
        <button className='md:px-2 outline-none' onClick={decrease}>
          <svg
            aria-hidden='true'
            focusable='false'
            data-prefix='fas'
            data-icon='minus'
            className=' h-4 '
            role='img'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 448 512'
          >
            <path
              fill='currentColor'
              d='M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z'
            />
          </svg>
        </button>
        <button className='inline-block px-2 mx-1'>
          {value || localValue}
        </button>
        <button className='md:px-2' onClick={increase}>
          <svg
            aria-hidden='true'
            focusable='false'
            data-prefix='fas'
            data-icon='plus'
            className='h-4 '
            role='img'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 448 512'
          >
            <path
              fill='currentColor'
              d='M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z'
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
