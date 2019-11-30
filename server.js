import http from "http";
import jwtLib from "jsonwebtoken";
import app from "./app";

const secret = process.env.COOKIES_TOKEN;
const {
  PORT
} = process.env;
const server = http.createServer(app);

app.set("port", PORT);
server.listen(PORT);

export default server;
