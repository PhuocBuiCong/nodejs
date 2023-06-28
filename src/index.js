const path = require("path");
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const handlebars = require("express-handlebars");
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
const route = require("./routes");
const db = require("./config/db");
// Connect to DB

db.connect();

//template engine
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
// init route
route(app);
