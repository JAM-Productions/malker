from db import db
import datetime


class User:
    """
    Class that defines user model in firestore db and interacts with it
    """
    def __init__(self, username: str, uuid: str = None, joined: datetime = None):
        self.username: str = username
        self.uuid: str = uuid
        self.joined: datetime = joined if joined is not None else datetime.datetime.now(tz=datetime.timezone.utc)

    @classmethod
    def from_dict(cls, d: dict):
        return User(username=d['username'], uuid=d['uuid'], joined=d['joined'])

    def json(self):
        return {
            'username': self.username,
            'uuid': self.uuid,
            'joined': self.joined.strftime("%d/%m/%Y")
        }

    def add_user(self):
        update_time, us_ref = db.collection(u'users').add({u'username': self.username, u'joined': self.joined})
        self._uuid = us_ref.id

    @classmethod
    def get_user(cls, uuid: str):
        u = db.collection(u'users').document(uuid).get().to_dict()
        u['uuid'] = uuid
        try:
            return User.from_dict(u)
        except Exception as e:
            raise f"could not instantiate user obj from fetched dict: {u}.\nError: {e}"