import { database } from "../database/db.js";
import { randomUUID } from "node:crypto";
import buildRoutePath from "../util/build-route-path.js";
import TaskController from "../controllers/task-controller.js";

export const routes = [
  {
    method: "GET",
    url: buildRoutePath("/tasks"),
    handler: TaskController.getTasks,
  },
  {
    method: "POST",
    url: buildRoutePath("/tasks"),
    handler: TaskController.createTask,
  },
  {
    method: "PUT",
    url: buildRoutePath("/tasks/:id"),
    handler: TaskController.putTask,
  },
  {
    method: "DELETE",
    url: buildRoutePath("/tasks/:id"),
    handler: TaskController.deleteTask,
  },
  {
    method: "PATCH",
    url: buildRoutePath("/tasks/:id/complete"),
    handler: TaskController.patchTask,
  },
];
