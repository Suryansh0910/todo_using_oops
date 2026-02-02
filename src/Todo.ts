import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    priority: { type: String, default: "medium" },
    completed: { type: Boolean, default: false }
}, { timestamps: true });

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    todos: [todoSchema]
}, { timestamps: true });

class TodoModel {
    public model;

    constructor() {
        this.model = mongoose.model("TodoUser", userSchema);
    }
}

export const todoModel = new TodoModel().model;
