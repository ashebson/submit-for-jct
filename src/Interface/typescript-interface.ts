// You can use ‘exec’ this way.

import { exec, execSync } from "child_process";
import { Assignment } from "../MoodleObjects/assignment";
import { Course } from "../MoodleObjects/course";

const PYTHON_INTERFACE_PATH = "../../src/Interface/python-interface.py";


export function getAssignments(course: Course) {
    let command = `python3 ${PYTHON_INTERFACE_PATH} -la -c ${course.id}`;
    let result = "";
    while (true) {
        try {
            result = String(
                execSync(
                    command,
                    { cwd: __dirname }
                )
            );
            break;
        } catch (e) {
            console.log("failed to load assignments, trying again");
        }
    }
    return JSON.parse(result);
}

export function getCourses() {
    let command = `python3 ${PYTHON_INTERFACE_PATH} -lc`;
    let result = "";
    while (true) {
        try {
            result = String(
                execSync(
                    command,
                    { cwd: __dirname }
                )
            );
            break;
        } catch (e) { console.log("failed to load courses, trying again") }
    }
    return JSON.parse(result);
}

export function gradeAssignment(course: Course, assignment: Assignment, path: String) {
    let command = `python3 ${PYTHON_INTERFACE_PATH} -c ${course.id} -a ${assignment.id} -f "${path}" -g`;
    let result = "";
    while (true) {
        try {
            result = String(
                execSync(
                    command,
                    { cwd: __dirname }
                )
            );
            break;
        } catch (e) {
            console.log("failed to grade assignment, trying again");
        }
    }
    return JSON.parse(result);
}

export function currentGradeAssignment(course: Course, assignment: Assignment) {
    let command = `python3 ${PYTHON_INTERFACE_PATH} -c ${course.id} -a ${assignment.id} -cg`;
    let result = "";
    while (true) {
        try {
            result = String(
                execSync(
                    command,
                    { cwd: __dirname }
                )
            );
            break;
        } catch (e) {
            console.log("failed to grade assignment, trying again");
        }
    }
    return JSON.parse(result);
}

export function uploadAssignment(course: Course, assignment: Assignment, path: String) {
    let command = `python3 ${PYTHON_INTERFACE_PATH} -c ${course.id} -a ${assignment.id} -f ${path} -u`;
    let result = "";
    while (true) {
        try {
            result = String(
                execSync(
                    command,
                    { cwd: __dirname }
                )
            )
            break;
        } catch (e) {
            console.log("failed to upload assignment, trying again");
        }
    }
}

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