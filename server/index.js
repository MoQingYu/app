const express = require("express");
const routes = require("./routes");
const config = require("config-lite")(__dirname)

const app = express();

app.use(express.json())   
app.use(express.urlencoded({ extended: false }))
routes(app);

app.listen(config.port, function () {
  console.log(`pkg.name listening on port ${config.port}`)
})