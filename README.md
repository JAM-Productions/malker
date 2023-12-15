# Malker [React + Vite + Flask]

Try it: https://jam-productions.github.io/malker/

Backend deployed in: https://jamproductions.pythonanywhere.com/time

It is also deployed in OnRender (very slow):
- Frontend: https://malker.onrender.com
- Backend: https://malker-backend.onrender.com

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

Create the virtual environment

```sh
python -m venv venv
```

Activate the environment

#### On Windows
```sh
venv\Scripts\activate
```
#### On Unix or MacOS
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
### Firebase key + environment variables setup

You have to do download the these files:
- [Firebase key](https://drive.google.com/file/d/1nPYWyNK5Ssrp9ks0aGVi7NDksAjxPrw_/view?usp=sharing)
- [.env file](https://drive.google.com/file/d/1E8fmx5yGL719LYT_6fa87_bCAJsCDi4F/view?usp=drive_link)

Put them on `backend` directory.