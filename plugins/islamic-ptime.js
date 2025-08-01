const axios = require('axios'); 
const config = require('../config');
const { cmd, commands } = require('../command');
const fetch = require('node-fetch'); 

cmd({
    pattern: "praytime", 
    alias: ["prayertimes", "prayertime", "ptime" ], 
    react: "✅", 
    desc: "Get the prayer times, weather, and location for the city.", 
    category: "islamic", 
    filename: __filename,
},
async(conn, mek, m, {from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, isItzcp, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try {
        const city = args.length > 0 ? args.join(" ") : "NawabShah"; // Default to Bhakkar if no city is provided
        const apiUrl = `https://api.nexoracle.com/islamic/prayer-times?city=${city}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
            return reply('Error fetching prayer times!');
        }

        const data = await response.json();

        if (data.status !== 200) {
            return reply('Failed to get prayer times. Please try again later.');
        }

        const prayerTimes = data.result.items[0];
        const weather = data.result.today_weather; // Weather data
        const location = data.result.city; // Location name

        // Building the message content
        let dec = `*Prayer Times for ${location}, ${data.result.state}*\n\n`;
        dec += `📍 *Location*: ${location}, ${data.result.state}, ${data.result.country}\n`;
        dec += `🕌 *Method*: ${data.result.prayer_method_name}\n\n`;

        dec += `🌅 *Fajr*: ${prayerTimes.fajr}\n`;
        dec += `🌄 *Shurooq*: ${prayerTimes.shurooq}\n`;
        dec += `☀️ *Dhuhr*: ${prayerTimes.dhuhr}\n`;
        dec += `🌇 *Asr*: ${prayerTimes.asr}\n`;
        dec += `🌆 *Maghrib*: ${prayerTimes.maghrib}\n`;
        dec += `🌃 *Isha*: ${prayerTimes.isha}\n\n`;

        dec += `🧭 *Qibla Direction*: ${data.result.qibla_direction}°\n`;

        const temperature = weather.temperature !== null ? `${weather.temperature}°C` : 'Data not available';
        dec += `🌡️ *Temperature*: ${temperature}\n`;

        // Sending the image with the caption and context info
        await conn.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGE_URL }, // Image URL here
                caption: dec,
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
        reply('*Error occurred while fetching prayer times and weather.*');
    }
});
