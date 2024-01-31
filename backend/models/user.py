from db import db
import datetime
from exceptions.user_errors import UserNotFoundError, UserCreationError, UserDBAddingError

class User:
    """
    Class that defines user model in firestore db and interacts with it
    """

    def __init__(self, username: str = None, uuid: str = None, joined: datetime = None):
        self.username: str = username
        self.uuid: str = uuid
        self.joined: datetime = joined if joined is not None else datetime.datetime.now(tz=datetime.timezone.utc)

    @classmethod
    def from_dict(cls, d: dict):
        return User(username=d['username'], uuid=d['uuid'], joined=d['joined'])

    def json(self) -> dict:
        return {
            'username': self.username,
            'uuid': self.uuid,
            'joined': self.joined.strftime("%d/%m/%Y")
        }

    def add_user(self):
        """
        add new user into the db. It generates the user uid.
        :return: None
        """
        try:
            update_time, us_ref = db.collection(u'users').add({u'username': self.username, u'joined': self.joined}, timeout=90)
            self.uuid = us_ref.id
        except Exception as e:
            raise UserDBAddingError(self) from e

    def update_user(self):
        try:
            us_ref = db.collection(u'users').document(self.uuid)
            us_ref.set({u'username': self.username}, merge=True)
            self.uuid = us_ref.id
        except Exception as e:
            raise UserDBAddingError(self) from e

    @classmethod
    def get_user(cls, uuid: str):
        """
        (classmethod) Returns a User from db based on uuid.
        :param uuid: the specific id for the User
        :return: User obj
        """
        u = db.collection(u'users').document(uuid).get().to_dict()
        if u is None:
            raise UserNotFoundError(uuid)
        u['uuid'] = uuid
        try:
            return User.from_dict(u)
        except Exception as e:
            raise UserCreationError(u) from e

    def delete_user(self):
        """
        Deletes the user from the database.
        :return: None
        """
        try:
            db.collection(u'users').document(self.uuid).delete()
        except Exception as e:
            raise UserNotFoundError(self.uuid) from e
