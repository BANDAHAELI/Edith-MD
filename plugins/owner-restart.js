const { cmd, commands } = require("../command");
const { sleep } = require("../lib/functions");

cmd({
    pattern: "restart",
    desc: "Restart the bot EDITH-MD",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, senderNumber, reply
}) => {
    try {
        // Get the bot owner's number dynamically from conn.user.id
        const botOwner = conn.user.id.split(":")[0]; // Extract the bot owner's number
        const owner = comfig.OWNER_NUMBER + "@s.whatsapp.net";
        
        if (senderNumber !== botOwner || senderNumber !== owner) {
            return reply("Only the bot owner can use this command.");
        }

        const { exec } = require("child_process");
        reply("Restarting...");
        await sleep(1500);
        exec("pm2 restart all");
    } catch (e) {
        console.error(e);
        reply(`${e}`);
    }
});
