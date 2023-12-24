import pytest
from models.user import User
from exceptions.user_errors import UserNotFoundError
from db import db

# Fixture to create a sample user for testing
@pytest.fixture
def sample_user(client):
    """Fixture to create a sample user for testing."""
    with client.application.app_context():
        return User(username="test_user")

# Test to create a user
def test_create_user(sample_user):
    """Test to create a user."""
    sample_user.add_user()
    assert sample_user.uuid is not None  # Ensure the user has a UUID after creation
    print(f"User created successfully. UUID: {sample_user.uuid}")
