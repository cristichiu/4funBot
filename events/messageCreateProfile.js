module.exports = {
    name: "MessageCreateProfile",
    async start(option) {
        const { client, profile, messageDelaySet } = option
        client.on('messageCreate', async message => {
            if(message.author.bot) return;
            if(messageDelaySet.has(message.author.id)) return;
            const channelBlackListID = []
            let allow = true
            channelBlackListID.forEach(channel => { if(channel == message.channel.id) allow = false })
            if(!allow) return;
            let profileFind = await profile.find({ userID: message.author.id })
            if(!profileFind) {
                profile.create({
                    userID: message.author.id,
                    userName: message.author.tag,
                    GVoiceXP: 0,
                    GInviteXP: 0,
                    GMessageXP: 0,
                    SVoiceXP: 0,
                    SInviteXP: 0,
                    SMessageXP: 0
                })
            } else {
                let xp = Math.floor(Math.random() * 2 + 2)
                let target = message.guild.members.cache.get(message.author.id)
                if(target.roles.cache.has("990348897010470922")) xp = Math.floor(xp *= 1.5)
                if(target.roles.cache.has("855068233240281099")) xp = Math.floor(xp *= 2)
                let addGmessXP = profileFind.GMessageXP + xp
                let addSmessXP = profileFind.SMessageXP + xp
                let updateProfile = await profile.findAndUpdate({
                    userID: message.author.id
                }, {
                    GMessageXP: addGmessXP,
                    SMessageXP: addSmessXP,
                    userName: message.author.tag
                })
                messageDelaySet.add(message.author.id)
                setTimeout(async () => { if(messageDelaySet.has(message.author.id)) messageDelaySet.delete(message.author.id) }, 3000)

                xpSum = updateProfile.GMessageXP + updateProfile.GVoiceXP + updateProfile.GInviteXP
                function giveRole(roleID, suma) {
                    const role = message.guild.roles.cache.get(roleID)
                    if(role == undefined) return console.log("Ceva nu a mers bine la rolurile de xp:(")
                    if(xpSum > suma) {
                        if(target.roles.cache.has(role.id)) return
                        target.roles.add(role)
                        message.channel.send(`GG ${message.author.tag} ai avansat la gradul ${role.name}`)
                    } else {
                        if(!target.roles.cache.has(role.id)) return
                        target.roles.remove(role)
                    }
                }
                /* coal */ giveRole("990311161733996624", 10000)
                /* bronze */ giveRole("990311663276281876", 20000)
                /* iron */ giveRole("990311766099652658", 50000)
                /* gold */ giveRole("990311860295331890", 75000)
                /* dimond */ giveRole("990311914619961424", 150000)
                /* emerald */ giveRole("990311985201705030", 200000)
                /* titan */ giveRole("990312057796702209", 300000)
                /* legend */ giveRole("990312122959413348", 500000)
            }
        })
    }
}