const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Task = require('./models/task');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB Connected.');
    })
    .catch((error) => {
        console.log('MongoDB Error : ', error);
    });

// Get All Tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find().sort({
            createdAt: -1
        });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});
// CREATE TASK
app.post('/tasks', async (req, res) => {

    try {

        const newTask = new Task(req.body);

        const savedTask = await newTask.save();

        res.status(201).json(savedTask);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});
// Update TASK
app.put('/tasks/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        if (!updatedTask) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});
// DELETE TASK
app.delete('/tasks/:id', async (req, res) => {

    try {

        const deletedTask = await Task.findByIdAndDelete(
            req.params.id
        );

        if (!deletedTask) {

            return res.status(404).json({
                message: 'Task not found'
            });

        }

        res.json({
            message: 'Task deleted successfully'
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});
app.listen(5001, () => {
    console.log('Server running on port 5001');
});