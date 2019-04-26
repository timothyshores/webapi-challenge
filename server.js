const express = require('express');

const actionsRouter = require('./actions/actionsRouter');
const projectsRouter = require('./projects/projectsRouter');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send(`
    <h2>Web 18 - Web API Sprint Challenge </h2>
    <p>Actions Endpoints</p>
    <ul>
        <li>GET /api/actions </li>
        <li>GET /api/actions/:id </li>
        <li>POST /api/actions </li>
        <li>DELETE /api/actions/:id</li>
        <li>PUT /api/actions/:id</li>
    </ul>
    <p>Projects Endpoints</p>
    <ul>
        <li>GET /api/projects </li>
        <li>GET /api/projects/:id </li>
        <li>POST /api/projects </li>
        <li>DELETE /api/projects/:id</li>
        <li>PUT /api/projects/:id</li>
    </ul>
    `);
});

server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

module.exports = server;
