import { database } from "../database/db.js";
import dateFormat from "../util/date-format.js";
import { randomUUID } from "node:crypto";
import extractQueryParam from "../util/extract-query-param.js";

export default class TaskController {
  static getTasks(req, res) {
    const { query } = req;
    const queryParams = query ? extractQueryParam(query) : null;

    const tasks = database.select("tasks", queryParams);

    if (tasks) {
      const tasksWithFormatedDates = tasks.map((task) => {
        return {
          ...task,
          created_at: task.created_at ? dateFormat(task.created_at) : null,
          completed_at: task.completed_at
            ? dateFormat(task.completed_at)
            : null,
          updated_at: task.updated_at ? dateFormat(task.updated_at) : null,
        };
      });
      return res.end(JSON.stringify(tasksWithFormatedDates));
    }
    return res.writeHead(404).end();
  }

  static async createTask(req, res) {
    const { title, description } = req.body;
    console.log(title, description);

    const task = {
      id: randomUUID(),
      title,
      description,
      completed_at: null,
      created_at: Date.now(),
      updated_at: null,
    };

    await database.create("tasks", task);

    res.writeHead(201).end();
  }

  static async updateTask(req, res) {
    const { id } = req.params;
    const { title, description } = req.body;

    const result = await database.update("tasks", id, {
      title,
      description,
    });

    res.writeHead(result ? 200 : 404).end();
  }

  static async deleteTask(req, res) {
    const { id } = req.params;
    const result = await database.delete("tasks", id);

    res.writeHead(result ? 200 : 404).end();
  }

  static async updateCompleteTask(req, res) {
    const { id } = req.params;
    const result = await database.updateComplete("tasks", id);

    res.writeHead(result ? 200 : 404).end();
  }
}
