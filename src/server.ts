import http from 'http';
import app from './app';

const { PORT } = process.env;
const server = http.createServer(app);

app.set('port', PORT);
server.listen(PORT);

export default server;
