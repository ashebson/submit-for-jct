"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoodleAccessObject = void 0;
const typescript_interface_1 = require("./Interface/typescript-interface");
class MoodleAccessObject {
    static getCoursesHtml() {
        var out = "<h1>Courses:</h1>";
        let courses = (0, typescript_interface_1.get_courses)();
        for (var course of courses) {
            out += `<button">${course.name.split("").reverse().join("")}</button>`;
        }
        return out;
    }
    static getAssignmentsHtml(course) {
        var out = "<h1>Assignments:</h1>";
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