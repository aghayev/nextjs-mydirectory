const http = require("http");

const host = 'localhost';
const port = 8000;

http.createServer(function(req,res){
  console.log('server:received request');

//  console.log(req.method, req.url, req.headers);

console.log(req.method)

  if (req.method === 'POST') {
    var body = [];
  req.on('data', function(chunk) {
      body.push(chunk);
  }).on('end', function() {
      body = Buffer.concat(body).toString();
      if (body) console.log(JSON.parse(body));
  });
  }

  res.writeHead(204,{'Content-Type':'text/plain'});
  //res.end('success\n');
  console.log('server:sent result');
}).listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
})


