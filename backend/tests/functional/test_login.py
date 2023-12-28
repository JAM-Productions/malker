import json
from flask_jwt_extended import decode_token

def test_login_success(client, sample_user):
    """
    Test for successful user login.
    """
    data = {'username': sample_user.username}

    res = client.post('/api/login', data=json.dumps(data), content_type='application/json')
    assert res.status_code == 200

    response_data = json.loads(res.get_data(as_text=True))
    assert 'uuid' in response_data
    assert 'username' in response_data

    # Check if the returned token is a valid JWT token
    jwt_token = res.headers.get('Set-Cookie').split('; ')[0].split('=')[1]

    with client.application.app_context():
        decoded_token = decode_token(jwt_token)

    sample_user.uuid = decoded_token['sub']
    assert decoded_token['sub'] == response_data['uuid']
    sample_user.delete_user()
