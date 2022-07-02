module.exports = {
    name: "MessageDelete",
    async start(option) {
        const { client, snipe } = option
        client.on('messageDelete', message => {
            const channelId = message.channel.id
            const channelName = message.channel.name
            const messageContent = message.content
            const messageAuthor = message.author.tag
            const time = Date.now()
            if(messageContent === "") return;
            if(snipe.length < 10) {
                snipe.push({channelId, messageContent, messageAuthor, time, channelName})
            } else {
                snipe.shift()
                snipe.push({channelId, messageContent, messageAuthor, time, channelName})
            }
        });
    }
}