const http = require("http");
const user={
    name: "kaushal kumar",
    age: 19
}
const server = http.createServer((req, res) => { 
  let method = req.method;
  let url = req.url;
  console.log(method,url);

   if (method == "GET" && url == "/") {
    const users = user;
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  }

});
server.listen(3000,() => {
    console.log("Server is running on http://localhost:3000");
});