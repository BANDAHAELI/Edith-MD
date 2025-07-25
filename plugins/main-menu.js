const config = require('../config');
const { cmd, commands } = require('../command');
const moment = require('moment');

cmd({
  pattern: "menu",
  react: "👾",
  desc: "Get stylish command list",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { from, pushname, reply }) => {
  try {
    const uptime = process.uptime();
    const uptimeString = moment.duration(uptime, 'seconds').humanize();

    const hour = new Date().getHours();
    const greeting = hour < 12 ? "🌅 Good Morning" : hour < 18 ? "☀️ Good Afternoon" : "🌙 Good Evening";

    let menu = {
      ai: '',
      anime: '',
      main: '',
      download: '',
      group: '',
      owner: '',
      convert: '',
      search: ''
    };

    for (let cmdObj of commands) {
      const { pattern, category, dontAddCommandList } = cmdObj;
      if (pattern && !dontAddCommandList && menu.hasOwnProperty(category)) {
        menu[category] += `┃ ✦ ${pattern}\n`;
      }
    }

    let madeMenu = `
╭─❍ *『 ${config.BOT_NAME} 』* ❍─╮
│ 👤 *Hello:* ${pushname}
│ 🕒 *Uptime:* ${uptimeString}
│ 📅 *Greeting:* ${greeting}
│ ⚙️ *Mode:* ${config.MODE}
│ 🔮 *Prefix:* ${config.PREFIX}
│ 🧠 *Baileys:* Multi-Device
│ 👑 *Owner:* Ｂａｎｄａｈｅａｌｉ
│ 🧬 *Version:* v4.0.0
╰────────────────────╯

╔═『 🧩 *COMMAND MENU* 』═╗

╭──❏ *🤖 Ai CMDS* ❏──╮
${menu.ai || '┃ ❌ No commands found.'}╰────────────────────╯

╭──❏ *📥 ANIME CMDS* ❏──╮
${menu.anime || '┃ ❌ No commands found.'}╰────────────────────╯

╭──❏ *📥 DOWNLOAD CMDS* ❏──╮
${menu.download || '┃ ❌ No commands found.'}╰────────────────────╯

╭──❏ *🧰 MAIN CMDS* ❏──╮
${menu.main || '┃ ❌ No commands found.'}╰────────────────────╯

╭──❏ *👥 GROUP CMDS* ❏──╮
${menu.group || '┃ ❌ No commands found.'}╰────────────────────╯

╭──❏ *🛠️ OWNER CMDS* ❏──╮
${menu.owner || '┃ ❌ No commands found.'}╰────────────────────╯

╭──❏ *🔃 CONVERT CMDS* ❏──╮
${menu.convert || '┃ ❌ No commands found.'}╰────────────────────╯

╭──❏ *🔍 SEARCH CMDS* ❏──╮
${menu.search || '┃ ❌ No commands found.'}╰────────────────────╯

${config.DESCRIPTION}
`;

    await conn.sendMessage(  
            from,  
            {  
                image: { url: config.MENU_IMAGE_URL },  
                caption: madeMenu,  
                contextInfo: {  
                    mentionedJid: [m.sender],  
                    forwardingScore: 999,  
                    isForwarded: true,  
                    forwardedNewsletterMessageInfo: {  
                        newsletterJid: '120363315182578784@newsletter',  
                        newsletterName: 'ᴇᴅɪᴛʜ ᴍᴅ',  
                        serverMessageId: 143  
                    }  
                }  
            },  
            { quoted: mek }  
        );  

  } catch (e) {
    console.log(e);
    reply(String(e));
  }
});
