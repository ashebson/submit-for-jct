"use strict";
exports.__esModule = true;
exports.MoodleAccessObject = void 0;
var typescript_interface_1 = require("./Interface/typescript-interface");
var MoodleAccessObject = /** @class */ (function () {
    function MoodleAccessObject() {
    }
    MoodleAccessObject.getCoursesHtml = function () {
        var out = "<h1>Courses:</h1>";
        var courses = (0, typescript_interface_1.get_courses)();
        for (var _i = 0, courses_1 = courses; _i < courses_1.length; _i++) {
            var course = courses_1[_i];
            out += "<button\">".concat(course.name.split("").reverse().join(""), "</button>");
        }
        return out;
    };
    MoodleAccessObject.getAssignmentsHtml = function (course) {
        var out = "<h1>Assignments:</h1>";
        var assignments = (0, typescript_interface_1.get_assignments)(course);
        console.log(assignments);
        for (var _i = 0, assignments_1 = assignments; _i < assignments_1.length; _i++) {
            var assignment = assignments_1[_i];
            out += "<button\">".concat(assignment.name.split("").reverse().join(""), "</button>");
        }
        return out;
    };
    return MoodleAccessObject;
}());
exports.MoodleAccessObject = MoodleAccessObject;
