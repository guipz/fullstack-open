const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(express.json())
app.use(express.static('dist'))


morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] :body - :response-time ms'))

const PORT = process.env.PORT || 3001

let persons = []

const getIdParamFromRequest = request => Number(request.params.id)
const isNumberValid = number => number && number.length !== 0 && number.match(/^[0-9|\-|\(|\)|+|\s]*$/)
const appendErrorIfNumberNotValid = (number, errors) => { if (!isNumberValid(number)) errors.push('must provide a valid number') }
const appendErrorIfNameNotValid = (name, errors) => { if (!name) errors.push('must provide a valid name') }
const appendErrorIfPersonAlreadyExists = (name, errors) => { if (persons.find((p) => p.name === name)) errors.push('must provide an unique name') }


app.get('/api/persons', (request, response) => { 
    response.json(persons)
})


app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people.</p><p>${new Date()}</p>`)
})


app.get('/api/persons/:id', (request, response) => {
    const id = getIdParamFromRequest(request)
    const person = persons.find((p) => p.id === id)
    person ? response.json(person) : response.status(404).end()
})


app.delete('/api/persons/:id', (request, response) => {
    const id = getIdParamFromRequest(request)
    persons.find((p) => p.id === id)? response.status(204): response.status(404)
    persons = persons.filter((p) => p.id !== id)
    response.end()
})


function getErrorsNewPersonRequest(body) {
    const errors = []
    appendErrorIfNameNotValid(body.name, errors)
    appendErrorIfNumberNotValid(body.number, errors)
    appendErrorIfPersonAlreadyExists(body.name, errors)
    return errors
}


app.post('/api/persons', (request, response) => {
    const body = request.body
    const errors = getErrorsNewPersonRequest(body)

    if (errors.length > 0)
        return response.status(400).json({errors: errors})

    const newPerson = {id: Math.floor(Math.random() * 1000000000), name: body.name, number: body.number}
    persons.push(newPerson)
    response.json(newPerson)
})


function getErrorsUpdatePersonRequest(body) {
    const errors = []
    appendErrorIfNumberNotValid(body.number, errors)
    return errors
}


app.put('/api/persons/:id',  (request, response) => {
    const id = getIdParamFromRequest(request)
    const body = request.body
    const errors = getErrorsUpdatePersonRequest(body)

    if (errors.length > 0)
        return response.status(400).json({errors: errors})

    const person = persons.find((p) => p.id === id)

    if (!person)
        return response.status(404).end()

    person.number = body.number
    response.json(person)
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}.`))


