from flask_jwt_extended import create_access_token, set_access_cookies, jwt_required, get_jwt_identity
from flask_restful import Resource, reqparse
from models.user import User
from flask import jsonify, make_response


class Login(Resource):
    def post(self):
        """
        Function that
         - creates a new user with the username provided
         - saves the data into de DB
         - Generates token + cookie
        :return: if success, json with user data + auth cookie
        """
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str, required=True)
        data = parser.parse_args()

        try:
            u = User(data['username'])
            u.add_user()

            jwt_token = create_access_token(identity=u.uuid, expires_delta=False)

            r = make_response(jsonify(u.json()), 200)
            set_access_cookies(response=r, encoded_access_token=jwt_token, max_age=None)
            return r

        except Exception as e:
            return {"error": f"could not add user {data['username']} into the system"}, 400
