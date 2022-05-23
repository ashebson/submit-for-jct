import Backend.get_data as get_data


class course():
    def __init__(self, id, number, name):
        self.id = int(id)
        self.number = number
        self.name = name
        self.year = int(number.split('.')[2])
        self.semester = int(number.split('.')[1])
        self.assignments = None

    def __str__(self):
        return f"name: {self.get_name():40} number: {str(self.number):20} id: {self.id:20}"

    def __repr__(self):
        return str(self)
    
    def to_json(self):
        return {
            'id': self.id,
            'number': self.number,
            'name': self.get_name(),
            'year': self.year,
            'semester': self.semester,
            'assignments': self.assignments
        }

    def get_name(self):
        return self.name[::-1]

    def get_assignments(self):
        if self.assignments is None:
            self.assignments = get_data.get_executable_assignments(self)
        return self.assignments
