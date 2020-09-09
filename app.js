const http = require('http');
const fs = require('fs');

// callback function
const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    
    if (url === '/') {
        // '===' means if url is a string and has that value
        res.write('<html>');
        res.write('<head><title>Enter Message</title><head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        // after writing headers and all the data to response body, we call end and it is point where must not write anymore.
        return res.end();
    }

    if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            //fs.writeFileSync('message.txt', message);
            /* 
                writeFileSync() is a function that makes a file synchronously and never skip to the next line (block the code execution) until the file or that function is complete.
                this is very simple and fast when the size of the file is small, but when file gets > 100mb, it can cause problems.
            */
           fs.writeFile('message.txt', message, (err) => {
               res.writeHead(302, {'Location' : '/'});
               return res.end();
           });
           /* 
                writeFile() is a funciton where you should use due to the asynchronous nature of node.js
           */
        });

    }
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