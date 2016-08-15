// Invocar modo JavaScript 'strict'
'use strict';

// Cargar las dependencias del módulo

var	articles = require('../../app/controllers/huellaController'),
passport = require('passport');

// Definir el método routes de module
module.exports = function(app) {
	// Configurar la rutas base a 'articles'  

	app.route('/api/articles')
	   .get(articles.list)
	   .post(articles.create);
	
	// Configurar las rutas 'articles' parametrizadas
	app.route('/api/articles/:articleId')
	   .get(articles.read)
	   .put(articles.update)
	
	// Configurar el parámetro middleware 'articleId'   
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
       failureRedirect: '/signin',
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