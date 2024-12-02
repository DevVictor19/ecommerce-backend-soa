const { getUsersServiceUrl } = require("../utils/env-config");

const authAllowedRoutes = ["/auth/login", "/auth/signup"];
const authPrefix = "/auth";
const authServiceUrl = getUsersServiceUrl();

module.exports = { authAllowedRoutes, authPrefix, authServiceUrl };
