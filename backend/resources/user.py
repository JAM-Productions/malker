from flask import jsonify
from flask_restful import Resource, reqparse
from exceptions.user_errors import UserCreationError, UserNotFoundError
from models.user import User
from flask_jwt_extended import jwt_required, get_jwt_identity


class UserAPI(Resource):
    @jwt_required()
    def get(self, uuid=None):
        uuid = uuid if uuid is not None else get_jwt_identity()
        try:
            return jsonify(User.get_user(uuid).json())
        except UserNotFoundError as e:
            return {'message': e.message}, 404
        except UserCreationError as e:
            return {'message': e.message}, 400
        except Exception as e:
            return {'message': f'could not retrieve plan with id {id}'}, 400

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
            u.add_user()
            return jsonify(u.json())
        except UserNotFoundError as e:
            return {'message': e.message}, 404
        except UserCreationError as e:
            return {'message': e.message}, 400
