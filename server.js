// API
// CRUD 
// get - read (get the data from the server)
// post - create (To create a new data)
// put  - update ()
// delete - delete
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Set up Content Security Policy middleware
app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "script-src 'self' 'wasm-unsafe-eval' 'inline-speculation-rules' https://js.stripe.com; object-src 'self'"
    );
    next();
});

res.setHeader('Content-Security-Policy', "script-src 'self' https://js.stripe.com");
res.setHeader('Content-Security-Policy', "script-src 'self' 'wasm-unsafe-eval' 'inline-speculation-rules'; script-src-elem https://js.stripe.com; object-src 'self'");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let students = [];

// API to get the list of students
app.get('/students', (req, res) => {
    res.json(students);
});

// API to add a new student(post method use kartai huai)
app.post('/students', (req, res) => {
    const newStudent = req.body;
    students.push(newStudent);
    res.json({ message: 'Student added successfully' });
});

// API to update a student(put method use kartai huai)
app.put('/students/:id', (req, res) => {
    const id = req.params.id;
    const updatedStudent = req.body;
    students[id] = updatedStudent;
    res.json({ message: 'Student updated successfully' });
});

// API to delete a student(delete method use kartai huai)
app.delete('/students/:id', (req, res) => {
    const id = req.params.id;
    students.splice(id, 1);
    res.json({ message: 'Student deleted successfully' });
});

app.listen(port, () => {
    console.log(`Server is running at localhost${port}`);
});
