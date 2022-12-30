import { Task } from "../models/Task.js"

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOne({
            where: {
                id
            }
        })
        res.json(task);
    } catch (error) {
        return res.status(404).json({ message: "task doesnt exist" });
    }
}

export const createTask = async (req, res) => {
    const { name, done, projectId } = req.body;
    try {
        const newTask = await Task.create({
            name,
            done,
            projectId
        })
        res.json(newTask);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, done, projectId } = req.body;

        //otra forma de update solo los campos especifificados
        const taskUpd = await Task.findOne({
            where: {
                id,
            }
        })
        taskUpd.set(req.body);
        //await task.save();

        const task = await Task.findByPk(id);
        task.name = name;
        task.done = done;
        task.projectId = projectId;
        await task.save(task);
        res.json(task);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await Task.destroy({
            where: {
                id
            }
        });
        res.status(204);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}