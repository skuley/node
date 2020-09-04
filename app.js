const http = require('http');

// callback function
const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);
    // process.exit();
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title><head>');
    res.write('<body><h1>Hello From my Node.js Server!</h1></body>');    
    res.write('</html>');
    // after writing headers and all the data to response body, we call end and it is point where must not write anymore.
    res.end();
});

// listen funciton is a process where nodejs will not immediately exit our script but where
// nodejs will instead keep this running to listen for incoming request
server.listen(3000);