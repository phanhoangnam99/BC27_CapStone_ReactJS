import axiosClient from "./axiosClient";



const MaNhom = "GP01"
const userAPI = {
   getUsers: () => {
      return axiosClient.get(`QuanLyNguoiDung/LayDanhSachNguoiDung/`, { params: { MaNhom: MaNhom } })
   },


}


export default userAPI