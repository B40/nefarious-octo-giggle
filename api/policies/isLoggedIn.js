module.exports = function (req, res, next) {
    if (req.session.room) {
        var action = req.options.action;
        if (action == "create") {
            req.body.roomName = req.session.room.roomName;
        }
        next();
    } else {
        res.send("You Must Be Logged In", 403);
    }
};