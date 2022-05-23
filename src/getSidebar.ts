import {MoodleAccessObject} from "./MoodleAccessObject";
import { get_courses} from "./Interface/typescript-interface";

export function getSidebar(){
    let course = get_courses()[3];
    return MoodleAccessObject.getAssignmentsHtml(course);
}