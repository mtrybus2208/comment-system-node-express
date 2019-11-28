import http from "http";
import jwtLib from "jsonwebtoken";
import app from "./app";

const secret = process.env.COOKIES_TOKEN;
const port = process.env.PORT;
const server = http.createServer(app);

app.set("port", 4000);
server.listen(4000);

export default server;
