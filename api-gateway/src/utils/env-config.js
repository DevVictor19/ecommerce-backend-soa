const getOrThrow = (name) => {
  const value = process.env[name];
  if (!value) throw new Error(`${name} env not set`);
  return value;
};

const getServerPort = () => getOrThrow("SERVER_PORT");
const getServerJwtSecret = () => getOrThrow("SERVER_JWT_SECRET");

const getUsersServiceUrl = () => getOrThrow("USERS_SERVICE");
const getProductsServiceUrl = () => getOrThrow("PRODUCTS_SERVICE");
const getCartsServiceUrl = () => getOrThrow("CARTS_SERVICE");

module.exports = {
  getServerPort,
  getServerJwtSecret,
  getUsersServiceUrl,
  getProductsServiceUrl,
  getCartsServiceUrl,
};
