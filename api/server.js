const express = require("express");
const server = express();
const accountsRoutes = require('./accounts/accounts-router')

server.use(express.json());
server.use('/api/accounts', accountsRoutes)

module.exports = server;
