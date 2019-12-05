module.exports.decryptorToken = (data) => {
  const decipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));

    const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);

    return encoded => encoded.match(/.{1,2}/g).map(hex => parseInt(hex, 16)).map(applySaltToChar).map(charCode => String.fromCharCode(charCode)).join('');
  };

  const Decipher = decipher(process.env.SECRET_KEY);
  const DecipherText = Decipher(data);
  return DecipherText;
};
