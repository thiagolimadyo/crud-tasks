import { database } from "../database/db.js";
import { randomUUID } from "node:crypto";
import buildRoutePath from "../util/build-route-path.js";
import TaskController from "../controllers/task-controller.js";

export const routes = [
  {
    url: buildRoutePath("/tasks"),
    method: "GET",
    handler: TaskController.getTasks,
  },
  {
    url: buildRoutePath("/tasks"),
    method: "POST",
    handler: TaskController.createTask,
  },
  {
    url: buildRoutePath("/tasks/:id"),
    method: "PUT",
    handler: TaskController.updateTask,
  },
  {
    url: buildRoutePath("/tasks/:id"),
    method: "DELETE",
    handler: TaskController.deleteTask,
  },
  {
    url: buildRoutePath("/tasks/:id/complete"),
    method: "PATCH",
    handler: TaskController.updateCompleteTask,
  },
];
