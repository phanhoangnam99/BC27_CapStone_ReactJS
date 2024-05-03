/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import './header.css'
import {} from '@ant-design/icons'
import React, { useRef, useState } from 'react'

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
  Spinner,
  Popover
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
import { logout } from 'modules/Authentication/slices/authSlice'
import {
  FloatingArrow,
  FloatingPortal,
  arrow,
  autoUpdate,
  computePosition,
  offset,
  safePolygon,
  shift,
  useFloating,
  useHover,
  useInteractions,
  useTransitionStyles
} from '@floating-ui/react'
import path from 'constants/path'
import { generateNameId } from 'utils/utils'

const Header = () => {
  const {
    data: commingMoviesData,
    isPending,
    isFetching
  } = useQuery({
    queryKey: ['commingMovies'],
    queryFn: () => {
      return movieAPI.getCommingMovies()
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const { data: movies } = useRequest(() => movieAPI?.getMovies())
  const arrowRef = useRef(null)

  const [isOpen, setIsOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const [openAccordion, setOpenAccordion] = useState(0)

  const { refs, floatingStyles, context, middlewareData } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(10),

      arrow({
        element: arrowRef
      }),
      shift()
    ],
    whileElementsMounted: autoUpdate
  })

  const hover = useHover(context, {
    handleClose: safePolygon({
      requireIntent: true
    })
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([hover])

  const { data: commingMovies, isLoading } = useRequest(() =>
    movieAPI.getCommingMovies()
  )

  const { user } = useSelector((state) => state.auth)

  const openDrawer = () => setOpen(true)
  const closeDrawer = () => setOpen(false)

  const handleOpenAccordion = (value) =>
    setOpenAccordion(openAccordion === value ? 0 : value)

  const navigate = useNavigate()
  const dispatch = useDispatch()

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
              src='https://www.galaxycine.vn/_next/static/media/galaxy-logo-mobile.074abeac.png'
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
                              <Link
                                to={`${path.home}dat-ve/${generateNameId({
                                  name: `${movie.tenPhim}`,
                                  id: movie?.maPhim
                                })}`}
                                key={movie.biDanh}
                                className='text-sm text-black py-2 transition-all duration-300'
                              >
                                <div className='inline-block whitespace-nowrap relative max-w-full w-[140px] !h-[200px]'>
                                  <div className='inline-block cursor-pointer rounded overflow-hidden card__movies max-w-full h-full false '>
                                    <div className='object-cover rounded relative card__img max-w-full h-full'>
                                      <div className='absolute hidden md:block w-full h-full z-10 cursor-pointer bg-[#00000080] transition-all duration-300 ease-in-out opacity-0 hover:!opacity-100'>
                                        <div className='card__hover__content flex flex-col justify-center items-center w-full h-full'>
                                          <Link
                                            to={`${
                                              path.home
                                            }dat-ve/${generateNameId({
                                              name: `${movie.tenPhim}`,
                                              id: movie?.maPhim
                                            })}`}
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
                                          </Link>
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
                                          className='undefined object-fill h-full duration-500 ease-in-out group-hover:opacity-100
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
                              </Link>
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
                    <li
                      className='text-sm text-b
lack hover:text-[#f26b38] hover:pl-0.5 hover:border-l-4 capitalize hover:border-[#fd841f] hover:bg-[#fb770b1a] transition-all duration-300'
                    >
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
                {/* <svg
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
                </svg> */}
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
                  <div
                    className='text-gray-400'
                    ref={refs.setReference}
                    {...getReferenceProps()}
                  >
                    {user?.taiKhoan}
                    {isOpen && (
                      <FloatingPortal>
                        <div
                          {...getFloatingProps()}
                          ref={refs.setFloating}
                          style={{
                            transformOrigin: `${middlewareData.arrow?.x}px top`,
                            zIndex: 99999999999,
                            ...floatingStyles
                          }}
                        >
                          <span
                            ref={arrowRef}
                            className='absolute z-10 translate-y-[-95%] border-[11px] border-x-transparent border-t-transparent border-b-white '
                            style={{
                              left: middlewareData.arrow?.x,
                              top: middlewareData.arrow?.y
                            }}
                          />
                          <ul
                            role='menu'
                            className='relative z-10 flex min-w-[180px] flex-col gap-2 overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none'
                          >
                            {/* <button
                          role='menuitem'
                          className='flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900'
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox='0 0 16 16'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              fillRule='evenodd'
                              clipRule='evenodd'
                              d='M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM10 5C10 5.53043 9.78929 6.03914 9.41421 6.41421C9.03914 6.78929 8.53043 7 8 7C7.46957 7 6.96086 6.78929 6.58579 6.41421C6.21071 6.03914 6 5.53043 6 5C6 4.46957 6.21071 3.96086 6.58579 3.58579C6.96086 3.21071 7.46957 3 8 3C8.53043 3 9.03914 3.21071 9.41421 3.58579C9.78929 3.96086 10 4.46957 10 5ZM8 9C7.0426 8.99981 6.10528 9.27449 5.29942 9.7914C4.49356 10.3083 3.85304 11.0457 3.454 11.916C4.01668 12.5706 4.71427 13.0958 5.49894 13.4555C6.28362 13.8152 7.13681 14.0009 8 14C8.86319 14.0009 9.71638 13.8152 10.5011 13.4555C11.2857 13.0958 11.9833 12.5706 12.546 11.916C12.147 11.0457 11.5064 10.3083 10.7006 9.7914C9.89472 9.27449 8.9574 8.99981 8 9Z'
                              fill='#90A4AE'
                            />
                          </svg>
                          <p className='block font-sans text-sm antialiased font-medium leading-normal text-inherit'>
                            My Profile
                          </p>
                        </button>
                        <button
                          role='menuitem'
                          className='flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900'
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox='0 0 16 16'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              fillRule='evenodd'
                              clipRule='evenodd'
                              d='M9.48999 1.17C9.10999 -0.39 6.88999 -0.39 6.50999 1.17C6.45326 1.40442 6.34198 1.62213 6.18522 1.80541C6.02845 1.9887 5.83063 2.13238 5.60784 2.22477C5.38505 2.31716 5.1436 2.35564 4.90313 2.33709C4.66266 2.31854 4.42997 2.24347 4.22399 2.118C2.85199 1.282 1.28199 2.852 2.11799 4.224C2.65799 5.11 2.17899 6.266 1.17099 6.511C-0.390006 6.89 -0.390006 9.111 1.17099 9.489C1.40547 9.54581 1.62322 9.65719 1.80651 9.81407C1.98979 9.97096 2.13343 10.1689 2.22573 10.3918C2.31803 10.6147 2.35639 10.8563 2.33766 11.0968C2.31894 11.3373 2.24367 11.5701 2.11799 11.776C1.28199 13.148 2.85199 14.718 4.22399 13.882C4.42993 13.7563 4.66265 13.6811 4.90318 13.6623C5.14371 13.6436 5.38527 13.682 5.60817 13.7743C5.83108 13.8666 6.02904 14.0102 6.18592 14.1935C6.34281 14.3768 6.45419 14.5945 6.51099 14.829C6.88999 16.39 9.11099 16.39 9.48899 14.829C9.54599 14.5946 9.65748 14.377 9.8144 14.1939C9.97132 14.0107 10.1692 13.8672 10.3921 13.7749C10.6149 13.6826 10.8564 13.6442 11.0969 13.6628C11.3373 13.6815 11.57 13.7565 11.776 13.882C13.148 14.718 14.718 13.148 13.882 11.776C13.7565 11.57 13.6815 11.3373 13.6628 11.0969C13.6442 10.8564 13.6826 10.6149 13.7749 10.3921C13.8672 10.1692 14.0107 9.97133 14.1939 9.81441C14.377 9.65749 14.5946 9.546 14.829 9.489C16.39 9.11 16.39 6.889 14.829 6.511C14.5945 6.45419 14.3768 6.34281 14.1935 6.18593C14.0102 6.02904 13.8666 5.83109 13.7743 5.60818C13.682 5.38527 13.6436 5.14372 13.6623 4.90318C13.681 4.66265 13.7563 4.42994 13.882 4.224C14.718 2.852 13.148 1.282 11.776 2.118C11.5701 2.24368 11.3373 2.31895 11.0968 2.33767C10.8563 2.35639 10.6147 2.31804 10.3918 2.22574C10.1689 2.13344 9.97095 1.9898 9.81407 1.80651C9.65718 1.62323 9.5458 1.40548 9.48899 1.171L9.48999 1.17ZM7.99999 11C8.79564 11 9.55871 10.6839 10.1213 10.1213C10.6839 9.55871 11 8.79565 11 8C11 7.20435 10.6839 6.44129 10.1213 5.87868C9.55871 5.31607 8.79564 5 7.99999 5C7.20434 5 6.44128 5.31607 5.87867 5.87868C5.31606 6.44129 4.99999 7.20435 4.99999 8C4.99999 8.79565 5.31606 9.55871 5.87867 10.1213C6.44128 10.6839 7.20434 11 7.99999 11Z'
                              fill='#90A4AE'
                            />
                          </svg>
                          <p className='block font-sans text-sm antialiased font-medium leading-normal text-inherit'>
                            Edit Profile
                          </p>
                        </button>
                        <button
                          role='menuitem'
                          className='flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900'
                        >
                          <svg
                            width={14}
                            height={14}
                            viewBox='0 0 14 14'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              fillRule='evenodd'
                              clipRule='evenodd'
                              d='M2 0C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V12C0 12.5304 0.210714 13.0391 0.585786 13.4142C0.960859 13.7893 1.46957 14 2 14H12C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0H2ZM2 2H12V9H10L9 11H5L4 9H2V2Z'
                              fill='#90A4AE'
                            />
                          </svg>
                          <p className='block font-sans text-sm antialiased font-medium leading-normal text-inherit'>
                            Inbox
                          </p>
                        </button>
                        <button
                          role='menuitem'
                          className='flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900'
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox='0 0 16 16'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              fillRule='evenodd'
                              clipRule='evenodd'
                              d='M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM14 8C14 8.993 13.759 9.929 13.332 10.754L11.808 9.229C12.0362 8.52269 12.0632 7.76679 11.886 7.046L13.448 5.484C13.802 6.249 14 7.1 14 8ZM8.835 11.913L10.415 13.493C9.654 13.8281 8.83149 14.0007 8 14C7.13118 14.0011 6.27257 13.8127 5.484 13.448L7.046 11.886C7.63267 12.0298 8.24426 12.039 8.835 11.913ZM4.158 9.117C3.96121 8.4394 3.94707 7.72182 4.117 7.037L4.037 7.117L2.507 5.584C2.1718 6.34531 1.99913 7.16817 2 8C2 8.954 2.223 9.856 2.619 10.657L4.159 9.117H4.158ZM5.246 2.667C6.09722 2.22702 7.04179 1.99825 8 2C8.954 2 9.856 2.223 10.657 2.619L9.117 4.159C8.34926 3.93538 7.53214 3.94687 6.771 4.192L5.246 2.668V2.667ZM10 8C10 8.53043 9.78929 9.03914 9.41421 9.41421C9.03914 9.78929 8.53043 10 8 10C7.46957 10 6.96086 9.78929 6.58579 9.41421C6.21071 9.03914 6 8.53043 6 8C6 7.46957 6.21071 6.96086 6.58579 6.58579C6.96086 6.21071 7.46957 6 8 6C8.53043 6 9.03914 6.21071 9.41421 6.58579C9.78929 6.96086 10 7.46957 10 8Z'
                              fill='#90A4AE'
                            />
                          </svg>
                          <p className='block font-sans text-sm antialiased font-medium leading-normal text-inherit'>
                            Help
                          </p>
                        </button> */}
                            {user.maLoaiNguoiDung === 'QuanTri' && (
                              <>
                                <Link
                                  to='admin'
                                  role='menuitem'
                                  className='flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900'
                                >
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth='1.5'
                                    stroke='currentColor'
                                    className='w-6 h-6'
                                  >
                                    <path
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                      d='M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z'
                                    />
                                    <path
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                      d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                                    />
                                  </svg>
                                  <p className='block font-sans text-sm antialiased font-medium leading-normal text-inherit'>
                                    Admin Page
                                  </p>
                                </Link>
                              </>
                            )}

                            <>
                              <Link
                                to='profile'
                                role='menuitem'
                                className='flex  w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900'
                              >
                                <i className='fa-regular fa-user w-6 h-6 flex justify-center items-center' />
                                <p className='block font-sans text-sm antialiased font-medium leading-normal text-inherit'>
                                  Profile
                                </p>
                              </Link>
                              <hr
                                className='my-2 border border-1 border-solid border-blue-gray-50'
                                role='menuitem'
                              />
                            </>
                            <button
                              onClick={async () => {
                                await dispatch(logout())
                              }}
                              role='menuitem'
                              className='flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900'
                            >
                              <svg
                                width={16}
                                height={14}
                                viewBox='0 0 16 14'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  fillRule='evenodd'
                                  clipRule='evenodd'
                                  d='M1 0C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V13C0 13.2652 0.105357 13.5196 0.292893 13.7071C0.48043 13.8946 0.734784 14 1 14C1.26522 14 1.51957 13.8946 1.70711 13.7071C1.89464 13.5196 2 13.2652 2 13V1C2 0.734784 1.89464 0.48043 1.70711 0.292893C1.51957 0.105357 1.26522 0 1 0ZM11.293 9.293C11.1108 9.4816 11.01 9.7342 11.0123 9.9964C11.0146 10.2586 11.1198 10.5094 11.3052 10.6948C11.4906 10.8802 11.7414 10.9854 12.0036 10.9877C12.2658 10.99 12.5184 10.8892 12.707 10.707L15.707 7.707C15.8945 7.51947 15.9998 7.26516 15.9998 7C15.9998 6.73484 15.8945 6.48053 15.707 6.293L12.707 3.293C12.6148 3.19749 12.5044 3.12131 12.3824 3.0689C12.2604 3.01649 12.1292 2.9889 11.9964 2.98775C11.8636 2.9866 11.7319 3.0119 11.609 3.06218C11.4861 3.11246 11.3745 3.18671 11.2806 3.2806C11.1867 3.3745 11.1125 3.48615 11.0622 3.60905C11.0119 3.73194 10.9866 3.86362 10.9877 3.9964C10.9889 4.12918 11.0165 4.2604 11.0689 4.3824C11.1213 4.50441 11.1975 4.61475 11.293 4.707L12.586 6H5C4.73478 6 4.48043 6.10536 4.29289 6.29289C4.10536 6.48043 4 6.73478 4 7C4 7.26522 4.10536 7.51957 4.29289 7.70711C4.48043 7.89464 4.73478 8 5 8H12.586L11.293 9.293Z'
                                  fill='#90A4AE'
                                />
                              </svg>
                              <p className='block font-sans text-sm antialiased font-medium leading-normal text-inherit'>
                                Sign Out
                              </p>
                            </button>
                          </ul>
                        </div>
                      </FloatingPortal>
                    )}
                  </div>

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
                    <h3 style={{ margin: 'auto 0 ', color: '#fff' }}>
                      {user?.taiKhoan}
                    </h3>
                  </Popover> */}
                </div>
              </div>
            </div>
          ) : (
            <div className='col-span-3 pb-1 text-black '>
              <div className='flex py-1 items-center justify-end'>
                <div className='flex items-center'>
                  <Link
                    to='login'
                    className='col-span-3 m-[auto] hover:text-orange '
                  >
                    Đăng nhập
                  </Link>
                </div>
              </div>
            </div>
          )}
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
                      <a
                        href=''
                        className=' whitespace-nowrap text-black hover:text-orange'
                      >
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
