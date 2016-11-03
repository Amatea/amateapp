'use strict';

// Carga las dependencias del módulo
var	config = require('./config'),
	mongoose = require('mongoose');

// Definir el método de configuración de Mongoose
module.exports = function() {
	// Usar Mongoose para conectar a MongoDB
	var db = mongoose.connect(config.db.conn);

    // Cargar el modelo 'Article'
	require('../app/models/huellaConection');

	// Devolver la instancia de conexión a Mongoose
	return db;
};