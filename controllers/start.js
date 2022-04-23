'use strict';

// import all required modules
const logger = require('../utils/logger');
const panelGroup = require('../models/playerlist-list.js');
const accounts = require ('./accounts.js');

// create start object
const start = {
  
  // index method - responsible for creating and rendering the view
   index(request, response) {

    const loggedInUser = accounts.getCurrentUser(request);
    logger.info('start rendering');

    if(loggedInUser){


    const panel = panelGroup.getAllPositions();

    let numPositions = panel.length;

    let numPlayers = 0;

    for (let item of panel) {
        numPlayers += item.players.length;
    }
    
    // display confirmation message in log
    logger.info('start rendering');
    
    // create view data object (contains data to be sent to the view e.g. page title)
    const viewData = {
        title: 'Six Nations 2022 | Irish National Team',
        totalPositions: numPositions,
        totalPlayers: numPlayers,
    };
    
  response.render('start', viewData);
    }
    else response.redirect('/');
   },
};

// export the start module
module.exports = start;