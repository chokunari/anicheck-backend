//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// import script files
const getOgp = require('./getOgp');

// define the Express app
const app = express();

// the database
const questions = [];

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));

/*
// 雛形
app.get('/getOgp/:officialURL', (req, res) => {
  res.send(imgSrc);
});
*/

// アニメ公式サイトURLをfrontendからjsonで受け取りOGPの画像srcを取得、frontendに返却する。
app.post('/getOgp', async (req, res) => {
  const data = await getOgp.getOgpData(req.body.reqURL);
  res.status(200).send(data);
});
// start the server
app.listen(process.env.PORT || 4000, () => {
  console.log(`listening on port ${process.env.PORT || 4000}`);
});