document.addEventListener('DOMContentLoaded', function () {
    const studentTableBody = document.getElementById('studentTableBody');
    const studentForm = document.getElementById('studentForm');
  
    // Fetch students from the backend and update the table
    function updateStudentTable() {
      fetch('/students')
        .then(response => response.json())
        .then(students => {
          studentTableBody.innerHTML = ''; // Clear the existing rows
  
          students.forEach(student => {
            const row = studentTableBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);
  
            cell1.innerHTML = student.id;
            cell2.innerHTML = student.name;
            cell3.innerHTML = student.age;
  
            // Add buttons for edit and delete
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => editStudent(student.id));
            cell4.appendChild(editButton);
  
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteStudent(student.id));
            cell4.appendChild(deleteButton);
          });
        });
    }
  
    // Function to handle form submission (add/update student)
    function handleFormSubmit(event) {
      event.preventDefault();
  
      const nameInput = document.getElementById('name');
      const ageInput = document.getElementById('age');
  
      const formData = {
        name: nameInput.value,
        age: ageInput.value,
      };
  
      const isEditMode = !!editingStudentId;
  
      const url = isEditMode ? `/students/${editingStudentId}` : '/students';
      const method = isEditMode ? 'PUT' : 'POST';
  
      fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          updateStudentTable();
          clearForm();
        });
    }
  
    // Function to edit a student
    function editStudent(studentId) {
      // Fetch student details and populate the form for editing
      fetch(`/students/${studentId}`)
        .then(response => response.json())
        .then(student => {
          document.getElementById('name').value = student.name;
          document.getElementById('age').value = student.age;
          editingStudentId = studentId;
        });
    }


  
    // Function to delete a student
    function deleteStudent(studentId) {
      fetch(`/students/${studentId}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.message);
          updateStudentTable();
        });
    }
  
    // Function to clear the form
    function clearForm() {
      document.getElementById('name').value = '';
      document.getElementById('age').value = '';
      editingStudentId = null;
    }
  
    // Initialize editingStudentId
    let editingStudentId = null;
  
    // Attach event listeners
    studentForm.addEventListener('submit', handleFormSubmit);
  
    // Initial data fetch and table update
    updateStudentTable();
  });
  
