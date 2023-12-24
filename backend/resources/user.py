from flask import jsonify
from flask_restful import Resource, reqparse
from exceptions.user_errors import UserCreationError, UserNotFoundError
from models.user import User
from models.plan import Plan
from flask_jwt_extended import jwt_required, get_jwt_identity


class UserAPI(Resource):
    @jwt_required()
    def get(self, uuid=None):
        uuid = uuid if uuid is not None else get_jwt_identity()
        try:
            user_data = User.get_user(uuid).json()
            plans_list = [p.json() for p in Plan.get_user_plans(uuid)]
            user_data['participants'] = plans_list
            return jsonify(user_data)

        except UserNotFoundError as e:
            return {'message': e.message}, 404
        except UserCreationError as e:
            return {'message': e.message}, 400
        except Exception as e:
            raise e
            return {'message': f'Could not retrieve user with id {uuid}'}, 400

    @jwt_required()
    def put(self):
        # update username
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str, required=True)
        data = parser.parse_args()

        uuid = get_jwt_identity()
        try:
            u = User.get_user(uuid)
            u.username = data['username']
            u.update_user()
            return jsonify(u.json())
        except UserNotFoundError as e:
            return {'message': e.message}, 404
        except UserCreationError as e:
            return {'message': e.message}, 400

