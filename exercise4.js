const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {

  if (req.url === "/home" || req.url === "/") {
    return sendFile(res, "home.html");
  }

  else if (req.url === "/about") {
    return sendFile(res, "about.html");
  }

  else if (req.url === "/contact") {
    return sendFile(res, "contact.html");
  }

  else {
    res.writeHead(404);
    res.end("Not Found");
  }
};

function sendFile(res, fileName) {
  const filePath = path.join(__dirname, "public", fileName);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Error loading file");
      return;
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
}