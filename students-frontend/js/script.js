$("#inputPhone").mask("(99) 9999-99999");

//Data
var students = [];
var courses = [];

//OnLoad
loadCourses();
loadStudents();

//Load all courses
function loadCourses() {
    $.ajax({
        url: "http://localhost:8080/courses",
        type: "GET",
        async: false,
        success: (response) => {
            courses = response;

            for (let course of courses) {
                addNewCourse(course);
            }
        }
    });
}

//Load all students
function loadStudents() {

    $.getJSON("http://localhost:8080/students", (response) => {

        students = response;

        for (let student of students) {
            addNewRow(student);
        }
    });
}

//Add new Row
function addNewRow(student) {
    var table = document.getElementById("studentsTable");

    var newRow = table.insertRow();

    //Insert id student
    var idNode = document.createTextNode(student.id);
    newRow.insertCell().appendChild(idNode);

    //Insert name student
    var nameNode = document.createTextNode(student.name);
    newRow.insertCell().appendChild(nameNode);

    //Insert email student
    var emailNode = document.createTextNode(student.email);
    var cell = newRow.insertCell();
    cell.className = "d-none d-md-table-cell";
    cell.appendChild(emailNode);

    //Insert phone student
    var phoneNode = document.createTextNode(student.phone);
    var cell = newRow.insertCell();
    cell.className = "d-none d-md-table-cell";
    cell.appendChild(phoneNode);

    //Insert course student
    var courseNode = document.createTextNode(courses[student.idCourse - 1].name);
    var cell = newRow.insertCell();
    cell.className = "d-none d-sm-table-cell";
    cell.appendChild(courseNode);

    //Insert period student
    var periods = document.getElementsByName("radioPeriod");
    var periodNode = document.createTextNode(periods[student.period - 1].value);
    var cell = newRow.insertCell();
    cell.className = "d-none d-md-table-cell";
    cell.appendChild(periodNode);
}

//Save a student
function saveStudent() {

    var periods = document.getElementsByName("radioPeriod");
    var periodSelected = 0;

    for (var i = 0; i < periods.length; i++) {
        if (periods[i].checked) {
            periodSelected = i;
            break;
        }
    }

    var student = {
        id: students.length + 1,
        name: document.getElementById("inputName").value,
        email: document.getElementById("inputEmail").value,
        phone: document.getElementById("inputPhone").value,
        idCourse: document.getElementById("selectCourse").selectedIndex + 1,
        period: periodSelected + 1,
    };

    $.ajax({
        url: "http://localhost:8080/students",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(student),
        success: (student) => {
            addNewRow(student);
            students.push(student);
            document.getElementById("formStudent").reset();
        }
    });
}

function addNewCourse(course) {
    var option = new Option(course.name, course.id);
    var select = document.getElementById("selectCourse");
    select.add(option);
}