// import app file
const app = require("./backend/app");
// make Server Listening on port 3002
// http://localhost/3002
app.listen(3002, () => {
  console.log("BE server is listening on Port 3002 ...");
});
