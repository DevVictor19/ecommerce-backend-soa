const { getUsersServiceUrl } = require("../utils/env-config");
const { httpMethods } = require("../utils/http-methods");

/**
 * List of allowed authentication routes with their respective HTTP methods.
 *
 * @constant
 * @type {Array<{ path: string, method: string }>}
 * @property {string} path - The URL path of the route.
 * @property {string} method - The HTTP method allowed for the route (e.g., "GET", "POST").
 */
const authAllowedRoutes = [
  {
    path: "/auth/login",
    method: httpMethods.post,
  },
  {
    path: "/auth/signup",
    method: httpMethods.post,
  },
];
const authPrefix = "/auth";
const authServiceUrl = getUsersServiceUrl();

module.exports = { authAllowedRoutes, authPrefix, authServiceUrl };
