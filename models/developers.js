'use strict';

const developer = {

  developers: require('./developers.json').developers,

  getDevelopers() {
    return this.developers;
  },

};

module.exports = developer;