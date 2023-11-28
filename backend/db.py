import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("malker-jam-firebase-adminsdk.json")
default_app = firebase_admin.initialize_app(cred)
db = firestore.client()