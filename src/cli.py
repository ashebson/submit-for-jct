import requests
from Backend.login import login
from Backend.get_data import get_courses
import os
requests.packages.urllib3.disable_warnings()


def pretty_print_courses(courses):
    current_year = courses[0].year
    current_semester = courses[0].semester
    for i in range(len(courses)):
        if (courses[i].year != current_year or courses[i].semester != current_semester):
            print()
            current_year = courses[i].year
            current_semester = courses[i].semester
        prefix = f"[{i}]".ljust(5)
        print(f"{prefix} {courses[i]}")


def pretty_print_assignments(assignments):
    for i in range(len(assignments)):
        prefix = f"[{i}]".ljust(5)
        print(f"{prefix} {assignments[i]}")


def get_prompt(course, assignment):
    if course is not None:
        if assignment is not None:
            return f"{course.get_name()}/{assignment.get_name()}> "
        else:
            return f"{course.get_name()}> "
    else:
        return "> "


def main():
    print("logging in...")
    while True:
        try:
            login()
            break
        except requests.exceptions.ConnectionError:
            print("login failed, retrying...")
    print("log in successful")

    courses = None
    current_course = None
    current_assignment = None

    while(True):
        prompt = get_prompt(current_course, current_assignment)
        print(prompt, end='')
        full_command = input()
        command = full_command.split()[0]
        params = full_command.split()[1:]
        try:
            match command:
                case "lc":
                    assert params == [], "lc takes no parameters"
                    if courses is None:
                        courses = get_courses()
                    pretty_print_courses(courses)
                case "la":
                    assert params == [], "la takes no parameters"
                    assert current_course is not None, "no course selected"
                    assignments = current_course.get_assignments()
                    pretty_print_assignments(assignments)

                case "cc":
                    assert len(params) == 1, "cc takes one parameter"
                    if courses is None:
                        courses = get_courses()
                    index = int(params[0])
                    assert index >= 0 and index < len(
                        courses), "invalid course index"
                    current_course = courses[index]
                    current_assignment = None
                case "ca":
                    assert len(params) == 1
                    assert current_course is not None, "no course selected"
                    index = int(params[0])
                    assignments = current_course.get_assignments()
                    assert index >= 0 and index < len(
                        assignments), "invalid assignment index"
                    current_assignment = assignments[index]
                case "g":
                    assert current_assignment is not None, "No assignment selected"
                    path = input("enter path to file: ")
                    assert os.path.exists(path), "file does not exist"
                    try:
                        grade, evaluation = current_assignment.grade(
                            path)
                    except Exception as e:
                        print(e)
                        continue
                    print(f"Grade: {grade}/100")
                    if not evaluation == '':
                        print(f"Evaluation:\n{evaluation}")
                case "cg":
                    assert current_assignment is not None, "No assignment selected"
                    try:
                        grade, evaluation = current_assignment.get_current_grade()
                    except Exception as e:
                        print("ERROR")
                        print(e)
                        continue
                    print(f"Grade: {grade}/100")
                    if not evaluation == '':
                        print(f"Evaluation:\n{evaluation}")
                case "u":
                    assert current_assignment is not None, "No assignment selected"
                    path = input("enter path to file: ")
                    assert os.path.exists(path), "file does not exist"
                    current_assignment.upload(path)
                case "help":
                    assert params == [], "help takes no parameters"
                    print("available commands:")
                    print("lc - list courses")
                    print("la - list assignments")
                    print("cc [course index] - change course")
                    print("ca [assignment index] - change assignment")
                    print("clear - clear screen")
                    print("exit - exit program")
                    print("help - show this help")
                case "clear":
                    assert params == [], "clear takes no parameters"
                    os.system('cls' if os.name == 'nt' else 'clear')
                case "exit":
                    assert params == [], "exit takes no parameters"
                    break
                case _:
                    print("Unknown command")
                    continue
        except Exception as error:
            print(error)


if __name__ == "__main__":
    main()
