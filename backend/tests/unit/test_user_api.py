import json
from flask_jwt_extended import create_access_token
from flask_testing import TestCase
from app import app
from models.user import User

class TestUserAPI(TestCase):
    def create_app(self):
        return app

    def setUp(self):
        self.user = User(username='test_user')
        self.user.add_user()

        self.jwt_token = create_access_token(identity=self.user.uuid, expires_delta=False)

    def test_get_user_endpoint(self):
        response = self.client.get('/api/user', headers={'Authorization': f'Bearer {self.jwt_token}'})
        self.assert200(response)
        data = json.loads(response.data.decode('utf-8'))
        self.assertIn('uuid', data)
        self.assertIn('username', data)
        self.assertIn('joined', data)
        self.assertIn('participants', data)

    def test_put_user_endpoint(self):
        new_username = 'new_test_user'
        response = self.client.put('/api/user', data=json.dumps({'username': new_username}),
                                   headers={'Authorization': f'Bearer {self.jwt_token}'}, content_type='application/json')
        self.assert200(response)
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(data['username'], new_username)

    def tearDown(self):
        # Eliminar el usuario creado durante la configuración
        self.user.delete_user()

if __name__ == '__main__':
    import unittest
    unittest.main()
