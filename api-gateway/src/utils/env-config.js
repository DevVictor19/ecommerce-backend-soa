const getOrThrow = (name) => {
  const value = process.env[name];
  if (!value) throw new Error(`${name} env not set`);
  return value;
};

const getServerPort = () => getOrThrow("SERVER_PORT");
const getUsersServiceUrl = () => getOrThrow("USERS_SERVICE");

module.exports = {
  getServerPort,
  getUsersServiceUrl,
};
