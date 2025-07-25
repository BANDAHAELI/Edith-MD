const config = require('../config');
const { cmd, commands } = require('../command');
const moment = require('moment');

cmd({
  pattern: "menu2",
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
│ 👑 *Owner:* ᴀʟɪ ɪɴxɪᴅᴇ
│ 🧬 *Version:* v4.0.0
╰────────────────────╯

╔═『 🧩 *COMMAND MENU* 』═╗

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

🌟 *Powered by:* ᴀʟɪ ɪɴxɪᴅᴇ
📡 *Channel:* ${config.WHATSAPP_CHANNEL || 'Not Provided'}
`;

    await conn.sendMessage(from, {
      image: { url: "https://i.ibb.co/gLSHtMpq/shaban-md.jpg" },
      caption: madeMenu.trim()
    }, { quoted: mek });

  } catch (e) {
    console.log(e);
    reply(String(e));
  }
});
