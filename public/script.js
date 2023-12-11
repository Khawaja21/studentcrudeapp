document.addEventListener('DOMContentLoaded', function() {
    loadStudents();
});

function loadStudents() {
    fetch('/students')
        .then(response => response.json())
        .then(data => {
            const studentList = document.getElementById('studentList');
            studentList.innerHTML = '';

            data.forEach((student, index) => {
                const li = document.createElement('li');
                li.innerHTML = `${student.name}, ${student.age} years old 
                    <button onclick="deleteStudent(${index})">Delete</button>
                    <button onclick="editStudent(${index})">Edit</button>`;
                studentList.appendChild(li);
            });
        });
}

function addStudent() {
    const nameInput = document.getElementById('studentName');
    const ageInput = document.getElementById('studentAge');

    const student = {
        name: nameInput.value,
        age: ageInput.value
    };

    fetch('/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        loadStudents();
        clearForm();
    });
}

function deleteStudent(index) {
    fetch(`/students/${index}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        loadStudents();
    });
}

// function editStudent(index) {
//     fetch(`/students/${index}`, {
//         method: 'Edit',
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data.message);
//         loadStudents();
//     });
// }

function editStudent(index) {
    const nameInput = document.getElementById('studentName');
    const ageInput = document.getElementById('studentAge');

    const studentList = document.getElementById('studentList');
    const selectedStudent = studentList.children[index].textContent.split(', ');

    nameInput.value = selectedStudent[0];
    ageInput.value = selectedStudent[1].split(' ')[0];

   // Store the index of the edited student in a hidden field
    document.getElementById('editIndex').value = index;
}

function clearForm() {
    const nameInput = document.getElementById('studentName');
    const ageInput = document.getElementById('studentAge');

    // Check if the elements exist before trying to access them
    if (nameInput && ageInput) {
        nameInput.value = '';
        ageInput.value = '';
    } else {
        console.error('One or both form elements are null or not found.');
    }
}

//Function to update an edited student
function updateStudent() {
    const nameInput = document.getElementById('studentName');
    const ageInput = document.getElementById('studentAge');
    const editIndex = document.getElementById('editIndex').value;

    const updatedStudent = {
        name: nameInput.value,
        age: ageInput.value
    };

    fetch(`/students/${editIndex}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStudent),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        loadStudents();
        clearForm();
    });
}
