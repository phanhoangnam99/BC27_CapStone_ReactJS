/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import './header.css'
import {} from '@ant-design/icons'
import React, { useState } from 'react'

import {
  Drawer,
  Button,
  Typography,
  IconButton,
  ListItem,
  ListItemPrefix,
  Chip,
  List,
  ListItemSuffix,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Collapse,
  Spinner
} from '@material-tailwind/react'
import classNames from 'classnames'
import movieAPI from 'apis/movieAPI'
import { data } from 'jquery'
import useRequest from 'hooks/useRequest'
import {
  Bars4Icon,
  GlobeAmericasIcon,
  NewspaperIcon,
  PhoneIcon,
  RectangleGroupIcon,
  SquaresPlusIcon,
  SunIcon,
  TagIcon,
  UserGroupIcon
} from '@heroicons/react/24/solid'

import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import Film from 'modules/Home/components/Film'
import { useQuery } from '@tanstack/react-query'

const Header = () => {
  const { data: commingMoviesData ,isPending,isFetching} = useQuery({
    queryKey: ["commingMovies"],
    queryFn: () => {
      return movieAPI.getCommingMovies()
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const { data: movies } = useRequest(() => movieAPI?.getMovies())

  const { data: commingMovies, isLoading } = useRequest(() =>
    movieAPI.getCommingMovies()
  )

  const { user } = useSelector((state) => state.auth)

  const [open, setOpen] = useState(false)

  const [openAccordion, setOpenAccordion] = useState(0)

  const openDrawer = () => setOpen(true)
  const closeDrawer = () => setOpen(false)

  const handleOpenAccordion = (value) =>
    setOpenAccordion(openAccordion === value ? 0 : value)

  const navigate = useNavigate()

  if (open) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'unset'
  }

  window.addEventListener('scroll', function () {
    var header = document.querySelector('#navbar')
    if (window.scrollY > 0) {
      header?.classList?.replace('bg-white', 'bg-white/80')
    } else {
      header?.classList?.replace('bg-white/80', 'bg-white')
    }
  })

  const { data: cinemas } = useRequest(async () => {
    try {
      return movieAPI.getCinemaMobile()
    } catch (error) {
      console.log(error)
    }
  })

  function Icon({ id, open }) {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={2}
        stroke='currentColor'
        className={`${
          id === open ? 'rotate-180 transition duration-700' : ''
        } h-5 w-5 `}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M19.5 8.25l-7.5 7.5-7.5-7.5'
        />
      </svg>
    )
  }

  function NavListMenu({ title, children, menuItemStyle, ulStyle }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const renderItems = () => {
      return React.Children.map(children, (child, index) => (
        <a href='#' key={index}>
          <MenuItem
            className={`${
              menuItemStyle ? menuItemStyle : ''
            } flex items-center gap-3 rounded-lg`}
          >
            {child}
          </MenuItem>
        </a>
      ))
    }
    return (
      <React.Fragment>
        <Menu
          className=''
          open={isMenuOpen}
          handler={setIsMenuOpen}
          offset={{ mainAxis: 20 }}
          placement='bottom'
          allowHover={true}
        >
          <MenuHandler>
            <Typography as='div' variant='small' className='font-medium'>
              <ListItem
                className='flex items-center gap-2 py-2 pr-2 font-medium text-xs text-gray-900'
                selected={isMenuOpen}
              >
                {title}
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`hidden h-3 w-3 transition-transform lg:block ${
                    isMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </ListItem>
            </Typography>
          </MenuHandler>
          <MenuList className='hidden max-w-screen-xl rounded-xl lg:block'>
            <ul
              className={`${
                ulStyle ? ulStyle : ''
              } gap-y-2 outline-none outline-0`}
            >
              {renderItems()}
            </ul>
          </MenuList>
        </Menu>
      </React.Fragment>
    )
  }

  return (
    // <Navbar>
    <div id='navbar' className='pb-3 max-h-[110px]  bg-blue text-black'>
      <div className='container !p-0'>
        <div className=' xl:grid xl:grid-cols-12  items-end pt-4 py- flex justify-between'>
          <Link to='/' className='sm:col-span-3 pb-1 col-span-8'>
            <img
              src='https://www.galaxycine.vn/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Fgalaxy-logo-mobile.074abeac.png&w=256&q=75'
              alt=''
              className='h-8 w-auto'
            />
          </Link>
          <div className='col-span-6 py-1 justify-evenly items-center xl:flex hidden'>
            <div>
              {movies && commingMoviesData && !isLoading && (
                <NavListMenu title={'Phim'}>
                  <div className='bg-white min-w-[250px]  rounded px-6 py-4'>
                    <div className='movie__show'>
                      <div>
                        <span className='border-l-4 border-solid border-[#034ea2]' />
                        <a
                          type='button'
                          className='text-base font-normal text-[#333333] pl-2 inline cursor-pointer uppercase hover:text-orange-500  transition-all duration-300 ease-in-out'
                          href='/phim-dang-chieu/'
                        >
                          Phim đang chiếu
                        </a>
                      </div>
                      <ul className='flex flex-row gap-7 justify-between'>
                        {movies.map(
                          (movie, index) =>
                            index < 4 && (
                              <li
                                key={movie.biDanh}
                                className='text-sm text-black py-2 transition-all duration-300'
                              >
                                <div className='inline-block whitespace-nowrap relative max-w-full w-[140px] h-[200px]'>
                                  <div className='inline-block cursor-pointer rounded overflow-hidden card__movies max-w-full false '>
                                    <div className='object-cover rounded relative card__img max-w-full'>
                                      <div className='absolute hidden md:block w-full h-full z-10 cursor-pointer bg-[#00000080] transition-all duration-300 ease-in-out opacity-0 hover:!opacity-100'>
                                        <div className='card__hover__content flex flex-col justify-center items-center w-full h-full'>
                                          <a
                                            type='button'
                                            className='text-white bg-[#f26b38] w-[120px] h-[40px] hover:bg-[#fb9440] rounded text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440]'
                                          >
                                            <img
                                              alt='Logo Buy Ticket'
                                              loading='lazy'
                                              width={20}
                                              height={20}
                                              decoding='async'
                                              data-nimg={1}
                                              className='mr-2'
                                              src='https://www.galaxycine.vn/_next/static/media/Vector-1.319a0d2b.svg'
                                              style={{ color: 'transparent' }}
                                            />
                                            Mua vé
                                          </a>
                                        </div>
                                      </div>
                                      <a href='/dat-ve/the-marvels/'>
                                        <img
                                          alt='the-marvels'
                                          loading='lazy'
                                          width={140}
                                          height={200}
                                          decoding='async'
                                          data-nimg={1}
                                          className='undefined object-cover duration-500 ease-in-out group-hover:opacity-100
scale-100 blur-0 grayscale-0)'
                                          src={`${movie?.hinhAnh}`}
                                          style={{ color: 'transparent' }}
                                        />
                                      </a>
                                      <div className='votes'>
                                        <p className='absolute right-[5px] bottom-10'>
                                          <span>
                                            <svg
                                              aria-hidden='true'
                                              focusable='false'
                                              data-prefix='fas'
                                              data-icon='star'
                                              className='svg-inline--fa fa-star text-yellow-300 mr-5 text-[12px]'
                                              role='img'
                                              xmlns='http://www.w3.org/2000/svg'
                                              viewBox='0 0 576 512'
                                            >
                                              <path
                                                fill='currentColor'
                                                d='M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z'
                                              />
                                            </svg>
                                          </span>
                                          <span className='text-[18px] font-bold text-white'>
                                            7.8
                                          </span>
                                        </p>
                                      </div>
                                      <div className='age__limit absolute bottom-[6px] right-[6px]'>
                                        <span className='bg-[#F58020] px-1 py-[2px] text-sm text-white font-bold not-italic rounded'>
                                          T13
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className='Card_card__title__kFoFc mt-2'
                                    style={{ width: 128 }}
                                  >
                                    <a
                                      type='button'
                                      className='whitespace-pre-wrap text-xs font-semibold not-italic w-[140px]'
                                      href='/dat-ve/the-marvels/'
                                    >
                                      {movie?.tenPhim}
                                    </a>
                                  </div>
                                </div>
                              </li>
                            )
                        )}
                      </ul>
                    </div>
                    <div className='movie__show'>
                      <div>
                        <span className='border-l-4 border-solid border-[#034ea2]' />
                        <a
                          type='button'
                          className='text-base font-normal text-[#333333] pl-2 inline cursor-pointer uppercase hover:text-orange-500  transition-all duration-300 ease-in-out'
                          href='/phim-dang-chieu/'
                        >
                          Phim sắp chiếu
                        </a>
                      </div>
                      <ul className='flex flex-row gap-7 justify-between'>
                        {commingMoviesData.map(
                          (movie, index) =>
                            index < 4 && (
                              <li
                                key={movie.id}
                                className='text-sm text-black py-2 transition-all duration-300'
                              >
                                <div className='inline-block whitespace-nowrap relative max-w-full w-[140px] h-[200px]'>
                                  <div className='inline-block cursor-pointer rounded overflow-hidden card__movies max-w-full false '>
                                    <div className='object-cover rounded relative card__img max-w-full'>
                                      <div className='absolute hidden md:block w-full h-full z-10 cursor-pointer bg-[#00000080] transition-all duration-300 ease-in-out opacity-0 hover:!opacity-100'>
                                        <div className='card__hover__content flex flex-col justify-center items-center w-full h-full'>
                                          <a
                                            type='button'
                                            className='  text-white bg-[#f26b38] w-[120px] h-[40px] hover:bg-[#fb9440] rounded text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440] justify-center'
                                          >
                                            <img
                                              alt='Logo Buy Ticket'
                                              loading='lazy'
                                              width={20}
                                              height={20}
                                              decoding='async'
                                              data-nimg={1}
                                              className='mr-2'
                                              src='https://www.galaxycine.vn/_next/static/media/Vector-1.319a0d2b.svg'
                                              style={{ color: 'transparent' }}
                                            />
                                            Mua vé
                                          </a>
                                        </div>
                                      </div>
                                      <a href='/dat-ve/the-marvels/'>
                                        <img
                                          alt='the-marvels'
                                          loading='lazy'
                                          width={140}
                                          height={200}
                                          decoding='async'
                                          data-nimg={1}
                                          className='undefined object-cover duration-500 ease-in-out group-hover:!opacity-100
scale-100 blur-0 grayscale-0)'
                                          src={`${movie?.imagePortrait}`}
                                          style={{ color: 'transparent' }}
                                        />
                                      </a>
                                      <div className='votes'>
                                        <p className='absolute right-[5px] bottom-10'>
                                          <span>
                                            <svg
                                              aria-hidden='true'
                                              focusable='false'
                                              data-prefix='fas'
                                              data-icon='star'
                                              className='svg-inline--fa fa-star text-yellow-300 mr-5 text-[12px]'
                                              role='img'
                                              xmlns='http://www.w3.org/2000/svg'
                                              viewBox='0 0 576 512'
                                            >
                                              <path
                                                fill='currentColor'
                                                d='M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z'
                                              />
                                            </svg>
                                          </span>
                                          <span className='text-[18px] font-bold text-white'>
                                            7.8
                                          </span>
                                        </p>
                                      </div>
                                      <div className='age__limit absolute bottom-[6px] right-[6px]'>
                                        <span className='bg-[#F58020] px-1 py-[2px] text-sm text-white font-bold not-italic rounded'>
                                          T13
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className='Card_card__title__kFoFc mt-2'
                                    style={{ width: 128 }}
                                  >
                                    <a
                                      type='button'
                                      className=' whitespace-pre-wrap text-xs font-semibold not-italic w-[140px]'
                                      href='/dat-ve/the-marvels/'
                                    >
                                      {movie?.name}
                                    </a>
                                  </div>
                                </div>
                              </li>
                            )
                        )}
                      </ul>
                    </div>
                  </div>
                </NavListMenu>
              )}
              {isPending && isFetching && <Spinner />}
            </div>
            <div>
              <NavListMenu
                title={'Góc điện ảnh'}
                menuItemStyle={'!p-0'}
                ulStyle={'mb-0'}
              >
                <div className='bg-white min-w-[200px] text-center border border-white border-solid rounded'>
                  <ul>
                    <li className='text-sm text-black hover:text-[#f26b38] hover:pl-0.5 hover:border-l-4 capitalize hover:border-[#fd841f] hover:bg-[#fb770b1a] transition-all duration-300'>
                      <a
                        className='block py-2 text-black hover:text-orange'
                        href='/dien-anh/'
                      >
                        Thể loại phim
                      </a>
                    </li>
                    <li className='text-sm text-black hover:text-[#f26b38] hover:pl-0.5 hover:border-l-4 capitalize hover:border-[#fd841f] hover:bg-[#fb770b1a] transition-all duration-300'>
                      <a
                        className='block py-2 text-black hover:text-orange'
                        href='/dien-vien/'
                      >
                        Diễn Viên
                      </a>
                    </li>
                    <li className='text-sm text-black hover:text-[#f26b38] hover:pl-0.5 hover:border-l-4 capitalize hover:border-[#fd841f] hover:bg-[#fb770b1a] transition-all duration-300'>
                      <a
                        className='block py-2 text-black hover:text-orange'
                        href='/dao-dien/'
                      >
                        Đạo Diễn
                      </a>
                    </li>
                    <li className='text-sm text-black hover:text-[#f26b38] hover:pl-0.5 hover:border-l-4 capitalize hover:border-[#fd841f] hover:bg-[#fb770b1a] transition-all duration-300'>
                      <a
                        className='block py-2 text-black hover:text-orange'
                        href='/binh-luan-phim/'
                      >
                        Bình Luận Phim
                      </a>
                    </li>
                    <li className='text-sm text-black hover:text-[#f26b38] hover:pl-0.5 hover:border-l-4 capitalize hover:border-[#fd841f] hover:bg-[#fb770b1a] transition-all duration-300'>
                      <a
                        className='block py-2 text-black hover:text-orange'
                        href='/movie-blog/'
                      >
                        Blog Điện Ảnh
                      </a>
                    </li>
                  </ul>
                </div>
              </NavListMenu>
            </div>

            <div>
              <NavListMenu
                title={'Sự kiện'}
                menuItemStyle={'!p-0'}
                ulStyle={'mb-0'}
              >
                <div className='bg-white min-w-[200px] text-center border border-white border-solid rounded'>
                  <ul>
                    <li className='text-sm text-black hover:text-[#f26b38] hover:pl-0.5 hover:border-l-4 capitalize hover:border-[#fd841f] hover:bg-[#fb770b1a] transition-all duration-300'>
                      <a
                        className='block py-2 text-black hover:text-orange '
                        href='/dien-anh/'
                      >
                        Ưu đãi
                      </a>
                    </li>
                    <li className='text-sm text-black hover:text-[#f26b38] hover:pl-0.5 hover:border-l-4 capitalize hover:border-[#fd841f] hover:bg-[#fb770b1a] transition-all duration-300'>
                      <a
                        className='block py-2 text-black hover:text-orange'
                        href='/dien-vien/'
                      >
                        Phim hay tháng
                      </a>
                    </li>
                  </ul>
                </div>
              </NavListMenu>
            </div>

            <div>
              <NavListMenu
                title={'Rạp/Giá vé'}
                menuItemStyle={'!p-0'}
                ulStyle={'mb-0'}
              >
                <div className='bg-white min-w-[200px] text-center border border-white border-solid rounded'>
                  <ul className='max-h-[300px]'>
                    {cinemas?.map((cinema, index) => (
                      <li
                        key='index'
                        className='text-sm text-black hover:text-[#f26b38] hover:pl-0.5 hover:border-l-4 capitalize hover:border-[#fd841f] hover:bg-[#fb770b1a] transition-all duration-300'
                      >
                        <a
                          className='block py-2 text-black hover:text-orange'
                          href={`https://galaxycine.vn/rap-gia-ve/${cinema.slug}`}
                        >
                          {cinema.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </NavListMenu>
            </div>

            {/* <span onClick={() => navigate('/login')} aria-hidden='true'>
              Góc điện ảnh
            </span>
            <span onClick={() => navigate('/register')} aria-hidden='true'>
              {' '}
              Sự kiện
            </span>
            <span onClick={() => navigate('/admin')} aria-hidden='true'>
              {' '}
              Rạp/Giá vé
            </span>
            <span onClick={() => navigate('/admin')} aria-hidden='true'>
              {' '}
              Admin
            </span> */}
          </div>
          {user ? (
            <div className='col-span-3 pb-1 text-black '>
              <div className='flex py-1 items-center justify-end'>
                {/* ======================LANGUAGE=================== */}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-5 h-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
                  />
                </svg>
                VI
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-5 h-5'
                >
                  ()
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                  />
                </svg>
                {/* ======================LANGUAGE=================== */}
                <div className='flex items-center'>
                  <div className='ml-6 w-6 h-6 mr-2 flex-shrink-0'>
                    <div className='w-5-h-5'>
                      <div
                        className='w-full bg-[#f5f5f5] h-5 w-6 rounded-full relative overflow-hidden  '
                        style={{ paddingTop: '100%' }}
                      >
                        <svg
                          enableBackground='new 0 0 15 15'
                          viewBox='0 0 15 15'
                          x={0}
                          y={0}
                          className='shopee-svg-icon icon-headshot stroke-[#c6c6c6] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                          style={{ width: ' 1em', height: '1em' }}
                        >
                          <g>
                            <circle
                              cx='7.5'
                              cy='4.5'
                              fill='none'
                              r='3.8'
                              strokeMiterlimit={10}
                            />
                            <path
                              d='m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6'
                              fill='none'
                              strokeLinecap='round'
                              strokeMiterlimit={10}
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className='text-gray-400'>{user?.taiKhoan}</div>
                  {/* <Popover
                        content={
                          <>
                            <a
                              href='/'
                              aria-hidden='true'
                              id='logout'
                              type='primary'
                              onClick={async () => {
                                await dispatch(logout()).unwrap()
                              }}
                            >
                              Đăng xuất
                            </a>
                          </>
                        }
                      >
                        <h3 style={{ margin: 'auto 0 ', color: '#fff' }}>{user?.taiKhoan}</h3>
                      </Popover> */}
                </div>
              </div>
            </div>
          ) : null}
          {/* ======================DRAWER INIT=================== */}
          <div className='xl:hidden block'>
            <Button
              onClick={openDrawer}
              variant='text'
              className='rounded-full'
            >
              <span>
                <svg width={20} height={14} viewBox='0 0 20 14' fill='none'>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M1.05263 2C0.761955 2 0 1.55228 0 1C0 0.447715 0.761955 0 1.05263 0H18.9474C19.238 0 20 0.447715 20 1C20 1.55228 19.238 2 18.9474 2H1.05263ZM6.89744 8C6.69918 8 6 7.55228 6 7C6 6.44772 6.69918 6 6.89744 6H19.1026C19.3008 6 20 6.44772 20 7C20 7.55228 19.3008 8 19.1026 8H6.89744ZM0 13C0 13.5523 0.761955 14 1.05263 14H18.9474C19.238 14 20 13.5523 20 13C20 12.4477 19.238 12 18.9474 12H1.05263C0.761955 12 0 12.4477 0 13Z'
                    fill='#777777'
                  />
                </svg>
              </span>
            </Button>
            <Drawer
              open={open}
              onClose={closeDrawer}
              className='p-4 '
              placement='right'
              size={245}
            >
              <div className='mb-6 xl:hidden items-center justify-between flex'>
                <IconButton
                  variant='text'
                  className='ml-auto'
                  color='blue-gray'
                  onClick={closeDrawer}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={2}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </IconButton>
              </div>
              {/* ======================DRAWER END=================== */}
              <Accordion
                open={openAccordion === 1}
                icon={<Icon id={1} open={openAccordion} />}
              >
                <AccordionHeader
                  onClick={() => handleOpenAccordion(1)}
                  className={
                    //   `${
                    //   openAccordion == 1 ? 'text-blue-500 text-xs font-normal ' : 'text-xs text-black font-normal '
                    // }text-xs text-black font-normal `
                    classNames(
                      `text-sm accordion-header    text-black font-normal border-b-0 `
                    )
                  }
                >
                  {' '}
                  Phim
                </AccordionHeader>
                <AccordionBody>
                  <div className='mx-5'>
                    <div>
                      <a href='' className='text-black hover:text-orange'>
                        Phim đang chiếu
                      </a>
                    </div>
                    <div>
                      <a href='' className='text-black hover:text-orange'>
                        Phim sắp chiếu
                      </a>
                    </div>
                  </div>
                </AccordionBody>
              </Accordion>
              <Accordion
                open={openAccordion === 2}
                icon={<Icon id={2} open={openAccordion} />}
              >
                <AccordionHeader
                  onClick={() => handleOpenAccordion(2)}
                  className={classNames(
                    `text-sm accordion-header  text-black font-normal border-b-0 `
                  )}
                >
                  Góc điện ảnh
                </AccordionHeader>
                <AccordionBody>
                  <div className='mx-5'>
                    <div>
                      <a className='text-black hover:text-[orange]' href=''>
                        Thể Loại Phim
                      </a>
                    </div>
                    <div>
                      <a className='text-black hover:text-[orange]' href=''>
                        Diễn Viên
                      </a>
                    </div>
                    <div>
                      <a className='text-black hover:text-[orange]' href=''>
                        Đạo Diễn
                      </a>
                    </div>
                    <div>
                      <a className='text-black hover:text-[orange]' href=''>
                        Bình Luận Phim
                      </a>
                    </div>
                    <div>
                      <a className='text-black hover:text-[orange]' href=''>
                        Blog Điện Ảnh
                      </a>
                    </div>
                  </div>
                </AccordionBody>
              </Accordion>
              <Accordion
                open={openAccordion === 3}
                icon={<Icon id={3} open={openAccordion} />}
              >
                <AccordionHeader
                  onClick={() => handleOpenAccordion(3)}
                  className={classNames(
                    `text-sm accordion-header  text-black font-normal border-b-0 `
                  )}
                >
                  Sự kiện
                </AccordionHeader>
                <AccordionBody>
                  <div className='mx-5'>
                    <div>
                      <a className='text-black hover:text-[orange]' href=''>
                        Ưu đãi
                      </a>
                    </div>
                    <div>
                      <a className='text-black hover:text-[orange]' href=''>
                        Phim hay tháng
                      </a>
                    </div>
                  </div>
                </AccordionBody>
              </Accordion>
              <Accordion
                open={openAccordion === 4}
                icon={<Icon id={4} open={openAccordion} />}
              >
                <AccordionHeader
                  onClick={() => handleOpenAccordion(4)}
                  className={classNames(
                    `text-sm accordion-header  text-black font-normal border-b-0 `
                  )}
                >
                  Rạp / Giá vé
                </AccordionHeader>
                <AccordionBody>
                  <div className='mx-5'>
                    <div className='max-h-36 overflow-y-auto'>
                      {cinemas &&
                        cinemas.map((cinema) => (
                          <div
                            key={cinema.id}
                            className='my-3  hover:pl-0.5 hover:border-l-4    hover:border-[#fd841f]  transition-all duration-300 ease-in-out'
                          >
                            <a
                              className=' font-thin text-xs text-black hover:bg-[#fb770b1a] hover:font-bold hover:text-black'
                              href=''
                            >
                              {cinema.name}
                            </a>
                          </div>
                        ))}
                    </div>
                  </div>
                </AccordionBody>
              </Accordion>

              {/* ======================DRAWER END=================== */}
            </Drawer>
          </div>
          {/* ======================DRAWER END=================== */}

          <Link to='login' className='col-span-3 m-[auto] hover:text-orange '>
            Đăng nhập
          </Link>
        </div>

        <div className=''></div>
      </div>
    </div>
    // </Navbar>
  )
}

export default Header

const Navbar = styled.div`
  width: 100%;
  color: #ffff;
  position: fixed;
  top: 0;
  left: 50%;
  max-width: 100vw;
  transform: translateX(-50%);

  z-index: 30;
  background-color: black;
  box-shadow:
    0 1px 1px rgba(0, 0, 0, 0.12),
    0 2px 2px rgba(0, 0, 0, 0.12),
    0 4px 4px rgba(0, 0, 0, 0.12),
    0 8px 8px rgba(0, 0, 0, 0.12),
    0 16px 16px rgba(0, 0, 0, 0.12);
  height: 60px;
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
`
