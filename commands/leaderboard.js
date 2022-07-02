const { prefix } = require("../settings.json");
const { MessageEmbed } = require("discord.js");
const { readFileSync } = require("fs");
module.exports = {
    name: "leaderboard",
    description: "Vezi cei mai activi membri de pe 4FUN.",
    model: `${prefix} leaderboard`,
    permissions: [],
    aliases: ["top"],
    async execute(option) {
        const { message } = option;
        let fileContent = readFileSync("./LocalData/profile", "utf-8");
        let fileContentObject = [];
        fileContent = fileContent.split("\n");
        fileContent.pop();
        fileContent.forEach(content => {
            content = JSON.parse(content);
            fileContentObject.push(content);
        })
        fileContent = fileContentObject;

        fileContent.sort((a, b) => {
            return (b.GVoiceXP + b.GInviteXP + b.GMessageXP) - (a.GVoiceXP + a.GInviteXP + a.GMessageXP);
        })
        fileContent = fileContent.slice(0, 10);

        let usersToString = "";

        for (let i = 0; i < fileContent.length; i++) {
            let user = fileContent[i];
            let place = "";

            if (i == 0) place = "> 🥇";
            else if (i == 1) place = "> 🥈";
            else if (i == 2) place = "> 🥉";
            else place = `${i + 1}.`;
            
            usersToString += `${place} <@${user.userID}> - ${user.GVoiceXP + user.GMessageXP + user.GInviteXP} total XP\n`;
        }

        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor({ name: "Acestia sunt cei mai activi membri de pe 4FUN" })
            .setDescription(usersToString)
            .setFooter({ text: `cerut de: ${message.author.tag}`, iconURL: message.author.avatarURL({ dynamic: true }) })
            .setTimestamp();

        message.channel.send({ embeds: [embed] }).catch(err => { });
    }
}