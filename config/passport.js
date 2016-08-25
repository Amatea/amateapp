// Invocar modo JavaScript 'strict'
'use strict';

// Cargar las dependencias de módulos
var passport = require('passport'),
    mongoose = require('mongoose');

//Definir el método de configuración de Passport
module.exports = function() {
  //Cargar el modelo 'User'
  var Articles = mongoose.model('Article');
  
  //Usar el método 'serializeUser' para serializar la id del usuario
  passport.serializeUser(Articles.serializeUser());
passport.deserializeUser(Articles.deserializeUser());

  //Cargar los archivos de configuración de estrategias de Passport
  require('./strategies/local.js')();
  require('./strategies/google.js')();
  require('./strategies/facebook.js')();
};