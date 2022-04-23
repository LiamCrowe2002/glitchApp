'use strict';

// import express and initialise router
const express = require('express');
const router = express.Router();

// import controllers
const start = require('./controllers/start.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const player = require('./controllers/player.js');
const accounts = require ('./controllers/accounts.js');

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

// connect routes to controllers
router.get('/start', start.index);
router.get('/', start.index);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);

router.get('/player/:id', player.index);

router.get('/position/:id/deleteplayer/:playerid', player.deletePlayer);
router.post('/position/:id/addplayer', player.addPlayer);
router.post('/position/:id/updateplayer/:player', player.updatePlayer);

router.get('/dashboard/deleteposition/:id', dashboard.deletePosition);
router.post('/dashboard/addposition', dashboard.addPosition);

// export router module
module.exports = router;

