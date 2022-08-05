// primeiro arquivo a ser executado
const express = require('express');
const cors = require('cors');
const { uuid, isUuid } = require('uuidv4');

const app = express();
app.use(cors());
app.use(express.json());

const plantas = [];

function logRequests(req,res, next){
  const { method, url } = req;
  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);
  next(); // proximo middleware
  console.timeEnd(logLabel);
}

function idValidation(req, res, next){
  const { id } = req.params;

  if (!isUuid(id)) {
    return res.status(400).json({error: 'Invalid plant ID'});
  }

  return next();
}

app.use(logRequests);
app.use('/plants/:id', idValidation); // para determinar o uso apenas nos ids

app.get('/plants', (req, res) => {
  const { category } = req.query;

  const results = category ? plantas.filter(plant => plant.category.includes(category)) : plantas;

  return res.json(results);
});

app.post('/plants', (req, res) => {

  const { name , category } = req.body;
  const planta = { id: uuid(), name, category };

  plantas.push(planta);

  return res.json(planta);
});

app.put('/plants/:id', idValidation, (req, res) => { // id eh um parametro

  const { id } = req.params;
  const { name , category } = req.body;

  const plantIndex = plantas.findIndex(plant => plant.id === id);

  if (plantIndex < 0){
    return res.status(400).json({error: 'Plant not found!'});
  }

  const plant = {
    id, name, category
  };

  plantas[plantIndex] = plant;
  return res.json(plant);
});

app.delete('/plants/:id', idValidation, (req, res) => { // id eh um parametro

  const { id } = req.params;
  const plantIndex = plantas.findIndex(plant => plant.id === id);

  if (plantIndex < 0){
    return res.status(400).json({error: 'Plant not found!'});
  }

  plantas.splice(plantIndex, 1);

  return res.status(204).send();
});

app.listen(3333, () => {
  console.log('Back-end iniciated! ✔')
});
