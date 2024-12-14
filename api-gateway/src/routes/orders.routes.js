const {
  addAdminPermission,
  addClientPermission,
} = require("../utils/app-roles");
const { getOrdersServiceUrl } = require("../utils/env-config");
const { httpMethods } = require("../utils/http-methods");

/**
 * List of allowed orders routes with their respective HTTP methods.
 *
 * @constant {Array<Object>} ordersAllowedRoutes - Array of product-related routes
 * @property {string} path - The route path, can include parameters (e.g., "/orders/:id")
 * @property {string} method - The HTTP method (e.g., 'GET', 'POST', 'PUT', 'DELETE')
 * @property {Array<string>} roles - The roles allowed to access the route (e.g., 'client', 'admin')
 *
 */
const ordersAllowedRoutes = [
  {
    path: "/orders",
    method: httpMethods.get,
    roles: addAdminPermission(),
  },
  {
    path: "/orders/my-orders",
    method: httpMethods.get,
    roles: addClientPermission(),
  },
  {
    path: "/orders/my-orders",
    method: httpMethods.post,
    roles: addClientPermission(),
  },
  {
    path: "/orders/my-orders/:orderId",
    method: httpMethods.delete,
    roles: addClientPermission(),
  },
  {
    path: "/orders/my-orders/:orderId/payments/credit",
    method: httpMethods.post,
    roles: addClientPermission(),
  },
];

const ordersPrefix = "/orders";
const ordersServiceUrl = getOrdersServiceUrl();

module.exports = {
  ordersAllowedRoutes,
  ordersPrefix,
  ordersServiceUrl,
};
