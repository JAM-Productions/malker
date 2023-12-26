import json
from flask_jwt_extended import create_access_token, set_access_cookies

def test_get_user_authenticated(client, sample_user, sample_plan):
    """
    Test getting user information when authenticated.
    """
    # Authenticate the user by creating a token
    jwt_token = create_access_token(identity=sample_user.uuid, expires_delta=False)
    set_access_cookies(response=client.post('/api/login', data=json.dumps({'username': sample_user.username}),
                                            content_type='application/json'), encoded_access_token=jwt_token, max_age=None)

    res = client.get('/api/user')
    assert res.status_code == 200

    response_data = json.loads(res.get_data(as_text=True))
    assert 'uuid' in response_data
    assert 'username' in response_data
    assert 'plans' in response_data
