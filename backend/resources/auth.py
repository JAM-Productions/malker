from flask_restful import Resource
from models.user import User

# just for testing db connection
class Auth(Resource):

    def get(self):
        try:
            User.add_user(User('elonmusk', 'elon@musk.com', '1234'))
            return User.get_user('elon@musk.com').json(), 200
        except Exception as e:
            return {"message":"error"}, 500
