export const regex = (resource) => new RegExp(`^${resource}\/[a-zA-Z0-9]+$`);

export const returnErrorWithMessage = (res, code, message) => {
  res.statusCode = code || 500;
  res.setHeader("Content-Type", "application/json");
  return res.end(
    JSON.stringify({ message: message || "Internal Server Error" })
  );
};

export const getResourceId = (url) => url.split("/")[2];

export const processBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
};