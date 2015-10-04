module.exports = function(req, res, next) {
  if (req.method === 'POST') {
    var end = req.session.room.end;
    if (new Date().getTime() > end) {
      return res.send("This breakthrough group has now finished. Start a new one to keep going", 405);
    }
  }
  next();
}