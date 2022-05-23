import re
import requests
import websockets
import asyncio
import json
import time
import parse
import Backend.communication_data as communication_data
import os
MOODLE_UPLOAD_URL_FORMAT = "https://moodle.jct.ac.il/mod/vpl/forms/edit.json.php?id={}&userid={}&action=save"
MOODLE_EVAL_URL_FORMAT = "https://moodle.jct.ac.il/mod/vpl/forms/edit.json.php?id={}&userid={}&action=evaluate"
MOODLE_RETRIEVE_URL_FORMAT = "https://moodle.jct.ac.il/mod/vpl/forms/edit.json.php?id={}&userid={}&action=retrieve"
BURP_PROXY = {"http": "http://127.0.0.1:8080",
              "https": "http://127.0.0.1:8080"}

GRADE_FORMAT = "המלצה לציון (מנגנון הערכה אוטומטית): {} / 100"
EXPECTED_FORMAT = " --- Expected output (text)---{}-Summary of tests"
OUTPUT_FORMAT = " --- Program output ---{} --- Expected output (text)---"

FILE_UPLOAD_FORMAT = '{{"files": [{{"name": "{}", "contents": "{}", "encoding": 0}}], "comments": ""}}'


class exec_assignment:
    def __init__(self, id, name):
        self.id = int(id)
        self.name = name

    def __str__(self):
        return f"name: {self.get_name():75} id: {self.id:20}"

    def __repr__(self):
        return str(self)

    def to_json(self):
        return {"id": self.id, "name": self.get_name()}

    def upload(self, file_path):
        url = MOODLE_UPLOAD_URL_FORMAT.format(
            self.id, communication_data.userid)
        upload_file = open(file_path, 'rb')
        upload_file_contents = upload_file.read().decode()
        upload_file_contents = upload_file_contents.replace("\\", "\\\\")
        upload_file_contents = upload_file_contents.replace("\n", "\\n")
        upload_file_contents = upload_file_contents.replace("\"", "\\\"")
        file_name = file_path.split('/')[-1]
        data = FILE_UPLOAD_FORMAT.format(file_name, upload_file_contents)
        requests.post(url, cookies=communication_data.session_cookie,
                      verify=False, data=data)  # , proxies=BURP_PROXY)

    def grade(self, file_path):
        self.upload(file_path)
        url = MOODLE_EVAL_URL_FORMAT.format(self.id, communication_data.userid)
        header = {'Content-Type': 'application/json; charset=UTF-8'}
        response = requests.post(url, headers=header,
                                 cookies=communication_data.session_cookie,
                                 verify=False, data="{}")  # ,proxies=BURP_PROXY)
        response_json = json.loads(response.text)
        monitor_path = response_json['response']['monitorPath']
        time.sleep(1)
        url = MOODLE_RETRIEVE_URL_FORMAT.format(
            self.id, communication_data.userid)
        response = requests.post(
            url, cookies=communication_data.session_cookie, verify=False)
        response = response.json()
        grade = response['response']['grade']
        evaluation = response['response']['evaluation']
        if grade == '':
            if evaluation == '':
                raise Exception("Grading Failed")
            if 'Incorrect' in response['response']['evaluation']:
                grade = 0
            else:
                grade = 100
        else:
            grade = parse.parse(GRADE_FORMAT, grade)[0]
        grade = float(grade)
        return grade, evaluation

    def get_name(self):
        return self.name[::-1]
