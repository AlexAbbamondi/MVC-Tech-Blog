//required modules
const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const path = require("path");
const helpers = require("./utils/auth");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//const for helpers
const hbs = exphbs.create({ helpers });

//new instance of express
const app = express();
//dynamic port to use or 3001
const PORT = process.env.PORT || 3001;

// Set up sessions
const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

//use sessions
app.use(session(sess));

//handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//use json with express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//load static public files
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
