const express = require('express');

const actionsRouter = require('./actions/actionsRouter');
const projectsRouter = require('./projects/projectsRouter');
const Projects = require('./projects/projectModel');

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

const validProjectID = (req, res, next) => {
    const { project_id } = req.body;
    const message404 = { error: `Project id: ${project_id} does not exist` };

    req.method === 'POST'
        ? Projects
            .get(project_id)
            .then(projects => {
                projects === null
                    ? res.status(404).json(message404)
                    : next();
            })
            .catch(err => console.log(err))
            .catch(error => { res.status(500).json(message500) })
        : next();
}

server.use('/api/actions', validProjectID, actionsRouter);
server.use('/api/projects', projectsRouter);

module.exports = server;
