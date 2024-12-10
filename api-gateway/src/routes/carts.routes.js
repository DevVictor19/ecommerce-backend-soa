const { addClientPermission } = require("../utils/app-roles");
const { getCartsServiceUrl } = require("../utils/env-config");
const { httpMethods } = require("../utils/http-methods");

/**
 * List of allowed carts routes with their respective HTTP methods.
 *
 * @constant {Array<Object>} cartsAllowedRoutes - Array of product-related routes
 * @property {string} path - The route path, can include parameters (e.g., "/carts/:id")
 * @property {string} method - The HTTP method (e.g., 'GET', 'POST', 'PUT', 'DELETE')
 * @property {Array<string>} roles - The roles allowed to access the route (e.g., 'client', 'admin')
 *
 *
 */
const cartsAllowedRoutes = [
  {
    path: "/carts/my-cart",
    method: httpMethods.get,
    roles: addClientPermission(),
  },
  {
    path: "/carts/my-cart",
    method: httpMethods.delete,
    roles: addClientPermission(),
  },
  {
    path: "/carts/my-cart/products/:id",
    method: httpMethods.post,
    roles: addClientPermission(),
  },
  {
    path: "/carts/my-cart/products/:id",
    method: httpMethods.delete,
    roles: addClientPermission(),
  },
];

const cartsPrefix = "/carts";
const cartsServiceUrl = getCartsServiceUrl();

module.exports = {
  cartsAllowedRoutes,
  cartsPrefix,
  cartsServiceUrl,
};
