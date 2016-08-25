// Invocar modo JavaScript 'strict'
'use strict';

// Cargar las dependencias de módulos
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  User = require('mongoose').model('Article');

// Crear la estrategia local del método de configuración
module.exports = function() {
  // Usar la estrategia local de Passport 
  passport.use(new LocalStrategy(User.authenticate()));
};