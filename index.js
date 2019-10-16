const express = require("express");

const server = express();

server.use(express.json());

const projects = [];
let totalOfRequests = 0;

/** Middlewares */

function projectExists(req, res, next) {
  const { id } = req.params;

  const project = projects.find(index => index.id == id);

  if (!project) {
    return res.status(400).json({ error: "Project not exists" });
  }

  return next();
}

function totalRequests(req, res, next) {
  totalOfRequests++;
  console.log(`Total de requesições: ${totalOfRequests}`);

  return next();
}

server.use(totalRequests);

/** Routes */

// localhost:3333/
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

  return res.status(201).json(project);
});

// Lista todos os projetos
server.get("/projects", (req, res) => {
  return res.json(projects);
});

// Busca pelo id e Altera o nome do projeto
server.put("/projects/:id", projectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(index => index.id == id);

  project.title = title;

  return res.status("202").json(project);
});

// Deletando projeto pelo id
server.delete("/projects/:id", projectExists, (req, res) => {
  const { id } = req.params;

  const index = projects.find(index => index.id == id);

  projects.splice(index, 1);

  return res.status(202).json({ success: "Project deleted" });
});

// Cria tarefas no Projeto
server.post("/projects/:id/tasks", projectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(index => index.id == id);

  project.tasks.push(title);

  return res.status(201).json(project);
});

server.listen("3333", () => {
  console.log("Server Running in http://localhost:3333");
});
