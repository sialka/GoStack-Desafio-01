const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  return res.send("Server Running");
});

server.listen("3333", () => {
  console.log("Server Running in http://localhost:3333");
});
