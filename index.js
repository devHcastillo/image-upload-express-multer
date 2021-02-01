const express = require("express");

const app = express();
const hbs = require("express-handlebars");
const path = require("path");
const { imageRouter } = require("./server/routes/router");

app.use(express.json());

//Serving static files
app.use(express.static(path.join(__dirname, "public")));

//setup view engine
app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultView: "default",
    layoutsDir: path.join(__dirname, "views"),
    partialsDir: path.join(__dirname, "views/partials"),
  })
);

app.use('/',imageRouter)

app.listen(3000, () => {
  console.log("Listen in port 3000");
});
