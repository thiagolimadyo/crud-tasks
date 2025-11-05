import { database } from "../database/db.js";
import dateFormat from "../util/date-format.js";
import { randomUUID } from "node:crypto";

export default class TaskController {
  static getTasks(req, res) {
    const tasks = database.select("tasks");

    const tasksWithFormatedDates = tasks.map((task) => {
      return {
        ...task,
        created_at: task.created_at ? dateFormat(task.created_at) : null,
        completed_at: task.completed_at ? dateFormat(task.completed_at) : null,
        updated_at: task.updated_at ? dateFormat(task.updated_at) : null,
      };
    });
    res.end(JSON.stringify(tasksWithFormatedDates));
  }

  static async createTask(req, res) {
    const { title, description } = req.body;

    const task = {
      id: randomUUID(),
      title,
      description,
      completed_at: null,
      created_at: Date.now(),
      updated_at: null,
    };

    await database.insert("tasks", task);

    res.writeHead(201).end();
  }

  static async putTask(req, res) {
    res.end("PUT");
  }

  static deleteTask(req, res) {
    res.end("DELETE");
  }

  static patchTask(req, res) {
    res.end("PATCH");
  }
}
