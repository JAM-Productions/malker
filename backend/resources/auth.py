from flask_restful import Resource
from models.user import User
from flask import jsonify

# just for testing db connection
class Auth(Resource):

    def get(self):
        try:
            u = User('elonmusk')
            User.add_user(u)
            return User.get_user(u._uuid).json(), 200

        except Exception as e:
            raise e
            #return {"message": "error fetching data"}, 500
