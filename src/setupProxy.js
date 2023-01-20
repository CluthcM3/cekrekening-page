const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api/check", {
      target: "https://cekrek.heirro.dev",
      changeOrigin: true,
    })
  );
};
