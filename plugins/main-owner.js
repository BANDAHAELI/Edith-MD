const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "owner",
    react: "✅", 
    desc: "Get owner number",
    category: "main",
    filename: __filename
}, 
async (conn, mek, m, { from }) => {
    try {
        const ownerNumber = config.OWNER_NUMBER; // Fetch owner number from config
        const ownerName = config.OWNER_NAME;     // Fetch owner name from config

        const vcard = 'BEGIN:VCARD\n' +
                      'VERSION:3.0\n' +
                      `FN:${ownerName}\n` +  
                      `TEL;type=CELL;type=VOICE;waid=${ownerNumber.replace('+', '')}:${ownerNumber}\n` + 
                      'END:VCARD';

        // Send the vCard
        await conn.sendMessage(from, {
            contacts: {
                displayName: ownerName,
                contacts: [{ vcard }]
            }
        });

        // Send the owner contact message with image
        await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/6pfz02.jpg' },
            caption: `╭━━〔 *EDITH-MD* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• *Here Is The Owner Details*
┃◈┃• *Name* - ${ownerName}
┃◈┃• *Number* ${ownerNumber}
┃◈┃• *Version*: 5.0.0 Beta
┃◈└───────────┈⊷
╰──────────────┈⊷
> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴇᴅɪᴛʜ ᴍᴅ`,
            contextInfo: {
                mentionedJid: [`${ownerNumber.replace('+', '')}@s.whatsapp.net`], 
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363315182578784@newsletter',
                    newsletterName: 'ᴇᴅɪᴛʜ ᴍᴅ',
                    serverMessageId: 143
                }            
            }
        }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply(`An error occurred: ${error.message}`);
    }
});
