"""
Module for Firebase database initialization.
"""

import firebase_admin
from firebase_admin import credentials, firestore

# Use the service account key file to initialize the Firebase Admin SDK
cred = credentials.Certificate("malker-jam-firebase-adminsdk.json")
default_app = firebase_admin.initialize_app(cred)
db = firestore.client()
