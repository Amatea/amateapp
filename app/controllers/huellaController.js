// Invocar modo JavaScript 'strict' 
'use strict';

// Cargar las dependencias del módulo
var mongoose = require('mongoose'),
	Article = mongoose.model('Article'),
	passport = require('passport');

// Crear un nuevo método controller para el manejo de errores
var getErrorMessage = function(err) {

  var message = '';

	if (err.code) {
    switch (err.code) {
      // Si un eror de index único ocurre configurar el mensaje de error
      case 11000:
      case 11001:
        message = 'Usuario ya existe';
        break;
      // Si un error general ocurre configurar el mensaje de error
      default:
        message = 'Se ha producido un error';
    }
  } else {
    // Grabar el primer mensaje de error de una lista de posibles errores
    for (var errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }

  // Devolver el mensaje de error
  return message;
};

// Crear un nuevo método controller para crear nuevos artículos
exports.create = function(req, res) {
	// Crear un nuevo objeto artículo
	var article = new Article(req.body);

	// Intentar salvar el artículo
	article.save(function(err) {
		if (err) {
			// Si ocurre algún error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del artículo 
			res.json(article);
		}
	});
};

// Crear un nuevo método controller que recupera una lista de artículos
exports.list = function(req, res) {
	// Usar el método model 'find' para obtener una lista de artículos
	Article.find().exec(function(err, articles) {
		if (err) {
			// Si un error ocurre enviar un mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del artículo 
			res.json(articles);
		}
	});
};

// Crear un nuevo método controller que devuelve un artículo existente
exports.read = function(req, res) {
	res.json(req.article);
};

// Crear un nuevo método controller que actualiza un artículo existente
exports.update = function(req, res) {
	// Obtener el artículo usando el objeto 'request'
	var article = req.article;

	// Actualizar los campos artículo
	article.p1 = req.body.p1;
  article.p2 = req.body.p2;
  article.p3 = req.body.p3;
  article.p4 = req.body.p4;
  article.p5 = req.body.p5;
  article.p6 = req.body.p6;
  article.p7 = req.body.p7;
  article.p8 = req.body.p8;
  article.p9 = req.body.p9;
  article.p10 = req.body.p10;
  article.p11 = req.body.p11;
  article.totalTrees = req.body.totalTrees;

	// Intentar salvar el artículo actualizado
	article.save(function(err) {
		if (err) {
			// si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del artículo 
			res.json(article);
		}
	});
};


// Crear un nuevo controller middleware que recupera un único artículo existente
exports.articleByID = function(req, res, next, id) {
	// Usar el método model 'findById' para encontrar un único artículo 
	Article.findById(id).populate('creador', 'firstName lastName fullName').exec(function(err, article) {
		if (err) return next(err);
		if (!article) return next(new Error('Fallo al cargar el artículo ' + id));

		// Si un artículo es encontrado usar el objeto 'request' para pasarlo al siguietne middleware
		req.article = article;

		// Llamar al siguiente middleware
		next();
	});
};



// Crear un nuevo método controller que renderiza la página signin
exports.renderSignin = function(req, res, next) {
  // Si el usuario no está conectado renderizar la página signin, en otro caso redireccionar al usuario de vuelta a la página principal de la aplicación
  if (!req.user) {
    // Usa el objeto 'response' para renderizar la página signin
    res.render('signin', {
      // Configurar la variable title de la página
      title: 'Sign-in Form',
      // Configurar la variable del mensaje flash
      messages: req.flash('error') || req.flash('info')
    });
  } else {
    return res.redirect('/');
  }
};

// Crear un nuevo método controller que renderiza la página signup
exports.renderSignup = function(req, res, next) {
  // Si el usuario no está conectado renderizar la página signin, en otro caso redireccionar al usuario de vuelta a la página principal de la aplicación
  if (!req.user) {
    // Usa el objeto 'response' para renderizar la página signup
    res.render('signup', {
      // Configurar la variable title de la página
      title: 'Sign-up Form',
      // Configurar la variable del mensaje flash
      messages: req.flash('error')
    });
  } else {
    return res.redirect('/');
  }
};

// Crear un nuevo método controller que crea nuevos users 'regular'
exports.signup = function(req, res, next) {
  
    Article.register(new Article({ 
        username: req.body.username, 
        provider: 'local'
      }), req.body.password, function(err) {
        if (err) {
          return res.render('signup', { title: 'Registrate:: ', messages: req.flash('error')});
        }
        passport.authenticate('local')(req, res, function () {
            req.session.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });

      });  
};


// Crear un nuevo método controller que crea nuevos usuarios 'OAuth'
exports.saveOAuthUserProfile = function(req, profile, done) {
  // Prueba a encontrar un documento user que fue registrado usando el actual provider OAuth
  Article.findOne({
    provider: profile.provider,
    providerId: profile.providerId
  }, function(err, user) {
    // Si ha ocurrido un error continua al siguiente middleware
    if (err) {
      return done(err);
    } else {
      // Si un usuario no ha podido ser encontrado, crea un nueo user, en otro caso, continua al siguiente middleware
      if (!user) {
        // Configura un posible username base username
        var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');

        // Encuentra un username único disponible
        Article.findUniqueUsername(possibleUsername, null, function(availableUsername) {
          // Configura el nombre de usuario disponible 
          profile.username = availableUsername;
          
          // Crear el user
          user = new Article(profile);

          // Intenta salvar el nuevo documento user
          user.save(function(err) {
            // Continúa al siguiente middleware
            return done(err, user);
          });
        });
      } else {
        // Continúa al siguiente middleware
        return done(err, user);
      }
    }
  });
};

// Crear un nuevo método controller para signing out
exports.signout = function(req, res) {
  // Usa el método 'logout' de Passport para hacer logout
  req.logout();

  // Redirecciona al usuario de vuelta a la página de la aplicación principal
  res.redirect('/');
};

// Crear un nuevo middleware controller que es usado para autorizar operaciones de autentificación 
exports.requiresLogin = function(req, res, next) {
  // Si un usuario no está autentificado envía el mensaje de error apropiado
  if (!req.isAuthenticated()) {
    return res.status(401).send({
      message: 'Usuario no está identificado'
    });
  }
  // Llamar al siguiente middleware
  next();
};

