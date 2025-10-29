import { readFile, writeFile } from "node:fs/promises";

const databasePath = new URL("../database.json", import.meta.url);

class Database {
  #db = {};

  constructor() {
    this.loadDatabase();
  }

  async #persist() {
    await writeFile(databasePath, JSON.stringify(this.#db));
  }

  async loadDatabase() {
    try {
      const data = await readFile(databasePath, { encoding: "utf-8" });
      this.#db = JSON.parse(data);
    } catch {
      this.#persist();
    }
  }

  select(table) {
    const data = this.#db[table] ?? [];
    return data;
  }

  insert(table, task) {
    if (Array.isArray(this.#db[table])) {
      this.#db[table].push(task);
    } else {
      this.#db[table] = [task];
    }
    this.#persist();
  }
}

export const database = new Database();
