import { Assignment } from "./assignment";

export interface Course {
    id: Number;
    number: String;
    name: String;
    year: Number;
    semester: Number;
    assignments?: Array<Assignment>
}