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

### Firebase key + other enviroment variables setup
Download the [Firebase key](https://drive.google.com/file/d/1nPYWyNK5Ssrp9ks0aGVi7NDksAjxPrw_/view?usp=sharing)
Download the [.env file](https://drive.google.com/file/d/1E8fmx5yGL719LYT_6fa87_bCAJsCDi4F/view?usp=drive_link)