from __future__ import annotations

import datetime

from db import db
from models.user import User
from exceptions.plan_errors import PlanCreationError, PlanNotFoundError, PlanDBAddingError, PlanDeletingError
from exceptions.user_errors import UserCreationError, UserNotFoundError, UserAlreadyAdded
from google.cloud.firestore_v1.base_query import FieldFilter
from google.cloud import firestore


class Plan:
    """
    Class that defines Plan model in firestore db and interacts with it
    """

    def __init__(self, name: str, description: str, date: datetime, location: str, admin,
                 participants: list, uid: str):
        self.uid = uid
        self.name = name
        self.description = description
        self._admin = admin  # aka the creator
        self.date: datetime = date
        self.location: str = location
        self._participants: list = [admin] if participants is None else participants

    def get_plan_admin_id(self) -> str:
        return self._admin.uuid if isinstance(self._admin, User) else self._admin

    def get_plan_admin(self) -> User:
        if isinstance(self._admin, User):
            return self._admin
        try:
            return User.get_user(self._admin)
        except Exception as e:
            raise UserCreationError(self._admin)

    def get_plan_participants_id(self) -> [str]:
        return [p.uuid for p in self._participants] if isinstance(self._participants[0], User) else self._participants

    def get_plan_participants(self) -> [User]:
        try:
            for p in self._participants:
                if not isinstance(p, User):
                    raise UserCreationError({})
            return self._participants

        except UserCreationError:
            plans = []
            for p in self._participants:
                try:
                    plans.append(User.get_user(p))
                except Exception:
                    continue

            if len(plans) == 0:
                raise PlanCreationError({})

            return plans

    def json(self) -> dict:
        """
        generates dict with all the plan data.
        :return: dict with the plan data (not a json as the method name may suggest)
        """
        return {
            'id': self.uid,
            'name': self.name,
            'description': self.description,
            'date': self.date.strftime('%d/%m/%Y'),
            'location': self.location,
            # '_admin': self._admin.json(),
            'admin': self._admin,
            'participants': self._participants
            # '_participants': [p.json() for p in self._participants]
        }

    @classmethod
    def from_dict(cls, d: dict):
        """
        (Classmethod) creates plan obj from dict. There's two possible cases:
        - new plan: we don't have the uid yet (is generated by firebase), we pass None in the uid param
        - created plan: we have all the data we need (uid already generated)
        :param d: dictionary with plan keys and values
        :return: Plan object with the provided data
        """
        try:
            try:
                return Plan(d[u'name'], d[u'description'], d[u'date'], d[u'location'], d[u'admin'],
                            d[u'participants'],
                            d[u'uid'])
            except KeyError:
                return Plan(d[u'name'], d[u'description'], d[u'date'], d[u'location'], d[u'admin'],
                            d[u'participants'],
                            None)
            except Exception as e:
                raise e
        except Exception as e:
            raise PlanCreationError(d) from e

    def add_plan(self) -> None:
        """
        add new plan into the db. It generates the plan uid.
        :return: None
        """
        try:
            update_time, us_ref = db.collection(u'plans').add({
                u'name': self.name,
                u'description': self.description,
                u'date': self.date,
                u'location': self.location,
                u'admin': self._admin.uuid if isinstance(self._admin, User) else self._admin,
                u'participants': [p.uuid for p in self._participants] if isinstance(self._participants[0],
                                                                                    User) else self._participants
            })
            self.uid = us_ref.id
        except Exception as e:
            raise PlanDBAddingError() from e

    def update_plan(self) -> None:
        """
        Updates an already created plan. Can't create a new one.
        :return: None
        """
        try:
            p_ref = db.collection(u'plans').document(self.uid)
            p_ref.set({
                u'name': self.name,
                u'description': self.description,
                u'date': self.date,
                u'location': self.location,
                u'admin': self._admin.uuid if isinstance(self._admin, User) else self._admin,
                u'participants': [p.uuid for p in self._participants] if isinstance(self._participants[0],
                                                                                    User) else self._participants
            }, merge=True)
            self.uid = p_ref.id
        except Exception as e:
            raise PlanDBAddingError() from e

    @classmethod
    def get_plan_by_id(cls, id: str):
        """
        (classmethod) Returns a plan from db based on id.
        :param id: the specific id for the Plan
        :return: Plan obj
        """
        p = db.collection(u'plans').document(id).get().to_dict()
        if p is None:
            raise PlanNotFoundError(id)
        p['uid'] = id
        try:
            return Plan.from_dict(p)
        except Exception as e:
            raise PlanCreationError(p) from e

    def delete_plan(self) -> None:
        """
        Deletes the specific plan from db
        :return:None
        """
        try:
            p = db.collection(u'plans').document(self.uid).delete()
        except Exception as e:
            raise PlanDeletingError(self.uid)

    def add_participant(self, uuid: str):
        if uuid in self._participants:
            raise UserAlreadyAdded(uuid)
        try:
            user = User.get_user(uuid)
            self._participants.append(user)
            ref = db.collection(u'plans').document(self.uid)
            ref.update({u'participants': firestore.ArrayUnion([uuid])})
        except Exception as e:
            raise PlanDBAddingError() from e

    def remove_participant(self, uuid: str):
        if uuid not in self._participants:
            raise UserNotFoundError(uuid, msg=f'User with id {uuid} not found in plan with id {self.uid}')
        try:
            ref = db.collection(u'plans').document(self.uid)
            ref.update({u'participants': firestore.ArrayRemove([uuid])})
        except Exception as e:
            raise PlanDBAddingError() from e

    @classmethod
    def get_user_plans(cls, uuid: str) -> [Plan]:
        data = (db.collection(u'plans')
                .where(filter=FieldFilter("_participants", "array-contains", uuid))).stream()

        if not data.exists():
            raise PlanNotFoundError(uuid)

        plans = []
        for q in data:
            try:
                aux = q.to_dict()
                aux['uid'] = q.id
                plans.append(Plan.from_dict(aux))
            except Exception as e:
                continue

        if len(plans) == 0:
            raise PlanCreationError({})
