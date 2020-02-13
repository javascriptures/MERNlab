const todosController = require('./controllers/todos');

const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use('/todos', todosController);

app.listen(4000, () => {
  console.log('app listening on port 4000');
});