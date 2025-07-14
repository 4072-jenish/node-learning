
const  http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    res.end('Hello World\n');

     


})

server.listen(8888, () => {
    console.log('Server is listening on port 8888 :)');
})

