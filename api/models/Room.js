// Room Model  
module.exports = {
  
  autoPk: false,
  attributes  : {
        roomName: {
          type: 'string',
          primaryKey: true,
          unique: true
        },
        start: 'datetime',
        end: 'datetime',
        password: {
          type: 'string'
        },
        // Add a reference to messages
        messages: {
          collection: 'message',
          via: 'room'
        }
    }
};