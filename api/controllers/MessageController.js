/**
 * MessagesController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	find: function(req, res) {
    if (req.session.room) {
      Message.find({where: { roomName: req.session.room.roomName }})
      .exec(function getMessages(err, messages) {
        if (err) {
          // We set an error header here, 
          // which we can access in the views and display in the alert call
          res.set('error', 'DB Error');
          res.send(500, { error: "DB Error"});
        } else {
          return res.send(messages);
        }
      });
    }
	},
  
  post: function(req, res) {
    if (req.session.room) {
      Message.create({room: req.session.room, content: req.body.message})
      .exec(function(err, msg) {
        if (err) {
          // Set the error header
          res.set('error', 'DB Error');
          res.send(500, { error: "DB Error" });
        } else {
          res.send(msg);
        }
      })
    }
  }
};

