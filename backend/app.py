from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_restful import Api
from resources.auth import Auth
import time

app = Flask(__name__)
api = Api(app)
CORS(app)

api.add_resource(Auth, '/api/auth')

@app.route('/')
def index():
    return jsonify({'message': 'Hello, World!'})

@app.route('/time')
def get_current_time():
    return jsonify({'time': time.time()})

@app.route('/addTest')
def add_db_data():
    pass

if __name__ == '__main__':
    app.run(debug=True)