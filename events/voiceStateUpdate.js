const profile = require("../localDataInit")
module.exports = {
    name: "voiceStateUpdate",
    async start(option) {
      const { client, snipe, Discord, familySet, profile } = option 
        client.on("voiceStateUpdate", async (oldState, newState) => {
            const channel = newState.channel;
            if (!channel) return;

            const profileFind = await profile.find({ userID: newState.member.id });
            if (!profileFind) {
                await profile.create({
                    userID: newState.member.id,
                    userName: newState.author.tag,
                    GVoiceXP: 0,
                    GInviteXP: 0,
                    GMessageXP: 0,
                    SVoiceXP: 0,
                    SInviteXP: 0,
                    SMessageXP: 0
                })
                console.log(`+ ${member.user.username}`);
            }
            
            if (!client.voices.has(channel.id)) {
                client.voices.set(channel.id, channel);

                let int = setInterval(() => {
                    let members = channel.members;
                    if (members.size == 0) return clearInterval(int);
                    
                    members = members.filter(m => !m.user.bot && !m.voice.selfMute)
                    if (members.size == 1) return;
                    
                    members.forEach(async member => {
                        let xp = Math.floor(Math.random() * 2 + 3);
                        let target = newState.guild.members.cache.get(member.id)
                        if(target.roles.cache.has("990348897010470922")) xp = Math.floor(xp *= 1.5)
                        if(target.roles.cache.has("855068233240281099")) xp = Math.floor(xp *= 2)

                        let profileFind = await profile.find({ userID: member.id });
                        
                        profileFind = await profile.findAndUpdate({ userID: member.id }, {
                            SVoiceXP: profileFind.SVoiceXP + xp,
                            GVoiceXP: profileFind.GVoiceXP + xp
                        })
                    })
                }, 60000)
            }
        })
    }
}