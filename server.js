/**
 * Created by cuongnguyen on 8/13/20.
 */
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Router = require('./router');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb://localhost:27017/auth');

app.use(bodyParser.json({type: '*/*'}));
app.use(cors());
Router(app);

const port = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port);

console.log('server is running at port: ', port);
