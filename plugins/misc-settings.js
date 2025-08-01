const { cmd, commands } = require('../command');
const config = require('../config');
const prefix = config.PREFIX;
const fs = require('fs');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('../lib/functions2');
const { writeFileSync } = require('fs');
const path = require('path');

cmd({
    pattern: "admin-events",
    alias: ["adminevents"],
    desc: "Enable or disable admin event notifications",
    category: "misc",
    filename: __filename
},
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.ADMIN_EVENTS = "true";
        return reply("✅ Admin event notifications are now enabled.");
    } else if (status === "off") {
        config.ADMIN_EVENTS = "false";
        return reply("❌ Admin event notifications are now disabled.");
    } else {
        return reply(`Example: .admin-events on`);
    }
});

cmd({
    pattern: "welcome",
    alias: ["welcomeset"],
    desc: "Enable or disable welcome messages for new members",
    category: "misc",
    filename: __filename
},
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.WELCOME = "true";
        return reply("✅ Welcome messages are now enabled.");
    } else if (status === "off") {
        config.WELCOME = "false";
        return reply("❌ Welcome messages are now disabled.");
    } else {
        return reply(`Example: .welcome on`);
    }
});

cmd({ 
  pattern: "setprefix", 
  alias: ["prefix"], 
  desc: "Change bot prefix.", 
  category: "misc", 
  filename: __filename 
}, async (conn, mek, m, { 
  from, 
  args, 
  isOwner, 
  reply 
}) => { 
  if (!isOwner) return reply("*📛 Only the owner can use this command!*"); 
  if (!args[0]) return reply("❌ Please provide a new prefix."); 
  const newPrefix = args[0]; 
  config.PREFIX = newPrefix; 
  // Save config to file 
  fs.writeFileSync('./config.json', JSON.stringify(config, null, 2)); 
  reply(`*Prefix changed to:* ${newPrefix}`); 
  const { exec } = require("child_process"); 
  reply("*_DATABASE UPDATE EDITH-MD RESTARTING NOW...🚀_*"); 
  await sleep(1500); 
  exec("pm2 restart all"); 
  reply("*_EDITH-MD STARTED NOW...🚀_*"); 
});

cmd({
    pattern: "mode",
    desc: "Set bot mode to private or public.",
    category: "misc",
    filename: __filename,
}, async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 Only the owner can use this command!*");

    // Si aucun argument n'est fourni, afficher le mode actuel et l'usage
    if (!args[0]) {
        return reply(`📌 Current mode: *${config.MODE}*\n\nUsage: .mode private OR .mode public`);
    }

    const modeArg = args[0].toLowerCase();

    if (modeArg === "private") {
        config.MODE = "private";
        return reply("*_BOT MODE IS NOW SET TO PRIVATE ✅_*.");
    } else if (modeArg === "public") {
        config.MODE = "public";
        return reply("*_BOT MODE IS NOW SET TO PUBLIC ✅_*.")
        const {exec} = require("child_process")
reply("*_DATABASE UPDATE EDITH-MD RESTARTING NOW...🚀_*")
await sleep(1500)
exec("pm2 restart all")
reply("*_EDITH-MD STARTED NOW...🚀_*");
    } else {
        return reply("❌ Invalid mode. Please use `.mode private` or `.mode public`.");
    }
});

cmd({
    pattern: "auto_typing",
    alias: ["autotyping"],
    desc: "enable or disable auto-reply.",
    category: "misc",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.AUTO_TYPING = "true";
        return reply("*_FAKETYPING  IS NOW ENABLED._*☑️");
    } else if (args[0] === "off") {
        config.AUTO_TYPING = "false";
        return reply("*_FAKETYPING FEATURE IS NOW DISABLED._*❌");
    } else {
        return reply(`*🫟 ᴇxᴀᴍᴘʟᴇ: . ғᴀᴋᴇ_ᴛʏᴘɪɴɢ ᴏɴ*`);
    }
});
//--------------------------------------------
// ALWAYS_ONLINE COMMANDS
//--------------------------------------------
//  AUTO-REPLY COMMANDS
//--------------------------------------------
cmd({
    pattern: "always_online",
    alias: ["alwaysonline"],
    desc: "enable or disable auto-reply.",
    category: "misc",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.ALWAYS_ONLINE = "true";
        return reply("*_ALWAYSONLINE  IS NOW ENABLED._*☑️");
    } else if (args[0] === "off") {
        config.ALWAYS_ONLINE = "false";
        return reply("*_ALWAYSONLINE FEATURE IS NOW DISABLED._*❌");
    } else {
        return reply(`*🫟 ᴇxᴀᴍᴘʟᴇ: . ᴀʟᴡᴀʏs_ᴏɴʟɪɴᴇ ᴏɴ*`);
    }
});
//  AUTO-REPLY COMMANDS
//--------------------------------------------
cmd({
    pattern: "auto_reacording",
    alias: ["autorecording"],
    desc: "enable or disable auto-reply.",
    category: "misc",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.AUTO_RECORDING = "true";
        return reply("*_FAKEREACORDING IS NOW ENABLED._*☑️");
    } else if (args[0] === "off") {
        config.AUTO_RECORDING = "false";
        return reply("*_FAKEREACORDING FEATURE IS NOW DISABLED._*❌");
    } else {
        return reply(`*🫟 ᴇxᴀᴍᴘʟᴇ: . ғᴀᴋᴇ_ʀᴇᴀᴄᴏʀᴅɪɴɢ ᴏɴ*`);
    }
});
//--------------------------------------------
// AUTO_VIEW_STATUS COMMANDS
//--------------------------------------------
cmd({
    pattern: "status_view",
    alias: ["auto_status_seen"],
    desc: "Enable or disable auto-viewing of statuses",
    category: "misc",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Default value for AUTO_VIEW_STATUS is "false"
    if (args[0] === "on") {
        config.AUTO_STATUS_SEEN = "true";
        return reply("*_AUTOREADSTATUS IS NOW ENABLED._*☑️");
    } else if (args[0] === "off") {
        config.AUTO_STATUS_SEEN = "false";
        return reply("*_AUTOREADSTATUS IS NOW DISABLED._*❌");
    } else {
        return reply(`*🫟 ᴇxᴀᴍᴘʟᴇ:  .ᴀᴜᴛᴏ-sᴇᴇɴ ᴏɴ*`);
    }
}); 
//--------------------------------------------
// AUTO_LIKE_STATUS COMMANDS
//--------------------------------------------
cmd({
    pattern: "status_react",
    alias: ["statusreact"],
    desc: "Enable or disable auto-liking of statuses",
    category: "misc",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Default value for AUTO_STATUS_REACT is "false"
    if (args[0] === "on") {
        config.AUTO_STATUS_REACT = "true";
        return reply("*_AUTOLIKESTATUS IS NOW ENABLED._*☑️");
    } else if (args[0] === "off") {
        config.AUTO_STATUS_REACT = "false";
        return reply("*_AUTOLIKESTATUS IS NOW DISABLED._*❌");
    } else {
        return reply(`Example: . status_react on`);
    }
});

//--------------------------------------------
//  READ-MESSAGE COMMANDS
//--------------------------------------------
cmd({
    pattern: "read_message",
    alias: ["autoread"],
    desc: "enable or disable readmessage.",
    category: "misc",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.READ_MESSAGE = "true";
        return reply("*_READ MESSAGE FEATURE IS NOW ENABLED._*☑️");
    } else if (args[0] === "off") {
        config.READ_MESSAGE = "false";
        return reply("*_READ MESSAGE FEATURE IS NOW DISABLED._*❌");
    } else {
        return reply(`_example:  .READ_MESSAGE on_`);
    }
});
//--------------------------------------------
//  ANI-BAD COMMANDS
//--------------------------------------------
cmd({
    pattern: "anti_bad",
    alias: ["antibad"],
    desc: "enable or disable antibad.",
    category: "misc",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.ANTI_BAD = "true";
        return reply("*_ANTI BAD WORD IS NOW ENABLED._*☑️");
    } else if (args[0] === "off") {
        config.ANTI_BAD = "false";
        return reply("*_ANTI BAD WORD FEATURE IS NOW DISABLED._*❌");
    } else {
        return reply(`_example:  .ANTI_BAD_WORD on_`);
    }
});

//--------------------------------------------
//   AUTO-REACT COMMANDS
//--------------------------------------------
cmd({
    pattern: "auto_react",
    alias: ["autoreact","areact"],
    desc: "Enable or disable the autoreact feature",
    category: "misc",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.AUTO_REACT = "true";
        await reply("*_AUTOREACT FEATURE IS NOW ENABLED._*☑️");
    } else if (args[0] === "off") {
        config.AUTO_REACT = "false";
        await reply("*_AUTOREACT FEATURE IS NOW DISABLED._*❌");
    } else {
        await reply(`*🫟 ᴇxᴀᴍᴘʟᴇ: .ᴀᴜᴛᴏ_ʀᴇᴀᴄᴛ ᴏɴ*`);
    }
});

//   AUTO-REACT COMMANDS
//--------------------------------------------
cmd({
    pattern: "custom_reacts",
    alias: ["heartreact","dillreact"],
    desc: "Enable or disable the autoreact feature",
    category: "misc",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.CUSTOM_REACT = "true";
        await reply("*_HEARTREACT FEATURE IS NOW ENABLED._*☑️");
    } else if (args[0] === "off") {
        config.CUSTOM_REACT = "false";
        await reply("*_HEARTREACT FEATURE IS NOW DISABLED._*❌");
    } else {
        await reply(`*🫟 ᴇxᴀᴍᴘʟᴇ: .ʜᴇᴀʀᴛ_ʀᴇᴀᴄᴛ ᴏɴ*`);
    }
});

//   AUTO-REACT COMMANDS
//--------------------------------------------
cmd({
    pattern: "anti_link",
    alias: ["antilink","antilinks"],
    desc: "Enable or disable the autoreact feature",
    category: "misc",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.ANTI_LINK = "true";
        await reply("*_OWNERREACT FEATURE IS NOW ENABLED._*☑️");
    } else if (args[0] === "off") {
        config.ANTI_LINK = "false";
        await reply("*_ANTI_LINK FEATURE IS NOW DISABLED._*❌");
    } else {
        await reply(`*🫟 ᴇxᴀᴍᴘʟᴇ: .Antilink_on/off*`);
    }
});
//--------------------------------------------
//  STATUS-REPLY COMMANDS
//--------------------------------------------
cmd({
    pattern: "status_reply",
    alias: ["statusreply"],
    desc: "enable or disable status-reply.",
    category: "misc",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.AUTO_STATUS_REPLY = "true";
        return reply("*_STATUS-REPLY FEATURE IS NOW ENABLED._*☑️");
    } else if (args[0] === "off") {
        config.AUTO_STATUS_REPLY = "false";
        return reply("*_STATUS-REPLY FEATURE IS NOW DISABLED._*❌");
    } else {
        return reply(`*🫟 ᴇxᴀᴍᴘʟᴇ:  .ᴀᴜᴛᴏ_ʀᴇᴘʟʏ_sᴛᴀᴛᴜs ᴏɴ*`);
    }
});

