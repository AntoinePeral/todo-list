const { Task } = require('../models');

const taskController = {

    listTasks: async function (req, res) {
        // Récupérer la liste des taches
        const allTasks = await Task.findAll()
        // Renvoyer la liste des taches en json
        res.json(allTasks)
    },
    addTask: async function (req,res) {
        // Récupérer les données en JSON dans le body
        const name = req.body.name;
        console.log(name);
        console.log(req.body);

        try {
            const task  = await Task.create({name});
            res.json(task)
        } catch (err) {
            res.status(500).json({
                statusCode: 500,
                message: "Server error",
                fullErrorMessage: err
            })
        }
    },
    updateTask: async function (req,res) {

    },
    deleteTask: async function (req,res) {

    },
    
};

module.exports = taskController;
