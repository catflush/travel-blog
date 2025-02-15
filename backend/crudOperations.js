import { getResourceId } from "./utils.js";
import { returnErrorWithMessage, processBody } from "./utils.js";
import pg from "pg";
const { Client } = pg;

const pgURI = process.env.PG_URL;

export const getPosts = async (req, res) => {
  try {
    const client = new Client({ connectionString: pgURI });
    await client.connect();
    const results = await client.query("SELECT * FROM posts");
    await client.end();
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(results.rows));
  } catch (err) {
    returnErrorWithMessage(res, 500, err.message);
  }
};
export const getPost = async (req, res) => {
  try {
    const id = getResourceId(req.url);
    const client = new Client({ connectionString: pgURI });
    await client.connect();
    const results = await client.query("SELECT * FROM posts WHERE id = $1", [
      id,
    ]);
    await client.end();
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(results.rows));
  } catch (err) {
    returnErrorWithMessage(res, 500, err.message);
  }
};
export const createPost = async (req, res) => {
  try {
    const body = await processBody(req);
    if (!body) return returnErrorWithMessage(res, 400, "Body is required");
    const parsedBody = JSON.parse(body);
    const client = new Client({ connectionString: pgURI });
    await client.connect();
    const results = await client.query(
      "INSERT INTO posts (author,title,content,cover,date) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
      [
        parsedBody.author,
        parsedBody.title,
        parsedBody.content,
        parsedBody.cover,
        parsedBody.date,
      ]
    );
    await client.end();
    res.statusCode = 201;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(results.rows));
  } catch (err) {
    returnErrorWithMessage(res, 500, err.message);
  }
};
export const updatePosts = async (req, res) => {
  try {
    const id = getResourceId(req.url);
    const body = await processBody(req);
    if (!body) return returnErrorWithMessage(res, 400, "Body is required");
    const parsedBody = JSON.parse(body);
    const client = new Client({ connectionString: pgURI });
    await client.connect();
    const results = await client.query(
      "UPDATE posts SET author = $1, title = $2, content = $3, cover = $4, date = $5, WHERE id = $6 RETURNING *;",
      [
        parsedBody.author,
        parsedBody.title,
        parsedBody.content,
        parsedBody.cover,
        parsedBody.date,
        id,
      ]
    );
    await client.end();
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(results.rows));
  } catch (err) {
    returnErrorWithMessage(res, 500, err.message);
  }
};
export const deletePosts = async (req, res) => {
  try {
    const id = getResourceId(req.url);
    const client = new Client({ connectionString: pgURI });
    await client.connect();
    const results = await client.query("DELETE FROM posts WHERE id = $1", [
      id,
    ]);
    await client.end();
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Post deleted succesfully!" }));
  } catch (err) {
    returnErrorWithMessage(res, 500, err.message);
  }
};