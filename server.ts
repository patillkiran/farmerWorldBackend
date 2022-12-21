import 'zone.js/node';
const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");

import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { existsSync } from 'fs';
import { join } from 'path';
import { AppServerModule } from './src/main.server';

const dotenv = require('dotenv');
const app = express();
dotenv.config({path: './config.env'});
const farmerRoute = require('./routes/farmerRoute');
const bodyParser = require('body-parser');
const http = require('http');
app.use(express.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const db = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(db, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(con => {
    console.log('DB connection successful')
})

app.use('/api', farmerRoute);
const distFolder = join(process.cwd(), 'dist/farmer-world/browser');
const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
app.engine('html', ngExpressEngine({
bootstrap: AppServerModule,
}));

app.set('view engine', 'html');
app.set('views', distFolder);

// Example Express Rest API endpoints
// server.get('/api/**', (req, res) => { });
// Serve static files from /browser
app.get('*.*', express.static(distFolder, {
maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Accept", "application/json");
    res.header("Content-Type", "application/json");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

var options = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }
  app.use(cors(options));

const port = process.env.port || 3000;
const server = http.createServer(app);
app.listen(port, () => {
    console.log(`app is running on ${port}`);
})

