"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSidebar = void 0;
const MoodleAccessObject_1 = require("./MoodleAccessObject");
const typescript_interface_1 = require("./Interface/typescript-interface");
function getSidebar() {
    let course = (0, typescript_interface_1.get_courses)()[3];
    return MoodleAccessObject_1.MoodleAccessObject.getAssignmentsHtml(course);
}
exports.getSidebar = getSidebar;
//# sourceMappingURL=getSidebar.js.map