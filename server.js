const express = require('express');
const sequelize = require('./config/connections');
const session = require('express-session');
const routes = require('./controllers/index');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  session({
    secret: 'secretKey',
    resave: true,
    saveUninitialized: true,
  })
);

// Set the views directory
app.set('views', 'view');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
