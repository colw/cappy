const proxy = require("http-proxy-middleware").createProxyMiddleware;
const Bundler = require("parcel-bundler");
const express = require("express");

let bundler = new Bundler("src/index.html", {
  cache: false,
  watch: true,
});
let app = express();

app.use(
  "/.netlify/functions",
  proxy({
    target: "http://localhost:9000",
  })
);

app.use(bundler.middleware());

app.listen(Number(process.env.PORT || 1234));
