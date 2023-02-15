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
            // On crée un nouveau model en ajoutant la donnée récup
            const task  = await Task.create({name});
            // Renvoie de la task créée
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
        // On recherche l'Id pour identifier la task
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
    deleteTask: async function (req,res, next) {
        const taskId = Number(req.params.id);

        try {
            const task = await Task.findByPk(taskId);

            if (!task) {
                return next()
            }

            await task.destroy()
            res.status(204).json({statusCode: 204})
            
        } catch (err) {
            res.status(500).json({
                statusCode: 500,
                message: "Server error",
                fullErrorMessage: err
            })
        }
    },
    
};

module.exports = taskController;
