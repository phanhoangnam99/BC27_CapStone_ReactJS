/* eslint-disable no-unused-vars */
import { DevTool } from '@hookform/devtools'
import { Input } from '@material-tailwind/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { notification } from 'antd'
import userAPI from 'apis/userAPI'
import BackGround from 'components/AuthLayout/BackGround'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { createGlobalStyle } from 'styled-components'
import { getUserFromLS, setUserToLS } from 'utils/utils'

export default function Profile() {
  const user = getUserFromLS()

  const userInfo = getUserFromLS()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue
  } = useForm({
    defaultValues: {
      // taiKhoan: `${userInfo?.taiKhoan}`,
      // matKhau: `${userInfo?.matKhau}`,
      // hoTen: `${userInfo?.hoTen}`,
      // email: `${userInfo?.email}`,
      // soDt: `${userInfo?.soDT}`,
      // maLoaiNguoiDung: `${userInfo?.maLoaiNguoiDung}`
      taiKhoan: '',
      matKhau: '',
      hoTen: '',
      email: '',
      soDt: '',
      maLoaiNguoiDung: ''
    }
  })

  const { data: profile, refetch } = useQuery({
    queryKey: ['profile'],

    queryFn: async () => {
      return await userAPI.getUserInfo(userInfo?.taiKhoan)
    }
  })

  console.log('profile', profile)

  useEffect(() => {
    if (profile) {
      setValue('taiKhoan', profile.taiKhoan)
      setValue('matKhau', profile.matKhau)
      setValue('hoTen', profile.hoTen)
      setValue('email', profile.email)
      setValue('soDt', profile.soDT)
      setValue('maLoaiNguoiDung', profile.maLoaiNguoiDung)

      profile.thongTinDatVe?.map((danhSachGhe) =>
        danhSachGhe?.danhSachGhe
          .filter((ghe) => ghe.maHeThongRap === 'Galaxy')
          .map((ghe) =>
            setTicketHistory((prev) => [
              ...prev,
              {
                ngayGioDat: danhSachGhe?.ngayDat,
                tenPhim: danhSachGhe?.tenPhim,
                thoiLuong: `${danhSachGhe?.thoiLuongPhim} phút`,
                giaVe: danhSachGhe?.giaVe,
                tenHeThongRap: ghe.tenHeThongRap,
                tenRap: ghe.tenRap,
                tenGhe: ghe.tenGhe,
                maHeThongRap: ghe.maHeThongRap
              }
            ])
          )
      )
    }
  }, [profile])

  const updateProfileMutation = useMutation({
    mutationFn: (body) => userAPI.updateProfile(body)
  })
  const onSubmit = async (data) => {
    console.log(data)
    try {
      const res = await updateProfileMutation.mutateAsync(data)
      console.log(res)
      setUserToLS(data)
      notification.success({ message: `${res.data.message}` })
    } catch (error) {
      notification.error({ message: `${error}` })
    }
  }

  const onError = (errors, e) => {
    console.log(errors)
    Object.entries(errors).forEach(([name, error]) => {
      if (error.type === 'required') {
        name = name === 'taiKhoan' ? 'Tài khoản' : name
        name = name === 'matKhau' ? 'Mật khẩu' : name
        name = name === 'hoTen' ? 'Họ tên' : name
        name = name === 'email' ? 'Email' : name
        name = name === 'soDt' ? 'Số điện thoại' : name
        notification.error({
          message: `${name} không được để trống`
        })
      }
    })
  }

  const [ticketHistory, setTicketHistory] = useState([])

  return (
    <div className=''>
      <BackGround className=''>
        <div className='flex  items-center justify-center '>
          <div className='w-[60%] gap-3  flex flex-col z-[1] relative mt-4 '>
            <div className='w-full bg-white p-2'>
              <p className='font-bold'>Cài đặt tài khoản chung</p>
              <p> Thông tin có thể được thay đổi</p>
              <div className=' mt-4 w-full h-[1px] bg-gray-300'></div>

              <form onSubmit={handleSubmit(onSubmit, onError)}>
                <div className='md:grid md:grid-cols-12 gap-3 mt-4 flex flex-col'>
                  <div className='col-span-6 col-span-12'>
                    <Input
                      label='Tài khoản*'
                      shrink
                      {...register('taiKhoan', {
                        required: true
                      })}
                      containerProps={{ className: 'max-w-full min-w-0' }}
                    />
                  </div>
                  <div className='col-span-6'>
                    <Input
                      label='Mật khẩu*'
                      shrink
                      {...register('matKhau', {
                        required: true
                      })}
                      containerProps={{ className: 'max-w-full min-w-0' }}
                    />
                  </div>
                  <div className='col-span-6'>
                    <Input
                      label='Họ tên*'
                      shrink
                      {...register('hoTen', {
                        required: true
                      })}
                      containerProps={{ className: 'max-w-full min-w-0' }}
                    />
                  </div>
                  <div className='col-span-6'>
                    <Input
                      label='Email*'
                      shrink
                      {...register('email', {
                        required: true
                      })}
                      containerProps={{ className: 'max-w-full min-w-0' }}
                    />
                  </div>
                  <div className='col-span-6'>
                    <Input
                      label='Số điện thoại* '
                      shrink
                      {...register('soDt', {
                        required: true
                      })}
                      containerProps={{ className: 'max-w-full min-w-0' }}
                    />
                  </div>
                  <div className='col-span-6 '>
                    <Input
                      className=' bg-[#eceff1] pointer-events-none'
                      label='Mã loại người dùng'
                      shrink
                      containerProps={{
                        className:
                          'rounded bg-[#eceff1] pointer-events-none cursor-not-allowed max-w-full min-w-0'
                      }}
                      {...register('maLoaiNguoiDung')}
                    />
                  </div>
                </div>
                <div className=' my-4 w-full h-[1px] bg-gray-300'></div>
                <div className='flex w-full justify-end'>
                  <button
                    className=' px-3 whitespace-nowrap  py-2  text-white shadow-md hover:bg-[#af2e1a] uppercase bg-[#fb4226] rounded-sm transition-all'
                    type='submit'
                  >
                    Cập nhật
                  </button>
                </div>{' '}
              </form>
            </div>
            <div className='bg-white w-full  mt-3 mb-8'>
              <div className='p-2'>
                <p className='font-bold'> Lịch sử đặt vé</p>

                <div className='h-[1px] bg-gray-300 w-full my-3'></div>

                <div className='flex flex-wrap'>
                  {ticketHistory?.map((ticket, index) => (
                    <div key={ticket.tenGhe} className='md:w-1/2 w-full my-3'>
                      <span>
                        Ngày đặt:
                        {new Date(ticket.ngayGioDat).toLocaleDateString(
                          'en-GB'
                        )}{' '}
                        |{' '}
                        {new Date(ticket.ngayGioDat).toLocaleTimeString(
                          'en-GB',
                          { hour: '2-digit', minute: '2-digit' }
                        )}
                      </span>
                      <p className='text-red-500 font-bold text-[20px]'>
                        Tên phim: {ticket.tenPhim}
                      </p>

                      <p>
                        Thời lượng: {ticket.thoiLuong}, Giá vé: {ticket.giaVe}
                      </p>

                      <p className='text-green-400 text-[20px] font-bold'>
                        {ticket.tenHeThongRap}
                      </p>
                      <span>
                        {ticket.tenRap}, Ghế số: {ticket.tenGhe}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </BackGround>
      <DevTool control={control} /> {/* set up the dev tool */}
    </div>
  )
}
