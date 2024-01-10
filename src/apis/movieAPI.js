import axiosClient from './axiosClient'

var myHeaders = new Headers()
myHeaders.append('Accept', 'application/json')
myHeaders.append('Accept-Language', 'en-US,en;q=0.9')
myHeaders.append('Connection', 'keep-alive')
myHeaders.append('Referer', 'https://galaxycine.vn')

myHeaders.append(
  'sec-ch-ua',
  '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"'
)
myHeaders.append('sec-ch-ua-mobile', '?0')
myHeaders.append('sec-ch-ua-platform', '"Windows"')
myHeaders.append('clientid', '3da4eba4-94dd-4e74-bc25-38e89a01fe07')
myHeaders.append('Content-Type', 'application/json')

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow',
  mode: 'cors'
}

const movieAPI = {
  getMovies: () => {
    return axiosClient.get('QuanLyPhim/LayDanhSachPhim', {
      params: {
        maNhom: 'GP09'
      }
    })
  },

  getBanners: () => {
    return axiosClient.get('QuanLyPhim/LayDanhSachBanner')
  },

  getMovieDetails: (movieId) => {
    return axiosClient.get('QuanLyPhim/LayThongTinPhim', {
      params: {
        maPhim: movieId
      }
    })
  },

  getLichChieu: (movieId) => {
    return axiosClient.get('QuanLyRap/LayThongTinLichChieuPhim', {
      params: {
        maPhim: movieId
      }
    })
  },

  getCinema: () => {
    return axiosClient.get('QuanLyRap/LayThongTinHeThongRap')
  },
  // getCinemaDetails: (cinemaId) => {
  //   return axiosClient.get("QuanLyRap/LayThongTinCumRapTheoHeThong", {
  //     params: {
  //       maHeThongRap: cinemaId,
  //     }
  //   })
  // },
  getCinemaBranchDetail: (branch) => {
    return axiosClient.get('QuanLyRap/LayThongTinLichChieuHeThongRap', {
      params: {
        maHeThongRap: branch
      }
    })
  },
  getTicket: (ticketid) => {
    return axiosClient.get('QuanLyDatVe/LayDanhSachPhongVe', {
      params: {
        MaLichChieu: ticketid
      }
    })
  },
  addMovie: (movie) => {
    // Đối với dữ liệu có định dạng đặc biệt như File,...
    // Ta cần phải tạo ra FormData để lưu trữ
    const formData = new FormData()
    // Duyệt qua từng thuộc tính trong object movie và thêm vào formData
    for (let key in movie) {
      formData.append(key, movie[key])
    }
    formData.append('maNhom', 'GP00')

    return axiosClient.post('QuanLyPhim/ThemPhimUploadHinh', formData)
  },

  createShowtime: (movie) => {
    return axiosClient.post('QuanLyDatVe/TaoLichChieu', movie)
  },

  getSubCinema: (ec) => {
    return axiosClient.get('QuanLyRap/LayThongTinCumRapTheoHeThong', {
      params: { maNhom: 'GP01', maHeThongRap: `${ec}` }
    })
  },

  bookTicket: (values) => {
    return axiosClient.post('QuanLyDatVe/DatVe', values)
  },

  getMovieCorner: async (type, type2) => {
    try {
      let apiUrl = `https://cors-anywhere-nd3f.onrender.com/https://www.galaxycine.vn/api/v2/mobile/content/post?&type[]=${type}&page=1&limit=4`

      if (type2) {
        apiUrl += `&type[]=${type2}`
      }

      const res = await fetch(apiUrl, requestOptions)
      const result = await res.json()
      return result.data.result
    } catch (error) {
      console.log(error)
    }
  },
  getCinemaMobile: async () => {
    try {
      const res = await fetch(
        'https://cors-anywhere-nd3f.onrender.com/https://www.galaxycine.vn/api/v2/mobile/cinemas',
        requestOptions
      )
      const cinemas = await res.json()
      return cinemas.data.result
    } catch (error) {
      console.log(error)
    }
  },
  getCommingMovies: async () => {
    try {
      const res = await fetch(
        `     
        https://cors-anywhere-nd3f.onrender.com/https://www.galaxycine.vn/api/v2/mobile/movies/comming`,
        requestOptions
      )
      const movies = await res.json()
      return movies.data.result
    } catch (error) {
      console.log(error)
    }
  },
  getFilmDetail: (filmId) => {
    return axiosClient.get('QuanLyPhim/LayThongTinPhim', {
      params: { MaPhim: filmId }
    })
  },
  getSchedule: (filmId) => {
    return axiosClient.get('QuanLyRap/LayThongTinLichChieuPhim', {
      params: { MaPhim: filmId }
    })
  }
}

export default movieAPI
