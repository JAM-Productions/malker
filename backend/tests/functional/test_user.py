# test_user.py

import json
from flask_jwt_extended import create_access_token, set_access_cookies, decode_token
from models.user import User

def test_get_user_authenticated(client, sample_user):
    """
    Test getting user information when authenticated.
    """
    # Authenticate the user by creating a token
    with client.application.app_context():
        login_response = client.post('/api/login', data=json.dumps({'username': sample_user.username}),
                                     content_type='application/json')

        # Check if the login was successful
        assert login_response.status_code == 200, f"Login failed with status code {login_response.status_code}"
        # print("Login successful")

        response_data = json.loads(login_response.get_data(as_text=True))

        # Check if the returned token is a valid JWT token
        jwt_token = login_response.headers.get('Set-Cookie').split('; ')[0].split('=')[1]

        decoded_token = decode_token(jwt_token)

        sample_user.uuid = decoded_token['sub']

        jwt_token = create_access_token(identity=sample_user.uuid, expires_delta=False)
        set_access_cookies(response=login_response, encoded_access_token=jwt_token, max_age=None)

        # Now try to access the user endpoint
        res = client.get('/api/user')
        # print(f"Response status code: {res.status_code}")
        # print(f"Response data: {res.get_data(as_text=True)}")

        # user_data = User.get_user(sample_user.uuid).json()
        # print(user_data)
        # assert user_data['username'] == 'test_user'

        assert res.status_code == 200, f"Expected status code 200, but got {res.status_code}"

        response_data = json.loads(res.get_data(as_text=True))
        assert 'uuid' in response_data
        assert 'username' in response_data
        assert 'plans' in response_data

        sample_user.delete_user()
