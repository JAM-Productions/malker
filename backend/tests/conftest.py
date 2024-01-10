# pylint: disable = import-error
# pylint: disable = redefined-outer-name
"""
Module containing fixtures for testing.
"""

import pytest
from app import app as flask_app
from models.user import User
from models.plan import Plan
from datetime import datetime

@pytest.fixture
def app():
    """
    Fixture to provide the Flask app instance for testing.
    """
    yield flask_app

@pytest.fixture
def client(app):
    """
    Fixture to provide a test client for the Flask app.
    """
    return app.test_client()

# Fixture to create a sample user for testing
@pytest.fixture
def sample_user():
    return User(username="test_user")

# Fixture to create a sample plan for testing
@pytest.fixture
def sample_plan(sample_user):
    return Plan(name="Test Plan",
                description="A test plan",
                date=datetime(2023, 12, 24),
                location="Test Location",
                admin=sample_user,
                participants=[sample_user],
                uid="test_plan_id")
