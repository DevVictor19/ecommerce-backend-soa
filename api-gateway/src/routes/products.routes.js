const {
  addClientPermission,
  addAdminPermission,
} = require("../utils/app-roles");
const { getProductsServiceUrl } = require("../utils/env-config");
const { httpMethods } = require("../utils/http-methods");

/**
 * List of allowed products routes with their respective HTTP methods.
 *
 * @constant {Array<Object>} productsAllowedRoutes - Array of product-related routes
 * @property {string} path - The route path, can include parameters (e.g., "/products/:id")
 * @property {string} method - The HTTP method (e.g., 'GET', 'POST', 'PUT', 'DELETE')
 * @property {Array<string>} roles - The roles allowed to access the route (e.g., 'client', 'admin')
 *
 */
const productsAllowedRoutes = [
  {
    path: "/products",
    method: httpMethods.get,
    roles: addClientPermission(),
  },
  {
    path: "/products/:id",
    method: httpMethods.get,
    roles: addClientPermission(),
  },
  {
    path: "/products",
    method: httpMethods.post,
    roles: addAdminPermission(),
  },
  {
    path: "/products/:id",
    method: httpMethods.delete,
    roles: addAdminPermission(),
  },
  {
    path: "/products/:id",
    method: httpMethods.put,
    roles: addAdminPermission(),
  },
];

const productsPrefix = "/products";
const productsServiceUrl = getProductsServiceUrl();

module.exports = {
  productsAllowedRoutes,
  productsPrefix,
  productsServiceUrl,
};
