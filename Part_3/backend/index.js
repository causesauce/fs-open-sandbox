const express = require('express')
const cors = require('cors')
const app = express()

const corsOptions = {
    origin: 'http://localhost:5173'
}
app.use(cors(corsOptions))
app.use(express.json())

let notes = [
    {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/', (req, resp) => {
    resp.send('<h1>Hello Web!</h1>')
})

app.get('/api/notes', (req, resp) => {
    resp.json(notes)
})

app.get('/api/notes/:id', (req, resp) => {
    const id = req.params.id
    const note = notes.find(note => note.id === id)

    if (note){
        resp.json(note)
    }
    else{
        resp.statusMessage = "no note found"
        resp.status(404).end()
    }
})

app.delete('/api/notes/:id', (req, resp) => {
    const id = req.params.id
    notes = notes.filter(n => n.id !== id)
    
    resp.status(204).end()
})

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => Number(n.id)))
        : 0

    return String(maxId + 1)
}

app.post('/api/notes', (req, resp) => {
    const body = req.body

    if (!body.content){
        return resp.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        id: generateId()
    }

    notes = notes.concat(note)

    resp.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})