'use strict';

const logger = require('../utils/logger');
const uuid = require('uuid');
const panelGroup = require('../models/playerlist-list');
const accounts = require ('./accounts.js');

const player= {
  index(request, response) {
     const loggedInUser = accounts.getCurrentUser(request);  
    const positionId = request.params.id;
    logger.debug('Position id = ' + positionId);
    if (loggedInUser) {
    const viewData = {
      title: 'Players',
      player: panelGroup.getPosition(positionId),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };
     response.render('player', viewData);
    }
    else response.redirect('/');
   },
    deletePlayer(request, response) {
    const positionId = request.params.id;
    const playerId = request.params.playerid;
    logger.debug(`Deleting Player ${playerId} from squad panel ${positionId}`);
    panelGroup.removePlayer(positionId, playerId);
    response.redirect('/player/' + positionId);
  },
    addPlayer(request, response) {
    const positionId = request.params.id;
    const player = panelGroup.getPosition(positionId);
    const newPlayer = {
      id: uuid(),
      name: request.body.name,
      team: request.body.team,
      caps: request.body.caps,
    };
    panelGroup.addPlayer(positionId, newPlayer);
    response.redirect('/player/' + positionId);
  },
  updatePlayer(request, response) {
    const positionId = request.params.id;
    const playerId = request.params.playerid;
    logger.debug("updating player " + playerId);
    const updatedPlayer = {
      name: request.body.name,
      team: request.body.team,
      caps: request.body.caps,
    };
    panelGroup.editPlayer(positionId, playerId, updatedPlayer);
    response.redirect('/player/' + positionId);
  }
};

module.exports = player;