window.onload = function() {
    addCourses();
    addCourses();
    addCourses();
    addCourses();
}

function GradeSelecting(e) {
    var [eId, eIndex] = e.id.split("-");
    // console.log(eId + eIndex);
    var Index = e.options.selectedIndex;
    if (eId === "aGrade") {
        document.getElementById("nGrade-" + eIndex).options.selectedIndex = Index;
    } else if (eId === "nGrade") {
        document.getElementById("aGrade-" + eIndex).options.selectedIndex = Index;
    }
}
var i = 0;

function addCourses() {
    var cNode = document.getElementById("courseDetail-" + i).cloneNode(true);
    ++i;
    cNode.id = "courseDetail-" + i;
    cNode.querySelectorAll("input")[0].name = "cousreName-" + i;
    cNode.querySelectorAll("select")[0].name = "crdtHr-" + i;
    cNode.querySelectorAll("select")[1].name = "aGrade-" + i;
    cNode.querySelectorAll("select")[1].id = "aGrade-" + i;
    cNode.querySelectorAll("select")[2].name = "nGrade-" + i;
    cNode.querySelectorAll("select")[2].id = "nGrade-" + i;
    cNode.querySelectorAll("button")[0].id = "remove-" + i;
    document.getElementById("Courses").appendChild(cNode);
    document.getElementById("remove-" + i).disabled = false;
    if (i === 1) {
        document.getElementById("remove-0").disabled = false;
    }
}

function removeCourses(e) {
    var [eId, eIndex] = e.id.split("-");
    if (i > 0) {
        document.getElementById("courseDetail-" + eIndex).classList.toggle("fadeOut");
        document.getElementById("courseDetail-" + eIndex).remove();
        for (let j = (eIndex * 1) + 1; j <= i; j++) {

            var cNode = document.getElementById("courseDetail-" + j);
            cNode.id = "courseDetail-" + eIndex;
            cNode.querySelectorAll("input")[0].name = "cousreName-" + eIndex;
            cNode.querySelectorAll("select")[0].name = "crdtHr-" + eIndex;
            cNode.querySelectorAll("select")[1].name = "aGrade-" + eIndex;
            cNode.querySelectorAll("select")[1].id = "aGrade-" + eIndex;
            cNode.querySelectorAll("select")[2].name = "nGrade-" + eIndex;
            cNode.querySelectorAll("select")[2].id = "nGrade-" + eIndex;
            cNode.querySelectorAll("button")[0].id = "remove-" + eIndex;
            eIndex++;
        }
        --i;
        if (i === 0) {
            document.getElementById("remove-0").setAttribute("disabled", true);
        }

        console.log(document.getElementById("Courses"));
    }

}

function calcGpa() {
    var crdTotal = 0;
    var gpaTotal = 0;
    for (let j = 0; j <= i; j++) {
        let idNode = document.getElementById("courseDetail-" + j);
        let crdhr = idNode.querySelectorAll("select")[0].value
        let gpa = idNode.querySelectorAll("select")[1].value;
        if (crdhr > 0 && gpa !== "0") {
            crdTotal += (crdhr * 1);
            gpaTotal += (gpa * crdhr);
        }
    }

    var currentCgpa = document.getElementsByName("currentCgpa")[0].value;
    var totalCrdHr = document.getElementsByName("totalCrdHr")[0].value * 1;
    currentCgpa *= totalCrdHr;
    currentCgpa += gpaTotal;
    totalCrdHr += (crdTotal * 1);
    // console.log("-----------------------------");
    // console.log(currentCgpa);
    // console.log(totalCrdHr);
    // console.log("-----------------------------");
    // console.log(gpaTotal);
    // console.log(crdTotal);
    // console.log("-----------------------------");
    // console.log(Math.round(gpaTotal / crdTotal));
    // console.log(Math.round(currentCgpa / totalCrdHr));
    document.getElementsByName("SGPA")[0].value = Math.round((gpaTotal / crdTotal) * 100) / 100;
    document.getElementsByName("CGPA")[0].value = Math.round((currentCgpa / totalCrdHr) * 100) / 100;
}