// require your server and launch it
const server = require('./api/server.js');
const port = 4000;
server.listen(port, () => {
  console.log(`\n* Server Running on httpL//localhost:${port} *\n`);
});
