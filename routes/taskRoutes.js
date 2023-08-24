const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {taskControllers} = require('../controllers');
const { validate } = require('express-validation');
const { taskValidations } = require('../validations');

router.route('/tasks')
  .get(auth, taskControllers.getTasks)
  .post(auth, validate(taskValidations.createTask), taskControllers.createTask);

router.route('/tasks/:id')
  .get(auth, taskControllers.getTask)
  .put(auth, validate(taskValidations.updateTask), taskControllers.updateTask)
  .delete(auth, taskControllers.deleteTask);

module.exports = router;