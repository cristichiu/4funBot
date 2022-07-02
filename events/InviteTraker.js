module.exports = {
    name: "InviteTraker",
    async start(option) {
        const { client, snipe, Discord, profile } = option
        const InvitesTracker = require('@androz2091/discord-invites-tracker');
        const tracker = InvitesTracker.init(client, {
            fetchGuilds: true,
            fetchVanity: true,
            fetchAuditLogs: true
        });
        const inviteriArr = []
        tracker.on('guildMemberAdd', async (member, type, invite) => {
            member.send({embeds: [new Discord.MessageEmbed({
                color: "GREEN",
                author: { name: "Bine ai venit pe serverul 4fun, ai aici câteva informații utile." },
                description: " : Invitație permanentă : https://discord.gg/nXYvjnY9SD\n\n : Canale utile : <#988900701457502238>, <#988900722890395779>, <#989115289532768316>, <#989188170103029831>\n\n : Comenzi utile : `4f xp info`, `4f help` pe <#988898350147448832>",
                timestamp: Date.now()
            })]})
            if(type === 'normal') {
                let profileFind = await profile.find({ userID: invite.inviter.id })
                if(!profileFind) {
                    profile.create({
                        userID: invite.inviter.id,
                        userName: invite.inviter.tag,
                        GVoiceXP: 0,
                        GInviteXP: 0,
                        GMessageXP: 0,
                        SVoiceXP: 0,
                        SInviteXP: 0,
                        SMessageXP: 0
                    })
                } else {
                    let xp = 150
                    let target = member.guild.members.cache.get(invite.inviter.id)
                    if(target.roles.cache.has("990348897010470922")) xp = Math.floor(xp *= 1.5)
                    if(target.roles.cache.has("855068233240281099")) xp = Math.floor(xp *= 2)
                    let addGInvXP = profileFind.GInviteXP + xp
                    let addSInvXP = profileFind.SInviteXP + xp
                    await profile.findAndUpdate({
                        userID: invite.inviter.id
                    }, {
                        GInviteXP: addGInvXP,
                        SInviteXP: addSInvXP,
                        userName: invite.inviter.tag
                    })
                    inviteriArr.push({ user: member.user.id, inviter: invite.inviter.id, xp })
                }
            }
        });
        client.on("guildMemberRemove", async member => {
            const findInviter = inviteriArr.find(inviter => inviter.user == member.user.id)
            if(!findInviter) return;
            let profileFind = await profile.find({ userID: findInviter.inviter })
            if(profileFind) {
                let addGInvXP = profileFind.GInviteXP - findInviter.xp
                let addSInvXP = profileFind.SInviteXP - findInviter.xp
                await profile.findAndUpdate({
                    userID: findInviter.inviter
                }, {
                    GInviteXP: addGInvXP,
                    SInviteXP: addSInvXP,
                })
            }
            let index = inviteriArr.findIndex(obj => obj == findInviter)
            inviteriArr.splice(index, 1)
        })
    }
}