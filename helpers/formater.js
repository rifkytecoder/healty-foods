function formater(harga) {
  return `Rp ${harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')},00`
}

module.exports = formater