import json


class PlanNotFoundError(Exception):
    def __init__(self, id: str):
        self.message = f"Plan with id {id} not found in db"
        self.status = 404
        super().__init__(self.message)


class PlanCreationError(Exception):
    def __init__(self, data: dict):
        self.message = 'Could not create plan obj using the provided dict'
        self.status = 400
        try:
            self.message = self.message + f':\n{json.dumps(data)}'
        except:
            pass
        super().__init__(self.message)


class PlanDBAddingError(Exception):
    def __init__(self):
        self.message = 'Could not add the following plan into the db'
        self.status = 400
        super().__init__(self.message)


class PlanDeletingError(Exception):
    def __init__(self, id: str):
        self.message = f'Could not delete plan with id {id}'
        self.status = 400
        super().__init__(self.message)
