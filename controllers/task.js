const Task = require('../models/Task');
const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const APIError = require('../utils/errors');

const getTasks = catchAsync(async (req, res) => {
  const { id } = req.user;
  const tasks = await Task.findAll({ where: { userId: id } });

  res.status(httpStatus.OK).send({tasks});
});

const getTask = catchAsync(async (req, res) => {
  const { id: userId } = req.user;
  const { id: taskId } = req.params;
  const task = await Task.findOne({ where: { userId, id: taskId } });

  res.status(httpStatus.OK).send(task);
});

const createTask = catchAsync(async (req,res) => {
  const input = req.body;
  const task = await Task.create({...input, userId: req.user.id});
  res.send(task);
});

const updateTask = catchAsync(async (req,res) => {
  const input = req.body;
  const { id: userId } = req.user;
  const { id: taskId } = req.params;
  const result = await Task.update({...input},{where: {userId, id: taskId}});
  if (!result.length) {
    throw new APIError({message:'Task not found', status: httpStatus.NOT_FOUND});
  } else {
    res.send({message: 'Update task successful'});
  }
});


const deleteTask = catchAsync(async (req,res) => {
  const {id} = req.params;
  const result = await Task.destroy({where: {id}});
  if (!result) {
    throw new APIError({message:'Task not found', status: httpStatus.NOT_FOUND});
  } else {
    res.send('Delete task successful');
  }
});

module.exports = {
  getTasks,
  getTask,
  deleteTask,
  createTask,
  updateTask,
};
