const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const port = process.env.PORT || 8080;

var options = {
  explorer: true
};

app
 .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))
  .use(cors())
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes/index'));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
