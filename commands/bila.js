const { prefix } = require("../settings.json");
module.exports = {
    name: "bila",
    description: "Întrabă-mă orice!",
    model: `${prefix} bila [întrebare]`,
    permissions: [],
    aliases: ["8ball"],
    async execute(option) {
        const { Discord, args, message } = option
        const resOption = [
            { res: "NU, în totalitate NUUU.", value: 0 },
            { res: "Normal ca NU.", value: 0 },
            { res: "Normal ca DA.", value: 1 },
            { res: "Da, de zece ori DA.", value: 1 },
            { res: "În totalitate Da!", value: 1 },
            { res: "Sub nici o formă, nu și gata!!!", value: 0 },
            { res: "Nu vreau sa raspund la asa ceva!!!", value: null },
            { res: "Nu ma enerva cu așa întrebări!", value: null },
            { res: "Ce e cu întrebarea asta?", value: null },
            { res: "Ok, fie DA!", value: 1 },
            { res: "Nu!", value: 0 },
            { res: "Da!", value: 1 },
            { res: "Nu, scurt și pe doi!", value: 0 },
            { res: "Să fie clar, mereu o să raspund cu da la aceste întrebări.", value: 1 },
            { res: "Să fie clar, mereu o să raspund cu nu la aceste întrebări.", value: 0 },
            { res: "O să răspund cu da, sper sa fie totul bine.", value: 1 },
            { res: "Nu mă mai întreba asta niciodata, daca o mai faci mama ta e ceva foarte urât!", value: null },
            { res: "Dacă mă mai întrebi asta odata, te înjur!", value: null },
            { res: "Nu știu ce să răspund la asta.", value: null },
            { res: "NU, NU ȘI GATA!!!!!", value: 0 },
            { res: "Nu mai da așa întrebări!", value: null },
            { res: "Da, mereu da si da si da da da!!!", value: 1 },
            { res: "Parcă aș zice da, dar totusi NU.", value: 0 },
            { res: "NU, mereu nu nu nu si nu si iarăși NU!!!", value: 0 },
            { res: "NUP.", value: 0 },
            { res: "DAP.", value: 1 },
            { res: "NU. ȘI gata!", value: 0 },
            { res: "Parcă aș zice nu, insă totuși DA!", value: 1 }
        ]
        const badResOptionNegative = [
            { res: "M-am răzgandit, NU!" },
            { res: "Am glumit ma, raspunsul e Nu:D." },
            { res: "Ok, ok incetez, doar imi bateam joc de tine, raspunsul e Nu din pacate." },
            { res: "Am glumit aici, raspuns e NU!!!" },
            { res: "Ok greșeala mea, raspunsul e NU!!!" },
            { res: "Nah, cred ca o sa zic Nu totuși aici..." },
            { res: "Ok, raspunsul era de fapt NU!" },
            { res: "AHAHA chiar ai crezut că o să raspund cu Da la asta... de fapt e NU!!!" },
            { res: "Am glumit, nici măcar nu știu despre ce vorbești." },
        ]
        const badResOptionPositive = [
            { res: "Bine, scuze, răspunsul e DA de fapt:(." },
            { res: "Ok, am greșit aici, raspunsul era Da!" },
            { res: "Am glumit, raspunsul meu e DA!" },
            { res: "Ok fie, raspunsul meu e da. Am greșit mai sus!" },
            { res: "Am glumit, nici măcar nu știu despre ce vorbești." },
            { res: "Nah, o să zic Da totuși la asta." },
            { res: "Bine mă fie, DA, raspunsul e un mare DA!!!" },
            { res: "Eh, am greșit, aici trebuia să zic DA totuși." },
            { res: "De fapt, cred că o să răspund cu DA!" },
        ]
        const intrebare = args.join(" ")
        if(!intrebare) return message.channel.send("Ai uitat sa pui o întrebare!")
        const resOptionRandom = resOption[Math.floor(Math.random() * resOption.length)]
        const badResOptionNegativeRandom = badResOptionNegative[Math.floor(Math.random() * badResOptionNegative.length)]
        const badResOptionPositiveRandom = badResOptionPositive[Math.floor(Math.random() * badResOptionPositive.length)]
        const badResChange = Math.floor(Math.random() * 4 + 1)
        const reply = await message.reply({embeds: [new Discord.MessageEmbed({
            color: "GREEN",
            description: resOptionRandom.res
        })]})
        if(badResChange === 3) {
            if(resOptionRandom.value === null) return;
            await message.channel.sendTyping();
            setTimeout(async () => {
                if(resOptionRandom.value) {
                    reply.reply({embeds: [new Discord.MessageEmbed({
                        color: "GREEN",
                        description: badResOptionNegativeRandom.res
                    })]})
                } else {
                    reply.reply({embeds: [new Discord.MessageEmbed({
                        color: "GREEN",
                        description: badResOptionPositiveRandom.res
                    })]})
                }
            }, Math.floor(Math.random() * 2 + 3) * 1000)
        }
    }
}