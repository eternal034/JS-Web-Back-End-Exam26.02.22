const express = require('express');
const appConfig = require('./config/express');
const databaseConfig = require('./config/database');
const routesConfig = require('./config/routes');

start();

async function start() {
  const app = express();

  appConfig(app);
  await databaseConfig(app);
  routesConfig(app);

  //TODO ----> DELETE THIS
  app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
  });

  app.listen(3000, () => console.log(`Server started on port 3000`));
}
