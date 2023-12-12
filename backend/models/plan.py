import datetime

from db import db
from models.user import User
from exceptions.plan_errors import PlanCreationError, PlanNotFoundError, PlanDBAddingError
#from google.cloud import firestore


class Plan:
    def __init__(self, name: str, description: str, date: datetime, location: str, admin: User,
                 participants: list[User], uid: str):
        self.uid = uid
        self.name = name
        self.description = description
        self.admin: User = admin  # aka the creator
        self.date: datetime = date
        self.location: str = location
        self.participants: list[User] = [admin] if participants is None else participants

    def json(self):
        return {
            'id': self.uid,
            'name': self.name,
            'description': self.description,
            'date': self.date.strftime('%d/%m/%Y'),
            'location': self.location,
            #'admin': self.admin.json(),
            'admin': self.admin,
            'participants': self.participants
            #'participants': [p.json() for p in self.participants]
        }

    @classmethod
    def from_dict(cls, d: dict, include_uid=True):
        try:
            if include_uid:
                return Plan(d[u'name'], d[u'description'], d[u'date'], d[u'location'], d[u'admin'], d[u'participants'],
                            d[u'uid'])
            return Plan(d[u'name'], d[u'description'], d[u'date'], d[u'location'], d[u'admin'], d[u'participants'],
                        None)
        except Exception as e:
            raise PlanCreationError(d) from e

    def add_plan(self):
        try:
            update_time, us_ref = db.collection(u'plans').add({
                u'name': self.name,
                u'description': self.description,
                u'date': self.date,
                u'location': self.location,
                u'admin': self.admin.uuid if isinstance(self.admin, User) else self.admin,
                u'participants': [p.uuid for p in self.participants] if isinstance(self.participants[0],
                                                                                   User) else self.participants
            })
            self.uid = us_ref.id
        except Exception as e:
            raise PlanDBAddingError() from e

    def update_plan(self):
        try:
            p_ref = db.collection(u'plans').document(self.uid)
            p_ref.set({
                u'name': self.name,
                u'description': self.description,
                u'date': self.date,
                u'location': self.location,
                u'admin': self.admin.uuid if isinstance(self.admin, User) else self.admin,
                u'participants': [p.uuid for p in self.participants] if isinstance(self.participants[0],
                                                                                   User) else self.participants
            }, merge=True)
            self.uid = p_ref.id
        except Exception as e:
            raise PlanDBAddingError() from e
    @classmethod
    def get_plan_by_id(cls, id: str):
        p = db.collection(u'plans').document(id).get().to_dict()
        if p is None:
            raise PlanNotFoundError(id)
        p['uid'] = id
        try:
            return Plan.from_dict(p)
        except Exception as e:
            raise PlanCreationError(p) from e

    """
    def add_participant(self, uuid: str):
        user = User.get_user(uuid)
        self.participants.append(user)
        ref = db.collection(u'plans').document(self.uid)
        ref.update({u'participants': firestore.ArrayUnion([uuid])})

    def remove_participant(self, uuid: str):
        if uuid in self.participants:
            ref = db.collection(u'plans').document(self.uid)
            ref.update({u'participants': firestore.ArrayUnion([uuid])})
    """

    """
    @classmethod
    def get_user_plans(self, uuid:str) -> [Plan]:
        query = (db.collection(u'plans')
                 .where(filter=FieldFilter("participants", "array-contains", uuid))).stream()
        # if query.exists():
            raise 'algo'
        plans = []
        for q in query:
            try:
                aux = q.to_dict()
                aux['uid'] = q.id
                plans.append(aux)
            except Exception as e:
                continue
        if len(plans) == 0:
            raise PlanCreationError({})

        self.plans = plans
        return plans
    """
