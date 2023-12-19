"""
Module containing the Flask application.
"""

import time
import os
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_restful import Api
from dotenv import load_dotenv
import git
from resources.login import Login
from resources.plan import PlanAPI
from resources.user import UserAPI

load_dotenv()
app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET')
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_CSRF_CHECK_FORM'] = True  # allows sending cookies through forms
app.config['JWT_SESSION_COOKIE'] = False  # makes cookies permanent
jwt = JWTManager(app)
api = Api(app)
CORS(app)

api.add_resource(Login, '/api/login')
api.add_resource(PlanAPI, '/api/plan', '/api/plan/<string:id>')
api.add_resource(UserAPI, '/api/user', '/api/user/<string:uuid>')


@app.route('/')
def index():
    """
    Main route that returns a JSON message.
    """
    return jsonify({'message': 'Hello from Malker!!'})


@app.route('/time')
def get_current_time():
    """
    Route that returns the current time in JSON format.
    """
    return jsonify({'time': time.time()})


@app.route('/git_update', methods=['POST'])
def git_update():
    """
    Route that performs an update from the Git version control repository.
    """
    repo = git.Repo('./malker')
    origin = repo.remotes.origin
    repo.create_head('main',
                     origin.refs.main).set_tracking_branch(origin.refs.main).checkout()
    origin.pull()
    return '', 200

if __name__ == '__main__':
    app.run(debug=True)
