const listVoucher = [
 'VIDEO-774915179429920'
]
async function addVoucher(F) {
  try {
    let e = await fetch(
        'https://shopee.vn/api/v2/voucher_wallet/save_voucher',
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin'
          },
          body: JSON.stringify(F),
          mode: 'cors',
          credentials: 'include'
        }
      ),
      _ = await e.json()
    await new Promise((F) => setTimeout(F, 500)),
      _ && 14 === _.error
        ? console.error(`M\xe3: ${F.voucher_code} - Lỗi: ${_.error_msg}`)
        : console.log(`Đ\xe3 th\xeam m\xe3: ${F.voucher_code}`)
  } catch (o) {
    console.error('Lỗi: ', o)
  }
}
async function addAllVouchers() {
  while (true) {
    for (let F of listVoucher)
      await addVoucher({ voucher_code: F, need_user_voucher_status: !0 })
  }
}
addAllVouchers()
