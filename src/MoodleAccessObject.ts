import { countReset } from "console";
import { get_courses, get_assignments, Course } from "./Interface/typescript-interface";
export class MoodleAccessObject {
    public static getCoursesHtml() {
        var out = "<h1>Courses:</h1>";
        let courses = get_courses();
        for (var course of courses) {
            out += `<button">${course.name.split("").reverse().join("")}</button>`;
        }
        return out;
    }
    public static getAssignmentsHtml(course:Course) {
        var out = "<h1>Assignments:</h1>";
        let assignments = get_assignments(course);
        console.log(assignments);
        for (var assignment of assignments) {
            out += `<button>${assignment.name.split("").reverse().join("")}</button>`;
        }
        return out;
    }
}