const { prefix } = require('../settings.json')
const ms = require("ms")
module.exports = {
    name: 'work',
    description: 'Poți munci cinstit folosind această comandă',
    model: `${prefix} work`,
    permissions: [],
    aliases: ["lucru", "calvar"],
    async execute(option) {
        const { Discord, message, money } = option
        const findProfile = await money.find({ userID: message.author.id })
        if(!findProfile) {
            await money.create({
                userID: message.author.id,
                userName: message.author.tag,
                bal: 500,
                job: "Boschetar",
                facultati: [],
                nextWork: null
            })
            message.channel.send("Din păcate nu aveai un profil, acum ți-am creat unul. Distracție plăcută:D")
        } else {
            let allow = true;
            if(findProfile.nextWork) {
                const curentDate = new Date()
                const nextWorkDate = new Date(findProfile.nextWork)
                if(curentDate.getTime() < nextWorkDate.getTime()) allow = false
            }
            if(allow) {
                let WorkInfo = {
                    nextWorkTime: 0,
                    moneyAdd: 0,
                    mesaj: "",
                }
                switch(findProfile.job) {
                    case "Boschetar":
                        WorkInfo.nextWorkTime = ms("1h")
                        WorkInfo.moneyAdd = Math.floor(Math.random() * 50 + 50)
                        WorkInfo.mesaj = `Se pare că oamenii au fost buni cu tine și ți-au dat ${WorkInfo.moneyAdd} bănuți:D`
                    break
                    case "Maturator":
                        WorkInfo.nextWorkTime = ms("2h")
                        WorkInfo.moneyAdd = 350
                        WorkInfo.mesaj = `O zi obișnuită ca și ${findProfile.job}. Ai făcut ${WorkInfo.moneyAdd} bănuți azi.`
                    break
                    case "Vanzator":
                        WorkInfo.nextWorkTime = ms("2h")
                        WorkInfo.moneyAdd = 400
                        WorkInfo.mesaj = `O zi obișnuită ca și ${findProfile.job}. Ai făcut ${WorkInfo.moneyAdd} bănuți azi.`
                    break
                    case "Pompier":
                        WorkInfo.nextWorkTime = ms("6h")
                        WorkInfo.moneyAdd = 1000
                        WorkInfo.mesaj = `O zi obișnuită ca și ${findProfile.job}. Ai făcut ${WorkInfo.moneyAdd} bănuți azi.`
                    break
                    case "Politist":
                        WorkInfo.nextWorkTime = ms("6h")
                        WorkInfo.moneyAdd = 1500
                        WorkInfo.mesaj = `O zi obișnuită ca și ${findProfile.job}. Ai făcut ${WorkInfo.moneyAdd} bănuți azi.`
                    break
                    case "Mecanic":
                        WorkInfo.nextWorkTime = ms("1h")
                        WorkInfo.moneyAdd = 350
                        WorkInfo.mesaj = `O zi obișnuită ca și ${findProfile.job}. Ai făcut ${WorkInfo.moneyAdd} bănuți azi.`
                    break
                    case "Bucatar":
                        WorkInfo.nextWorkTime = ms("3h")
                        WorkInfo.moneyAdd = 1200
                        WorkInfo.mesaj = `O zi obișnuită ca și ${findProfile.job}. Ai făcut ${WorkInfo.moneyAdd} bănuți azi.`
                    break
                    case "Programator":
                        WorkInfo.nextWorkTime = ms("6h")
                        WorkInfo.moneyAdd = 3000
                        WorkInfo.mesaj = `O zi obișnuită ca și ${findProfile.job}. Ai făcut ${WorkInfo.moneyAdd} bănuți azi.`
                    break
                    case "Medic":
                        WorkInfo.nextWorkTime = ms("12h")
                        WorkInfo.moneyAdd = 10000
                        WorkInfo.mesaj = `O zi obișnuită ca și ${findProfile.job}. Ai făcut ${WorkInfo.moneyAdd} bănuți azi.`
                    break
                    case "Manager":
                        WorkInfo.nextWorkTime = ms("24h")
                        WorkInfo.moneyAdd = 25000
                        WorkInfo.mesaj = `O zi obișnuită ca și ${findProfile.job}. Ai făcut ${WorkInfo.moneyAdd} bănuți azi.`
                    break
                    case "Furator":
                        WorkInfo.nextWorkTime = ms("2h")
                        WorkInfo.moneyAdd = Math.floor(Math.random() * 500)
                        let sansa = Math.floor(Math.random()* 3)
                        if(sansa != 1) {
                            WorkInfo.mesaj = `Viata in calitate de hoț be like: Era să câștigi ${WorkInfo.moneyAdd}, dar ai fost prins si ai pierdut tot:(`
                            WorkInfo.moneyAdd = 0
                        } else {
                            WorkInfo.mesaj = `Nu e frumos să furi, dar uneori merită. Se pare că azi ai avut o zi norocoasă și ai reușit să furi ceva în valoare de ${WorkInfo.moneyAdd}`
                        }
                    break
                }
                const nextWork = Date.now() + WorkInfo.nextWorkTime;
                await money.findAndUpdate({userID: message.author.id},{
                    bal: findProfile.bal + WorkInfo.moneyAdd,
                    userName: message.author.tag, nextWork
                })
                message.channel.send(WorkInfo.mesaj)
            } else {
                if(findProfile.nextWork) {
                    message.channel.send({embeds: [new Discord.MessageEmbed({
                        color: "RED",
                        author: { name: "Nu poți munci acum!", icon_url: message.author.avatarURL() },
                        description: `Poți să faci asta: <t:${Math.floor(findProfile.nextWork/1000)}:R>`,
                        timestamp: Date.now()
                    })]})
                } else {
                    message.channel.send("Ceva ciudat s-a întâmplat, probabil o eroare (sperăm să se rezolve cat mai repede posibil:()")
                }
            }
        }
    }
}