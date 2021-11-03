const dotenv = require('dotenv');
const expressWinston = require('express-winston');
const winston = require('winston');
const cors = require('cors');


const express = require('express');

dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    optionsSuccessStatus: 200,
  }),
);

app.use(express.json());


app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: false,
  expressFormat: true,
  colorize: false,
  ignoreRoute: function (req, res) { return false; }
}));

const db = require("./models");
// db.sequelize.sync();
// 
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

require("./routes/newProposal.routes")(app);
require("./routes/signedProposals.routes")(app);


app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
}));


app.listen(4000, () => {
    console.log(`Server listening on 4000`);
})