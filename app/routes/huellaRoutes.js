
'use strict';


var	articles = require('../../app/controllers/huellaController'),
passport = require('passport');


module.exports = function(app) {
	

	app.route('/api/articles')
	   .get(articles.list)
	   .post(articles.create);
	
	
	app.route('/api/articles/:articleId')
	   .get(articles.read)
	   .put(articles.update)
	
	
	app.param('articleId', articles.articleByID);

	//Configurar las rutas 'signup'
  app.route('/signup')
     .get(articles.renderSignup)
     .post(articles.signup);

  //Configurar las routes 'signin'
  app.route('/signin')
     .get(articles.renderSignin)
     .post(passport.authenticate('local', {
       successRedirect: '/',
       failureRedirect: '/signup',
       failureFlash: true
     }));
     
 // Configurar las rutas Google OAuth 
  app.get('/oauth/google', passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
    failureRedirect: '/signin'
  }));
  app.get('/oauth/google/callback', passport.authenticate('google', {
    failureRedirect: '/signin',
    successRedirect: '/'
  }));

  // Configurar las rutas Facebook

  app.get('/auth/facebook', passport.authenticate('facebook', { scope: [ 'email' ] }));
  app.get('/auth/facebook/callback', passport.authenticate('facebook',{ 
    successRedirect: '/', 
    failureRedirect: '/signin' 
  }));

  //Configurar la route 'signout'
  app.get('/signout', articles.signout);

	};