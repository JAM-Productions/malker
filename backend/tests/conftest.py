# pylint: disable = import-error
# pylint: disable = redefined-outer-name
"""
Module containing fixtures for testing.
"""

import pytest
from app import app as flask_app

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
    return app.test_client(use_cookies=True)
