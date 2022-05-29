"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoodleAccessObject = void 0;
const typescript_interface_1 = require("./Interface/typescript-interface");
class MoodleAccessObject {
    static getCoursesHtml() {
        var out = "<h1>Submit For JCT</h1><h2>Courses:</h2>";
        let courses = (0, typescript_interface_1.get_courses)();
        var prev_sem = "";
        for (var course of courses) {
            if (prev_sem === "") {
                prev_sem = course.semester;
            }
            else if (prev_sem !== course.semester) {
                out += "<br>";
                prev_sem = course.semester;
            }
            out += `<button>${course.name.split("").reverse().join("")}</button>`;
        }
        return out;
    }
    static getAssignmentsHtml(course) {
        var out = `<h1>${course.name.split("").reverse().join("")}</h1><h2>Assignments:</h2>`;
        let assignments = (0, typescript_interface_1.get_assignments)(course);
        console.log(assignments);
        for (var assignment of assignments) {
            out += `<button>${assignment.name.split("").reverse().join("")}</button>`;
        }
        return out;
    }
}
exports.MoodleAccessObject = MoodleAccessObject;
//# sourceMappingURL=MoodleAccessObject.js.map