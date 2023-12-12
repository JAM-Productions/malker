import json


class PlanNotFoundError(Exception):
    def __init__(self, id: str):
        self.message = f"Plan with id {id} not found in db"
        super().__init__(self.message)


class PlanCreationError(Exception):
    def __init__(self, data: dict):
        try:
            self.message = f'Could not create plan obj using the following dict: {json.dumps(data)}'
        except:
            self.message = 'Could not create plan obj using the provided dict'
        super().__init__(self.message)


class PlanDBAddingError(Exception):
    def __init__(self):
        self.message = 'could not add the following plan into the db'
        super().__init__(self.message)
