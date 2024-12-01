const authAllowedRoutes = ["/auth/login", "/auth/signup"];
const authPrefix = "/auth";
const authServiceUrl = `${process.env.AUTH_SERVICE}`;

module.exports = { authAllowedRoutes, authPrefix, authServiceUrl };
