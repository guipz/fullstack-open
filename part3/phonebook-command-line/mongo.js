const mongoose = require('mongoose')


const lenArgs = process.argv.length

if (lenArgs < 3 || lenArgs == 4) {
    if (lenArgs < 3)
        console.log("you must provide a password")
    else
        console.log("you must provide a number")
    process.exit(1)
}

const url = `mongodb+srv://gui:${process.argv[2]}@cluster0.tug8opw.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strict', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (lenArgs == 3)
    var promise = Person.find({})
        .then(r => {
            console.log("phonebook:")
            r.forEach(p => console.log(`${p.name} - ${p.number}`))
        })
else
    var promise = new Person({name: process.argv[3], number: process.argv[4]}).save()
        .then((r) => console.log(`${r.name} saved`))

promise.then(() => mongoose.connection.close())

