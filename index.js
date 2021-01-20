const { response } = require('express')
const express = require('express')
const app = express()

app.use(express.json())


let phoneBook = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendick",
    number: "39-23-6423122",
    id: 4
  },
]

app.get('/', (request, response) => {
  response.send(`<h1>Home</h1>`)
})

app.get('/api/persons', (request, response) => {
  response.json(phoneBook)
})


app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = phoneBook.find(person => person.id === id)
  console.log('person', person)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})


app.get('/info', (request, response) => {
  response.send(`
  <h1>Phonebook has info for ${phoneBook.length} people!</h1>
  </br>
  <p>${new Date()}</p>`)
})



const generateId = () => {
  const maxId = phoneBook.length > 0
    ? Math.max(...phoneBook.map(person => person.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log('request.body >', request.body)

  if (!body.name) {
    return response.status(400).json({
      error: "Please, fill body first!"
    })
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    date: new Date(),
    id: generateId(),
  }

  phoneBook = phoneBook.concat(newPerson)

  response.json(newPerson)

})







app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log('id', id)
  phoneBook = phoneBook.filter(person => person.id !== id)
  response.send(`<h1>User ${id} has succesfully deleted! </h1>`)
})





const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})