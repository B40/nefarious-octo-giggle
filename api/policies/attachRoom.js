module.exports = function(req, res, next) {
  if (!req.options.where) req.options.where = {};
  req.options.where.roomName = req.session.room.roomName;
  next();
}