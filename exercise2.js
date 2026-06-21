const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  const filePath = path.join(__dirname, "lib", "users.txt");

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Error reading file");
      return;
    }

    const lines = data.trim().split("\n");
    const headers = lines[0].split("|").map((h) => h.trim());

    let html = `
      <html>
      <head>
        <title>Users</title>
      </head>
      <body>
        <h2>User Table</h2>
        <table border="1" cellpadding="5" cellspacing="0">
          <tr>
    `;

    headers.forEach((h) => {
      html += `<th>${h}</th>`;
    });

    html += `</tr>`;

    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split("|").map((c) => c.trim());

      html += "<tr>";
      cols.forEach((col) => {
        html += `<td>${col}</td>`;
      });
      html += "</tr>";
    }

    html += `
        </table>
      </body>
      </html>
    `;

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  });
};