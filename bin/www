#!/usr/bin/env node

import chalk from 'chalk';
import server from '../server';

const {
  PORT
} = process.env;

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      console.error(`${PORT} requires elevated privileges`);
      break;
    case 'EADDRINUSE':
      console.error(`${PORT} is already in use`);
      break;
    default:
      throw error;
  }

  process.exit(1);
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  console.log(chalk.italic.green(`✅  The server is running at ${PORT}/`))
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.on('error', onError);
server.on('listening', onListening);
