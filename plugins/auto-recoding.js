const fs = require('fs');
const path = require('path');
const config = require('../config')
const {Stark , commands} = require('../command')


//auto recording
Stark({
  on: "body"
},    
async (conn, mek, m, { from, body, isOwner }) => {       
 if (config.AUTO_RECORDING === 'true') {
                await conn.sendPresenceUpdate('recording', from);
            }
         } 
   );
