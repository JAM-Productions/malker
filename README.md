# Malker [React + Vite + Flask]

Try it: https://malker.onrender.com

Backend deployed in: https://malker-backend.onrender.com

## What is *malker*?

It is a web application to manage the social plan with your friends. It does not require login, it works using cookies and sharing the URL. 

It uses React as frontend, Flask as backend and Firebase as database.

## Run the app

### Run frontend

```sh
npm run dev
```

### Run backend

```sh
npm run start-api
```

Or:

```sh
cd backend
python app.py
```


## Setup 

### Setup frontend

```sh
npm install
```

### Set-up backend

Navigate to Flask directory

```sh
cd backend
```

Create virtual environment

```sh
python -m venv venv
```

Activate environment

#### En Windows
```sh
venv\Scripts\activate
```
#### En Unix o MacOS
```sh
source venv/bin/activate
```
Install pip packages: 
```sh
pip install -r requirements.txt
```
### Backup packages
```sh
pip freeze > requirements.txt
```

### Key setup

Download the [key](https://drive.google.com/file/d/1nPYWyNK5Ssrp9ks0aGVi7NDksAjxPrw_/view?usp=sharing) and put it into the `backend` directory.
