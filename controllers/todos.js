const express = require('express');
const Todo = require('../db/schema');

const router = express.Router();

router.get('/', (req, res) => {
  Todo.find({})
    .then(todos => 
      res.json(todos));
    });

router.get('/:id', (req, res) => {
    Todo.findById(req.params.id)
    .then(todo => res.json(todo));
});

router.get('/:id/edit', (req, res) => {
    Todo.findById(req.params.id)
    .then(todo => res.json(todo)
    );
});

router.post('/', (req, res) => {
    Todo.create(req.body)
      .then(todo => res.json(todo))
  });

router.put('/:id/edit', (req, res) => {
const complete = req.body.complete === 'on' ? true: false;
const todo = {
    title: req.body.title,
    complete
}
Todo.findOneAndUpdate({ _id: req.params.id }, todo, { new: true }).then(
    todo => 
    res.json(todo)
);
});

router.delete("/:id", (req, res) => {
    // use title as a param to find the record we want to remove
    Todo.findOneAndDelete({ id: req.params._id }).then(todo => {
      // send back the deleted document
      res.json(todo);
    })
  });

module.exports = router;