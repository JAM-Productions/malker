import pytest
from models.user import User
from unittest.mock import patch, MagicMock
from exceptions.user_errors import UserNotFoundError, UserCreationError, UserDBAddingError
import datetime

# Fixture to create a sample user for testing
@pytest.fixture
def sample_user():
    return User(username="test_user")

def test_new_user(sample_user):
    assert sample_user.username == "test_user"
    assert sample_user.joined is not None

def test_user_json(sample_user):
    expected = {
        'username': 'test_user',
        'uuid': None,
        'joined': sample_user.joined.strftime("%d/%m/%Y")
    }
    assert expected == sample_user.json()

@patch('models.user.db')
def test_add_user(mock_db, sample_user):
    # Mock Firestore add method
    mock_add = MagicMock(return_value=('update_time', MagicMock(id='123456')))
    mock_db.collection.return_value.add = mock_add

    sample_user.add_user()

    mock_db.collection.assert_called_once_with(u'users')
    mock_add.assert_called_once_with({u'username': sample_user.username, u'joined': sample_user.joined})

    assert sample_user.uuid == '123456'

'''
@patch('models.user.db')
def test_update_user(mock_db, sample_user):
    # Mock Firestore set method
    mock_set = MagicMock(return_value=None)
    mock_db.collection.return_value.document.return_value.set = mock_set

    sample_user.uuid = '123456'
    sample_user.update_user()

    # Check that set method was called with the correct arguments
    mock_db.collection.assert_called_once_with(u'users')
    mock_db.collection.return_value.document.assert_called_once_with('123456')
    mock_set.assert_called_once_with({u'username': sample_user.username}, merge=True)

    assert sample_user.uuid == '123456'
'''

@patch('models.user.db')
def test_get_user(mock_db, sample_user):
    # Mock Firestore get method
    mock_get = MagicMock(return_value=MagicMock(to_dict=lambda: {'username': 'test_user', 'joined': '01/01/2023'}))
    mock_db.collection.return_value.document.return_value.get = mock_get

    user = User.get_user(uuid='123456')

    # Check that get method was called with the correct arguments
    mock_db.collection.assert_called_once_with(u'users')
    mock_db.collection.return_value.document.assert_called_once_with('123456')
    mock_get.assert_called_once()

    assert user.username == 'test_user'
    assert user.uuid == '123456'
    assert isinstance(user.joined, datetime.datetime)

@patch('models.user.db')
def test_get_user_not_found(mock_db, sample_user):
    # Mock Firestore get method for a non-existent user
    mock_get = MagicMock(return_value=MagicMock(to_dict=lambda: None))
    mock_db.collection.return_value.document.return_value.get = mock_get

    with pytest.raises(UserNotFoundError):
        User.get_user(uuid='nonexistent_uuid')

@patch('models.user.db')
def test_delete_user(mock_db, sample_user):
    # Mock Firestore delete method
    mock_delete = MagicMock(return_value=None)
    mock_db.collection.return_value.document.return_value.delete = mock_delete

    sample_user.uuid = '123456'
    sample_user.delete_user()

    # Check that delete method was called with the correct arguments
    mock_db.collection.assert_called_once_with(u'users')
    mock_db.collection.return_value.document.assert_called_once_with('123456')
    mock_delete.assert_called_once()

def test_get_user(client):
    res = client.get('/')
    assert res.status_code == 200
    expected = {'message': 'Hello from Malker!!'}
    assert expected == res.get_json()
