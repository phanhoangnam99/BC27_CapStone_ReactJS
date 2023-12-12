var myHeaders = new Headers()
myHeaders.append('Accept', 'application/json')
myHeaders.append('Accept-Language', 'en-US,en;q=0.9')
myHeaders.append('Connection', 'keep-alive')
myHeaders.append('Referer', 'localhost:3000')

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

const promotionAPI = {
  getPromotion: async () => {
    try {
      const res = await fetch(
        'https://cors-anywhere.herokuapp.com/https://www.galaxycine.vn/api/v2/mobile/promotions',
        requestOptions
      )
      const promo = await res.json()
      return promo.data.result
    } catch (error) {
      console.log(error)
    }
  }
}
export default promotionAPI
