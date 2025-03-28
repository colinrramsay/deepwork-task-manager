const express = require('express');
const router = express.Router();
const passport = require('passport');
const Task = require('../models/Task');
const { ensureAuth } = require('../middleware/auth');

//Fetch user tasks
//GET /task
router.get('/', ensureAuth, (req, res) => {
    const getTasks = async (req,res)=>{
        try{
            const tasks = await Task.find({user:req.user.id})
            res.json(tasks)
        }catch(err){
            console.error(err);
            // Validation error
            if (err.name === 'ValidationError') {
                return res.status(400).json({
                    message: 'Validation Error',
                    errors: err.errors
                });
            }
            // General server error
            res.status(500).json({
                message: 'Failed to create task',
                error: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message
            });
        }
    }
    getTasks(req, res)
});

//Delete task
//DELETE /tasks/:id
router.delete('/:id', ensureAuth, (req, res) => {
    const deleteTask = async (req,res)=>{
        console.log(req.params.id)
        try{
            await Task.findOneAndDelete({_id:req.params.id})
            console.log('Deleted task')
            res.json('Deleted task')
        }catch(err){
            console.error(err);
            // Validation error
            if (err.name === 'ValidationError') {
                return res.status(400).json({
                    message: 'Validation Error',
                    errors: err.errors
                });
            }
            // General server error
            res.status(500).json({
                message: 'Failed to create task',
                error: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message
            });
        }
    }
    deleteTask(req, res)
});

//Update task
//PUT /tasks/:id
router.put('/:id', ensureAuth, (req, res) => {
    const updateTask = async (req,res)=>{
        console.log(req.params.id)
        try{
            await Task.findOneAndUpdate({_id:req.params.id}, req.body)
            console.log('Toggled reminder')
            res.json('Toggled reminder')
        }catch(err){
            console.error(err);
            // Validation error
            if (err.name === 'ValidationError') {
                return res.status(400).json({
                    message: 'Validation Error',
                    errors: err.errors
                });
            }
            // General server error
            res.status(500).json({
                message: 'Failed to create task',
                error: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message
            });
        }
    }
    updateTask(req, res)
});

//Add task
//POST /tasks
router.post('/', ensureAuth, (req, res) => {
    console.log(req.user)
    const addTask = async (req,res)=>{
        try{
            req.body.user = req.user.id
            const task = await Task.create(req.body)
            console.log('Task has been added')
            res.json(task)
        }catch(err){
            console.error(err);
            // Validation error
            if (err.name === 'ValidationError') {
                return res.status(400).json({
                    message: 'Validation Error',
                    errors: err.errors
                });
            }
            // General server error
            res.status(500).json({
                message: 'Failed to create task',
                error: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message
            });
        }
    }
    addTask(req, res)
});

module.exports = router;
