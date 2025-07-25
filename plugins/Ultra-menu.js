const config = require('../config');
const { cmd, commands } = require('../command');
const moment = require('moment');

cmd({
    pattern: "menu2",
    react: "👾",
    desc: "Get stylish command list",
    category: "main",
    filename: __filename
},
async(conn, mek, m, { from, pushname, reply }) => {
try {
    const uptime = moment.duration(process.uptime(), 'seconds').humanize();
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "🌅 Good Morning" : hour < 18 ? "☀️ Good Afternoon" : "🌙 Good Evening";

    let menu = {
        main: '',
        download: '',
        group: '',
        owner: '',
        convert: '',
        search: ''
    };

    for (let i = 0; i < commands.length; i++) {
        const cmdData = commands[i];
        if (cmdData.pattern && !cmdData.dontAddCommandList) {
            if (menu[cmdData.category]) {
                menu[cmdData.category] += `┃ ✦ ${cmdData.pattern}\n`;
            }
        }
    }

    const madeMenu = `
╭─❍ *『 ${config.BOT_NAME} 』* ❍─╮
│ 👤 *Hello:* ${pushname}
│ 🕒 *Uptime:* ${uptime}
│ 📅 *Greeting:* ${greeting}
│ ⚙️ *Mode:* ${config.MODE}
│ 🔮 *Prefix:* ${config.PREFIX}
│ 🧠 *Baileys:* Multi-Device
│ 👑 *Owner:* ᴀʟɪ ɪɴxɪᴅᴇ
│ 🧬 *Version:* v4.0.0
╰───────────────╯

╔═『 🧩 *COMMAND MENU* 』═╗

╭───❏ *📥 DOWNLOAD CMDS* ❏───╮
${menu.download || '┃ ❌ No commands found.'}╰───────────────╯

╭───❏ *🧰 MAIN CMDS* ❏───╮
${menu.main || '┃ ❌ No commands found.'}╰───────────────╯

╭───❏ *👥 GROUP CMDS* ❏───╮
${menu.group || '┃ ❌ No commands found.'}╰───────────────╯

╭───❏ *🛠️ OWNER CMDS* ❏───╮
${menu.owner || '┃ ❌ No commands found.'}╰───────────────╯

╭───❏ *🔃 CONVERT CMDS* ❏───╮
${menu.convert || '┃ ❌ No commands found.'}╰───────────────╯

╭───❏ *🔍 SEARCH CMDS* ❏───╮
${menu.search || '┃ ❌ No commands found.'}╰───────────────╯

🌟 *Powered by:* ᴀʟɪ ɪɴxɪᴅᴇ
📡 *Channel:* ${config.WHATSAPP_CHANNEL || 'Not Provided'}
`;

    await conn.sendMessage(from, {
        image: { url: config.ALIVE_IMG },
        caption: madeMenu.trim()
    }, { quoted: mek });

} catch (e) {
    console.log(e);
    reply(`${e}`);
}
});
