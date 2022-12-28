const homeworkForm = document.getElementById("homework-form");
const homeworkTable = document.getElementById("homework-table");

homeworkForm.addEventListener("submit", (event) => {
  event.preventDefault(); // prevent the form from submitting

  // get the values of the input fields
  const homeworkName = document.getElementById("homework-name").value;
  const homeworkDueDate = document.getElementById("homework-due-date").value;
  const homeworkSubject = document.getElementById("homework-subject").value;

  // create a new row in the table
  const row = homeworkTable.insertRow();

  // insert cells in the new row
  const nameCell = row.insertCell();
  const dueDateCell = row.insertCell();
  const subjectCell = row.insertCell();

  // set the values of the cells
  nameCell.innerHTML = homeworkName;
  dueDateCell.innerHTML = homeworkDueDate;
  subjectCell.innerHTML = homeworkSubject;
});
