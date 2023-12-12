import json


# parent class for user errors?
# we're overriding original error data!! should not do that
class UserNotFoundError(Exception):
    def __init__(self, id: str):
        self.message = f"User with id {id} not found in db"
        super().__init__(self.message)


class UserCreationError(Exception):
    def __init__(self, data: {}):
        try:
            self.message = f'Could not create user obj using the following dict: {json.dumps(data)}'
        except:
            self.message = 'Could not create user obj using the provided dict'
        super().__init__(self.message)


class UserDBAddingError(Exception):
    def __init__(self, user):
        self.message = f'could not add the following user into the db:\n{json.dumps(user.json())}'
        super().__init__(self.message)
