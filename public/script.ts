const homeworkForm = document.getElementById("homework-form");
const homeworkTable = <HTMLTableElement>document.getElementById("homework-table");
const downloadButton = document.getElementById("download-button");

function highlightRows() {
    //Get current date and time in milliseconds
    const today = (new Date()).getTime();

    //Loop through the rows in the table and highlight them based on due date
    for (let i = 1; i < homeworkTable.rows.length; i++) {
        //Split the due time into hours and minutes
        const dueTime = homeworkTable.rows[i].cells[3].innerHTML.split(":");
        //Get due date in miliseconds
        const dueDate = (new Date(homeworkTable.rows[i].cells[2].innerHTML)).getTime() + 36000000 + (parseInt(dueTime[0]) * 3600000) + (parseInt(dueTime[1]) * 60000);
        //Highlight the row based on due date
        if ((dueDate - today) < 0) {
            homeworkTable.rows[i].style.backgroundColor = "red";
        } else if ((dueDate - today) > 86400000) {
            homeworkTable.rows[i].style.backgroundColor = "green";
        } else {
            homeworkTable.rows[i].style.backgroundColor = "orange";
        }
    }
}

//Sort the list of homework based on due date
function sortTable() {
    let switching = true;
    let shouldSwitch: boolean = false;
    let i: number;
    let x: string;
    let y: string;

    while (switching) {
        switching = false;
        for (i = 1; i < (homeworkTable.rows.length - 1); i++) {
            shouldSwitch = false
            const dueTime1 = homeworkTable.rows[i].cells[3].innerHTML.split(":");
            const dueDate1 = (new Date(homeworkTable.rows[i].cells[2].innerHTML)).getTime() + 36000000 + (parseInt(dueTime1[0]) * 3600000) + (parseInt(dueTime1[1]) * 60000);
            const dueTime2 = homeworkTable.rows[i + 1].cells[3].innerHTML.split(":");
            const dueDate2 = (new Date(homeworkTable.rows[i + 1].cells[2].innerHTML)).getTime() + 36000000 + (parseInt(dueTime2[0]) * 3600000) + (parseInt(dueTime2[1]) * 60000);
            x = homeworkTable.rows[i].cells[2].innerHTML;
            y = homeworkTable.rows[i + 1].cells[2].innerHTML;
            if (dueDate2 < dueDate1) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            homeworkTable.rows[i].parentNode?.insertBefore(homeworkTable.rows[i + 1], homeworkTable.rows[i]);
            switching = true;
        }
    }
}

//Download table as CSV
function downloadTable() {
    let csv = "";
    for (let i = 1; i < homeworkTable.rows.length; i++) {
        for (let j = 0; j < homeworkTable.rows[i].cells.length; j++) {
            csv += homeworkTable.rows[i].cells[j].innerHTML + ",";
        }
        csv += "";
    }
    const hiddenElement = document.createElement("a");
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'homework.csv';
    hiddenElement.click();
}

function dropHandler(ev: any) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
}

function dragOverHandler(ev: any) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
}

homeworkForm?.addEventListener("submit", (event) => {
    // prevent the form from submitting
    event.preventDefault();

    // get the values of the input fields
    const homeworkName = (<HTMLInputElement>document.getElementById("homework-name"))?.value;
    const homeworkDueDate = (<HTMLInputElement>document.getElementById("homework-due-date"))?.value;
    const homeworkSubject = (<HTMLInputElement>document.getElementById("homework-subject"))?.value;
    const homeworkDueTime = (<HTMLInputElement>document.getElementById("homework-due-time"))?.value;

    // create a new row in the table
    const row = homeworkTable?.insertRow();

    // insert cells in the new row
    const nameCell = row.insertCell();
    const subjectCell = row.insertCell();
    const dueDateCell = row.insertCell();
    const dueTimeCell = row.insertCell();

    // set the values of the cells
    nameCell.innerHTML = homeworkName;
    dueDateCell.innerHTML = homeworkDueDate;
    subjectCell.innerHTML = homeworkSubject;
    dueTimeCell.innerHTML = homeworkDueTime;

    //Highluight the rows in the table based on due date
    highlightRows();
    //Sort the table based on due date and time, lowest -> highest
    sortTable();
});

downloadButton?.addEventListener("click", () => {
    downloadTable();
});

//Delete row from table on double click
homeworkTable?.addEventListener("dblclick", (event: any) => {
    const row = event.target.parentNode;
    row.parentNode?.removeChild(row);
});

//Drag a CSV file onto the page to import it into the table
document.addEventListener("drop", (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
        const csv = event.target.result;
        const rows = csv.split(",");
        for (let i = 0; i < rows.length - 1; i += 4) {
            const row = homeworkTable?.insertRow();
            const nameCell = row.insertCell();
            const subjectCell = row.insertCell();
            const dueDateCell = row.insertCell();
            const dueTimeCell = row.insertCell();
            nameCell.innerHTML = rows[i];
            subjectCell.innerHTML = rows[i + 1];
            dueDateCell.innerHTML = rows[i + 2];
            dueTimeCell.innerHTML = rows[i + 3];
        }
        highlightRows();
        sortTable();
    }
    reader.readAsText(file);
});

//Save table to local storage on page unload
window.addEventListener("beforeunload", () => {
    localStorage.setItem("homeworkTable", homeworkTable.innerHTML);
});

//Load table from local storage on page load
window.addEventListener("load", () => {
    let listString = localStorage.getItem("homeworkTable");
    if (listString != null) {
        homeworkTable.innerHTML = listString;
    }
    highlightRows();
    sortTable();
});