// import express from "express";
// import request from "request";
// import path from "path";

// import latest from "./src/api/latest";
// import last24 from "./src/api/last24";

// const app = express();

// app.use(express.static("public"));
// const __dirname = path.resolve();

// const netlifyRoutes = {
//   latest,
//   last24,
// };

// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/app/index.html");
// });

// const listener = app.listen(process.env.PORT, function () {
//   console.log("Your app is listening on port " + listener.address().port);
// });

// server.js
/* eslint-disable no-console */
// const express = require("express");
import express from "express";
import path from "path";
const __dirname = path.resolve();

const devProxy = {
  "/.netlify": {
    target: "http://localhost:9000",
    pathRewrite: { "^/.netlify/functions": "" },
  },
};

const port = parseInt(process.env.PORT, 10) || 3000;
const env = process.env.NODE_ENV;
const dev = env !== "production";

const handle = express();

(async function run() {
  const app = express();
  console.log("get proxy");
  const proxyMiddleware = await import("http-proxy-middleware");
  app.use(express.static("dist/public"));
  app.get("/", function (req, res) {
    res.sendFile(__dirname + "/dist/index.html");
  });

  // Set up the proxy.
  if (dev && devProxy) {
    Object.keys(devProxy).forEach(function (context) {
      app.use(
        proxyMiddleware.default.createProxyMiddleware(
          (context, devProxy[context])
        )
      );
    });
  }

  const listener = app.listen(port, (err) => {
    if (err) {
      throw err;
    }
    console.log(`> Ready on port http://${"localhost"}:${port} [${env}]`);
  });
})();
