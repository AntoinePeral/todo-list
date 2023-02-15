const { Task } = require('../models');

const taskController = {

    listTasks: async function (req, res) {
        // Récupérer la liste des taches
        const allTasks = await Task.findAll()
        // Renvoyer la liste des taches en json
        res.json(allTasks)
    },
    addTask: async function (req,res) {

    },
    updateTask: async function (req,res) {

    },
    deleteTask: async function (req,res) {

    },
    
};

module.exports = taskController;
