const mongoose = require('mongoose')

if (process.argv.length < 3){
    console.log('give psswrd as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = 
    `mongodb+srv://adrianchervinchuk1_db_user:${password}@cluster0.zwycskc.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'WTF is unit testing in js',
    important: false
})

note.save().then(res => {
    console.log('note saved!')
    // mongoose.connection.close()
})

Note.find({important: false}).then(res => {
    res.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})