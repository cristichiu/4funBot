const fs = require("fs");
class Data {
    constructor(file) {
        this.file = file
    }
    async create(data) {
        if(typeof(data) != "object") return console.log(`${data} <= Ceva nu a mers bine la aceasta structura, incearca din nou!!!`)
        data = JSON.stringify(data) + "\n"
        fs.appendFileSync(this.file, data)
    }
    async find(data) {
        if(typeof(data) != "object") return console.log(`${data} <= Ceva nu a mers bine la aceasta structura, incearca din nou!!!`)
        let fileContent = fs.readFileSync(this.file, "utf-8"); let fileContentArray = []; fileContent = fileContent.split("\n"); fileContent.pop();
        Array.from(fileContent).forEach(content => {
            content = JSON.parse(content)
            fileContentArray.push(content) 
        }); fileContent = fileContentArray; fileContentArray = []
        let result; fileContent.forEach(async content => { Object.keys(data).forEach(key => { if(data[key] == content[key]) result = content }) })
        if(result == undefined) result = null
        return result
    }
    async findAndUpdate(data, update) {
        if(typeof(data) != "object") return console.log(`${data} <= Ceva nu a mers bine la aceasta structura, incearca din nou!!!`)
        if(typeof(update) != "object") return console.log(`${update} <= Ceva nu a mers bine la aceasta structura, incearca din nou!!!`)
        let fileContent = fs.readFileSync(this.file, "utf-8"); let fileContentArray = []; fileContent = fileContent.split("\n"); fileContent.pop();
        Array.from(fileContent).forEach(content => {
            content = JSON.parse(content)
            fileContentArray.push(content) 
        }); fileContent = fileContentArray; fileContentArray = []
        let result; fileContent.forEach(async content => { Object.keys(data).forEach(key => { if(data[key] == content[key]) result = content }) })
        let index = fileContent.findIndex(obj => obj == result)
        Object.keys(fileContent[index]).forEach(key => { Object.keys(update).forEach(upKey => { if( upKey == key ) { fileContent[index][key] = update[upKey] } }) })
        Array.from(fileContent).forEach(content => {
            content = JSON.stringify(content)
            fileContentArray.push(content) 
        }); fileContent = fileContentArray;
        let finalDataText = ""
        fileContent.forEach(file => {
            finalDataText += file + "\n"
        })
        fs.writeFileSync(this.file, finalDataText)
        return JSON.parse(fileContent[index])
    }
    async findAndDelete(data) {
        if(typeof(data) != "object") return console.log(`${data} <= Ceva nu a mers bine la aceasta structura, incearca din nou!!!`)
        let fileContent = fs.readFileSync(this.file, "utf-8"); let fileContentArray = []; fileContent = fileContent.split("\n"); fileContent.pop();
        Array.from(fileContent).forEach(content => {
            content = JSON.parse(content)
            fileContentArray.push(content) 
        }); fileContent = fileContentArray; fileContentArray = []
        let result; fileContent.forEach(async content => { Object.keys(data).forEach(key => { if(data[key] == content[key]) result = content }) })
        let index = fileContent.findIndex(obj => obj == result)
        fileContent.splice(index, 1)
        Array.from(fileContent).forEach(content => {
            content = JSON.stringify(content)
            fileContentArray.push(content) 
        }); fileContent = fileContentArray;
        let finalDataText = ""
        fileContent.forEach(file => {
            finalDataText += file + "\n"
        })
        fs.writeFileSync(this.file, finalDataText)
        return "delete Succesful"
    }
}
module.exports = Data