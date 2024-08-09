const Koa = require('koa');
const http = require('http');
const { Server } = require('socket.io');
const { PORT } = require('./config');

const app = new Koa();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

httpServer.listen({ port: PORT }, () => {
  console.log(`🚀 The server has been started on port ${PORT}!`);
});
