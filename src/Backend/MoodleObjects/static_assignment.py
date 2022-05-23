import requests


class static_assignment:
    def __init__(self, id, name):
        self.id = int(id)
        self.name = name

    def __str__(self):
        return f"name: {self.get_name():60} id: {self.id:20}"

    def __repr__(self):
        return str(self)

    def get_name(self):
        return self.name
