// start.js
const app = require('./server.js')
const port = 3030;

function listening(){
    // console.log(server);
    console.log(`Front end developer final project: running on localhost: ${port}`);
};

const server = app.listen(port, listening);