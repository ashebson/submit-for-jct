"use strict";
// You can use ‘exec’ this way.
exports.__esModule = true;
exports.upload_assignment = exports.grade_assignment = exports.get_courses = exports.get_assignments = void 0;
var child_process_1 = require("child_process");
var PYTHON_INTERFACE_PATH = "../../src/Interface/python-interface.py";
function get_assignments(course) {
    var command = "python3 ".concat(PYTHON_INTERFACE_PATH, " -la -c ").concat(course.id);
    var result = "";
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
exports.get_assignments = get_assignments;
function get_courses() {
    var command = "python3 ".concat(PYTHON_INTERFACE_PATH, " -lc");
    var result = "";
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
exports.get_courses = get_courses;
function grade_assignment(course, assignment, path) {
    var command = "python3 ".concat(PYTHON_INTERFACE_PATH, " -c ").concat(course.id, " -a ").concat(assignment.id, " -f ").concat(path, " -g");
    var result = "";
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
exports.grade_assignment = grade_assignment;
function upload_assignment(course, assignment, path) {
    var command = "python3 ".concat(PYTHON_INTERFACE_PATH, " -c ").concat(course.id, " -a ").concat(assignment.id, " -f ").concat(path, " -u");
    var result = "";
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
exports.upload_assignment = upload_assignment;
// console.log(1);
// var courses = get_courses();
// console.log(courses);
// console.log(2);
// var course = courses[3];
// var assignments = get_assignments(course);
// console.log(assignments);
// console.log(3);
// var assignment = assignments[19];
// var path = "/Users/aryehshebson/Desktop/Moodle-Vscode-Extention/main.pro";
// var evaluation = grade_assignment(course, assignment, path);
// console.log(evaluation);
