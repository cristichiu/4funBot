module.exports = {
    name: "obiectivulZilei",
    async start(option) {
        const { client, Discord, obZilei } = option
        let sended = false;
        client.on('ready', async () => {
            setInterval(async () => {
                const data = new Date()
                const hour = data.getHours()
                if(hour > 1) sended = false;
                if(hour != 0) return;
                if(sended) return;
                const obZileiFind = await obZilei.find({guildID: "848457989715132437"})
                if(!obZileiFind) return;
                const channel = client.guilds.cache.get("848457989715132437").channels.cache.get("990685800574386269")
                if(!channel) return;
                channel.send({embeds: [new Discord.MessageEmbed({
                    color: "BLUE",
                    author: { name: `Obiectivul Zilei` },
                    fields: [
                        { name: 'Mesaje', value: obZileiFind.mesaje.toString(), inline: true, },
                        { name: 'Join', value: obZileiFind.join.toString(), inline: true, },
                        { name: 'Leave', value: obZileiFind.leave.toString(), inline: true, },
                    ],
                    timestamp: Date.now()
                })]})
                sended = true
                await obZilei.findAndUpdate({guildID: "848457989715132437"}, {
                    mesaje: 0,
                    join: 0,
                    leave: 0
                })
            }, 1000 * 60 * 30)
        })
        client.on('messageCreate', async message => {
            if(message.guild.id != "848457989715132437") return;
            const obZileiFind = await obZilei.find({ guildID: "848457989715132437" })
            if(!obZileiFind) {
                await obZilei.create({
                    guildID: "848457989715132437",
                    mesaje: 0, join: 0, leave: 0
                })
                console.log("new Guild was Create")
            } else {
                await obZilei.findAndUpdate({ guildID: "848457989715132437" }, { mesaje: obZileiFind.mesaje + 1 })
                const data = new Date()
                const hour = data.getHours()
                if(hour > 1) sended = false;
                if(hour != 0) return;
                if(sended) return;
                const channel = client.guilds.cache.get("848457989715132437").channels.cache.get("990685800574386269")
                if(!channel) return;
                channel.send({embeds: [new Discord.MessageEmbed({
                    color: "BLUE",
                    author: { name: `Obiectivul Zilei` },
                    fields: [
                        { name: 'Mesaje', value: obZileiFind.mesaje.toString(), inline: true, },
                        { name: 'Join', value: obZileiFind.join.toString(), inline: true, },
                        { name: 'Leave', value: obZileiFind.leave.toString(), inline: true, },
                    ],
                    timestamp: Date.now()
                })]})
                sended = true
                await obZilei.findAndUpdate({guildID: "848457989715132437"}, {
                    mesaje: 0,
                    join: 0,
                    leave: 0
                })
            }
        })
        client.on("guildMemberAdd", async member => { 
            if(member.guild.id != "848457989715132437") return;
            const obZileiFind = await obZilei.find({ guildID: "848457989715132437" })
            if(!obZileiFind) {
                await obZilei.create({
                    guildID: "848457989715132437",
                    mesaje: 0, join: 0, leave: 0
                })
                console.log("new Guild was Create")
            } else {
                await obZilei.findAndUpdate({ guildID: "848457989715132437" }, { join: obZileiFind.join + 1 })
            }
        })
        client.on("guildMemberRemove", async member => { 
            if(member.guild.id != "848457989715132437") return;
            const obZileiFind = await obZilei.find({ guildID: "848457989715132437" })
            if(!obZileiFind) {
                await obZilei.create({
                    guildID: "848457989715132437",
                    mesaje: 0, join: 0, leave: 0
                })
                console.log("new Guild was Create")
            } else {
                await obZilei.findAndUpdate({ guildID: "848457989715132437" }, { leave: obZileiFind.leave + 1 })
            }
        })
    }
}