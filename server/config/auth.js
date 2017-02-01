module.exports = {

  'facebookAuth' : {
    'clientID'        : '1861491864135769', // your App ID
    'clientSecret'    : 'cca210e367386581bdf88d8ae49c1d67', // your App Secret
    'callbackURL'     : 'http://localhost:8080/auth/facebook/callback',
    'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'
  },

  'googleAuth' : {
    'clientID'         : '256322840922-4bi8uvhdr4a3dmq4gvmhj61mjja0ie10.apps.googleusercontent.com',
    'clientSecret'     : 'p50ci1Oi4kWGyeiOxZjw-MTi',
    'callbackURL'      : 'http://localhost:8080/auth/google/callback'
  }
};
