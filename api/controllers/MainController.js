var MainController = {
  index: function (req, res) {
      res.view();
  },
  
  findRoom: function (req, res) {
    var roomName = req.param('roomName');
    Room.findOneByRoomName(roomName)
    .exec(function findIfRoomExists(err, room){
      if (err) {
        // We set an error header here, 
        // which we can access in the views and display in the alert call
        res.set('error', 'DB Error');
        res.send(500, { error: "DB Error"});
      } else if (room) {
        // Room already exists, 
        // so we should prompt for the password (front end)
        req.send(room);
      } else {
        // Room doesn't exist, 
        // so we should generate a password (front end)
        // and later on create the room
        req.send();
      }
    });
  },
  
  openRoom: function (req, res) {
    var roomName = req.param('roomName');
    var password = req.param('password');
    Room.findOneByRoomName(roomName)
    .exec(function loginToRoom(err, room) {
      if (err) {
        // We set an error header here,
        // which we access in the views and display in the alert call.
        res.set('error', 'DB Error');
        // The error object sent below is converted to JSON
        res.send(500, { error: "DB Error"});
      } else if (room) {
        var hasher = require("password-hash");
        if (hasher.verify(password, room.password)) {
          req.session.room = room;
          res.send(room);
        } else {
          // Set the error header
          res.set('error', 'Wrong Password');
          res.send(400, { error: "Wrong Password" });
        }
      } else {
        // We now need to create a room
        var start = new Date();
        var end = new Date(start);
        end.setDate(end.getDate() + 40);
        var hasher = require('password-hash');
        password = hasher.generate(password);
        Room.create({ roomName: roomName, password: password, start: start, end: end})
        .exec(function createRoom(err, room) {
          if (err) {
            // Set the error header
            res.set('error', 'DB error');
            res.send(500, {error: "DB Error"});
          } else {
            req.session.room = room;
            res.send(room);
          }
          
        });
      }
    });
  },

  signup: function (req, res) {
    var username = req.param('username');
    var password = req.param('password');
    // Users.findByUsername(username)...
    // In v0.9.0 the find method returns an empty array when no results are found
    // when only one result is needed use findOne.
    Users.findOneByUsername(username)
    .exec(function signupfindUser(err, usr){
      if (err) {
        // We set an error header here,
        // which we access in the views an display in the alert call.
        res.set('error', 'DB Error');
        // The error object sent below is converted to JSON
        res.send(500, { error: "DB Error" });
      } else if (usr) {
        // Set the error header
        res.set('error', 'Username already Taken');
        res.send(400, { error: "Username already Taken"});
      } else {
        var hasher = require("password-hash");
        password = hasher.generate(password);

        Users.create({ username: username, password: password })
        .exec(function signupCreatUser(error, user) {
          if (error) {
            // Set the error header
            res.set('error', 'DB Error');
            res.send(500, { error: "DB Error" });
          } else {
            req.session.user = user;
            res.send(user);
          }
        });
      }
    });
  },
  

  login: function (req, res) {
    var username = req.param('username');
    var password = req.param('password');

    // Users.findByUsername(username)...
    // In v0.9.0 the find method returns an empty array when no results are found
    // when only one result is needed use findOne.
    Users.findOneByUsername(username)
    .exec(function loginfindUser(err, usr){
      if (err) {
        // We set an error header here,
        // which we access in the views an display in the alert call.
        res.set('error', 'DB Error');
        // The error object sent below is converted to JSON
        res.send(500, { error: "DB Error" });
      } else {
        if (usr) {
          var hasher = require("password-hash");
          if (hasher.verify(password, usr.password)) {
            req.session.user = usr;
            res.send(usr);
          } else {
            // Set the error header
            res.set('error', 'Wrong Password');
            res.send(400, { error: "Wrong Password" });
          }
        } else {
          res.set('error', 'User not Found');
          res.send(404, { error: "User not Found"});
        }
      }
    });
  },

  chat: function (req, res) {
     if (req.session.room) {
       res.view({ roomName: req.session.room.roomName });
     } else {
       res.redirect('/');
     }
   }
};
module.exports = MainController;