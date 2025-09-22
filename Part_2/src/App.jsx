import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'

import noteService from './services/notes'


const App = () => {
  const [notes, setNotes] = useState(null)
  const [newNote, setNewNote] = useState('a new note...')
  const [showImportant, setShowImportant] = useState(false)
  const [erorMessage, setErrorMessage] = useState(null)

  useEffect(
    () => {
      noteService.getAll().then(data => setNotes(data))
    }, 
    []
  )

  const getDisplayNotes = () => {
    if(notes == null) return []

    if (showImportant){
      return [...notes.filter(n => n.important)]
    }

    return [...notes]
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5
    }

    noteService.create(noteObject)
      .then(data => {
        setNotes(notes.concat(data))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important} 
    noteService.update(id, changedNote)
      .then(data => {
        setNotes(notes.map(n => n.id === id ? data : n))
      })
      .catch(error => {
        setErrorMessage( `Note '${note.content}' was already removed from server`)
        setTimeout(() => setErrorMessage(null), 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  return (
    <div>
      <form onSubmit={addNote}>
        <p>
          <input value={newNote} onChange={handleNoteChange} />
          <input id="show-important-checkbox" name="important" type="checkbox" value={showImportant}
            onChange={() => setShowImportant(!showImportant)} />
          <label htmlFor="show-important-checkbox">show only important</label>
        </p>
        <button type="submit">save</button>
      </form>
      <h1>Notes</h1>
      <Notification message={erorMessage} />
      <ul>
        {
          getDisplayNotes().map((note) => (
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        ))}
      </ul>
      <Footer />
    </div>
  )
}

export default App