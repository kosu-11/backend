const http =require("http");
const fs =require("fs");

const server = http.createServer((req, res) => {
    const url =new URL(req.url,`http://${req.headers.host}`);
const pathname = url.pathname;

if (req.method ==="GET" && pathname ==="/") {
  res.writeHead(200, {"Content-Type":"text/plain" });
  res.end("Welcome to Notes API");
}
 // res.writeHead(200, {"Content-Type":"text/plain" });
 // res.end("Server is running");
});

server.listen(3000,() => {console.log("Server running on http://localhost:3000");
});
