"""
Module containing tests for the Flask app.
"""

import json


def test_index(client):
    """
    Test for the main route that checks if the response is as expected.
    """
    res = client.get('/')
    assert res.status_code == 200
    expected = {'message': 'Hello from Malker!!'}
    assert expected == json.loads(res.get_data(as_text=True))
