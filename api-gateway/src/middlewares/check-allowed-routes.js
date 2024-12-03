const { match } = require("path-to-regexp");

/**
 * Middleware to check if a route is allowed based on its path and HTTP method.
 *
 * @param {Array<{ path: string, method: string }>} allowedRoutes - An array of objects representing allowed routes.
 *   Each object should have a `path` (string) and `method` (string, e.g., "GET", "POST").
 * @returns {(request: import('fastify').FastifyRequest, reply: import('fastify').FastifyReply, done: Function) => void} Middleware function.
 *   Validates if the incoming request matches an allowed route and HTTP method.
 *   Responds with a 404 error if the route or method is not allowed.
 */
const checkAllowedRoutes = (allowedRoutes) => (request, reply, done) => {
  const isRouteAllowed = allowedRoutes.some((route) => {
    const isMethodMatching = route.method === request.method;
    const urlWithoutQuery = request.url.split("?")[0];
    const isPathMatching = match(route.path, { decode: decodeURIComponent })(
      urlWithoutQuery
    );

    return isMethodMatching && isPathMatching;
  });

  if (!isRouteAllowed) {
    reply.status(404).send({ message: "Route not Found" });
    return;
  }

  done();
};

module.exports = { checkAllowedRoutes };
