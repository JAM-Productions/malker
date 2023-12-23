import json
from flask_testing import TestCase
from app import app
from models.user import User

class TestLogin(TestCase):
    def create_app(self):
        return app

    def test_login_endpoint(self):
        response = self.client.post('/api/login', data=json.dumps({'username': 'test_user'}), content_type='application/json')
        self.assert200(response)
        data = json.loads(response.data.decode('utf-8'))
        self.assertIn('uuid', data)
        self.assertIn('username', data)
        self.assertIn('joined', data)

        self.user_data = data

if __name__ == '__main__':
    import unittest
    unittest.main()
