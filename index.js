const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

/** Routes */

server.get("/", (req, res) => {
  //return res.send("Server Running");
  return res.json(projects[0]);
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

// Busca pelo id e Altera o nome do projeto
server.put("/projects/:id", (req, res) => {
  const { id } = req.params;

  projects.forEach(item => {
    if (item.id == id) {
      item.title = req.body.title;
      return res.json(item);
    }
  });

  return res.json({ error: "id not found" });
});

// Deletando projeto pelo id
server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  projects.forEach((item, index) => {
    if (item.id == id) {
      projects.splice(index, 1);
      return res.json({ success: "Project deleted" });
    }
  });

  return res.json({ error: "id not found" });
});

server.listen("3333", () => {
  console.log("Server Running in http://localhost:3333");
});
