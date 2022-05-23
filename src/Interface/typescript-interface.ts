// You can use ‘exec’ this way.

import { exec, execSync } from "child_process";

const PYTHON_INTERFACE_PATH = "../../src/Interface/python-interface.py";

interface Assignment {
    id: Number;
    name: String;
}

export interface Course {
    id: Number;
    number: String;
    name: String;
    year: Number;
    semester: Number;
    assignments?: Array<Assignment>
}

interface Evaluation {
    grade: Number;
    expected: String;
    output: String;
}

export function get_assignments(course: Course) {
    let command = `python3 ${PYTHON_INTERFACE_PATH} -la -c ${course.id}`
    let result = ""
    while(true){
        try{
            result = String(
                execSync(
                    command,
                    {cwd : __dirname}
                )
            )
            break;
        }catch(e){
            console.log("failed to load assignments, trying again")
        }
    }
    return JSON.parse(result)
}

export function get_courses() {
    let command = `python3 ${PYTHON_INTERFACE_PATH} -lc`;
    let result = "";
    while (true) {
        try {
            result = String(
                execSync(
                    command,
                    {cwd: __dirname}
                )
            );
            break;
        } catch (e) {console.log("failed to load courses, trying again")}
    }
    return JSON.parse(result);
}

export function grade_assignment(course: Course, assignment: Assignment, path: String){
    let command = `python3 ${PYTHON_INTERFACE_PATH} -c ${course.id} -a ${assignment.id} -f ${path} -g`
    let result = ""
    while(true){
        try{
            result = String(
                execSync(
                    command,
                    {cwd : __dirname}
                )
            )
            break;
        }catch(e){
            console.log("failed to grade assignment, trying again")
        }
    }
    return JSON.parse(result)
}

export function upload_assignment(course: Course, assignment: Assignment, path: String){
    let command = `python3 ${PYTHON_INTERFACE_PATH} -c ${course.id} -a ${assignment.id} -f ${path} -u`
    let result = ""
    while(true){
        try{
            result = String(
                execSync(
                    command,
                    {cwd : __dirname}
                )
            )
            break;
        }catch(e){
            console.log("failed to upload assignment, trying again")
        }
    }
}

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