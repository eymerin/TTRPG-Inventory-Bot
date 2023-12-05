const express = require('express');
const sequelize = require('./config/connections');
const routes = require('./controllers/index');

const app = express();
const PORT = process.env.PORT || 3001;

// Set the views directory
app.set('views', 'view');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
