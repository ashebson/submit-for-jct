"use strict";
// You can use ‘exec’ this way.
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
function get_assignments(course) {
    let command = `python3 python-interface.py -la -c ${course.id}`;
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
function get_courses() {
    let command = "python3 python-interface.py -lc";
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
function grade_assignment(course, assignment, path) {
    let command = `python3 python-interface.py -c ${course.id} -a ${assignment.id} -f ${path} -g`;
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
function upload_assignment(course, assignment, path) {
    let command = `python3 python-interface.py -c ${course.id} -a ${assignment.id} -f ${path} -u`;
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
console.log(1);
var courses = get_courses();
console.log(courses);
console.log(2);
var course = courses[3];
var assignments = get_assignments(course);
console.log(assignments);
console.log(3);
var assignment = assignments[19];
var path = "/Users/aryehshebson/Desktop/Moodle-Vscode-Extention/main.pro";
var evaluation = grade_assignment(course, assignment, path);
console.log(evaluation);
//# sourceMappingURL=typescript-interface.js.map