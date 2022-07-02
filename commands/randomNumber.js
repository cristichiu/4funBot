const { prefix } = require("../settings.json");
module.exports = {
    name: "number",
    description: "o să aleg un numă random",
    model: `${prefix} number [nr. 1] [nr. 2-optional]`,
    permissions: [],
    aliases: ["randomNumber", "rn", "random"],
    async execute(option) {
        const { Discord, args, message } = option
        if(!args[0]) return message.channel.send("Trebuie să adaugi un numar!")
        if(isNaN(args[0])) return message.channel.send(`Nu pot să aleg un număr de la 0 la ${args[0]}..://\nTrebuie să adaugi un număr.`)
        let dobleNumber = false;
        if(args[1]) { if(!isNaN(args[1])) dobleNumber = true }
        if(dobleNumber) {
            let firstNumber;; let lastNumber;
            if(args[0] < args[1]) {
                firstNumber = args[0]
                lastNumber = args[1]
            } else {
                firstNumber = args[1]
                lastNumber = args[0]
            }
            firstNumber = parseInt(firstNumber); lastNumber = parseInt(lastNumber)
            if(firstNumber == undefined && lastNumber == undefined) return message.channel.send("Se pare că ai reușit să mă încurci, nu pot să aleg un număr!:((")
            // 10 25
            const diference = lastNumber - firstNumber
            let number = Math.floor(Math.random() * diference + firstNumber)
            console.log(diference, lastNumber, firstNumber, number)
            message.channel.send({embeds: [new Discord.MessageEmbed({
                color: "RANDOM",
                title: `Numărul ales de mine este: __**${number}**__`,
                footer: {text: `cerut de: ${message.author.tag}`, iconURL: message.author.avatarURL()},
                timestamp: Date.now()
            })]})
        } else {
            let number = Math.floor(Math.random() * args[0])
            message.channel.send({embeds: [new Discord.MessageEmbed({
                color: "RANDOM",
                title: `Numărul ales de mine este: __**${number}**__`,
                footer: {text: `cerut de: ${message.author.tag}`, iconURL: message.author.avatarURL()},
                timestamp: Date.now()
            })]})
        }
    }
}