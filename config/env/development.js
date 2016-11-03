module.exports = {
  db: {
    conn: 'mongodb://localhost/mean',
    conndendros: 'mongodb://geoUser:cibsolar1609@104.131.122.114:27017/GeoDB'
  },
  sessionSecret: 'developmentSessionSecret',
  google: {
    clientID: '948861021543-o130rj4k4h6u803ic9fhcmpi15bhhepi.apps.googleusercontent.com',
    clientSecret: 'FOqDAvf2nGfbMi-trfabq8NZ',
    callbackURL: 'http://www.amateapp.com/oauth/google/callback'
  },
  facebook: {
    clientID: '2082485698642238',
    clientSecret: '92db4727bf904bc5126b1739ac4794d3',
    callbackURL: 'http://amateapp.com/auth/facebook/callback'
  }
};



