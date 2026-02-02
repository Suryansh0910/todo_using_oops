import mongoose from "mongoose";

class SchemaFactory {
    public todoSchema: mongoose.Schema;
    public userSchema: mongoose.Schema;

    constructor() {
        this.todoSchema = new mongoose.Schema({
            title: { type: String, required: true },
            priority: { type: String, default: "medium" },
            completed: { type: Boolean, default: false }
        }, { timestamps: true });

        this.userSchema = new mongoose.Schema({
            username: { type: String, required: true, unique: true },
            todos: [this.todoSchema]
        }, { timestamps: true });
    }
}

class TodoModel {
    public model;

    constructor() {
        const schemas = new SchemaFactory();
        this.model = mongoose.model("TodoUser", schemas.userSchema);
    }
}

export const todoModel = new TodoModel().model;
