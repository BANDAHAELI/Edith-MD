const { cmd } = require('../command');

cmd({
    pattern: "hack",
    desc: "Displays a realistic and animated fake hacking sequence.",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { 
    from, quoted, body, isCmd, command, args, q, isGroup, senderNumber, reply 
}) => {
    try {
        const botOwner = conn.user.id.split(":")[0];
        if (senderNumber !== botOwner) {
            return reply("🚫 *Only the bot owner can run this high-level command.*");
        }

        // React with computer emoji
        await m.react("💻");

        const steps = [
            '*Initializing secure terminal...* 🟢',
            '*Booting up EDITH-MD Hacking Core* 🔁',
            'Authenticating session... 🔐\n`TOKEN: VERIFIED ✅`',
            'Scanning target systems... 🛰️\n`FOUND 3 Vulnerabilities`',
            'Injecting payload... ☣️',
            'Bypassing firewalls... 🧱➡️🚫',
            '`[▁▁▁▁▁▁▁▁▁▁] 0%` Starting Hack...',
            '`[██▁▁▁▁▁▁▁▁▁] 20%` Accessing Ports 🔍',
            '`[████▁▁▁▁▁▁▁] 40%` Sniffing Data 📡',
            '`[██████▁▁▁▁▁] 60%` Cloning Repositories 👀',
            '`[████████▁▁▁] 80%` Cracking Hashes 🔓',
            '`[██████████] 100%` Operation Complete ✅',
            '📁 Extracted Files:\n - passwords.txt\n - logs.json\n - config.env',
            '*Uploading to Secure Cloud...* ☁️',
            '*Spoofing traces...* 🕵️‍♂️',
            '*Cleaning up digital footprints...* 🧽',
            '*Closing backdoors...* 🚪',
            '🧠 `EDITH AI:` _Mission successful. No traces left._',
            '⚠️ *This was a simulation. Stay ethical, stay safe.*',
            '> *EDITH-MD HACKING SIMULATION ENDED* 🛡️'
        ];

        for (const line of steps) {
            await conn.sendMessage(from, { text: line }, { quoted: mek });
            await new Promise(res => setTimeout(res, Math.floor(Math.random() * 600) + 800)); // 800-1400ms delay
        }

        await m.react("✅");
    } catch (e) {
        console.error(e);
        await m.react("❌");
        reply(`❌ *Unexpected error:* ${e.message}`);
    }
});
