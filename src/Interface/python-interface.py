from sys import argv, path
from pathlib import Path
import requests
import urllib3
import json
urllib3.disable_warnings()

path.insert(0, str(Path(__file__).parent.parent))
import Backend.get_data as get_data  # noqa: E402
import Backend.login as login  # noqa: E402


def json_print_list(lst):
    print('[')
    for element in lst:
        formatted_element = json.dumps(element.to_json())
        print(formatted_element)
        if element != lst[-1]:
            print(',', end='')
    print(']')


def main():
    while True:
        try:
            login.login()
            break
        except requests.exceptions.ConnectionError:
            pass
    courses = get_data.get_courses()
    try:
        course_id_tag_index = argv.index("-c")
        course_id_index = course_id_tag_index + 1
        course_id = int(argv[course_id_index])
        course = next(c for c in courses if c.id == course_id)
    except ValueError:
        course = None
    try:
        assignment_id_tag_index = argv.index("-a")
        assert course is not None, "No course specified"
        assignments = course.get_assignments()
        assignment_id_index = assignment_id_tag_index + 1
        assignment_id = int(argv[assignment_id_index])
        assignment = next(a for a in assignments if a.id == assignment_id)
    except ValueError:
        assignment = None

    try:
        list_courses_tag_index = argv.index("-lc")
        list_courses = True
    except ValueError:
        list_courses = False

    try:
        list_assignments_tag_index = argv.index("-la")
        list_assignments = True
    except ValueError:
        list_assignments = False

    try:
        grade_assignment_tag_index = argv.index("-g")
        grade_assignment = True
    except ValueError:
        grade_assignment = False

    try:
        file_path_tag_index = argv.index("-f")
        file_path_index = file_path_tag_index + 1
        file_path = argv[file_path_index]
    except ValueError:
        file_path = None

    try:
        upload_assignment_tag_index = argv.index("-u")
        upload_assignment = True
    except ValueError:
        upload_assignment = False

    if list_courses:
        json_print_list(courses)

    if list_assignments:
        assignments = course.get_assignments()
        json_print_list(assignments)

    if grade_assignment:
        assert course is not None
        assert assignment is not None
        assert file_path is not None
        grade, evaluation = assignment.grade(file_path)
        evaluation = {"grade": grade, "evaluation":evaluation}
        print(json.dumps(evaluation))

    if upload_assignment:
        assert course is not None
        assert assignment is not None
        assert file_path is not None
        assignment.upload(file_path)


if __name__ == "__main__":
    main()
