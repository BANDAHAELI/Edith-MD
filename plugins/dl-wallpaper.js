const { cmd } = require("../command");
const axios = require("axios");

cmd({
  pattern: "wallpaper",
  alias: ["randomwall", "rw"],
  react: "🌌",
  desc: "Download random wallpapers based on keywords.",
 category: "download",
  use: ".rw <keyword>",
  filename: __filename
}, async (conn, m, store, { from, args, reply }) => {
  try {
    const query = args.join(" ") || "random";
    const apiUrl = `https://pikabotzapi.vercel.app/random/randomwall/?apikey=anya-md&query=${encodeURIComponent(query)}`;

    const { data } = await axios.get(apiUrl);
    
    if (data.status && data.imgUrl) {
      const caption = `🌌 *Random Wallpaper: ${query}*\n\n> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴇᴅɪᴛʜ-ᴍᴅ*`;
      await conn.sendMessage(from, { image: { url: data.imgUrl }, caption }, { quoted: m });
    } else {
      reply(`❌ No wallpaper found for *"${query}"*.`);
    }
  } catch (error) {
    console.error("Wallpaper Error:", error);
    reply("❌ An error occurred while fetching the wallpaper. Please try again.");
  }
});
