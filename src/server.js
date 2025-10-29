import http from "node:http";
import json from "./middlewares/json.js";
import { randomUUID } from "node:crypto";
import { database } from "./database/db.js";

const server = http.createServer();
server.on("request", async (req, res) => {
  const { url, method } = req;

  await json(req, res);

  if (method === "GET" && url === "/tasks") {
    const tasks = database.select("tasks");
    return res.writeHead(201).end(JSON.stringify({ tasks }));
  }

  if (method === "POST" && url === "/tasks") {
    if (req.body) {
      const { title, description } = req.body;

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: Date.now(),
        updated_at: null,
      };

      const result = database.insert("tasks", task);
      console.log(result);

      return res.writeHead(201).end(JSON.stringify({ task }));
    }
    return res.writeHead(400).end(JSON.stringify({ msg: "404 - Bad Request" }));
  }

  res.writeHead(404).end("404 - Not Found");
});

server.listen(3333, () => console.log("Server started at port #3333"));
