const http = require('http');
const port = process.env.port || 5000
const app = require('./app')

const server = http.createServer(app)

server.listen(port,()=>{
    console.log("app is running")
})