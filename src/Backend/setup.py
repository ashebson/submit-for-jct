import json
import Backend.communication_data as communication_data
import os


def get_username_password_and_userid():
    current_file_dir = os.path.dirname(os.path.abspath(__file__))
    credentials_file = open(current_file_dir + "/setup.json", "r")
    credentials = json.load(credentials_file)
    communication_data.username = credentials["username"]
    communication_data.password = credentials["password"]
    communication_data.userid = credentials["userid"]
