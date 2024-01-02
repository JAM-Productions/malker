import json
from flask_jwt_extended import create_access_token, set_access_cookies, decode_token
from models.plan import Plan


def test_get_plan(client, sample_user, sample_plan):
    """
     Test getting plan information.
     """
    # Authenticate the user by creating a token
    with client.application.app_context():
        sample_plan.add_plan()
    # Now try to access the plan endpoint
    # in this case, auth is not needed to retrieve plan data.
    # auth can also be provided and more info will be returned
    res = client.get(f'/api/plan/{sample_plan.uid}')
    assert res.status_code == 200, f"Expected status code 200, but got {res.status_code}"

    response_data = json.loads(res.get_data(as_text=True))
    assert 'id' in response_data
    assert 'name' in response_data
    assert 'description' in response_data
    assert 'date' in response_data
    assert 'location' in response_data
    assert 'admin' in response_data
    sample_plan.delete_plan()


def test_create_plan(client, sample_user):
    """
    Test creating a new plan.
    """
    # Authenticate the user by creating a token
    with client.application.app_context():
        jwt_token = create_access_token(identity=sample_user.uuid, expires_delta=False)

    # Now try to create a new plan
    plan_data = {
        'name': 'Test Plan',
        'description': 'This is a test plan',
        'date': '01/01/2023',
        'location': 'Test Location'
    }
    headers = {'Authorization': f'Bearer {jwt_token}'}
    res = client.post('/api/plan', data=json.dumps(plan_data), content_type='application/json', headers=headers)
    assert res.status_code == 200, f"Expected status code 200, but got {res.status_code}"

    response_data = json.loads(res.get_data(as_text=True))
    assert 'id' in response_data
    assert response_data['name'] == plan_data['name']
    assert response_data['description'] == plan_data['description']
    assert response_data['date'] == '01/01/2023'
    assert response_data['location'] == plan_data['location']
    assert 'admin' in response_data
    assert 'participants' in response_data
    retrieved_plan = Plan.get_plan_by_id(response_data['id'])
    retrieved_plan.delete_plan()


def test_update_plan(client, sample_user, sample_plan):
    """
    Test updating an existing plan.
    """
    # Authenticate the user by creating a token
    with client.application.app_context():
        sample_user.add_user()
        jwt_token = create_access_token(identity=sample_user.uuid, expires_delta=False)

    # Now try to update an existing plan
    updated_name = 'Updated Test Plan'
    updated_description = 'This plan has been updated'
    updated_date = '02/01/2023'
    updated_location = 'Updated Test Location'

    update_data = {
        'name': updated_name,
        'description': updated_description,
        'date': updated_date,
        'location': updated_location
    }
    sample_plan.add_plan()
    retrieved_plan = Plan.get_plan_by_id(sample_plan.uid)
    headers = {'Authorization': f'Bearer {jwt_token}'}
    res = client.put(f'/api/plan/{retrieved_plan.uid}', data=json.dumps(update_data), content_type='application/json',
                     headers=headers)
    assert res.status_code == 200, f"Expected status code 200, but got {res.status_code}"

    updated_data = json.loads(res.get_data(as_text=True))
    assert 'id' in updated_data
    assert updated_data['name'] == updated_name
    assert updated_data['description'] == updated_description
    assert updated_data['date'] == '02/01/2023'
    assert updated_data['location'] == updated_location
    assert 'admin' in updated_data
    assert 'participants' in updated_data
    retrieved_plan.delete_plan()
    sample_user.delete_user()


def test_delete_plan(client, sample_user, sample_plan):
    """
     Test deleting an existing plan.
     """
    # Authenticate the user by creating a token
    with client.application.app_context():
        sample_user.add_user()
        jwt_token = create_access_token(identity=sample_user.uuid, expires_delta=False)

    # Now try to delete an existing plan
    sample_plan.add_plan()
    headers = {'Authorization': f'Bearer {jwt_token}'}
    res = client.delete(f'/api/plan/{sample_plan.uid}', headers=headers)
    assert res.status_code == 200, f"Expected status code 200, but got {res.status_code}"

    response_data = json.loads(res.get_data(as_text=True))
    assert 'message' in response_data
    assert response_data['message'] == f"Plan with id {sample_plan.uid} deleted"
    sample_plan.delete_plan()
    sample_user.delete_user()
