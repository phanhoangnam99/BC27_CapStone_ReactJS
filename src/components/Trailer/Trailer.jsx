/* eslint-disable react/prop-types */
import React from 'react'
import { Dialog } from '@material-tailwind/react'
import TrailerContent from './component'

export default function Trailer({ children, url }) {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(!open)
  }

  return children ? (
    <>
   
        {React.cloneElement(children, { onClick: handleOpen })}


      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 }
        }}
        className='h-[90%] !w-[60vw]'
      >
        <TrailerContent url={url} />
      </Dialog>
    </>
  ) : (
    <>
      <div
        onClick={() => {
          handleOpen()
        }}
        className='text-white w-[120px] cursor-pointer h-[40px] border border-white hover:bg-[#fb9440]/80 hover:border-transparent rounded text-sm justify-center py-2.5 text-center inline-flex items-center dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440]'
        aria-hidden={true}
      >
        <svg
          aria-hidden='true'
          focusable='false'
          data-prefix='fas'
          data-icon='circle-play'
          className='svg-inline--fa fa-circle-play mr-2 h-5 w-5'
          role='img'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 512 512'
        >
          <path
            fill='currentColor'
            d='M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z'
          />
        </svg>
        Trailer
      </div>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 }
        }}
        className='h-[90%] !w-[60vw]'
      >
        <TrailerContent url={url} />
      </Dialog>
    </>
  )
}
