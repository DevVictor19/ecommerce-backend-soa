const jwt = require("jsonwebtoken");
const { getServerJwtSecret } = require("../utils/env-config");

/**
 * Middleware for JWT authentication. Verifies if the JWT token is present and valid.
 * If the token is valid, the roles and userId extracted from the token are added to the request headers.
 * Otherwise, it returns a 401 error with an appropriate message.
 *
 * @param {import('fastify').FastifyRequest} request - The Fastify request object containing headers and other request details.
 * @param {import('fastify').FastifyReply} reply - The Fastify reply object used to send HTTP responses.
 * @param {Function} done - The callback function that should be called when the middleware is complete.
 *
 * @returns {void}
 */
const jwtAuth = (request, reply, done) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    reply.code(401).send({ message: "Token not provided or invalid" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, getServerJwtSecret());

    request.headers["x-user-roles"] = decoded.roles;
    request.headers["x-user-id"] = decoded.userId;

    done();
  } catch (err) {
    reply.code(401).send({ message: "Invalid or expired token" });
  }
};

module.exports = { jwtAuth };
