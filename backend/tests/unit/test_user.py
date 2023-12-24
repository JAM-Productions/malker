import pytest
from models.user import User
from exceptions.user_errors import UserNotFoundError

# Fixture to create a sample user for testing
@pytest.fixture
def sample_user(client):
    with client.application.app_context():
        return User(username="test_user")

def test_new_user(sample_user):
    assert sample_user.username == "test_user"
    assert sample_user.joined is not None

# Test to create a user
def test_create_user(sample_user):
    sample_user.add_user()
    assert sample_user.uuid is not None
    sample_user.delete_user()

def test_user_json(sample_user):
    expected = {
        'username': 'test_user',
        'uuid': sample_user.uuid,
        'joined': sample_user.joined.strftime("%d/%m/%Y")
    }
    assert expected == sample_user.json()

# Test to get an existing user
def test_get_user(sample_user):
    sample_user.add_user()

    retrieved_user = User.get_user(sample_user.uuid)

    assert retrieved_user.username == sample_user.username
    assert retrieved_user.uuid == sample_user.uuid
    assert retrieved_user.joined.strftime("%d/%m/%Y") == sample_user.joined.strftime("%d/%m/%Y")
    sample_user.delete_user()

# Test to get a non-existing user
def test_get_non_existing_user():
    with pytest.raises(UserNotFoundError):
        User.get_user("non_existing_uuid")

# Test to update an existing user
def test_update_user(sample_user):
    sample_user.add_user()
    sample_user.username = "updated_username"

    sample_user.update_user()

    updated_user = User.get_user(sample_user.uuid)
    assert updated_user.username == "updated_username"
    sample_user.delete_user()

# Test to delete an existing user
def test_delete_user(sample_user):
    sample_user.delete_user()

    with pytest.raises(UserNotFoundError):
        User.get_user(sample_user.uuid)
