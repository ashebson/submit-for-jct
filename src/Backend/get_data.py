import parse
from Backend.MoodleObjects.exec_assignment import exec_assignment
from Backend.MoodleObjects.static_assignment import static_assignment
from Backend.MoodleObjects.course import course
import requests
import Backend.communication_data as communication_data

MOODLE_COURSES_URL = "https://moodle.jct.ac.il/"
MOODLE_ASSIGNMENTS_FORMAT = "https://moodle.jct.ac.il/course/view.php?id={}"
STATIC_ASSIGNMENT_FORMAT = '<a class="" onclick="" href="https://moodle.jct.ac.il/mod/assign/view.php?id={}"><img src="https://moodle.jct.ac.il/theme/image.php/boost/assign/1641725824/icon" class="iconlarge activityicon" alt="" role="presentation" aria-hidden="true" /><span class="instancename">{}<span class="accesshide " > מטלה</span></span></a>'
COURSE_FORMAT = '<div class="coursebox clearfix {}" data-courseid="{}" data-type="1"><div class="info"><h3 class="coursename"><a class="" href="https://moodle.jct.ac.il/course/view.php?id={}">{} - {}</a></h3><div class="moreinfo"></div></div>'
EXEC_ASSIGNMENT_FORMAT = '<a class="" onclick="" href="https://moodle.jct.ac.il/mod/vpl/view.php?id={}"><img src="{}" class="iconlarge activityicon" alt="" role="presentation" aria-hidden="true" /><span class="instancename">{}<span class="accesshide " > Virtual programming lab</span></span></a>'


def get_courses():
    courses_page = requests.get(
        MOODLE_COURSES_URL,
        cookies=communication_data.session_cookie,
        verify=False).content.decode()
    unformatted_courses = parse.findall(COURSE_FORMAT, courses_page)
    formatted_courses = []
    for c in unformatted_courses:
        formatted_courses.append(course(c[2], c[3], c[4]))
    return formatted_courses


def get_static_assignments(select_course):
    course_id = select_course.id
    assignments_page = requests.get(
        MOODLE_ASSIGNMENTS_FORMAT.format(course_id),
        cookies=communication_data.session_cookie,
        verify=False).content.decode()
    unformatted_assignments = parse.findall(
        STATIC_ASSIGNMENT_FORMAT, assignments_page)
    formatted_assignments = []
    for a in unformatted_assignments:
        formatted_assignments.append(static_assignment(a[0], a[1]))
    return formatted_assignments


def get_executable_assignments(select_course):
    course_id = select_course.id
    assignments_page = requests.get(
        MOODLE_ASSIGNMENTS_FORMAT.format(course_id),
        cookies=communication_data.session_cookie,
        verify=False).content.decode()
    open('assignments.html', 'w').write(assignments_page)
    unformatted_assignments = parse.findall(
        EXEC_ASSIGNMENT_FORMAT, assignments_page)
    formatted_assignments = []
    for a in unformatted_assignments:
        formatted_assignments.append(exec_assignment(a[0], a[2]))
    return formatted_assignments
