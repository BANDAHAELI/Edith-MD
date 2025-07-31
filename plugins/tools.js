const {cmd} = require("../command");
const axios = require("axios");
const { writeFileSync } = require("fs");
const { v4: uuidv4 } = require("uuid");

// 1. Base64 Encode
cmd({
  pattern: "base64",
  desc: "Convert text to base64",
  category: "tools",
  use: "<text>",
  filename: __filename
}, async (m, command, text) => {
  if (!text) return m.reply("❌ Provide text to encode.");
  await m.React("🔐");
  const encoded = Buffer.from(text).toString("base64");
  m.reply(`🔐 Base64:\n\`\`\`${encoded}\`\`\``);
});

// 2. Base64 Decode
cmd({
  pattern: "unbase64",
  desc: "Decode base64 text",
  category: "tools",
  use: "<base64>",
  filename: __filename
}, async (m, command, text) => {
  if (!text) return m.reply("❌ Provide base64 string to decode.");
  await m.React("🔓");
  try {
    const decoded = Buffer.from(text, "base64").toString("utf-8");
    m.reply(`🔓 Decoded:\n\`\`\`${decoded}\`\`\``);
  } catch {
    m.reply("❌ Invalid base64 format.");
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
  if (!text) return m.reply("❌ Provide a URL to shorten.");
  await m.React("🔗");
  try {
    const res = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(text)}`);
    m.reply(`🔗 Shortened URL:\n${res.data}`);
  } catch {
    m.reply("❌ Unable to shorten URL.");
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
  if (!text) return m.reply("❌ Provide a math expression.");
  try {
    const result = eval(text);
    await m.React("🧮");
    m.reply(`🧮 Result: \`\`\`${result}\`\`\``);
  } catch {
    m.reply("❌ Invalid expression.");
  }
});

// 5. UUID Generator
cmd({
  pattern: "uuid",
  desc: "Generate a UUID",
  category: "tools",
  filename: __filename
}, async (m) => {
  await m.React("🆔");
  m.reply(`🆔 UUID: \`${uuidv4()}\``);
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
  await m.React("🔄");
  m.reply(`🔁 Reversed:\n\`\`\`${text.split("").reverse().join("")}\`\`\``);
});

// 7. Text to Binary
cmd({
  pattern: "binary",
  desc: "Convert text to binary",
  category: "tools",
  use: "<text>",
  filename: __filename
}, async (m, command, text) => {
  if (!text) return m.reply("❌ Provide text to convert.");
  await m.React("0️⃣1️⃣");
  const binary = text.split("").map(c => c.charCodeAt(0).toString(2)).join(" ");
  m.reply(`0️⃣1️⃣ Binary:\n\`\`\`${binary}\`\`\``);
});

// 8. Binary to Text
cmd({
  pattern: "unbinary",
  desc: "Convert binary to text",
  category: "tools",
  use: "<binary>",
  filename: __filename
}, async (m, command, text) => {
  if (!text) return m.reply("❌ Provide binary string to decode.");
  await m.React("🔁");
  try {
    const ascii = text.split(" ").map(b => String.fromCharCode(parseInt(b, 2))).join("");
    m.reply(`🔤 Decoded:\n\`\`\`${ascii}\`\`\``);
  } catch {
    m.reply("❌ Invalid binary input.");
  }
});

// 9. QR Code Generator
cmd({
  pattern: "qr",
  desc: "Generate QR code from text",
  category: "tools",
  use: "<text>",
  filename: __filename
}, async (m, command, text) => {
  if (!text) return m.reply("❌ Provide text to convert.");
  await m.React("📷");
  try {
    const qr = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(text)}&size=300x300`;
    m.sendMessage(m.jid, { image: { url: qr }, caption: "📷 Your QR Code" }, { quoted: m });
  } catch {
    m.reply("❌ Failed to generate QR code.");
  }
});

// 10. Timestamp Generator
cmd({
  pattern: "timestamp",
  desc: "Get current timestamp",
  category: "tools",
  filename: __filename
}, async (m) => {
  await m.React("⏰");
  const now = new Date();
  const timestamp = `
📅 Date: ${now.toLocaleDateString()}
⏰ Time: ${now.toLocaleTimeString()}
🕒 Timestamp: ${now.getTime()}
  `.trim();
  m.reply(timestamp);
});

// 11. IP Info
cmd({
  pattern: "ipinfo",
  desc: "Get IP or domain info",
  category: "tools",
  use: "<ip/domain>",
  filename: __filename
}, async (m, command, text) => {
  if (!text) return m.reply("❌ Provide an IP or domain.");
  await m.React("🌍");
  try {
    const res = await axios.get(`http://ip-api.com/json/${text}`);
    const d = res.data;
    if (d.status !== "success") throw new Error();
    m.reply(`🌐 *IP Info for:* \`${text}\`

- 🌎 Country: ${d.country}
- 📍 Region: ${d.regionName}
- 🏙️ City: ${d.city}
- 🌐 ISP: ${d.isp}
- 🛰️ Org: ${d.org}
- ⏰ Timezone: ${d.timezone}
- 🔢 IP: ${d.query}
- 📌 Location: ${d.lat},${d.lon}`);
  } catch {
    m.reply("❌ Invalid IP or domain.");
  }
});

// 12. NPM Package Info
cmd({
  pattern: "npm",
  desc: "Search NPM package",
  category: "tools",
  use: "<package name>",
  filename: __filename
}, async (m, command, text) => {
  if (!text) return m.reply("❌ Provide a package name.");
  await m.React("📦");
  try {
    const res = await axios.get(`https://api.npms.io/v2/package/${text}`);
    const d = res.data;
    m.reply(`📦 *NPM Package Info*

- 🔤 Name: ${d.collected.metadata.name}
- 🧾 Version: ${d.collected.metadata.version}
- 🧑‍💻 Author: ${d.collected.metadata.author?.name || "N/A"}
- 🗓️ Published: ${d.collected.metadata.date}
- 📄 Description: ${d.collected.metadata.description}
- 🔗 Link: ${d.collected.metadata.links.npm}`);
  } catch {
    m.reply("❌ Package not found.");
  }
});
