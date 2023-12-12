import json

from db import db
import datetime
from exceptions.user_errors import UserNotFoundError, UserCreationError, UserDBAddingError
from google.cloud.firestore_v1.base_query import FieldFilter


class User:
    """
    Class that defines user model in firestore db and interacts with it
    """

    def __init__(self, username: str, uuid: str = None, joined: datetime = None):
        self.username: str = username
        self.uuid: str = uuid
        self.joined: datetime = joined if joined is not None else datetime.datetime.now(tz=datetime.timezone.utc)
        #self.plans: [Plan] = None

    @classmethod
    def from_dict(cls, d: dict):
        return User(username=d['username'], uuid=d['uuid'], joined=d['joined'])

    def json(self, return_plans=False) -> dict:
        d = {
            'username': self.username,
            'uuid': self.uuid,
            'joined': self.joined.strftime("%d/%m/%Y")
        }
        if return_plans:
            d['plans'] = [p.json() for p in self.get_user_plans()]

        return d

    def add_user(self):
        try:
            update_time, us_ref = db.collection(u'users').add({u'username': self.username, u'joined': self.joined})
            self.uuid = us_ref.id
        except Exception as e:
            raise UserDBAddingError() from e

    @classmethod
    def get_user(cls, uuid: str):
        u = db.collection(u'users').document(uuid).get().to_dict()
        if u is None:
            raise UserNotFoundError(uuid)
        u['uuid'] = uuid
        try:
            return User.from_dict(u)
        except Exception as e:
            raise UserCreationError(u) from e