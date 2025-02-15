import { createServer } from "http";
import { regex, returnErrorWithMessage } from "./utils.js";
import {
  getPosts,
  getPost,
  createPost,
  updatePosts,
  deletePosts,
} from "./crudOperations.js";

const PORT = process.env.PORT;

const requestHandler = async (req, res) => {
  const { method, url } = req;

  if (url === "/posts") {
    if (method === "GET") return await getPosts(req, res);
    else if (method === "POST") return await createPost(req, res);
    else {
      return returnErrorWithMessage(res, 405, "Method not allowed");
    }
  } else if (regex("/posts").test(url)) {
    if (method === "GET") return await getPost(req, res);
    else if (method === "PUT") return await updatePosts(req, res);
    else if (method === "DELETE") await deletePosts(req, res);
    else {
      return returnErrorWithMessage(res, 405, "Method not allowed");
    }
  } else {
    return returnErrorWithMessage(res, 404, "Resource not found");
  }
};

const server = createServer(requestHandler);

server.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);