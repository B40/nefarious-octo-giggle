// Messages Model 
module.exports = {
    attributes  : {
         room: {
           model: 'room'
         },
         content: 'string',
         day: {
           type: 'int',
           defaultsTo: -1
         }
    }
};