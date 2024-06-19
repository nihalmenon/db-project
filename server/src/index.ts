const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 3001;
const server = http.createServer(app); 


server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = server;