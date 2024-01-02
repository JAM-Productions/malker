import json


# parent class for user errors?
# we're overriding original error data!! should not do that
class UserNotFoundError(Exception):
    def __init__(self, id: str, msg=None):
        self.message = f"User with id {id} not found in db" if msg is None else msg
        self.status = 404
        super().__init__(self.message)


class UserCreationError(Exception):
    def __init__(self, data: {}):
        self.message = 'Could not create user obj using the provided dict'
        self.status = 400
        try:
            self.message = self.message + f':\n{json.dumps(data)}'
        except:
            pass
        super().__init__(self.message)


class UserDBAddingError(Exception):
    def __init__(self, user):
        self.message = 'Could not add the user into the db'
        self.status = 400
        try:
            self.message = self.message + f':\n{json.dumps(user.json())}'
        except:
            pass
        super().__init__(self.message)


class UserAlreadyAdded(Exception):
    def __init__(self, uuid):
        self.message = f'user with id {uuid} already added in this plan'
        self.status = 400
        super().__init__(self.message)
