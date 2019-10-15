const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

/** Routes */

server.get("/", (req, res) => {
  return res.send("Server Running");
});

// Cria novo Projeto
server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

// Lista todos os projetos
server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.listen("3333", () => {
  console.log("Server Running in http://localhost:3333");
});
