const express = require('express');
// const uuid = require('uuid');
const app = express();
const fs = require('fs')
// const inquirer = require ('requirer')

const PORT = 1111; // process.env.PORT ?

// will share any static html files with the browser
app.use(express.static('public'));
// accept incoming POST requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// const dbFile = './app/db.json';

// let noteList = [{id: "0000-0000-0000-0000", title: 'note1', text: 'note1 text'}];

// Endpoints =================================================

// you will need to create 3 endpoints here, and it should work magically :)
// note: for app.post: newNote.id = uuid.v4() // use a random unique id.
// ... code away ...


// const saveFile = 'db/db.json' // save file, it's a hidden file

// let dbFile = fs.existsSync(saveFile) ?
//     JSON.parse( fs.readFileSync(saveFile) ) : []



let counter = 1
app.post('/api/notes', function (req, res) {

    let dbFile = JSON.parse(fs.readFileSync('db/db.json'))
    console.log(dbFile.length)



    if (dbFile.length > 0) {

        counter = (parseInt(dbFile[dbFile.length - 1].id) + 1)
        console.log("hiiiiiiiiiiiiii")
    }
    else {
        counter = 1
    }

    // dbFile ? counter = parseInt(dbFile[dbFile.length - 1].id) + 1 : 1

    console.log(dbFile)
    // let x = req.body
    // x.title 
    // x.id 
    // x.name
    console.log(req.body.text)


    dbFile.push({ id: `${counter}`, title: `${req.body.title}`, text: `${req.body.text}` })

    console.log(dbFile)
    fs.writeFileSync('db/db.json', JSON.stringify(dbFile))

    counter++
    req.location.reload()
})

app.get('/api/notes', function (req, res) {

    let dbFile = JSON.parse(fs.readFileSync('db/db.json'))
    // console.log(`get file ${dbFile}`)
    if (dbFile) {
        res.send(dbFile)
    }

})


app.delete('/api/notes/:id', (req, res) => {
    console.log(`id: ${req.params.id}`)
    console.log('API REQUEST: delete note \#', req.params.id);
    console.log(req.params);
    let dbData = JSON.parse(fs.readFileSync('db/db.json'));
    dbData = dbData.filter(entry => !(entry.id == req.params.id));
    fs.writeFileSync('db/db.json', JSON.stringify(dbData));
    res.end();
});


// Listener ==================================================
app.listen(PORT, function () {
    console.log(`Serving notes on PORT ${PORT}`)
});