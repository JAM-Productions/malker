from db import db
import datetime

class User:
    """
    Class that defines user model in firestore db and interacts with it
    """
    def __init__(self, username:str, mail:str, password:str, joined:datetime=None):
        # id? see firestiore autoincrement id functions
        self.username:str = username
        self.mail:str = mail
        self.password:str = password
        self.joined:datetime = joined if joined is not None else datetime.datetime.now(tz=datetime.timezone.utc)

    @classmethod
    def from_dict(cls, d:dict):
        return User(username= d['username'], mail=d['mail'], password=d['password'], joined=d['joined'])

    def json(self):
        return {
            'username': self.username,
            'mail': self.mail,
            'joined': self.joined.strftime("%d/%m/%Y")
        }


    def add_user(self):
        #check if already exists?
        us_ref = db.collection(u'users').document(self.mail)
        us_ref.set( self.__dict__)

    @classmethod
    def get_user(cls, mail):
        u = db.collection(u'users').document(mail).get().to_dict()
        print(u)
        try:
            return User.from_dict(u)
        except Exception as e:
            raise f"could not instantiate user obj from fetched dict: {u}.\nError: {e}"


