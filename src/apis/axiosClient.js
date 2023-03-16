import axios from "axios";
import store from "../store";

// Setup các cấu hình mặc định cho axios
const axiosClient = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api/",
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgMjQiLCJIZXRIYW5TdHJpbmciOiIwOC8wNC8yMDIzIiwiSGV0SGFuVGltZSI6IjE2ODA5MTIwMDAwMDAiLCJuYmYiOjE2NjQyMTE2MDAsImV4cCI6MTY4MTA1OTYwMH0.HQfkAVQ_C4qH8T3vLwdtQfqQMRnagp260JXmrMN5lVs",
  },
});

// interceptors
axiosClient.interceptors.request.use((config) => {
  // config: nội dung request gửi lên server
  // ta sẽ thay đổi headers trong request trước khi nó được gửi lên server
  const { accessToken } = store.getState().auth.user || {};

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  // thành công
  (response) => {
    // Ta có thể thay đổi response trước khi response được trả ra cho nơi gọi request.
    // response.data: format của axios
    // .content: format của cybersoft
    return response.data.content;
  },
  // thất bại
  (error) => {
    // Ta có thể thay đổi error trước khi error được trả ra cho nơi gọi request.
    return Promise.reject(error.response?.data.content);
  }
);

export default axiosClient;
