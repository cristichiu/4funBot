const ms = require("ms")
module.exports = {
    name: "ready",
    async start(option) {
        const { client } = option
        client.on("ready", async () => {
            console.log(`${client.user.username} - este on:D`);
            const guild = client.guilds.cache.get("848457989715132437")
            const membersCount = guild.memberCount
            const botRoleSize = guild.roles.cache.get("988900815420940378").members.size
            const channel = guild.channels.cache.get("990531999624200253")
            setInterval(async () => {
                channel.setName(`members: ${membersCount - botRoleSize}`)
            }, 1000 * 60 * 3)
        })
    }
}
