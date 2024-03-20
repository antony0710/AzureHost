const express = require('express');
var cors = require('cors');
var https = require('https');
var fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
app.use(cors());
app.use(express.json()); // Add this line



const dbURI = 'mongodb+srv://cryjapan001:KLAYLH6oDdiTSi59@cluster0.pnrkilh.mongodb.net/';
const dbName = 'notesDB';
// Define a simple schema for our collection
const noteSchema = new mongoose.Schema({
    Title: String,
    Content: String,
  });


mongoose.connect(dbURI)
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));


const Note = mongoose.model('Note', noteSchema);

app.get('/getNotes', async (req, res) => {
const Notes = await Note.find();
res.json(Notes);
});

app.post('/addNotes', async (req, res) => {
    const newNote = new Note(req.body);
    const savedNote = await newNote.save();
    res.json(savedNote);
  });

  app.post('/testing', async (req, res) => {

    res.json("Hello World!");
  });


const port = process.env.WEBSITES_PORT || 5000;

app.listen(port, '0.0.0.0', () => console.log(`Server started on port ${port}`));