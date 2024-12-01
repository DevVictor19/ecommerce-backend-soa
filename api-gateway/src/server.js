require("dotenv").config();
const Fastify = require("fastify");
const proxy = require("@fastify/http-proxy");

const { authRoutes } = require("./routes/auth.routes");

const server = Fastify({
  logger: true,
});

// >>>> /auth/login >>>>
server.register(proxy, {
  upstream: authRoutes.login.upstream,
  prefix: authRoutes.login.prefix,
  rewritePrefix: "",
  preHandler: (request, reply, done) => {
    if (request.url !== authRoutes.login.prefix) {
      reply.status(404).send({ message: "Not Found" });
      return;
    }

    done();
  },
});

// >>>> /auth/signup >>>>
server.register(proxy, {
  upstream: authRoutes.signup.upstream,
  prefix: authRoutes.signup.prefix,
  rewritePrefix: "",
  preHandler: (request, reply, done) => {
    if (request.url !== authRoutes.signup.prefix) {
      reply.status(404).send({ message: "Not Found" });
      return;
    }

    done();
  },
});

server.listen({ port: process.env.SERVER_PORT, host: "0.0.0.0" }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
