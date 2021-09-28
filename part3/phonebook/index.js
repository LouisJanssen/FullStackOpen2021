/*global process*/
/*eslint no-undef: "error"*/

require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

// ***************
//   MiddleWare
// ***************

// --- MORGAN ---
morgan.token('data-sent', (request) => {
	return JSON.stringify(request.body)
})

// --- LOAD ORDER ---
app.use(express.static('build'))
app.use(express.json())
// app.use(morgan('tiny'))
app.use(morgan(':method :url :response-time :data-sent'))

app.use(cors())

// ***************
//      POST
// ***************

app.post('/api/persons', (request, response, next) => {
	const body = request.body

	const person = new Person({
		name: body.name,
		number: body.number,
	})

	person
		.save()
		.then(savedPerson => savedPerson.toJSON())
		.then(savedAndFormattedPerson => {
			response.json(savedAndFormattedPerson)
		})
		.catch(error => next(error))
})

// ***************
//      GET
// ***************

app.get('/', (request, response) => {
	response.send('<h1>Phonebook</h1>')
})

app.get('/api/persons', (request, response) => {
	Person.find({}).then(persons => {
		response.json(persons)
	})
})

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then(person => {
			if (person) {
				response.json(person)
			} else {
				response.status(404).end()
			}
		})
		.catch(error => next(error))
})

app.get('/info', (request, response) => {
	const dateInfo = new Date()

	Person.find({}).then(persons => {
		response.send(
			`<h1>Info</h1>
        <p>This phonebook has info for ${persons.length} people</p>
        <p>${dateInfo}</p>`
		)
	})
})

// ***************
//      DELETE
// ***************

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then(() => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

// ***************
//      PUT
// ***************

app.put('/api/persons/:id', (request, response, next) => {
	const body = request.body

	const person = {
		name: body.name,
		number: body.number,
	}

	Person.findByIdAndUpdate(request.params.id, person, { new: true })
		.then(updatedPerson => {
			response.json(updatedPerson)
		})
		.catch(error => next(error))
})

// ***************
// UnknownEndpoint
// ***************

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// ***************
//  Error Handler
// ***************

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	}
	else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}

	next(error)
}

app.use(errorHandler)

// ***************
//      PORT
// ***************

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})