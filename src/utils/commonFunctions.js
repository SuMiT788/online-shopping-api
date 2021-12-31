const bcrypt = require("bcrypt");

const encryptData = (data) => {
  const salt = bcrypt.genSaltSync(10);
  const encryptedData = bcrypt.hashSync(data, salt);
  return encryptedData;
};

const bcryptCompare = async (str, encryptedStr) => {
  const result = await bcrypt.compare(str, encryptedStr);
  return result;
};

module.exports = { encryptData, bcryptCompare };
