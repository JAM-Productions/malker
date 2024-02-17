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
from resources.participants import AddPartcipants, DeleteParticipants

load_dotenv()
app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET')
jwt = JWTManager(app)
api = Api(app)
CORS(app, resources={r"/api/*": {"origins": "*"}})

api.add_resource(Login, '/api/login')
api.add_resource(PlanAPI, '/api/plan', '/api/plan/<string:id>')
api.add_resource(UserAPI, '/api/user', '/api/user/<string:uuid>')
api.add_resource(AddPartcipants, '/api/plan/<string:plan_id>/add/<string:user_id>')
api.add_resource(DeleteParticipants, '/api/plan/<string:plan_id>/delete/<string:user_id>')


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
