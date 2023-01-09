var homeworkForm = document.getElementById("homework-form");
var homeworkTable = document.getElementById("homework-table");
homeworkForm === null || homeworkForm === void 0 ? void 0 : homeworkForm.addEventListener("submit", function (event) {
    var _a, _b, _c, _d;
    // prevent the form from submitting
    event.preventDefault();
    // get the values of the input fields
    var homeworkName = (_a = document.getElementById("homework-name")) === null || _a === void 0 ? void 0 : _a.value;
    var homeworkDueDate = (_b = document.getElementById("homework-due-date")) === null || _b === void 0 ? void 0 : _b.value;
    var homeworkSubject = (_c = document.getElementById("homework-subject")) === null || _c === void 0 ? void 0 : _c.value;
    var homeworkDueTime = (_d = document.getElementById("homework-due-time")) === null || _d === void 0 ? void 0 : _d.value;
    // create a new row in the table
    var row = homeworkTable === null || homeworkTable === void 0 ? void 0 : homeworkTable.insertRow();
    // insert cells in the new row
    var nameCell = row.insertCell();
    var subjectCell = row.insertCell();
    var dueDateCell = row.insertCell();
    var dueTimeCell = row.insertCell();
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
function highlightRows() {
    //Get current date and time in milliseconds
    var today = (new Date()).getTime();
    //Loop through the rows in the table and highlight them based on due date
    for (var i = 1; i < homeworkTable.rows.length; i++) {
        //Split the due time into hours and minutes
        var dueTime = homeworkTable.rows[i].cells[3].innerHTML.split(":");
        //Get due date in miliseconds
        var dueDate = (new Date(homeworkTable.rows[i].cells[2].innerHTML)).getTime() + 36000000 + (parseInt(dueTime[0]) * 3600000) + (parseInt(dueTime[1]) * 60000);
        //Highlight the row based on due date
        if ((dueDate - today) < 0) {
            homeworkTable.rows[i].style.backgroundColor = "red";
        }
        else if ((dueDate - today) > 86400000) {
            homeworkTable.rows[i].style.backgroundColor = "green";
        }
        else {
            homeworkTable.rows[i].style.backgroundColor = "orange";
        }
    }
}
//Sort the list of homework based on due date
function sortTable() {
    var _a;
    var switching = true;
    var shouldSwitch = false;
    var i;
    var x;
    var y;
    while (switching) {
        switching = false;
        for (i = 1; i < (homeworkTable.rows.length - 1); i++) {
            shouldSwitch = false;
            var dueTime1 = homeworkTable.rows[i].cells[3].innerHTML.split(":");
            var dueDate1 = (new Date(homeworkTable.rows[i].cells[2].innerHTML)).getTime() + 36000000 + (parseInt(dueTime1[0]) * 3600000) + (parseInt(dueTime1[1]) * 60000);
            var dueTime2 = homeworkTable.rows[i + 1].cells[3].innerHTML.split(":");
            var dueDate2 = (new Date(homeworkTable.rows[i + 1].cells[2].innerHTML)).getTime() + 36000000 + (parseInt(dueTime2[0]) * 3600000) + (parseInt(dueTime2[1]) * 60000);
            x = homeworkTable.rows[i].cells[2].innerHTML;
            y = homeworkTable.rows[i + 1].cells[2].innerHTML;
            if (dueDate2 < dueDate1) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            (_a = homeworkTable.rows[i].parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(homeworkTable.rows[i + 1], homeworkTable.rows[i]);
            switching = true;
        }
    }
}
//Save table to local storage on page unload
window.addEventListener("beforeunload", function () {
    localStorage.setItem("homeworkTable", homeworkTable.innerHTML);
});
//Load table from local storage on page load
window.addEventListener("load", function () {
    var listString = localStorage.getItem("homeworkTable");
    if (listString != null) {
        homeworkTable.innerHTML = listString;
    }
    highlightRows();
    sortTable();
});
