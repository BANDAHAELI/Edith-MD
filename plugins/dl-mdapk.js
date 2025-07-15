const { cmd } = require('../command');
const axios = require('axios');

cmd({
  pattern: "wtmod",
  desc: "Search WhatsApp mod APKs — Search BY SHABAN MD",
  category: "download",
  filename: __filename
}, async (conn, m, store, { from, q, reply }) => {
  try {
    if (!q) return reply("❌ Please provide an app name to search.\nExample: `.apkmod gb whatsapp`");

    await conn.sendMessage(from, { react: { text: "🔍", key: m.key } });

    const apiUrl = `https://apis-keith.vercel.app/search/modwhatsapp?q=${encodeURIComponent(q)}`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (!data?.status || !Array.isArray(data.result) || data.result.length === 0) {
      return reply("❌ No results found for the given query.");
    }

    let resultText = "";

    data.result.slice(0, 5).forEach((apk) => {
      const cleanTitle = apk.title.split(/(?<=\d{1,2}\.\d{1,2})/)[0].trim();  // Extract main name
      resultText += `🔗 ${cleanTitle}\n${apk.link}\n\n`;
    });

    resultText += `> 🔥 *POWERED BY SHABAN MD*`;

    await conn.sendMessage(from, {
      image: { url: "https://i.ibb.co/XfDnnwRx/shaban-md.jpg" },
      caption: resultText.trim()
    }, { quoted: m });

    await conn.sendMessage(from, { react: { text: "✅", key: m.key } });

  } catch (error) {
    console.error("APKMOD Command Error:", error);
    reply("❌ An error occurred while searching. Please try again.");
  }
});