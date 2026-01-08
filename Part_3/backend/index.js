require('dotenv').config()
const express = require('express')
// const cors = require('cors')
const path = require('path')
const Note = require('./models/notes')
const morgan = require('morgan')

const app = express()

// const corsOptions = {
//     origin: 'http://localhost:5173'
// }
// app.use(cors(corsOptions))

app.use(express.json())

app.use(express.static(path.join(__dirname, 'dist')))

morgan.token('jsonBody', (req) => {
  if ((req.method === 'POST' || req.method === 'PUT') && req.body){
    return JSON.stringify(req.body)
  }
})

const morganFormat =
  ':method :url :status :res[content-length] - :response-time ms :jsonBody'

app.use(morgan(morganFormat))

app.get('/', (req, resp) => {
  resp.send('<h1>Hello Web!</h1>')
})

app.get('/api/notes', (req, resp) => {
  Note.find({}).then(notes => {
    resp.json(notes)
  })
})

app.get('/api/notes/:id', (req, resp, next) => {
  const id = req.params.id
  Note.findById(id).then(
    note => {
      if (note){
        resp.json(note)
      }
      else{
        resp.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (req, resp, next) => {
  const id = req.params.id
  Note.findByIdAndDelete(id)
    .then(() => resp.status(204).end())
    .catch(err => next(err))
})

app.post('/api/notes', (req, resp, next) => {
  const body = req.body

  if (!body.content){
    return resp.status(400).json({
      error: 'content missing'
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save()
    .then(savedNote => resp.json(savedNote))
    .catch(err => next(err))
})

app.put('/api/notes/:id', (req, resp, next) => {
  const body = req.body
  const id = req.params.id

  Note.findById(id)
    .then(note => {
      if (!note){
        return resp.status(404).end()
      }

      note.important = body.important
      note.content = body.content

      return note.save()
        .then((updNote) => {
          resp.json(updNote)
        })
        .catch(err => next(err))
    })
})

const unknownEndpoint = (req, resp) => {
  resp.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, resp, next) => {
  console.log(error.message)

  if (error.name === 'CastError'){
    return resp.status(400).send({ error: 'malformed id' })
  }

  if (error.name === 'ValidationError'){
    return resp.status(400).send({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})