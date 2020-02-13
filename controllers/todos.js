const express = require('express');
const Todo = require('../db/schema');

const router = express.Router();

router.get('/', (req, res) => {
  Todo.find({})
    .then(todos => 
      res.json(todos));
    });

router.get('/todos', (req, res) => {
  Todo.find({})
    .then(todos =>
      res.json(todos))
});

router.get('/new', (req,res) => {
  res.render('new');
});

router.get('/:id/edit', (req, res) => {
  Todo.findById(req.params.id)
  .then(todo => {
    res.render('edit', todo);
  });
});

router.put('/:id', (req, res) => {
  const complete = req.body.complete === 'on' ? true: false;
  const todo = {
    title: req.body.title,
    complete
  }
  Todo.findOneAndUpdate({ _id: req.params.id }, todo, { new: true }).then(
    todo => {
      res.redirect('/todos');
    }
  );
});


router.get('/:id', (req, res) => {
  Todo.findById(req.params.id)
  .then(todo => {
    res.render('show', todo);
  });
});

router.post('/todos', (req, res) => {
  Todo.create(req.body)
    .then(todo => {
      res.redirect('/todos');
    })
    .catch(console.error);
});

module.exports = router;