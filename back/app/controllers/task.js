const { Task } = require('../models');
const errors = require ('../modules/errors')

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

        if(typeof name != 'string' || name.length < 2) {
            errors.error400(res)
        }

        try {
            // On crée un nouveau model en ajoutant la donnée récup
            const task  = await Task.create({name});
            // Renvoie de la task créée
            res.json(task)

        } catch (err) {
            errors.error500(res, err)
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
            errors.error500(res, err)
        }

    },
    deleteTask: async function (req,res, next) {
        // On récup l'id de la tâche
        const taskId = Number(req.params.id);

        try {
            // On récupère la tâche par l'id
            const task = await Task.findByPk(taskId);

            // Si on ne la trouve pas on retourne une 404
            if (!task) {
                return next()
            }

            // On détruit la task sélectionner
            await task.destroy()
            // On renvoie la 204 ("No-content") dans le header
            res.status(204).json({statusCode: 204})
            // Si erreur serveur
        } catch (err) {
            errors.error500(res, err)
        }
    },
    
};

module.exports = taskController;
