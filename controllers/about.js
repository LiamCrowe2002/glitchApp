'use strict';

// import all required modules
const logger = require('../utils/logger');
const developer = require('../models/developers.js');
const accounts = require ('./accounts.js');

// create about object
const about = {
  
  // index method - responsible for creating and rendering the view
   index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info('about rendering');
    if (loggedInUser) {
      const viewData = {
        title: 'About the Playlist App',
        developers: developer.getDevelopers(),
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      };
      response.render('about', viewData);
    }
    else response.redirect('/');    
  },
};

// export the about module
module.exports = about;