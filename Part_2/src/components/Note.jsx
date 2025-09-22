const Note = ({ note, toggleImportance }) => {
  const checked = note.important === true;
  const checkboxId =`note-important-${note.id}`

  return (
    <li className='note'>
      <div>
        {note.content}
      </div>
      <div>
        <label>is important</label>
        <input type='checkbox' defaultChecked={checked} onChange={() => toggleImportance()} />
      </div>
    </li>
    
  )
}

export default Note