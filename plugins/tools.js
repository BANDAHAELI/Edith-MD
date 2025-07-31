const cmd = require('../command');
const { Buffer } = require('buffer');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const qrcode = require('qrcode');

// 1. Base64 Encode
cmd({
  pattern: "base64",
  desc: "Encode text to base64",
  category: "tools",
  use: "<text>",
  filename: __filename
}, async (m, command, text) => {
  if (!text) return m.reply("❌ Please provide text to encode.");
  const encoded = Buffer.from(text).toString('base64');
  await m.React("🧬");
  return m.reply(`✅ *Encoded:*\n\`\`\`${encoded}\`\`\``);
});

// 2. Base64 Decode
cmd({
  pattern: "unbase64",
  desc: "Decode base64 to normal text",
  category: "tools",
  use: "<base64>",
  filename: __filename
}, async (m, command, text) => {
  if (!text) return m.reply("❌ Provide base64 string to decode.");
  try {
    const decoded = Buffer.from(text, 'base64').toString('utf-8');
    await m.React("📤");
    return m.reply(`✅ *Decoded:*\n\`\`\`${decoded}\`\`\``);
  } catch {
    await m.React("❌");
    return m.reply("❌ Invalid base64 string.");
  }
});

// 3. Shorten URL
cmd({
  pattern: "short",
  desc: "Shorten long URL",
  category: "tools",
  use: "<url>",
  filename: __filename
}, async (m, command, text) => {
  if (!text) return m.reply("❌ Provide a valid URL.");
  try {
    const res = await axios.get(`https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(text)}`);
    const short = res.data.result.full_short_link;
    await m.React("🔗");
    return m.reply(`✅ *Shortened URL:*\n${short}`);
  } catch {
    await m.React("❌");
    return m.reply("❌ Failed to shorten URL.");
  }
});

// 4. Calculator
cmd({
  pattern: "calc",
  desc: "Evaluate math expression",
  category: "tools",
  use: "<expression>",
  filename: __filename
}, async (m, command, text) => {
  if (!text) return m.reply("❌ Provide an expression.");
  try {
    const result = eval(text);
    await m.React("🧮");
    return m.reply(`✅ *Result:*\n\`\`\`${result}\`\`\``);
  } catch {
    await m.React("❌");
    return m.reply("❌ Invalid math expression.");
  }
});

// 5. UUID Generator
cmd({
  pattern: "uuid",
  desc: "Generate random UUID",
  category: "tools",
  filename: __filename
}, async (m) => {
  const id = uuidv4();
  await m.React("🆔");
  return m.reply(`✅ *UUID v4:*\n\`\`\`${id}\`\`\``);
});

// 6. Reverse Text
cmd({
  pattern: "reverse",
  desc: "Reverse input text",
  category: "tools",
  use: "<text>",
  filename: __filename
}, async (m, command, text) => {
  if (!text) return m.reply("❌ Provide text to reverse.");
  await m.React("🔁");
  return m.reply(`✅ *Reversed:*\n\`\`\`${text.split("").reverse().join("")}\`\`\``);
});

// 7. Binary Encode
cmd({
  pattern: "binary",
  desc: "Convert text to binary",
  category: "tools",
  use: "<text>",
  filename: __filename
}, async (m, command, text) => {
  if (!text) return m.reply("❌ Provide text to convert.");
  const binary = text.split('').map(char => char.charCodeAt(0).toString(2)).join(' ');
  await m.React("💾");
  return m.reply(`✅ *Binary:*\n\`\`\`${binary}\`\`\``);
});

// 8. Binary Decode
cmd({
  pattern: "unbinary",
  desc: "Convert binary to text",
  category: "tools",
  use: "<binary>",
  filename: __filename
}, async (m, command, text) => {
  if (!text) return m.reply("❌ Provide binary string.");
  try {
    const ascii = text.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
    await m.React("📤");
    return m.reply(`✅ *Decoded Text:*\n\`\`\`${ascii}\`\`\``);
  } catch {
    await m.React("❌");
    return m.reply("❌ Invalid binary string.");
  }
});

// 9. QR Code Generator
cmd({
  pattern: "qr",
  desc: "Generate QR code",
  category: "tools",
  use: "<text or URL>",
  filename: __filename
}, async (m, command, text) => {
  if (!text) return m.reply("❌ Provide text or link.");
  try {
    const qrImage = await qrcode.toDataURL(text);
    const buffer = Buffer.from(qrImage.split(',')[1], 'base64');
    await m.React("📷");
    return m.sendMessage(m.chat, { image: buffer, caption: "✅ *QR Code Generated*" }, { quoted: m });
  } catch {
    await m.React("❌");
    return m.reply("❌ Failed to generate QR.");
  }
});

// 10. Timestamp
cmd({
  pattern: "timestamp",
  desc: "Show current timestamp and date",
  category: "tools",
  filename: __filename
}, async (m) => {
  const now = new Date();
  const date = now.toISOString().split("T")[0];
  const time = now.toTimeString().split(" ")[0];
  const timestamp = now.getTime();
  await m.React("⏱️");
  return m.reply(`📅 *Date:* ${date}\n⏰ *Time:* ${time}\n🧭 *Timestamp:* ${timestamp}`);
});

// 11. IP Info
cmd({
  pattern: "ipinfo",
  desc: "Get information of IP address or domain",
  category: "tools",
  use: "<ip or domain>",
  filename: __filename
}, async (m, command, text) => {
  if (!text) return m.reply("❌ Provide an IP address or domain.");
  try {
    const res = await axios.get(`https://ip-api.com/json/${text}`);
    const data = res.data;

    if (data.status !== "success") throw new Error("Invalid IP or domain.");

    const reply = `
🌐 *IP Info for:* \`${text}\`

- 📍 *Country:* ${data.country} (${data.countryCode})
- 🏙️ *Region:* ${data.regionName}
- 🏡 *City:* ${data.city}
- 🛰️ *ISP:* ${data.isp}
- 📡 *Org:* ${data.org}
- 🌎 *Timezone:* ${data.timezone}
- 🔢 *IP Address:* ${data.query}
- 📌 *Coordinates:* ${data.lat}, ${data.lon}
    `.trim();

    await m.React("📍");
    return m.reply(reply);
  } catch {
    await m.React("❌");
    return m.reply("❌ Unable to fetch IP info. Try a valid IP or domain.");
  }
});
