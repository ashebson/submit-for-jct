"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowGenerator = void 0;
const typescript_interface_1 = require("./Interface/typescript-interface");
let atob = (str) => Buffer.from(str).toString('base64');
let btoa = (str) => Buffer.from(str, 'base64').toString();
class WindowGenerator {
    static getCoursesBody() {
        var out = "<body>";
        out += "<h1>Submit For JCT</h1><h2>Courses:</h2>";
        out += `<script>
            function chooseCourse(course){
                acquireVsCodeApi().postMessage({"type":"onCourseSelection","value":course});
            }
        </script>`;
        let courses = (0, typescript_interface_1.getCourses)();
        var prevSem = "";
        for (var course of courses) {
            if (prevSem === "") {
                prevSem = course.semester;
            }
            else if (prevSem !== course.semester) {
                out += "<br>";
                prevSem = course.semester;
            }
            let message = "hello";
            out += `<button onclick='chooseCourse(${JSON.stringify(course)})'>${course.name.split("").reverse().join("")}</button>`;
        }
        out += "</body>";
        return out;
    }
    static getAssignmentsBody(course) {
        var out = "<body>";
        out += `<h1 align="right">${course.name.split("").reverse().join("")}</h1><h2>Assignments:</h2>`;
        out += `<script>
            function chooseAssignment(assignment){
                acquireVsCodeApi().postMessage({"type":"onAssignmentSelection","value":assignment});
            }
            </script>`;
        let assignments = (0, typescript_interface_1.getAssignments)(course);
        for (var assignment of assignments) {
            assignment.name = atob(assignment.name);
            out += `<button onclick='chooseAssignment(${JSON.stringify({ "assignment": assignment, "course": course })})'>${btoa(assignment.name).split("").reverse().join("")}</button>`;
        }
        out += `<script>
            function backToMain(){
                acquireVsCodeApi().postMessage({"type":"onBackToMain"});
            }</script>`;
        out += "<br><button onclick=backToMain()>Back</button>";
        out += "</body>";
        return out;
    }
    static getAssignmentBody(assignment, course, grade, evaluation) {
        if (!(grade || grade === 0)) {
            let ev = (0, typescript_interface_1.currentGradeAssignment)(course, assignment);
            grade = ev.grade;
            evaluation = ev.evaluation;
        }
        var out = "<body>";
        out += `<script>
            function chooseCourse(course){
                acquireVsCodeApi().postMessage({"type":"onCourseSelection","value":course});
            }
        </script>`;
        out += `<h1 align="right">${course.name.split("").reverse().join("")}</h1>`;
        out += `<h2 align="right">${btoa(assignment.name).split("").reverse().join("")}</h2>`;
        if (grade || grade === 0) {
            out += `<label>Grade:</label><input type='text' id='grade' readonly value="${grade}"></input>`;
        }
        else {
            out += "<label>Grade:</label><input type='text' id='grade' readonly></input>";
        }
        out += `<style>
            textarea{
                resize: vertical;
            }
        </style>`;
        if (evaluation) {
            out += `<label>Evaluation:</label><textarea type='text' id='evaluation' readonly>${evaluation}</textarea>`;
        }
        else {
            out += "<label>Evaluation:</label><input type='text' id='evaluation' readonly></input>";
        }
        out += `<br><button onclick='chooseCourse(${JSON.stringify(course)})'>Back</button>`;
        out += "</body>";
        return out;
    }
}
exports.WindowGenerator = WindowGenerator;
//# sourceMappingURL=WindowGenerator.js.map