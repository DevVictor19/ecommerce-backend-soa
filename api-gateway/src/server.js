require("dotenv").config();
const Fastify = require("fastify");
const proxy = require("@fastify/http-proxy");

const { getServerPort } = require("./utils/env-config");

const {
  authAllowedRoutes,
  authPrefix,
  authServiceUrl,
} = require("./routes/auth.routes");

const server = Fastify({
  logger: true,
});

const checkAllowedRoutes = (allowedRoutes) => (request, reply, done) => {
  const isAllowed = allowedRoutes.includes(request.url);

  if (!isAllowed) {
    reply.status(404).send({ message: "Not Found" });
    return;
  }

  done();
};

// proxy (host) /auth -> (service) auth-service-dns/auth
server.register(proxy, {
  upstream: authServiceUrl,
  prefix: authPrefix,
  rewritePrefix: "/auth",
  preHandler: checkAllowedRoutes(authAllowedRoutes),
});

server.listen({ port: Number(getServerPort()), host: "0.0.0.0" }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
