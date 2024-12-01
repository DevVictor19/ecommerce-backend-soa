const authRoutes = {
  login: {
    prefix: "/auth/login",
    upstream: `${process.env.AUTH_SERVICE}/auth/login`,
  },
  signup: {
    prefix: "/auth/signup",
    upstream: `${process.env.AUTH_SERVICE}/auth/signup`,
  },
};

module.exports = { authRoutes };
