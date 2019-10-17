module.exports.encryptorToken = (data) => {
  const cipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0))
    const byteHex = n => ('0' + Number(n).toString(16)).substr(-2)
    const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code)

    return text => text.split('').map(textToChars).map(applySaltToChar).map(byteHex).join('')
  }

  const Cipher = cipher(process.env.SECRET_KEY)
  const CipherText = Cipher(data.toString())
  return CipherText
}
