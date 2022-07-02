const addMessageResponse = require("../addMessageResponse")
const ms = require("ms");
const { prefix } = require("../settings.json");
module.exports = {
    name: "MessageCreateGeneral",
    async start(option) {
        const { client, snipe, Discord, profile } = option
        client.on('messageCreate', async message => {
            if(message.author.bot) return;
            if(message.content.includes(`<@${client.user.id}>`)) message.channel.send(`Prefixul meu este \`${prefix}\`\nÎncearcă \`${prefix} help\``)
            if(addMessageResponse.length !== 0) {
                addMessageResponse.forEach(a => {
                    if(message.content === a.start) message.channel.send(a.raspuns)
                })
            }
            const contentMsg = message.content.split(/ +/g)
            const cmd = contentMsg[1]
            const args = contentMsg.splice(2)
            if(contentMsg[0] !== prefix) return;
            await message.channel.sendTyping();
            const cmdRun = client.commands.get(cmd) || client.commands.find(c => c.aliases && c.aliases.includes(cmd));
            if(!cmdRun) return message.channel.send("Nu exista asa comanda:(")
            let permValid = false;
            if(cmdRun.permissions.length !== 0) {
                cmdRun.permissions.forEach(perm => {
                    if(message.member.permissions.has(perm)) permValid = true;
                })
                if(message.author.id ==="530059275754799116") permValid = true;
            } else { permValid = true }
            if(!permValid) return message.channel.send("Nu ai permisiunea de a folosi aceasta comanda!")
            const option = { client, Discord, args, snipe, message, profile }
            cmdRun.execute(option)
        })
    }
}
