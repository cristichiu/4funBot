//contante
require("dotenv").config()
const Discord = require("discord.js");
const fs = require("fs");
const familySet = new Set()
const messageDelaySet = new Set()
const DataStore = require("./localDataInit")

// init
let snipe = []
const validPermissions = [ "CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "ADMINISTRATOR", "MANAGE_CHANNELS", "MANAGE_GUILD", "ADD_REACTIONS", "VIEW_AUDIT_LOG", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "VIEW_GUILD_INSIGHTS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS", "USE_VAD", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS_AND_STICKERS", "USE_APPLICATION_COMMANDS", "REQUEST_TO_SPEAK", "MANAGE_EVENTS", "MANAGE_THREADS", "CREATE_PUBLIC_THREADS", "CREATE_PRIVATE_THREADS", "USE_EXTERNAL_STICKERS", "SEND_MESSAGES_IN_THREADS", "START_EMBEDDED_ACTIVITIES", "MODERATE_MEMBERS" ]
const client = new Discord.Client({
	intents: new Discord.Intents(32767)
})
client.login(process.env.TOKEN)

client.commands = new Discord.Collection();
client.voices = new Discord.Collection();

//dataStore
const profile = new DataStore("./LocalData/profile")
const obZilei = new DataStore("./LocalData/obZilei")
const money = new DataStore("./LocalData/money")

//handler
const filesCmd = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"))
for(const file of filesCmd) {
    const commands = require(`./commands/${file}`)
    let verify = {
        onlyOneError: false,
        permissionVerify: false
    }
    if(commands.permissions === 'undefined') commands.permissions = []
    if(commands.permissions.length !== 0) {
        commands.permissions.forEach(perm => {
            if(!validPermissions.includes(perm)) {
                console.log(`--------------------------------------------------\n> ${file} : [${commands.permissions}] <= ${perm}\n> ${validPermissions}\n--------------------------------------------------`)
                verify.onlyOneError = true
            }
        })
        if(!verify.onlyOneError) {
            verify.permissionVerify = true
        }
    } else { verify.permissionVerify = true }
    if(verify.permissionVerify) {
        client.commands.set(commands.name, commands)
        console.log(`comandaActiva: ${commands.name}`)
    } else {
        console.log(`comandaInactivă: ${commands.name} <= PROBLEMĂ`)
    }
}

module.exports.allCmdFile = filesCmd
const filesEvent = fs.readdirSync("./events/").filter(file => file.endsWith(".js"))
for(const file of filesEvent) {
    const event = require(`./events/${file}`)
    const option = { client, snipe, Discord, familySet, profile, messageDelaySet, obZilei, money }
    event.start(option)
    console.log(`eventActiv: ${event.name}`)
}



// const server = require("./server")
// server()


let y = process.openStdin()
y.addListener("data", res => {
    let x = res.toString().trim().split(/ +/g).join(" ")
    client.guilds.cache.get("848457989715132437").channels.cache.get("988898323698176092").send(x)
})