"use strict";
exports.__esModule = true;
exports.getSidebar = void 0;
var MoodleAccessObject_1 = require("./MoodleAccessObject");
var typescript_interface_1 = require("./Interface/typescript-interface");
function getSidebar() {
    var course = (0, typescript_interface_1.get_courses)()[3];
    return MoodleAccessObject_1.MoodleAccessObject.getAssignmentsHtml(course);
}
exports.getSidebar = getSidebar;
