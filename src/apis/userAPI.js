import axiosClient from './axiosClient'

const MaNhom = 'GP00'
const userAPI = {
  getUsers: () => {
    return axiosClient.get(`QuanLyNguoiDung/LayDanhSachNguoiDung/`, {
      params: { MaNhom: MaNhom }
    })
  },

  getUserInfo: (user) => {
    return axiosClient.post(
      `QuanLyNguoiDung/LayThongTinNguoiDung`,
      { taiKhoan: user },
      {
        params: { taiKhoan: user }
      }
    )
  },

  updateProfile: (body) => {
    return axiosClient.put(`QuanLyNguoiDung/CapNhatThongTinNguoiDung`, {
      nd: body
    })
  }
}

export default userAPI
