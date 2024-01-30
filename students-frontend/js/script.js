$("#inputPhone").mask("(99) 9999-99999");

var students = [
    {
        id: 1,
        name: "Pedro Antonio",
        email: "pedro.antonio@abutua.com",
        phone: "(15) 9999-9999",
        course: "Angular",
        shift: "Tarde"
    },
    {
        id: 2,
        name: "Matheus Calvo",
        email: "matheus.calvo@gmail.com",
        phone: "(11) 9999-9999",
        course: "Java",
        shift: "Noite"
    }
];

//OnLoad
loadStudents();

//Load all students
function loadStudents() {
    for (let student of students) {
        addNewRow(student);
    }
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
    var courseNode = document.createTextNode(student.course);
    var cell = newRow.insertCell();
    cell.className = "d-none d-sm-table-cell";
    cell.appendChild(courseNode);

    //Insert shift student
    var shiftNode = document.createTextNode(student.shift);
    var cell = newRow.insertCell();
    cell.className = "d-none d-md-table-cell";
    cell.appendChild(shiftNode);
}

//Save a student
function saveStudent() {

    var shifts = document.getElementsByName("radioShift");
    var shiftSelected = "";

    for (var i = 0; i < shifts.length; i++) {
        if (shifts[i].checked) {
            shiftSelected = shifts[i].value;
            break;
        }
    }

    var student = {
        id: students.length + 1,
        name: document.getElementById("inputName").value,
        email: document.getElementById("inputEmail").value,
        phone: document.getElementById("inputPhone").value,
        course: document.getElementById("selectCourse").value,
        shift: shiftSelected,
    };

    addNewRow(student);

    students.push(student);

    document.getElementById("formStudent").reset();
}