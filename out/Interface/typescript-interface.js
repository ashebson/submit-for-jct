"use strict";
// You can use ‘exec’ this way.
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadAssignment = exports.currentGradeAssignment = exports.gradeAssignment = exports.getCourses = exports.getAssignments = void 0;
const child_process_1 = require("child_process");
const PYTHON_INTERFACE_PATH = "../../src/Interface/python-interface.py";
function getAssignments(course) {
    let command = `python3 ${PYTHON_INTERFACE_PATH} -la -c ${course.id}`;
    let result = "";
    while (true) {
        try {
            result = String((0, child_process_1.execSync)(command, { cwd: __dirname }));
            break;
        }
        catch (e) {
            console.log("failed to load assignments, trying again");
        }
    }
    return JSON.parse(result);
}
exports.getAssignments = getAssignments;
function getCourses() {
    let command = `python3 ${PYTHON_INTERFACE_PATH} -lc`;
    let result = "";
    while (true) {
        try {
            result = String((0, child_process_1.execSync)(command, { cwd: __dirname }));
            break;
        }
        catch (e) {
            console.log("failed to load courses, trying again");
        }
    }
    return JSON.parse(result);
}
exports.getCourses = getCourses;
function gradeAssignment(course, assignment, path) {
    let command = `python3 ${PYTHON_INTERFACE_PATH} -c ${course.id} -a ${assignment.id} -f "${path}" -g`;
    let result = "";
    while (true) {
        try {
            result = String((0, child_process_1.execSync)(command, { cwd: __dirname }));
            break;
        }
        catch (e) {
            console.log("failed to grade assignment, trying again");
        }
    }
    return JSON.parse(result);
}
exports.gradeAssignment = gradeAssignment;
function currentGradeAssignment(course, assignment) {
    let command = `python3 ${PYTHON_INTERFACE_PATH} -c ${course.id} -a ${assignment.id} -cg`;
    let result = "";
    while (true) {
        try {
            result = String((0, child_process_1.execSync)(command, { cwd: __dirname }));
            break;
        }
        catch (e) {
            console.log("failed to grade assignment, trying again");
        }
    }
    return JSON.parse(result);
}
exports.currentGradeAssignment = currentGradeAssignment;
function uploadAssignment(course, assignment, path) {
    let command = `python3 ${PYTHON_INTERFACE_PATH} -c ${course.id} -a ${assignment.id} -f ${path} -u`;
    let result = "";
    while (true) {
        try {
            result = String((0, child_process_1.execSync)(command, { cwd: __dirname }));
            break;
        }
        catch (e) {
            console.log("failed to upload assignment, trying again");
        }
    }
}
exports.uploadAssignment = uploadAssignment;
// console.log(1);
// var courses = getCourses();
// console.log(courses);
// console.log(2);
// var course = courses[3];
// var assignments = getAssignments(course);
// console.log(assignments);
// console.log(3);
// var assignment = assignments[19];
// console.log(currentGradeAssignment(course,assignment));
// var path = "/Users/aryehshebson/Desktop/Moodle-Vscode-Extention/main.pro";
// var evaluation = grade_assignment(course, assignment, path);
// console.log(evaluation);
//# sourceMappingURL=typescript-interface.js.map