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
        Endpoint for plan retrieval. It does not require auth token
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
        parser.add_argument('date', type=lambda x: datetime.strptime(
            x, '%d/%m/%Y'), required=True)
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
        Endpoint for plan updating. only admin can edit
        /api/plan/<id>
        :param id: plan id
        :return: if success, JSON with updated plan data
        """
        try:
            pl = Plan.get_plan_by_id(id)
            user = User.get_user(get_jwt_identity())

            if pl.get_plan_admin_id().lower() != user.uuid.lower():
                return {"message": f"You do not have enough privileges to delete plan {id}"}, 403

        except (PlanNotFoundError, UserNotFoundError) as e:
            return {'message': e.message}, 404
        except (PlanCreationError, UserCreationError, PlanDeletingError) as e:
            return {'message': e.message}, 400
        except Exception as e:
            return {'message': f'Error performing deletion for provided plan'}, 500

        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=False)
        parser.add_argument('description', type=str, required=False)
        parser.add_argument('date', type=lambda x: datetime.strptime(
            x, '%d/%m/%Y'), required=False)
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

            if plan.get_plan_admin_id().lower() == user.uuid.lower():
                plan.delete_plan()
                return jsonify({"message": f"Plan with id {id} deleted"})

            return {"message": f"You do not have enough privileges to delete plan {id}"}, 403

        except (PlanNotFoundError, UserNotFoundError) as e:
            return {'message': e.message}, 404
        except (PlanCreationError, UserCreationError, PlanDeletingError) as e:
            return {'message': e.message}, 400
        except Exception as e:
            return {'message': f'Error performing deletion for provided plan'}, 500


class GetAllPlans(Resource):
    @jwt_required()
    def get(self, id):
        """
        Endpoint for retrieving all plans for a specific user
        /api/plans/<id>
        :param id: user id
        :return: if success, JSON with all plans data
        """
        try:
            user_plans = Plan.get_user_plans(id)
            return jsonify([p.json() for p in user_plans])
        except PlanNotFoundError as e:
            return {'message': e.message}, 404
        except Exception as e:
            return {'message': f'Could not retrieve plans for user with id {id}'}, 400


class DeleteAllPlanTests(Resource):
    def delete(self):
        """
        Endpoint to delete all plans with name "Cypress Test".
        Only for testing purposes.
        It does not require auth token.
        /api/deleteAllPlanTests
        :return: if success, JSON with confirmation message
        """
        try:
            plans_to_delete = Plan.get_plans_by_name("Cypress Test")
            for plan in plans_to_delete:
                plan.delete_plan()
            return jsonify({"message": "All plans with name 'Cypress Test' deleted"})
        except PlanNotFoundError as e:
            return {'message': e.message}, 404
        except Exception as e:
            return {'message': 'Error performing deletion for plans with name "Cypress Test"'}, 500
