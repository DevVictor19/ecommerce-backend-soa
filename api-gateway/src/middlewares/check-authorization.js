const { match } = require("path-to-regexp");

/**
 * Middleware to check use authorization
 *
 * @param {Array<{ path: string, method: string, roles: Array<string> }>} allowedRoutes - An array of objects representing allowed routes.
 * @returns {(request: import('fastify').FastifyRequest, reply: import('fastify').FastifyReply, done: Function) => void}
 */
const checkAuthorization = (allowedRoutes) => (request, reply, done) => {
  const route = allowedRoutes.find((r) => {
    const isMethodMatching = r.method === request.method;
    const urlWithoutQuery = request.url.split("?")[0];
    const isPathMatching = match(r.path, { decode: decodeURIComponent })(
      urlWithoutQuery
    );

    return isMethodMatching && isPathMatching;
  });

  if (!route) {
    reply.status(403).send({ message: "Unauthorized" });
    return;
  }

  const isAuthorized = route.roles.some((role) =>
    request.headers["x-user-roles"].includes(role)
  );

  if (!isAuthorized) {
    reply.status(403).send({ message: "Unauthorized" });
    return;
  }

  done();
};

module.exports = { checkAuthorization };
