import { readFile, writeFile } from "node:fs/promises";

const databasePath = new URL("./database.json", import.meta.url);

class Database {
  #db = {};

  constructor() {
    this.#loadDatabase();
  }

  async #persist() {
    await writeFile(databasePath, JSON.stringify(this.#db));
  }

  async #loadDatabase() {
    try {
      const data = await readFile(databasePath, { encoding: "utf-8" });
      this.#db = JSON.parse(data);
    } catch {
      this.#persist();
    }
  }

  select(table, query = null) {
    if (query) {
      const data = this.#db[table].filter(
        (task) =>
          task.title.toLowerCase().includes(query.search.toLowerCase()) ||
          task.description.toLowerCase().includes(query.search.toLowerCase())
      );
      return data;
    }
    const data = this.#db[table] ?? null;
    return data;
  }

  async create(table, task) {
    if (Array.isArray(this.#db[table])) {
      this.#db[table].push(task);
    } else {
      this.#db[table] = [task];
    }
    await this.#persist();
  }

  async update(table, id, updatedData) {
    if (Array.isArray(this.#db[table])) {
      const taskIndex = this.#db[table].findIndex((task) => task.id === id);

      if (taskIndex !== -1) {
        const atualTask = this.#db[table].find((task) => task.id === id);

        const taskUpdated = {
          ...atualTask,
          title: updatedData.title ?? atualTask.title,
          description: updatedData.description ?? atualTask.description,
          updated_at: Date.now(),
        };

        this.#db[table][taskIndex] = taskUpdated;

        await this.#persist();

        return taskUpdated;
      }
    }
    return null;
  }

  async delete(table, id) {
    if (Array.isArray(this.#db[table])) {
      const taskIndex = this.#db[table].findIndex((task) => task.id === id);

      if (taskIndex !== -1) {
        this.#db[table].splice(taskIndex, 1);
        await this.#persist();

        return id;
      }
    }
    return null;
  }

  async updateComplete(table, id) {
    if (Array.isArray(this.#db[table])) {
      const taskIndex = this.#db[table].findIndex((task) => task.id === id);

      if (taskIndex !== -1) {
        const atualTask = this.#db[table].find((task) => task.id === id);

        const updatedTask = {
          ...atualTask,
          updated_at: Date.now(),
          completed_at: atualTask.completed_at ? null : Date.now(),
        };

        this.#db[table][taskIndex] = updatedTask;

        await this.#persist();

        return this.#db[table][taskIndex];
      }
    }
    return null;
  }
}

export const database = new Database();
