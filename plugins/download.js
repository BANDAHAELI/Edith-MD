const { fetchJson } = require("../lib/functions");
const { downloadTiktok } = require("@mrnima/tiktok-downloader");
const { facebook } = require("@mrnima/facebook-downloader");
const cheerio = require("cheerio");
const { igdl } = require("ruhend-scraper");
const axios = require("axios");
const { cmd, commands } = require('../command');

cmd({
    pattern: "xx",
    alias: ["xxx", "xxxx"],
    desc: "Download Instagram video",
    category: "downloader",
    react: "📷",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("🔗 Please provide an Instagram link.");
        if (!q.includes("instagram.com")) return reply("❌ Invalid Instagram link.");

        const apiUrl = `https://bk9.fun/download/instagram?url=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data.status || !data.BK9 || !data.BK9.length) {
            return reply("⚠️ Failed to download media from Instagram.");
        }

        // Get first media (could be video or image)
        const media = data.BK9[0];
        const isVideo = media.type === "video" || media.url.includes(".mp4");

        const caption = `📷 *Instagram Media*\n\n👤 *By SHABAN-MD*\n🔗 *Source:* Instagram`;

        if (isVideo) {
            await conn.sendMessage(from, {
                video: { url: media.url },
                caption,
                contextInfo: { mentionedJid: [m.sender] }
            }, { quoted: mek });
        } else {
            await conn.sendMessage(from, {
                image: { url: media.url },
                caption,
                contextInfo: { mentionedJid: [m.sender] }
            }, { quoted: mek });
        }

    } catch (e) {
        console.error("❌ Instagram Downloader Error:", e);
        reply(`⚠️ Error occurred:\n${e.message}`);
    }
});

/// tiktok============================

cmd({ 
  pattern: "tiktok2", 
  alias: ["tt2"], 
  react: "🎥", 
  desc: "Download TikTok videos using FG API", 
  category: "download", 
  filename: __filename 
}, async (conn, m, store, { from, quoted, q, reply }) => {
  try {
    if (!q || !q.startsWith('https://')) return reply("Need a valid TikTok URL");

    store.react('⬇️');

    const apikey = "fg_gHDKTRUn";
    let res = await fetch(`https://api.fgmods.xyz/api/downloader/tiktok?url=${encodeURIComponent(q)}&apikey=${apikey}`);
    let json = await res.json();

    if (!json.status) return reply("*❌ Failed to fetch video. Try again later.*");

    let data = json.result;

    let caption = `
𝗧𝗜𝗞𝗧𝗢𝗞 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥 🎥
┃▸Title: ${data.title || 'No title'}
┃▸Username: @${data.author?.unique_id}
┃▸Views: ${data.play_count}
┃▸Comments: ${data.comment_count}
┃▸Likes: ${data.digg_count}
┃▸Shares: ${data.share_count}

🎥 Reply:
1 - No Watermark
2 - With Watermark
3 - Audio Only
`;

    const sent = await conn.sendMessage(from, {
      image: { url: data.cover },
      caption
    }, { quoted: m });

    const messageID = sent.key.id;

    conn.ev.on("messages.upsert", async msg => {
      try {
        const m2 = msg.messages[0];
        if (!m2.message) return;

        const userMsg = m2.message?.conversation || m2.message?.extendedTextMessage?.text;
        const chatID = m2.key.remoteJid;
        const isReply = m2.message?.extendedTextMessage?.contextInfo?.stanzaId === messageID;

        if (!isReply) return;

        await conn.sendMessage(chatID, { react: { text: "⬇️", key: m2.key } });

        if (userMsg === "1") {
          await conn.sendMessage(chatID, {
            video: { url: data.play },
            caption: "*Downloaded by SHABAN-MD — No Watermark*"
          }, { quoted: m2 });
        } else if (userMsg === "2") {
          await conn.sendMessage(chatID, {
            video: { url: data.wmplay },
            caption: "*Downloaded by SHABAN-MD — With Watermark*"
          }, { quoted: m2 });
        } else if (userMsg === "3") {
          await conn.sendMessage(chatID, {
            audio: { url: data.music },
            mimetype: "audio/mpeg"
          }, { quoted: m2 });
        } else {
          reply("*❌ Invalid selection. Please reply with 1, 2, or 3.*");
        }
      } catch (err) {
        console.log("Reply Handler Error:", err);
      }
    });

  } catch (e) {
    console.log("TikTok2 Error:", e);
    reply("❌ An error occurred while processing your request.");
  }
});

// Facebook-dl =====================

cmd({
  pattern: "fbmega",
  alias: ["facebookmega", "fbmega"],
  react: "📥",
  desc: "Download Facebook videos using Keith API",
  category: "download",
  filename: __filename
}, async (conn, m, store, { from, q, reply }) => {
  try {
    if (!q || !q.startsWith("https://")) return reply("❌ Please provide a valid Facebook video link.");

    store.react('⬇️');

    let res = await fetch(`https://apis-keith.vercel.app/download/fbdown?url=${encodeURIComponent(q)}`);
    let json = await res.json();

    if (!json.status) return reply("*❌ Failed to fetch video. Try again later.*");

    let data = json.result;

    let caption = `
*📥 FACEBOOK VIDEO DOWNLOADER*

🎬 Title: ${data.title || 'Unknown'}
🌐 URL: ${data.url}

🎥 Reply:
1 - HD Video
2 - SD Video
    `.trim();

    const sent = await conn.sendMessage(from, {
      image: { url: data.thumbnail },
      caption
    }, { quoted: m });

    const messageID = sent.key.id;

    conn.ev.on("messages.upsert", async msg => {
      try {
        const m2 = msg.messages[0];
        if (!m2.message) return;

        const userMsg = m2.message?.conversation || m2.message?.extendedTextMessage?.text;
        const chatID = m2.key.remoteJid;
        const isReply = m2.message?.extendedTextMessage?.contextInfo?.stanzaId === messageID;

        if (!isReply) return;

        await conn.sendMessage(chatID, { react: { text: "⬇️", key: m2.key } });

        if (userMsg === "1") {
          await conn.sendMessage(chatID, {
            video: { url: data.media.hd },
            caption: "*Downloaded in HD by SHABAN-MD*"
          }, { quoted: m2 });
        } else if (userMsg === "2") {
          await conn.sendMessage(chatID, {
            video: { url: data.media.sd },
            caption: "*Downloaded in SD by SHABAN-MD*"
          }, { quoted: m2 });
        } else {
          reply("*❌ Invalid selection. Please reply with 1 or 2.*");
        }
      } catch (err) {
        console.log("Reply Handler Error:", err);
      }
    });

  } catch (e) {
    console.log("Facebook Downloader Error:", e);
    reply("❌ An error occurred while processing your request.");
  }
});

// twitter-dl=======================

cmd({ pattern: "twitter", alias: ["twt", "twdl"], desc: "Download Twitter videos", category: "download", filename: __filename }, async (conn, m, store, { from, quoted, q, reply }) => { try { if (!q || !q.startsWith("https://")) { return conn.sendMessage(from, { text: "❌ Please provide a valid Twitter URL." }, { quoted: m }); }

await conn.sendMessage(from, {
  react: { text: '⏳', key: m.key }
});

const response = await axios.get(`https://bk9.fun/download/twitter-2?url=${q}`);
const data = response.data;

if (!data || !data.status || !data.BK9 || !data.BK9.BK9) {
  return reply("⚠️ Failed to retrieve Twitter video. Please check the link and try again.");
}

const videos = data.BK9.BK9.filter(item => item.type === "video");
if (videos.length === 0) {
  return reply("⚠️ No video found in the provided URL.");
}

const [video1, video2] = videos;

const caption = `〔 *TWITTER DOWNLOADER* 〕\n`
  + `┃▸ *Author:* ${data.BK9.authorName} (@${data.BK9.authorUsername})\n`
  + `┃▸ *Likes:* ${data.BK9.likes}\n`
  + `┃▸ *Replies:* ${data.BK9.replies}\n`
  + `┃▸ *Retweets:* ${data.BK9.retweets}\n`
  + `╰━━━⪼\n\n`
  + `📹 *Download Options:*\n`
  + `1️⃣  *Video 1 (Higher Resolution)*\n`
  + `2️⃣  *Video 2 (Lower Resolution)*\n\n`
  + `📌 *Reply with the number to download your choice.*`;

const sentMsg = await conn.sendMessage(from, {
  text: caption
}, { quoted: m });

const messageID = sentMsg.key.id;

conn.ev.on("messages.upsert", async (msgData) => {
  const receivedMsg = msgData.messages[0];
  if (!receivedMsg.message) return;

  const receivedText = receivedMsg.message.conversation || receivedMsg.message.extendedTextMessage?.text;
  const senderID = receivedMsg.key.remoteJid;
  const isReplyToBot = receivedMsg.message.extendedTextMessage?.contextInfo?.stanzaId === messageID;

  if (isReplyToBot) {
    await conn.sendMessage(senderID, {
      react: { text: '⬇️', key: receivedMsg.key }
    });

    switch (receivedText) {
      case "1":
        await conn.sendMessage(senderID, {
          video: { url: video1.url },
          caption: "📥 *Downloaded SHABAN-MD*"
        }, { quoted: receivedMsg });
        break;

      case "2":
        await conn.sendMessage(senderID, {
          video: { url: video2.url },
          caption: "📥 *Downloaded SHABAN-MD*"
        }, { quoted: receivedMsg });
        break;

      default:
        reply("❌ Invalid option! Please reply with 1 or 2.");
    }
  }
});

} catch (error) { console.error("Error:", error); reply("❌ An error occurred while processing your request. Please try again."); } });



// MediaFire-dl========================

cmd({
  pattern: "mediafire",
  alias: ["mfire"],
  desc: "To download MediaFire files.",
  react: "🎥",
  category: "download",
  filename: __filename
}, async (conn, m, store, { from, quoted, q, reply }) => {
  try {
    if (!q) return reply("❌ Please provide a valid MediaFire link.");

    await conn.sendMessage(from, {
      react: { text: "⏳", key: m.key }
    });

    const api = `https://apis-keith.vercel.app/download/mfire?url=${encodeURIComponent(q)}`;
    const response = await axios.get(api);
    const res = response.data;

    if (!res || !res.status || !res.result || !res.result.dl_link) {
      return reply("⚠️ Failed to fetch MediaFire download link. Make sure the link is correct.");
    }

    const {
      fileName,
      fileType,
      size,
      dl_link
    } = res.result;

    await conn.sendMessage(from, {
      react: { text: "⬆️", key: m.key }
    });

    const caption = `〔 *MEDIAFIRE DOWNLOADER* 〕\n`
      + `┃▸ *File Name:* ${fileName}\n`
      + `┃▸ *File Type:* ${fileType}\n`
      + `┃▸ *File Size:* ${size}\n`
      + `╰━━━⪼\n\n`
      + `📥 *SENDING FILE SHABAN-MD*`;

    await conn.sendMessage(from, {
      document: { url: dl_link },
      mimetype: fileType || "application/octet-stream",
      fileName: fileName,
      caption: caption
    }, { quoted: m });

  } catch (error) {
    console.error("Error:", error);
    reply("❌ An error occurred while processing your request. Please try again later.");
  }
});

// apk-dl===========================

cmd({
  pattern: "apk",
  desc: "dl  from mod",
  category: "download",
  filename: __filename
}, async (conn, m, store, {
  from,
  quoted,
  q,
  reply
}) => {
  try {
    if (!q) {
      return reply("❌ Please provide an apk name to search.");
    }

    await conn.sendMessage(from, { react: { text: "⏳", key: m.key } });

    const apiUrl = `http://ws75.aptoide.com/api/7/apps/search/query=${q}/limit=1`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (!data || !data.datalist || !data.datalist.list.length) {
      return reply("⚠️ No results found for the given app name.");
    }

    const app = data.datalist.list[0];
    const appSize = (app.size / 1048576).toFixed(2); // Convert bytes to MB

    const caption = `*Apk Downldoader*
┃ 📦 *Name:* ${app.name}
┃ 🏋 *Size:* ${appSize} MB
┃ 📦 *Package:* ${app.package}
┃ 📅 *Updated On:* ${app.updated}
┃ 👨‍💻 *Developer:* ${app.developer.name}
╰━━━━━━━━━━━━━━━┈⊷
🔗 *Powered By Mʀ-Sʜᴀʙᴀɴ*`;

    await conn.sendMessage(from, { react: { text: "⬆️", key: m.key } });

    await conn.sendMessage(from, {
      document: { url: app.file.path_alt },
      fileName: `${app.name}.apk`,
      mimetype: "application/vnd.android.package-archive",
      caption: caption
    }, { quoted: m });

    await conn.sendMessage(from, { react: { text: "✅", key: m.key } });

  } catch (error) {
    console.error("Error:", error);
    reply("❌ An error occurred while fetching the APK. Please try again.");
  }
});

// G-Drive-DL=====================

cmd({
  pattern: "gdrive",
  desc: "Download Google Drive files.",
  react: "🌐",
  category: "download",
  filename: __filename
}, async (conn, m, store, {
  from,
  quoted,
  q,
  reply
}) => {
  try {
    if (!q) {
      return reply("❌ Please provide a valid Google Drive link.");
    }

    await conn.sendMessage(from, { react: { text: "⬇️", key: m.key } });

    const apiUrl = `https://api.fgmods.xyz/api/downloader/gdrive?url=${encodeURIComponent(q)}&apikey=fg_gHDKTRUn`;
    const response = await axios.get(apiUrl);
    const result = response.data.result;

    if (result?.downloadUrl) {
      await conn.sendMessage(from, { react: { text: "⬆️", key: m.key } });

      await conn.sendMessage(from, {
        document: { url: result.downloadUrl },
        mimetype: result.mimetype || "application/octet-stream",
        fileName: result.fileName || "gdrive_file",
        caption: "*© Powered By Mʀ-Sʜᴀʙᴀɴ*"
      }, { quoted: m });

      await conn.sendMessage(from, { react: { text: "✅", key: m.key } });
    } else {
      return reply("⚠️ No download URL found. Please check the link and try again.");
    }
  } catch (error) {
    console.error("Error:", error?.message || error);
    reply("❌ An error occurred while fetching the Google Drive file. Please try again.");
  }
});
            
// Snapchat============================

cmd({ pattern: "snap", alias: ["snapchat", "snp"], desc: "To download Snapchat videos.", react: "📹", category: "download", filename: __filename }, async (conn, m, store, { from, q, reply }) => { try { if (!q || !q.startsWith("http")) { return reply("❌ Please provide a valid Snapchat link."); }

await conn.sendMessage(from, {
  react: { text: "⏳", key: m.key }
});

const response = await axios.get(`https://api.nexoracle.com/downloader/snapchat?apikey=2f9b02060a600d6c88&url=${encodeURIComponent(q)}`);
const data = response.data;

if (!data || data.status !== 200 || !data.result || !data.result.url) {
  return reply("⚠️ Failed to fetch Snapchat content. Please check the link and try again.");
}

if (data.result.url) {
  await conn.sendMessage(from, {
    video: { url: data.result.url },
    mimetype: "video/mp4",
    caption: `📥 *Snapchat Video Downloaded SHABAN-MD*

🎥 Title: ${data.result.title}
📏 Size: ${data.result.size}` }, { quoted: m }); }

} catch (error) { console.error("Error:", error); reply("❌ An error occurred while processing your request. Please try again."); } });
