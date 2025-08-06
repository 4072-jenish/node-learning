const express = require('express');
const server =  express();
const port = 8808;


server.get('/', (req, res) => {
    res.end('Hello World!');
})

server.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
