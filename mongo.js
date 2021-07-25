// mongodb+srv://wozszym:<password>@cluster0.xwz5f.mongodb.net/note-app?retryWrites=true&w=majority

const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://wozszym:${password}@cluster0.xwz5f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 3) {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(note => {
            console.log(note.name, note.number)
        })
        mongoose.connection.close()
    })
}
else if (process.argv.length == 5) {
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name: name,
        number: number
    })

    person.save().then(result => {
        const logStr = `added ${person.name} number ${person.number} to phonebook`
        console.log(logStr)
        mongoose.connection.close()
    })
} else {
    console.log('Please provide exactly two arguments: NAME and PHONE_NUNBER')
    mongoose.connection.close()
}
