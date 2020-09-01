const http = require('http');

// callback function
const server = http.createServer((req, res) => {
    console.log(req);
});

// listen funciton is a process where nodejs will not immediately exit our script but where
// nodejs will instead keep this running to listen for incoming request
server.listen(3000);