from flask_jwt_extended import create_access_token, set_access_cookies
from flask_restful import Resource, reqparse
from models.user import User
from flask import jsonify, make_response


class Login(Resource):
    def post(self):
        """
        Endpoint that
         - creates a new user with the username provided
         - saves the data into de DB
         - Generates token
        :return: if success, auth token
        """
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str, required=False)
        try:
            data = parser.parse_args()
        except:
            data = {}

        try:
            if 'username' in data.keys():
                u = User(data['username'])
            else:
                u = User()
            u.add_user()

            jwt_token = create_access_token(
                identity=u.uuid, expires_delta=False)
            data = u.json()
            data['token'] = jwt_token
            return make_response(jsonify(data), 200)

        except Exception:
            return {"error": f"Could not add user into the system"}, 400
