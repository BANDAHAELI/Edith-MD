const fs = require('fs');
const path = require('path');
const config = require('../config')
const {Stark , commands} = require('../command')


// Composing (Auto Typing)
Stark({
    on: "body"
},    
async (conn, mek, m, { from, body, isOwner }) => {
    if (config.AUTO_TYPING === 'true') {
        await conn.sendPresenceUpdate('composing', from); // send typing 
    }
});
