const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "Sarkarmd$eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUloZHZIN014RG5KTEY4Q1FpSWJaVlc5R1pwU0s4VTF5LzNoclpWeTAzST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOVRTUEdLVXZCbnY0aHRFenZKa3Y1V2RXYzNmWlNjRHF3bi92RGF1ZTB5UT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0SFF1dHN2Z2xNM01iS0k5Z0xNaHJKTC9LSTFIVDh0WWM5SS93OFMvKzJVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBdE1zaW1OMTRubzZiQ2hkTy9nZ1JZTUlEaUw0U29XL1g3R3ZDaUlGUEZjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitHcWVPSHU1S3N2c3pQSHpHR3ZLdUFPRndzdmQyMUtHT3NBSERRVC84bHc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNVQlh3WTErdzN1RUVuVHlzanNuanBQL0NVTWJxU0ZGQ3dhU0xPT2F2bDA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0lneElyZUVPQnpOZ3JyM3d0TDBDNTlDMG1UMWV3cEdTS3ZlbHA2VWMxYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUxteXB4ZmVBWC9SbGdpSmFkSFdFSDZyYi96TWkyUDJONFVmOWgyTnNocz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IngyZ0NVeVh2T0VDZ1dQN0JpVDQ2eUhLSUZUZWtqZzU4a3Jnb3NKODB3WFROUmtqM2ZtbWIwbUhid0xHVnVSbEh6TEg1QlFodytDL2JrcVcwbmNrWEFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTIzLCJhZHZTZWNyZXRLZXkiOiJVbGU5WlBmY00veFRScDlZZUZNSDdiemhuai9oaVd5WmExM0hGS3BhelNVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkyMzQyMjI0NDcxNEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJDQTMxQzBDQzdCNzVCOUM5NzBFM0M5NUYzODdFRjQ0MSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUyNTAwOTAzfSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MjM0MjIyNDQ3MTRAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMDMxMTlEM0NFRjhGMEU2MjRGQTFCM0Q1MzY1MzQzNTkifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MjUwMDkwM31dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiMTIzTE9UVVMiLCJtZSI6eyJpZCI6IjkyMzQyMjI0NDcxNDo0MEBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjQzMTk1MTA2ODY1MjM1OjQwQGxpZCIsIm5hbWUiOiJXZWIgRGV2ZWxvcGVyIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKR3l4djhERUtHVjFNTUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ4c21NZzZBT0JpRWRWVnhudE9wVDh0bm1XTk1lR1VWMmdxM3JiY0VpRVdFPSIsImFjY291bnRTaWduYXR1cmUiOiJvZHdIaU80WGs1UWUxZHEwSEhqMExybUd3VmN4YW0wUHlOTm5tZFNRU01qVUltMXlwaTdnb3dmTzRhWUZocDA5MEZVaTIwZ2tzUmkvd3docHVBeXRCZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiMUZud0d3N1krN3p4ckduRWhKUHpLRExQK21IazJuT0ZYblVEZDZzTGloTUpHVmxpRisvYnZ0QTZzSzhnMnpQYXlBbnFFZXpDS0VHUXJ3VlFEY2x2QUE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MjM0MjIyNDQ3MTQ6NDBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCY2JKaklPZ0RnWWhIVlZjWjdUcVUvTFo1bGpUSGhsRmRvS3Q2MjNCSWhGaCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSURRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUyNTAwOTAxLCJsYXN0UHJvcEhhc2giOiIzUjlaMzkiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUdhMCJ9",
// add your Session Id 
AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "true",
// make true or false status auto seen
AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false",
// make true if you want auto reply on status 
AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "true",
// make true if you want auto reply on status 
AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*SEEN YOUR STATUS*",
// set the auto reply massage on status reply
WELCOME: process.env.WELCOME || "false",
// true if want welcome and goodbye msg in groups    
ADMIN_EVENTS: process.env.ADMIN_EVENTS || "false",
// make true to know who dismiss or promoted a member in group  
PREFIX: process.env.PREFIX || ".",
// add your prifix for bot
MENU_IMAGE_URL: process.env.MENU_IMAGE_URL || "https://i.ibb.co/j9G5tmNM/shaban-md.jpg",
// add custom menu and mention reply image url   
BOT_NAME: process.env.BOT_NAME || "SHABAN-MD V5",
// add bot namw here for menu
STICKER_NAME: process.env.STICKER_NAME || "SHABAN-MD",
// type sticker pack name 
CUSTOM_REACT: process.env.CUSTOM_REACT || "false",
// make this true for custum emoji react    
CUSTOM_REACT_EMOJIS: process.env.CUSTOM_REACT_EMOJIS || "💝,💖,💗,❤️‍🩹,❤️,🧡,💛,💚,💙,💜,🤎,🖤,🤍",
// chose custom react emojis by yourself 
DELETE_LINKS: process.env.DELETE_LINKS || "false",
// automatic delete links witho remove member 
OWNER_NUMBER: process.env.OWNER_NUMBER || "923043788282",
// add your bot owner number
OWNER_NAME: process.env.OWNER_NAME || "MR-SHABAN",
// add bot owner name
DESCRIPTION: process.env.DESCRIPTION || "*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ Mʀ Sʜᴀʙᴀɴ*",
// add bot owner name    
ALIVE_IMG: process.env.ALIVE_IMG || "https://files.catbox.moe/tasodv.jpg",
// add img for alive msg
LIVE_MSG: process.env.LIVE_MSG || "> Zinda Hun Yar *SHABAN-MD*⚡",
// add alive msg here 
READ_MESSAGE: process.env.READ_MESSAGE || "false",
// Turn true or false for automatic read msgs
AUTO_REACT: process.env.AUTO_REACT || "false",
// make this true or false for auto react on all msgs
ANTI_BAD: process.env.ANTI_BAD || "false",
// false or true for anti bad words  
MODE: process.env.MODE || "public",
// make bot public-private-inbox-group 
ANTI_LINK: process.env.ANTI_LINK || "true",
// make anti link true,false for groups 
AUTO_VOICE: process.env.AUTO_VOICE || "false",
// make true for send automatic voices
AUTO_STICKER: process.env.AUTO_STICKER || "false",
// make true for automatic stickers 
AUTO_REPLY: process.env.AUTO_REPLY || "false",
// make true or false automatic text reply 
ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false",
// maks true for always online 
PUBLIC_MODE: process.env.PUBLIC_MODE || "true",
// make false if want private mod
AUTO_TYPING: process.env.AUTO_TYPING || "false",
// true for automatic show typing   
READ_CMD: process.env.READ_CMD || "false",
// true if want mark commands as read 
DEV: process.env.DEV || "923043788282",
//replace with your whatsapp number        
ANTI_VV: process.env.ANTI_VV || "false",
// true for anti once view
ANTI_CALL: process.env.ANTI_CALL || "false",
REJECT_MSG: process.env.REJECT_MSG || "*_SOORY MY BOSS IS BUSY PLEASE DONT CALL ME_*",
ANTI_DELETE: process.env.ANTI_DELETE || "true",
// set true false for anti delete
ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "inbox", 
// change it to 'same' if you want to resend deleted message in same chat
AUTO_RECORDING: process.env.AUTO_RECORDING || "false"
// make it true for auto recoding 
};
