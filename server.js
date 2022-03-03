const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  //file path root that we will be appending to based on request url path
  let path = './views/';

  if (req.url === '/css-test.css') {
    res.setHeader('Content-Type', 'text/css');
    path += 'css-test.css';
  } else {
    res.setHeader('Content-Type', 'text/html');
    switch (req.url) {
      case '/':
      case '/index':
      case '/home':
        res.statusCode = 200;
        path += 'index.html';
        break;
      case '/about':
        res.statusCode = 200;
        path += 'about.html';
        break;
      case '/contact-me':
      case '/contact':
        res.statusCode = 200;
        path += 'contact-me.html';
        break;
      default:
        res.statusCode = 404;
        path += '404.html';
    }
  }

  //try to serve up the html file based on route
  fs.readFile(path, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end();
    } else {
      res.end(data);
    }
  });
});

server.listen(3000, 'localhost', () => {
  console.log('listening for requests');
});
