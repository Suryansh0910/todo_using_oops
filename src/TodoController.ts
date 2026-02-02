import { Request, Response } from "express";
import { todoModel } from "./Todo";

export class TodoController {

    async getAll(req: Request, res: Response) {
        try {
            const users = await todoModel.find();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: "Server Error" });
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            const user = await todoModel.findOne({ username: req.params.id });
            if (user) {
                return res.json(user);
            }
            res.status(404).json({ error: "User not found" });
        } catch (error) {
            res.status(500).json({ error: "Server Error" });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { username, title, priority } = req.body;

            if (!username || !title) {
                return res.status(400).json({ error: "Username and Title are required" });
            }

            const user = await todoModel.findOneAndUpdate(
                { username: username },
                {
                    $push: {
                        todos: { title, priority }
                    }
                },
                { new: true, upsert: true }
            );

            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: "Error processing request" });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const todoId = req.params.id;
            const updateData = req.body;

            const updates: any = {};
            if (updateData.title !== undefined) updates["todos.$.title"] = updateData.title;
            if (updateData.priority !== undefined) updates["todos.$.priority"] = updateData.priority;
            if (updateData.completed !== undefined) updates["todos.$.completed"] = updateData.completed;

            const user = await todoModel.findOneAndUpdate(
                { "todos._id": todoId },
                { $set: updates },
                { new: true }
            );

            if (!user) return res.status(404).json({ error: "Todo not found" });
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: "Error updating todo" });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const todoId = req.params.id;

            const user = await todoModel.findOneAndUpdate(
                { "todos._id": todoId },
                { $pull: { todos: { _id: todoId } } },
                { new: true }
            );

            if (!user) return res.status(404).json({ error: "Todo not found" });
            res.json({ message: "Deleted successfully", user });
        } catch (error) {
            res.status(500).json({ error: "Error deleting todo" });
        }
    }
}
