const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  let filename = "";
  switch (req.url) {
    case "/":
      filename = "../index.html";
      break;
    case "/about":
      filename = "../about.html";
      break;
    case "/services":
      filename = "../services.html";
      break;
    case "/contact": 
      filename = "../contact.html";
      break;
    default:
      filename = "../404.html";
      break;
  }

  fs.readFile(filename, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 not found");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
});

server.listen(8008, () => {
  console.log("Server running at http://localhost:8008");
});
