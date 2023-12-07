const express = require('express');
const sequelize = require('./config/connections');
const session = require('express-session');
const routes = require('./controllers/index');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'secretKey',
    cookie: {maxAge:400000},
    resave: true,
    saveUninitialized: true,
}

app.use(session(sess));

// Set the views directory
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
