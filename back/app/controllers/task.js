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
        const taskId = Number(req.params.id);

        try {
            // On cherche la tâche avec le bon ID
            const task = await Task.findByPk(taskId);

            // Si pas de tâche trouvé alors 404
            if (!task) {
                next();
                return;
            }
            // On récupère les données à modifier
            const name = req.body.name;
            // On met à jour le model avec les données
            await task.update({name});
            // On renvoie la réponse en Json
            res.json(task)

        } catch (err) {
            res.status(500).json({
                statusCode: 500,
                message: "Server error",
                fullErrorMessage: err
            })
        }

    },
    deleteTask: async function (req,res) {

    },
    
};

module.exports = taskController;
