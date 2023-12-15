const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// Sample data
let students = [
];

// Routes
app.get('/students', (req, res) => {
  res.json(students);
});
app.get('/students/:id', (req, res) => {
    // res.json(students);
  });
  




app.post('/students', (req, res) => {
  const newStudent = req.body;
  newStudent.id = students.length + 1;
  students.push(newStudent);
  res.json(newStudent);
});

app.put('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const updatedStudent = req.body;
  students = students.map(student =>
    student.id === studentId ? { ...student, ...updatedStudent } : student
  );
  res.json(updatedStudent);
});

app.delete('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  students = students.filter(student => student.id !== studentId);
  res.json({ message: 'Student deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
