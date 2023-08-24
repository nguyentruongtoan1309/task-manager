const {Joi} = require('express-validation');

const createTask = {
  body: Joi.object().keys({
    title: Joi.string().required().min(1),
    content: Joi.string(),
  }),
};

const updateTask = {
  body: Joi.object().keys({
    title: Joi.string().required().min(1),
    content: Joi.string(),
    status: Joi.string().valid('TODO', 'DOING', 'CANCEL', 'DONE'),
  }),
};


module.exports = {
  createTask,
  updateTask,
};