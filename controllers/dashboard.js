'use strict';

// import all required modules
const logger = require('../utils/logger');
const uuid = require('uuid');
const accounts = require ('./accounts.js');

const panelGroup = require('../models/playerlist-list.js');

// create dashboard object
const dashboard = {
  
  // index method - responsible for creating and rendering the view
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
    const viewData = {
      title: 'Positions Dashboard',
      positions: panelGroup.getUserPlaylists(loggedInUser.id),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };
    logger.info('about to render' + viewData.playlists);
    response.render('dashboard', viewData);
    }
    else response.redirect('/');
  },
  
  deletePosition(request, response) {
    const positionId = request.params.id;
    logger.debug(`Deleting Position ${positionId}`);
    panelGroup.removePosition(positionId);
    response.redirect('/dashboard');
  },
  
  addPosition(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newPosition = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      players: [],
    };
    logger.debug('Creating a new Playlist' + newPosition);
    panelGroup.addPosition(newPosition);
    response.redirect('/dashboard');
  },
};

// export the dashboard module
module.exports = dashboard;