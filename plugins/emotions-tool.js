const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "hpy",
    desc: "Displays a dynamic emoji animation.",
    category: "tools",
    react: "😂",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const emojiMessages = [
            "😃", "😄", "😁", "😊", "😎",
            "🥳", "🤩", "🤪", "🤣"
        ];

        for (const emoji of emojiMessages) {
            await conn.sendMessage(from, { text: emoji }, { quoted: mek });
            await new Promise(res => setTimeout(res, 600)); // 600ms delay
        }

    } catch (e) {
        console.error("hpy error:", e);
        reply(`❌ *Error:* ${e.message}`);
    }
});

cmd({
    pattern: "heart",
    desc: "Heart spam emoji animation.",
    category: "tools",
    react: "❤️",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const hearts = [
            "💖", "💘", "💕", "💓", "💞",
            "💝", "❤️", "🧡", "💛", "💚",
            "💙", "💜", "🖤", "🤍", "🤎",
            "💔", "❤️‍🔥", "❤️‍🩹", "💗", "💟",
            "💌 Love is in the air 💌"
        ];

        for (const heart of hearts) {
            await conn.sendMessage(from, { text: heart }, { quoted: mek });
            await new Promise(res => setTimeout(res, 500)); // 500ms delay
        }

    } catch (e) {
        console.error("heart command error:", e);
        reply(`❌ *Error:* ${e.message}`);
    }
});

cmd({
    pattern: "virus",
    desc: "Fake virus effect animation (for fun).",
    category: "tools",
    react: "💀",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const virusLines = [
            "☠️ Initializing payload...",
            "📡 Connecting to target device...",
            "🦠 Injecting virus.exe...",
            "💣 Deleting system32...",
            "📂 Encrypting photos...",
            "🔐 Locking WhatsApp...",
            "📲 Accessing front camera...",
            "📤 Uploading data to dark web...",
            "❌ Anti-virus failed...",
            "⚠️ Self-destruct in 3...",
            "💥 2...",
            "💣 1...",
            "🧠 Virus injected successfully!",
            "🤣 Just kidding! It was a prank by SHABAN-MD 🤖"
        ];

        for (const line of virusLines) {
            await conn.sendMessage(from, { text: line }, { quoted: mek });
            await new Promise(res => setTimeout(res, 500)); // 500ms delay
        }

    } catch (e) {
        console.error("virus command error:", e);
        reply(`❌ *Error:* ${e.message}`);
    }
});

cmd({
    pattern: "angry",
    desc: "Angry emoji spam (30 emojis only).",
    category: "tools",
    react: "😡",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const angryEmojis = [
            "😡", "😠", "😤", "🤬", "💢",
            "🔥", "👿", "😾", "💣", "💥",
            "👊", "🗯️", "🥵", "🚫", "🖕",
            "👺", "🧨", "🚷", "🔞", "🛑",
            "😒", "🙄", "👹", "☠️", "👊",
            "🧠", "⚠️", "😾", "🧿", "🤯"
        ];

        for (const emoji of angryEmojis) {
            await conn.sendMessage(from, { text: emoji }, { quoted: mek });
            await new Promise(res => setTimeout(res, 500)); // 500ms delay
        }

    } catch (e) {
        console.error("angry command error:", e);
        reply(`❌ *Error:* ${e.message}`);
    }
});

cmd({
    pattern: "sad2",
    desc: "Sad emoji animation (15 emojis only).",
    category: "tools",
    react: "😢",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const sadEmojis = [
            "😢", "😭", "😿", "💔", "😞",
            "😔", "😩", "😫", "😖", "😟",
            "🥺", "😥", "🫤", "😓", "😣"
        ];

        for (const emoji of sadEmojis) {
            await conn.sendMessage(from, { text: emoji }, { quoted: mek });
            await new Promise(res => setTimeout(res, 500)); // 500ms delay
        }

    } catch (e) {
        console.error("sad command error:", e);
        reply(`❌ *Error:* ${e.message}`);
    }
});

cmd({
    pattern: "shy2",
    desc: "Shy emoji animation (15 emojis only).",
    category: "tools",
    react: "😳",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const shyEmojis = [
            "😳", "☺️", "😊", "🥺", "😚",
            "😙", "😶", "😌", "🙈", "🫣",
            "💞", "💗", "🥰", "🤭", "😅"
        ];

        for (const emoji of shyEmojis) {
            await conn.sendMessage(from, { text: emoji }, { quoted: mek });
            await new Promise(res => setTimeout(res, 500)); // 500ms delay
        }

    } catch (e) {
        console.error("shy command error:", e);
        reply(`❌ *Error:* ${e.message}`);
    }
});

cmd({
    pattern: "moon",
    desc: "Moon emoji animation (15 emojis only).",
    category: "tools",
    react: "🌙",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const moonEmojis = [
            "🌑", "🌒", "🌓", "🌔", "🌕",
            "🌖", "🌗", "🌘", "🌙", "🌚",
            "🌝", "🌛", "🌜", "🌃", "🌌"
        ];

        for (const emoji of moonEmojis) {
            await conn.sendMessage(from, { text: emoji }, { quoted: mek });
            await new Promise(res => setTimeout(res, 500)); // 500ms delay
        }

    } catch (e) {
        console.error("moon command error:", e);
        reply(`❌ *Error:* ${e.message}`);
    }
});

cmd({
    pattern: "confused",
    desc: "Confused emoji animation (15 emojis only).",
    category: "tools",
    react: "😕",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const confusedEmojis = [
            "😕", "😟", "😵", "😵‍💫", "🙃",
            "🤯", "😬", "😖", "😓", "🥴",
            "🤔", "🫤", "🫣", "🤨", "🤷‍♂️"
        ];

        for (const emoji of confusedEmojis) {
            await conn.sendMessage(from, { text: emoji }, { quoted: mek });
            await new Promise(res => setTimeout(res, 500)); // 500ms delay
        }

    } catch (e) {
        console.error("confused command error:", e);
        reply(`❌ *Error:* ${e.message}`);
    }
});

cmd({
    pattern: "hot",
    desc: "Hot emoji spam animation (15 emojis only).",
    category: "tools",
    react: "🔥",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const hotEmojis = [
            "🔥", "🥵", "😈", "👅", "💦",
            "🍑", "🍆", "🌶️", "🫦", "💋",
            "🖤", "💣", "👠", "😮‍💨", "😏"
        ];

        for (const emoji of hotEmojis) {
            await conn.sendMessage(from, { text: emoji }, { quoted: mek });
            await new Promise(res => setTimeout(res, 500)); // 500ms delay
        }

    } catch (e) {
        console.error("hot command error:", e);
        reply(`❌ *Error:* ${e.message}`);
    }
});

cmd({
    pattern: "nikal",
    desc: "Displays a dynamic edit msg for fun.",
    category: "tools",
    react: "🗿",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const loadingMessage = await conn.sendMessage(from, { text: 'SHABAN-MD🗿' });
        
        // Define the ASCII art messages
        const asciiMessages = [
            "⠀⠀⠀⣠⣶⡾⠏⠉⠙⠳⢦⡀⠀⠀⠀⢠⠞⠉⠙⠲⡀⠀\n ⠀⣴⠿⠏⠀⠀⠀⠀⠀     ⢳⡀⠀⡏⠀⠀⠀   ⠀  ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀⠀⣀⡀   ⣧⠀⢸⠀⠀⠀  ⠀    ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲     ⣿  ⣸   Nikal   ⡇\n ⣟⣿⡭⠀⠀⠀⠀⠀⢱⠀⠀      ⣿  ⢹⠀          ⡇\n  ⠙⢿⣯⠄⠀⠀⠀__⠀   ⠀   ⡿ ⠀⡇⠀⠀⠀⠀    ⡼\n⠀⠀⠀⠹⣶⠆⠀⠀⠀⠀⠀⡴⠃⠀   ⠘⠤⣄⣠⠞⠀\n⠀⠀⠀⠀⢸⣷⡦⢤⡤⢤⣞⣁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⢀⣤⣴⣿⣏⠁⠀⠀⠸⣏⢯⣷⣖⣦⡀⠀⠀⠀⠀⠀⠀\n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿⠀⠀⠀⠀⠀⠀\n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏⠀⠀ ⠀⣄⢸⠀⠀⠀⠀⠀⠀`", "⠀⠀⠀⣠⣶⡾⠏⠉⠙⠳⢦⡀⠀⠀⠀⢠⠞⠉⠙⠲⡀⠀\n ⠀⣴⠿⠏⠀⠀⠀⠀⠀  ⠀  ⢳⡀⠀⡏⠀⠀⠀   ⠀  ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀⠀⣀⡀   ⣧⠀⢸⠀⠀⠀       ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲     ⣿  ⣸   Lavde   ⡇\n ⣟⣿⡭⠀⠀⠀⠀⠀⢱⠀⠀      ⣿  ⢹⠀          ⡇\n  ⠙⢿⣯⠄⠀⠀|__|⠀⠀   ⡿ ⠀⡇⠀⠀⠀⠀    ⡼\n⠀⠀⠀⠹⣶⠆⠀⠀⠀⠀⠀⡴⠃⠀   ⠘⠤⣄⣠⠞⠀\n⠀⠀⠀⠀⢸⣷⡦⢤⡤⢤⣞⣁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⢀⣤⣴⣿⣏⠁⠀⠀⠸⣏⢯⣷⣖⣦⡀⠀⠀⠀⠀⠀⠀\n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿⠀⠀⠀⠀⠀⠀\n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏⠀⠀ ⠀⣄⢸⠀⠀⠀⠀⠀⠀`", "⠀⠀⠀⣠⣶⡾⠏⠉⠙⠳⢦⡀⠀⠀⠀⢠⠞⠉⠙⠲⡀⠀\n ⠀⣴⠿⠏⠀⠀     ⠀   ⢳⡀⠀⡏⠀⠀    ⠀  ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀⠀⣀⡀   ⣧⠀⢸⠀⠀⠀⠀      ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲    ⣿  ⣸   Pehli   ⡇\n ⣟⣿⡭⠀⠀⠀⠀⠀⢱⠀⠀     ⣿  ⢹⠀           ⡇\n  ⠙⢿⣯⠄⠀⠀(P)⠀⠀     ⡿ ⠀⡇⠀⠀⠀⠀    ⡼\n⠀⠀⠀⠹⣶⠆⠀⠀⠀⠀⠀⡴⠃⠀   ⠘⠤⣄⣠⠞⠀\n⠀⠀⠀⠀⢸⣷⡦⢤⡤⢤⣞⣁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⢀⣤⣴⣿⣏⠁⠀⠀⠸⣏⢯⣷⣖⣦⡀⠀⠀⠀⠀⠀⠀\n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿⠀⠀⠀⠀⠀⠀\n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏⠀⠀ ⠀⣄⢸⠀⠀⠀⠀⠀⠀`", "⠀⠀⠀⣠⣶⡾⠏⠉⠙⠳⢦⡀⠀⠀⠀⢠⠞⠉⠙⠲⡀⠀\n ⠀⣴⠿⠏⠀⠀     ⠀   ⢳⡀⠀⡏⠀⠀    ⠀  ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀⠀⣀⡀   ⣧⠀⢸⠀   ⠀     ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲    ⣿  ⣸  Fursat  ⡇\n ⣟⣿⡭⠀⠀⠀⠀⠀⢱⠀        ⣿  ⢹⠀          ⡇\n  ⠙⢿⣯⠄⠀⠀⠀__ ⠀  ⠀   ⡿ ⠀⡇⠀⠀⠀⠀    ⡼\n⠀⠀⠀⠹⣶⠆⠀⠀⠀⠀⠀⡴⠃⠀   ⠘⠤⣄⣠⠞⠀\n⠀⠀⠀⠀⢸⣷⡦⢤⡤⢤⣞⣁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⢀⣤⣴⣿⣏⠁⠀⠀⠸⣏⢯⣷⣖⣦⡀⠀⠀⠀⠀⠀⠀\n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿⠀⠀⠀⠀⠀⠀\n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏⠀⠀ ⠀⣄⢸⠀⠀⠀⠀⠀⠀`", "⠀⠀⠀⣠⣶⡾⠏⠉⠙⠳⢦⡀⠀⠀⠀⢠⠞⠉⠙⠲⡀⠀\n ⠀⣴⠿⠏⠀⠀⠀⠀⠀      ⢳⡀⠀⡏⠀⠀    ⠀  ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀⠀⣀⡀   ⣧⠀⢸⠀⠀ ⠀      ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲    ⣿  ⣸  Meeee   ⡇\n ⣟⣿⡭⠀⠀⠀⠀⠀⢱⠀⠀       ⣿  ⢹⠀          ⡇\n  ⠙⢿⣯⠄⠀⠀|__| ⠀    ⡿ ⠀⡇⠀⠀⠀⠀    ⡼\n⠀⠀⠀⠹⣶⠆⠀⠀⠀⠀⠀⡴⠃⠀   ⠘⠤⣄⣠⠞⠀\n⠀⠀⠀⠀⢸⣷⡦⢤⡤⢤⣞⣁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⢀⣤⣴⣿⣏⠁⠀⠀⠸⣏⢯⣷⣖⣦⡀⠀⠀⠀⠀⠀⠀\n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿⠀⠀⠀⠀⠀⠀\n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏⠀⠀ ⠀⣄⢸⠀⠀⠀⠀⠀⠀`", "⠀⠀⠀⣠⣶⡾⠏⠉⠙⠳⢦⡀⠀⠀⠀⢠⠞⠉⠙⠲⡀⠀\n ⠀⣴⠿⠏⠀⠀⠀⠀   ⠀  ⠀⢳⡀⠀⡏⠀⠀       ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀⠀⣀⡀   ⣧⠀⢸⠀  ⠀       ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲   ⣿  ⣸   Nikal   ⡇\n ⣟⣿⡭⠀⠀⠀⠀⠀⢱⠀       ⣿  ⢹⠀           ⡇\n  ⠙⢿⣯⠄⠀⠀lodu⠀⠀   ⡿ ⠀⡇⠀⠀⠀⠀   ⡼\n⠀⠀⠀⠹⣶⠆⠀⠀⠀⠀⠀  ⡴⠃⠀   ⠘⠤⣄⣠⠞⠀\n⠀⠀⠀⠀⢸⣷⡦⢤⡤⢤⣞⣁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⢀⣤⣴⣿⣏⠁⠀⠀⠸⣏⢯⣷⣖⣦⡀⠀⠀⠀⠀⠀⠀\n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿⠀⠀⠀⠀⠀⠀\n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏⠀⠀ ⠀⣄⢸⠀"
        ];

        // Send the initial loading message
        for (const asciiMessage of asciiMessages) {
            await new Promise(resolve => setTimeout(resolve, 500)); // Delay for 500ms second
            await conn.relayMessage(
                from,
                {
                    protocolMessage: {
                        key: loadingMessage.key,
                        type: 14,
                        editedMessage: {
                            conversation: asciiMessage,
                        },
                    },
                },
                {}
            );
        }
    } catch (e) {
        console.log(e);
        reply(`❌ *Error!* ${e.message}`);
    }
});