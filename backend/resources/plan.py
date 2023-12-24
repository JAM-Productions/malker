from datetime import datetime

from flask import jsonify
from flask_restful import Resource, reqparse
from models.plan import Plan
from models.user import User
from exceptions.plan_errors import PlanCreationError, PlanNotFoundError, PlanDBAddingError
from exceptions.user_errors import UserCreationError, UserNotFoundError
from exceptions.plan_errors import PlanDeletingError
from flask_jwt_extended import jwt_required, get_jwt_identity


class PlanAPI(Resource):
    @jwt_required(optional=True)
    def get(self, id):
        """
        Endpoint for plan retrieval. It does not require auth cookie.
        /api/plan/<id>
        :param id: plan id
        :return: if success, JSON with plan data
        """
        try:
            return jsonify(Plan.get_plan_by_id(id).json(return_full=False if get_jwt_identity() is None else True))
        except PlanNotFoundError as e:
            return {'message': e.message}, 404
        except PlanCreationError as e:
            return {'message': e.message}, 400
        except Exception as e:
            return {'message': f'Could not retrieve plan with id {id}'}, 400

    @jwt_required()
    def post(self):
        """
        Endpoint for plan creation. Requires auth cookie + csrf token
        /api/plan
        :return: if success json with plan data
        """

        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True)
        parser.add_argument('description', type=str, required=True)
        parser.add_argument('date', type=lambda x: datetime.strptime(x, '%d/%m/%Y'), required=True)
        parser.add_argument('location', type=str, required=True)
        p = parser.parse_args()

        uuid = get_jwt_identity()
        p['admin'] = uuid
        p['participants'] = [uuid]

        try:
            plan = Plan.from_dict(p)
            plan.add_plan()
            return jsonify(plan.json())
        except PlanCreationError as e:
            return {'message': e.message}, 400
        except PlanDBAddingError as e:
            return {'message': e.message}, 404
        except Exception as e:
            return {'message': 'Error creating the plan'}, 500

    @jwt_required()
    def put(self, id):
        """
        Endpoint for plan updating
        /api/plan/<id>
        :param id: plan id
        :return: if success, JSON with updated plan data
        """
        # TODO allow only sending the variable we want to change not all plan data
        try:
            pl = Plan.get_plan_by_id(id)
        except PlanNotFoundError as e:
            return {'message': e.message}, 404
        except PlanCreationError as e:
            return {'message': e.message}, 400
        except Exception as e:
            return {'message': f'Could not retrieve plan with id {id}'}, 400

        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=False)
        parser.add_argument('description', type=str, required=False)
        parser.add_argument('date', type=lambda x: datetime.strptime(x, '%d/%m/%Y'), required=False)
        parser.add_argument('location', type=str, required=False)
        parser.add_argument('admin', type=str, required=False)
        p = parser.parse_args()

        if pl.name != p['name'] and p['name'] is not None:
            pl.name = p['name']

        if pl.description != p['description'] and p['description'] is not None:
            pl.description = p['description']

        if pl.date != p['date'] and p['date'] is not None:
            pl.date = p['date']

        if pl.location != p['location'] and p['location'] is not None:
            pl.location = p['location']

        if pl._admin != p['admin'] and p['admin'] is not None:
            try:
                User.get_user(p['admin'])
                pl._admin = p['admin']
            except Exception as e:
                return {'message': f'The admin value {p["admin"]} is not a valid user id'}, 400

        try:
            pl.update_plan()
            return jsonify(pl.json())
        except PlanDBAddingError as e:
            return {'message': e.message}, 404
        except Exception as e:
            return {'message': 'Error updating the plan'}, 500

    @jwt_required()
    def delete(self, id):
        """
        Endpoint that allows to delete a plan. Only _admin can delete a plan
        /api/plan/<id>
        :param id: plan id
        :return: if success, JSON with confirmation message
        """
        try:
            plan = Plan.get_plan_by_id(id)
            user = User.get_user(get_jwt_identity())

            if plan._admin.lower() == user.uuid.lower():
                plan.delete_plan()
                return jsonify({"message": f"Plan with id {id} deleted"})

            return {"message": f"You do not have enough privileges to delete plan {id}"}, 403

        except (PlanNotFoundError, UserNotFoundError) as e:
            return {'message': e.message}, 404
        except (PlanCreationError, UserCreationError, PlanDeletingError) as e:
            return {'message': e.message}, 400
        except Exception as e:
            return {'message':f'Error performing deletion for provided plan'}, 500

