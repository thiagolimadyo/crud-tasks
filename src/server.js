import http from "node:http";
import json from "./middlewares/json.js";
import { routes } from "./routes/tasks.js";

const server = http.createServer();
server.on("request", async (req, res) => {
  const { url, method } = req;

  await json(req, res);

  const route = routes.find((route) => {
    if (method === route.method && url.search(route.url) !== -1) {
      return route;
    }
  });

  if (route) {
    try {
      const routeParams = url.match(route.url);
      req.param = routeParams.groups;
    } catch {
      req.param = null;
    }

    return route.handler(req, res);
  }

  res.writeHead(404).end("404 - Not Found");
});

server.listen(3333, () => console.log("Server started at port 3333"));
