/**
 * MessagesController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	find: function(req, res) {
    if (req.session.room) {
      Message.find({where: { room: req.session.room.roomName }})
      .exec(function getMessages(err, messages) {
          console.log("messages: " + messages);
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
      var daysBetween = function( date1, date2 ) {
        //Get 1 day in milliseconds
        var one_day=1000*60*60*24;

        // Convert both dates to milliseconds
        var date1_ms = date1.getTime();
        var date2_ms = date2.getTime();

        // Calculate the difference in milliseconds
        var difference_ms = date2_ms - date1_ms;
    
        // Convert back to days and return
        return Math.round(difference_ms/one_day);
      }
      var start = new Date(req.session.room.start);
      var now = new Date();
      var day = daysBetween(start, now);
      Message.create({room: req.session.room, content: req.body.message, day: day})
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



