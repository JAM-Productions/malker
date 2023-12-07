from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_restful import Api
from resources.login import Login
from dotenv import load_dotenv
import time
import os

load_dotenv()
app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET')
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_CSRF_CHECK_FORM'] = True # allows sending cookies through forms
app.config['JWT_SESSION_COOKIE'] = False # makes cookies permanent
jwt = JWTManager(app)
api = Api(app)
CORS(app)

api.add_resource(Login, '/api/login')

@app.route('/')
def index():
    return jsonify({'message': 'Hello, World!'})


@app.route('/time')
def get_current_time():
    return jsonify({'time': time.time()})


if __name__ == '__main__':
    app.run(debug=True)
