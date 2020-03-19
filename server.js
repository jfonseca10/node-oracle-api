const http = require("http");
const express = require("express");

const userRoute = require("./src/routes/user");

const app = express();
const server = http.createServer(app);

app.use("/user", userRoute);

server.listen("8080", () => {
  console.log(`aplicacion en ejecucion puerto 8080`);
});
