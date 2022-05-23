"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoodleAccessObject = void 0;
const typescript_interface_1 = require("../Interface/typescript-interface");
class MoodleAccessObject {
    static get_courses_html() {
        var out = "";
        let courses = (0, typescript_interface_1.get_courses)();
        for (var course of courses) {
            out += `<button>${course.name}</button>`;
        }
        return out;
    }
}
exports.MoodleAccessObject = MoodleAccessObject;
//# sourceMappingURL=MoodleAccessObject.js.map