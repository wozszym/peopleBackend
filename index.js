require('dotenv').config()
const { request } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
// app.use(morgan('tiny'))
morgan.token('body', function (req, res) { return JSON.stringify(req.body) });
app.use(morgan(':method :url :status :response-time ms :body'))

/*
Mongo
const mongoose = require('mongoose')
const password = '3Zawoja3.'

const url =
    `mongodb+srv://wozszym:${password}@cluster0.xwz5f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)
*/
const Person = require('./modules/person')



app.get('/info', (request, response) => {
    Person.find({}).then(data => {
        const date = new Date()
        const n = data.length

        response.send(`
        <p>Phonebook has info for ${n} people</p>
        <p>${date}</p>
        `)
    })
})

const getPersons = async () => {
    let data = await Person.find({})
    return data
}

let persons = []
getPersons().then(data => {
    persons = data
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
        .catch(error => next(error))
    /*const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }*/
})

app.delete('/api/persons/:id', (request, response, next) => {
    console.log('Deleting entry')
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))

    /*const id = Number(requestarams.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()*/
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    // runValidators: true -> potential source of error. Update validators are off by default - you need to specify the runValidators option.
    Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true })
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .then(x => {
            getPersons().then(data => {
                persons = data
            })
        })
        .catch(error => next(error))
})

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
    return maxId + 1
}

const nameAlreadyTaken = (name) => {
    /*
    console.log(persons.filter(x => {
        console.log('x.name = ', x.name)
        console.log('typeof(x.name) = ', typeof (x.name))
        console.log('name = ', name)
        console.log('typeof(name) = ', typeof (name))
        console.log('x.name === name = ', x.name === name)
        return x.name === name
    }))
    */
    return persons.filter(x => x.name === name).length > 0
}


app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    // console.log(body.name)
    /*
    if (nameAlreadyTaken(body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    */

    const person = new Person({
        id: generateId(),
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        persons = persons.concat(savedPerson)
        response.json(savedPerson)
    })
        .catch(error => next(error))
}
)

const errorHandler = (error, request, response, next) => {
    console.log('in error handler')
    console.log(error.name)
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({
            error: 'malformatted id'
        })
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({
            error: error.message
        })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})