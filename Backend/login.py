import requests
import parse
import Backend.communication_data as communication_data
from Backend.setup import get_username_password_and_userid
MOODLE_LOGIN_URL = "https://moodle.jct.ac.il/login/index.php"
LOGIN_TOKEN_FORMAT = '<input type="hidden" name="logintoken" value="{}">'


def get_login_token_and_cookie():
    login_page = requests.get(MOODLE_LOGIN_URL, verify=False)
    login_token = parse.search(LOGIN_TOKEN_FORMAT, login_page.text)[0]
    login_cookie = login_page.cookies.get_dict()
    return login_token, login_cookie


def login():
    get_username_password_and_userid()
    login_token, login_cookie = get_login_token_and_cookie()
    login_data = {"anchor": "", "logintoken": login_token,
                  "username": communication_data.username, 
                  "password": communication_data.password}
    login_response = requests.post(
        MOODLE_LOGIN_URL,
        data=login_data,
        cookies=login_cookie,
        allow_redirects=False,
        verify=False)
    communication_data.session_cookie = login_response.cookies.get_dict()
