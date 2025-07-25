const config = require('../config')
const {cmd, commands} = require('../command')
const moment = require('moment')

cmd({
    pattern: "menu2",
    react: "👾",
    desc: "Get stylish command list",
    category: "main",
    filename: __filename
},
async(conn, mek, m, {from, pushname, reply}) => {
try {
    // Calculate uptime
    const uptime = process.uptime();
    const uptimeString = moment.duration(uptime, 'seconds').humanize();
    
    // Get current time greeting
    const hour = new Date().getHours();
    let greeting = "";
    if (hour < 12) greeting = "🌅 Good Morning";
    else if (hour < 18) greeting = "☀️ Good Afternoon";
    else greeting = "🌙 Good Evening";

    let menu = {
        main: '',
        download: '',
        group: '',
        owner: '',
        convert: '',
        search: ''
    };

    for (let i = 0; i < commands.length; i++) {
        if (commands[i].pattern && !commands[i].dontAddCommandList) {
            menu[commands[i].category] += `║ ✦ ${commands[i].pattern}\n`;
        }
    }

    let madeMenu = `*╭━━❍〘〘 ${config.BOT_NAME} 〙〙*
*┃🪾 ᴍᴏᴅᴇ* : *${config.MODE}*
*┃🪄 ᴘʀᴇғɪx* : *${config.PREFIX}*
*┃🌀 ʙᴀɪʟᴇʏs: ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ*
*┃👑 ᴄʀᴇᴀᴛᴏʀ* : *ᴀʟɪ ɪɴxɪᴅᴇ*
*┃🫟 ᴠᴇʀsɪᴏɴ* : *ᴠ.4.0.0*
*┃⏳ ᴜᴘᴛɪᴍᴇ* : *${uptimeString}*
*┃${hour < 12 ? '🌅' : hour < 18 ? '☀️' : '🌙'} ɢʀᴇᴇᴛɪɴɢ* : *${greeting} ${pushname}*
*╰━━━━━━━━━━━━━━━━━━❍*

╔════════════════════════╗
║     🅲🅾🅼🅼🅰🅽🅳 🅻🅸🆂🆃     ║
╚════════════════════════╝

┌──────────────────────┐
│   🄳🄾🅆🄽🄻🄾🄰🄳 🄲🄼🄳🅂   │
├──────────────────────┤
${menu.download}
└──────────────────────┘

┌──────────────────────┐
│     🄼🄰🄸🄽 🄲🄼🄳🅂      │
├──────────────────────┤
${menu.main}
└──────────────────────┘

┌──────────────────────┐
│    🄶🅁🄾🅄🄿 🄲🄼🄳🅂     │
├──────────────────────┤
${menu.group}
└──────────────────────┘

┌──────────────────────┐
│    🄾🅆🄽🄴🅁 🄲🄼🄳🅂     │
├──────────────────────┤
${menu.owner}
└──────────────────────┘

┌──────────────────────┐
│   🄲🄾🄽🅅🄴🅁🅃 🄲🄼🄳🅂   │
├──────────────────────┤
${menu.convert}
└──────────────────────┘

┌──────────────────────┐
│    🅂🄴🄰🅁🄲🄷 🄲🄼🄳🅂    │
├──────────────────────┤
${menu.search}
└──────────────────────┘

*╭━━━━━━━━━━━━━━━━━━━━╮*
│   🄿🄾🅆🄴🅁🄴🄳 🄱🅈 🄰🄻🄸   │
*╰━━━━━━━━━━━━━━━━━━━━╯*`;

    await conn.sendMessage(from, {
        image: {url: config.ALIVE_IMG},
        caption: madeMenu
    }, {quoted: mek});

} catch(e) {
    console.log(e)
    reply(`${e}`)
}
})
