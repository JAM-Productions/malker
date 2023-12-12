from datetime import datetime

from flask import jsonify
from flask_restful import Resource, reqparse
from models.plan import Plan
from models.user import User
from exceptions.plan_errors import PlanCreationError, PlanNotFoundError, PlanDBAddingError
from flask_jwt_extended import jwt_required, get_jwt_identity


class PlanAPI(Resource):
    @jwt_required()
    def get(self, id):
        try:
            return jsonify(Plan.get_plan_by_id(id).json())
        except PlanNotFoundError as e:
            return {'message': e.message}, 404
        except PlanCreationError as e:
            return {'message': e.message}, 400
        except Exception as e:
            return {'message': f'could not retrieve plan with id {id}'}, 400

    @jwt_required()
    def post(self):

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
            plan = Plan.from_dict(p, include_uid=False)
            plan.add_plan()
            return jsonify(plan.json())
        except PlanCreationError as e:
            return {'message': e.message}, 400
        except PlanDBAddingError as e:
            return {'message': e.message}, 404
        except Exception as e:
            return {'message': 'error creating the plan'}, 500


    @jwt_required()
    def put(self, id):
        try:
            pl = Plan.get_plan_by_id(id)
        except PlanNotFoundError as e:
            return {'message': e.message}, 404
        except PlanCreationError as e:
            return {'message': e.message}, 400
        except Exception as e:
            return {'message': f'could not retrieve plan with id {id}'}, 400

        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True)
        parser.add_argument('description', type=str, required=True)
        parser.add_argument('date', type=lambda x: datetime.strptime(x, '%d/%m/%Y'), required=True)
        parser.add_argument('location', type=str, required=True)
        parser.add_argument('admin', type=str, required=True)
        p = parser.parse_args()

        if pl.name != p['name']:
            pl.name = p['name']
        if pl.description != p['description']:
            pl.description = p['description']
        if pl.date != p['date']:
            pl.date = p['date']
        if pl.location != p['location']:
            pl.location = p['location']
        if pl.admin != p['admin']:
            try:
                User.get_user(p['admin'])
                pl.admin = p['admin']
            except Exception as e:
                return {'message':f'the admin value {p["admin"]} is not a valid user id'}

        try:
            pl.update_plan()
            return jsonify(pl.json())
        except PlanDBAddingError as e:
            return {'message': e.message}, 404
        except Exception as e:
            return {'message': 'error updating the plan'}, 500

