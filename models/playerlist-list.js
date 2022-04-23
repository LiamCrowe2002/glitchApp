'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const panelGroup = {

  store: new JsonStore('./models/playerlist-list.json', { playerCol: [] }),
  collection: 'playerCol',

  getAllPositions() {
    return this.store.findAll(this.collection);
  },

  getPosition(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addPosition(positions) {
    this.store.add(this.collection, positions);
  },

  removePosition(id) {
    const positions = this.getPosition(id);
    this.store.remove(this.collection, positions);
  },

  /* removeAllPositions() {
    this.store.removeAll(this.collection);
  }, */

  addPlayer(id, player) {
    const positions = this.getPosition(id);
    positions.players.push(player);
  },

  removePlayer(id, playerId) {
    const positions = this.getPosition(id);
    const players = positions.players;
    _.remove(players, { id: playerId});
  },
  
  editPlayer(id, playerId, updatedPlayer) {
    const positions = this.getPosition(id);
    const players = positions.players;
    const index = players.findIndex(player => players.id === playerId);
    players[index].name = updatedPlayer.name;
    players[index].team = updatedPlayer.team;
    players[index].caps = updatedPlayer.caps;
  },
  
   getUserPlaylists(playerid) {
    return this.store.findBy(this.collection, { userid: playerid });
  }
};

module.exports = panelGroup;