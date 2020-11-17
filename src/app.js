const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid, v4 } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const newRepository = {
    id: v4(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(newRepository);

  return response.json(newRepository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(r => r.id === id);
  if(repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found' });
  }

  const editedRepository = repositories[repositoryIndex];
  editedRepository.title = title;
  editedRepository.url = url;
  editedRepository.techs = techs;

  return response.json(editedRepository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  
  const repositoryIndex = repositories.findIndex(r => r.id === id);
  if(repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found' });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  
  const repositoryIndex = repositories.findIndex(r => r.id === id);
  if(repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found' });
  }

  const editedRepository = repositories[repositoryIndex];
  editedRepository.likes += 1;

  return response.json(editedRepository);
});

module.exports = app;
