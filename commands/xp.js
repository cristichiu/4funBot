const { prefix } = require('../settings.json')
module.exports = {
    name: 'xp',
    description: 'vezi ce nivel ai',
    model: `${prefix} xp [user]`,
    permissions: [],
    aliases: ["profile"],
    async execute(option) {
        const { client, Discord, args, snipe, message, profile } = option
        if(args[0] == "info") {
            if(!args[1]) {
                message.channel.send({embeds: [new Discord.MessageEmbed({
                    color: "GREEN",
                    description: `\`${prefix} xp info roluri\` - pentru a afla accesele rolurilor\n\`${prefix} xp info count\` - pentru a afla cum poti primi xp\n\`${prefix} xp [user]\` - pentru a vedea cât xp ai`
                })]})
            }
            if(args[1] == "roluri") {
                message.channel.send({embeds: [new Discord.MessageEmbed({
                    color: "RANDOM",
                    fields: [
                        { name: 'Sistem de grade\n||\n||', value: ` : 10k xp = <@&990311161733996624> =  acces la staff apply\n\n : 20k xp = <@&990311663276281876> = acces la reacturi pe chat\n\n : 50k xp = <@&990311766099652658> = poze pe chat\n\n : 75k = <@&990311860295331890> = acces la comanda 4f snipe\n\n : 150k = <@&990311914619961424> = acces la fire publice pe chat\n\n : 200k = <@&990311985201705030> = acces la comanda 4f snipe all\n\n : 300k = <@&990312057796702209> = acces la fire private pe chat\n\n : 500k = <@&990312122959413348> = momentan nimic\n\n : <@&990348897010470922> = Bonus x1.5 XP\n\n : <@&855068233240281099> = Bonus x2 XP + acces pana la gradul GOLD`},
                    ],
                    footer: {text: `cerut de: ${message.author.tag}`, iconURL: message.author.avatarURL()},
                    timestamp: Date.now()
                })]})
            }
            if(args[1] == "count") {
                message.channel.send({embeds: [new Discord.MessageEmbed({
                    color: "RANDOM",
                    fields: [
                        { name: 'Sistem de xp', value: ` : 1 minut voice = 3-4xp\n : 1 mesaj = 2-3xp\n : 1 invite = 150xp` },
                        { name: "Câteva info utile", value: ` : Rolul de family - bonus \`x1,5\` la XP.\n\n : Rolul de boost - bonus \`x2\` la XP.\n\n : Rolul de family + boost - bonus \`x3\` la XP\n\n : Pentru rolul de family trebuie să-ți pui tag-ul in nume (\`tag\` pe orice chat) sau să-ți pui o invitație pe acest server în status sau la about me.\n\n : Pentru rolul de boost trebuie să dai boost la server.` }
                    ],
                    footer: {text: `cerut de: ${message.author.tag}`, iconURL: message.author.avatarURL()},
                    timestamp: Date.now()
                })]})
            }
        } else {
            let target = message.mentions.users.first() || message.guild.members.cache.get(args[0])?.user || message.author;
            if(!target) return message.channel.send("Ceva nu a mers bine:(")
            if(target.bot) return message.channel.send("Nu pot crea un profil unui bot:(")
            
            let profileFind = await profile.find({ userID: target.id })
            if(!profileFind) {
                profile.create({
                    userID: target.id,
                    userName: target.tag,
                    GVoiceXP: 0,
                    GInviteXP: 0,
                    GMessageXP: 0,
                    SVoiceXP: 0,
                    SInviteXP: 0,
                    SMessageXP: 0
                })
                const embed = new Discord.MessageEmbed({
                    color: "RED",
                    author: { name: `Se pare că nu am găsit un profil pentru userul ${target.tag}, dar i-am creat unu:D`, icon_url: target.avatarURL() },
                    footer: {text: `cerut de: ${message.author.tag}`, iconURL: message.author.avatarURL()},
                    timestamp: Date.now()
                })
                if(message.author.id == target.id) embed.footer = null
                message.channel.send({embeds: [embed]})
            } else {
                let xpSum = profileFind.GVoiceXP + profileFind.GMessageXP + profileFind.GInviteXP
                let embed = new Discord.MessageEmbed({
                    color: "GREEN",
                    author: { name: `XP-ul userului ${target.tag}`, icon_url: target.avatarURL() },
                    description: `Suma totala de xp: ${xpSum.toString()}`,
                    fields: [
                        { name: 'Voice XP', value: profileFind.GVoiceXP.toString(), inline: true },
                        { name: 'Message XP', value: profileFind.GMessageXP.toString(), inline: true },
                        { name: 'Invite XP', value: profileFind.GInviteXP.toString(), inline: true },
                    ],
                    footer: {text: `cerut de: ${message.author.tag}`, iconURL: message.author.avatarURL()},
                    timestamp: Date.now()
                })
                if(target.id == message.author.id) embed.footer = null
                message.channel.send({embeds: [embed]})
            }
        }
    }
}