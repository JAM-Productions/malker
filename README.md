# Malker [React + Vite + Flask]

## Run the app

### Run frontend

```sh
npm run dev
```

### Run backend

```sh
npm run start-api
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
pip install requirements.txt
```
### Backup packages
```sh
pip freeze > requirements.txt
```