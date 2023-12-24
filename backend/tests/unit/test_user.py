import pytest
from models.user import User
from exceptions.user_errors import UserNotFoundError
from db import db

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

def test_user_json(sample_user):
    expected = {
        'username': 'test_user',
        'uuid': sample_user.uuid,
        'joined': sample_user.joined.strftime("%d/%m/%Y")
    }
    assert expected == sample_user.json()
