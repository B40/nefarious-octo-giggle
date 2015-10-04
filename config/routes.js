module.exports.routes = {
    '/' : {
         controller: 'main',
         action: 'index'
    },
    '/openRoom' : {
      controller: 'main',
      action: 'openRoom'
    },
    '/signup' : {
         controller: 'main',
         action: 'signup'
    },
    '/login' : {
         controller: 'main',
         action: 'login'
    },
    '/chat' : {
         controller: 'main',
         action: 'chat'
    },
    '/GET /message' : {
      controller: 'message',
      action: 'index'
    }
};

