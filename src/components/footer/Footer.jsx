import React, { useEffect, useState } from 'react'
// import './footer.scss'

export default function Footer() {
  const [promoHeight, setPromoHeight] = useState('null')
  useEffect(() => {
    const getPromoHeight = String(document.getElementById('AppIntroduction')?.getBoundingClientRect().height)
    window.addEventListener('resize', (event) => {
      const getPromoHeight = String(document.getElementById('AppIntroduction')?.getBoundingClientRect().height)
      setPromoHeight(getPromoHeight)
    })
    setPromoHeight(getPromoHeight)
  })

  const URL = 'https://galaxycine.vn'

  return (
    <footer id='footer' style={{ marginTop: `${promoHeight}px` }} className='max-w-full'>
      <div className=' bg-[#333] absolute w-[100vw] max-w-[100%] transform left-[50%] -translate-x-1/2'>
        <div className='container'>
          <div className='grid grid-cols-2 gap-y-4 md:gap-y-0 gap-7  sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4 py-9'>
            <div>
              <h3 className='mb-3 md:mb-6 text-sm uppercase text-white font-bold'>giới thiệu</h3>
              <ul>
                <li className=' '>
                  <a
                    href={`${URL}/ve-chung-toi`}
                    className=' hover:text-[#FD841F] transition-all duration-300 text-sm capitalize  leading-10 text-[#d0d0d0]'
                  >
                    Về chúng tôi
                  </a>
                </li>
                <li className=' '>
                  <a
                    href={`${URL}/thoa-thuan-su-dung`}
                    className=' hover:text-[#FD841F] transition-all duration-300 text-sm capitalize  leading-10 text-[#d0d0d0]'
                  >
                    Thoả thuận sử dụng
                  </a>
                </li>
                <li className=' '>
                  <a
                    href={`${URL}/quy-che-hoat-dong`}
                    className=' hover:text-[#FD841F] transition-all duration-300 text-sm capitalize  leading-10 text-[#d0d0d0]'
                  >
                    Quy chế hoạt động
                  </a>
                </li>
                <li className=' '>
                  <a
                    href={`${URL}/chinh-sach-bao-mat`}
                    className=' hover:text-[#FD841F] transition-all duration-300 text-sm capitalize  leading-10 text-[#d0d0d0]'
                  >
                    Chính sách bảo mật
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='mb-3 md:mb-6 text-sm uppercase text-white font-bold'>góc điện ảnh</h3>
              <ul className='text-[#d0d0d0]'>
                <li className=' '>
                  <a
                    href={`${URL}/dien-anh`}
                    className=' hover:text-[#FD841F] transition-all duration-300 text-sm capitalize  leading-10 text-[#d0d0d0]'
                  >
                    thể loại phim
                  </a>
                </li>
                <li className=' '>
                  <a
                    href={`${URL}/binh-luan-phim`}
                    className=' hover:text-[#FD841F] transition-all duration-300 text-sm capitalize  leading-10 text-[#d0d0d0]'
                  >
                    bình luận phim
                  </a>
                </li>
                <li className=' '>
                  <a
                    href={`${URL}/movie-blog`}
                    className=' hover:text-[#FD841F] transition-all duration-300 text-sm capitalize  leading-10 text-[#d0d0d0]'
                  >
                    blog điện ảnh
                  </a>
                </li>
                <li className=' '>
                  <a
                    href={`${URL}/phim-hay`}
                    className=' hover:text-[#FD841F] transition-all duration-300 text-sm capitalize  leading-10 text-[#d0d0d0]'
                  >
                    phim hay tháng
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='mb-3 md:mb-6 text-sm uppercase text-white font-bold'>hỗ trợ</h3>
              <ul>
                <li className=' '>
                  <a
                    href={`${URL}/gop-y`}
                    className=' hover:text-[#FD841F] transition-all duration-300 text-sm capitalize  leading-10 text-[#d0d0d0]'
                  >
                    góp ý
                  </a>
                </li>
                <li className=' '>
                  <a
                    href={`${URL}/sale-and-service`}
                    className=' hover:text-[#FD841F] transition-all duration-300 text-sm capitalize  leading-10 text-[#d0d0d0]'
                  >
                    Sale & services
                  </a>
                </li>
                <li className=' '>
                  <a
                    href={`${URL}/rap-gia-ve/fb233b0f-edb4-4eb1-ade8-7f8b83ab2457/`}
                    className=' hover:text-[#FD841F] transition-all duration-300 text-sm capitalize  leading-10 text-[#d0d0d0]'
                  >
                    Rạp / giá vé
                  </a>
                </li>
                <li className=' '>
                  <a
                    href={`${URL}/tuyen-dung`}
                    className=' hover:text-[#FD841F] transition-all duration-300 text-sm capitalize  leading-10 text-[#d0d0d0]'
                  >
                    tuyển dụng
                  </a>
                </li>
                <li className=' '>
                  <a
                    href={`${URL}/hoi-dap`}
                    className=' hover:text-[#FD841F] transition-all duration-300 text-sm capitalize  leading-10 text-[#d0d0d0]'
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li className=' '>
                  <img alt='footer-logo' src={`${URL}/_next/static/media/galaxy-logo-footer.7a918263.svg`}></img>
                </li>

                <ul className='flex mt-4 gap-3'>
                  <li>
                    <a href='https://www.facebook.com/galaxycinevn'>
                      <svg
                        aria-hidden='true'
                        focusable='false'
                        data-prefix='fab'
                        data-icon='square-facebook'
                        className=' h-8 w-8 text-gray-300 hover:text-[#FD841F] transition-all duration-300  '
                        role='img'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 448 512'
                      >
                        <path
                          fill='currentColor'
                          d='M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z'
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href='https://www.youtube.com/user/galaxymovies' target='_blank' rel='noreferrer'>
                      <svg
                        aria-hidden='true'
                        focusable='false'
                        data-prefix='fab'
                        data-icon='youtube'
                        className='h-8 w-8 text-gray-300 hover:text-[#FD841F] transition-all duration-300 '
                        role='img'
                        xmlns=' http://www.w3.org/2000/svg'
                        viewBox='0 0 576 512'
                      >
                        <path
                          fill='currentColor'
                          d='M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z'
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href='https://www.instagram.com/galaxycinema' target='_blank' rel='noreferrer'>
                      <svg
                        aria-hidden='true'
                        focusable='false'
                        data-prefix='fab'
                        data-icon='square-instagram'
                        className=' h-8 w-8 text-gray-300  hover:text-[#FD841F] transition-all duration-300 '
                        role='img'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 448 512'
                      >
                        <path
                          fill='currentColor'
                          d='M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z'
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
                <div className='mt-5'>
                  <a
                    href='http://online.gov.vn/Home/WebDetails/5005
                  '
                  >
                    <img
                      src={`${URL}/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Fglx_trade.61f6c35c.png&w=384&q=75`}
                      alt=''
                      className='h-12 w-32'
                    />
                  </a>
                </div>
              </ul>
            </div>
          </div>
          <div className='border-b-2 border-black w-full'></div>
          <div
            className='flex
          mt-3'
          >
            <div className='my-auto'>
              <img src={`${URL}/_next/static/media/galaxy-logo-footer.7a918263.svg`} alt='' />
            </div>
            <div className='pl-3 pr-2'>
              <div className='uppercase text-[#d0d0d0]'>công ty cổ phần phim thiên ngân</div>
              <div className='text-xs text-[#8d8d8d] '>
                <p className='leading-6'>
                  Toà nhà Bitexco Nam Long, 63A Võ Văn Tần, Phường 6, Quận 3, Tp. Hồ Chí Minh, Việt Nam
                  <br />
                  <svg
                    aria-hidden='true'
                    focusable='false'
                    data-prefix='fas'
                    data-icon='mobile'
                    className='inline-block h-3 w-3 '
                    role='img'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 384 512'
                  >
                    <path
                      fill='currentColor'
                      d='M80 0C44.7 0 16 28.7 16 64V448c0 35.3 28.7 64 64 64H304c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H80zm80 432h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H160c-8.8 0-16-7.2-16-16s7.2-16 16-16z'
                    />
                  </svg>
                  :{/* */}{' '}
                  <a
                    className='hover:text-[#FD841F] text-[#8d8d8d] transition-all duration-300'
                    href='tel:028.39.333.303'
                  >
                    028.39.333.303
                  </a>{' '}
                  {/* */}-{' '}
                  <svg
                    aria-hidden='true'
                    focusable='false'
                    data-prefix='fas'
                    data-icon='phone'
                    className='inline-block h-3 w-3  '
                    role='img'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 512 512'
                  >
                    <path
                      fill='currentColor'
                      d='M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z'
                    />
                  </svg>
                  :
                  <a className='hover:text-[#FD841F]  text-[#8d8d8d] transition-all duration-300' href='tel:19002224'>
                    19002224 (9:00 - 22:00)
                  </a>{' '}
                  {/* */}-{' '}
                  <svg
                    aria-hidden='true'
                    focusable='false'
                    data-prefix='fas'
                    data-icon='paper-plane'
                    className='inline-block h-3 w-3 '
                    role='img'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 512 512'
                  >
                    <path
                      fill='currentColor'
                      d='M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z'
                    />
                  </svg>
                  :
                  <a
                    className='hover:text-[#FD841F] text-[#8d8d8d] transition-all duration-300'
                    href='mailto:hotro@galaxystudio.vn'
                    target='_blank'
                    rel='noreferrer'
                  >
                    hotro@galaxystudio.vn
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
