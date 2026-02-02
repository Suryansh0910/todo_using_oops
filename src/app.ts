import express from "express";
import mongoose from "mongoose";
import { TodoRoutes } from "./TodoRoutes";

export class App {
    public app: express.Application;
    private port: number = 8000;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.connectDb();
    }

    private config() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private routes() {
        const todoRoutes = new TodoRoutes();
        this.app.use("/api/todos", todoRoutes.router);
    }

    private async connectDb() {
        try {
            await mongoose.connect("mongodb+srv://suryansh0910sg_db_user:suryansh0910%40@cluster0.mhd0c9r.mongodb.net/todolist");
            console.log("Connected to MongoDB");
        } catch (err) {
            console.error("MongoDB connection error", err);
        }
    }

    public start() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

const app = new App();
app.start();