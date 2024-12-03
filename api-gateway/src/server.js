require("dotenv").config();
const Fastify = require("fastify");
const proxy = require("@fastify/http-proxy");

const { jwtAuth } = require("./middlewares/jwt-auth");
const { checkAllowedRoutes } = require("./middlewares/check-allowed-routes");
const { checkAuthorization } = require("./middlewares/check-authorization");

const { getServerPort } = require("./utils/env-config");

const {
  authAllowedRoutes,
  authPrefix,
  authServiceUrl,
} = require("./routes/auth.routes");
const {
  productsServiceUrl,
  productsPrefix,
  productsAllowedRoutes,
} = require("./routes/products.routes");

const fastify = Fastify({
  logger: true,
});

// proxy (host) /auth -> (service) auth-service-dns/auth
fastify.register(proxy, {
  upstream: authServiceUrl,
  prefix: authPrefix,
  rewritePrefix: "/auth",
  preHandler: checkAllowedRoutes(authAllowedRoutes),
});

// proxy (host) /products -> (service) products-service-dns/products
fastify.register(proxy, {
  upstream: productsServiceUrl,
  prefix: productsPrefix,
  rewritePrefix: "/products",
  preHandler: [
    checkAllowedRoutes(productsAllowedRoutes),
    jwtAuth,
    checkAuthorization(productsAllowedRoutes),
  ],
});

fastify.listen({ port: Number(getServerPort()), host: "0.0.0.0" }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
