const mongoose = require("mongoose");

if(process.argv.length<3){
    
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://giorgi44:${password}@cluster0.z7ijgrb.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false)
mongoose.connect(url)


const personSchema = new mongoose.Schema({
    name: String,
    number: String
})


const Person = new mongoose.model('Person', personSchema)


const person = new Person({
    name: name,
    number: number
})

if((name != undefined) && (number != undefined)){
    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name}  ${person.number}`)
        })
        mongoose.connection.close()
    })
}