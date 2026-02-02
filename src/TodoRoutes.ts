import { Router } from "express";
import { TodoController } from "./TodoController";

export class TodoRoutes {
    public router: Router;
    private controller: TodoController;

    constructor() {
        this.router = Router();
        this.controller = new TodoController();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get("/", this.controller.getAll);
        this.router.get("/:id", this.controller.getOne);
        this.router.post("/", this.controller.create);
        this.router.put("/:id", this.controller.update);
        this.router.delete("/:id", this.controller.delete);
    }
}
