# Malker [React + Vite + Flask]

Try it: https://jam-productions.github.io/malker

Backend deployed in: https://jamproductions.pythonanywhere.com

It is also deployed in OnRender (very slow):
- Frontend: https://malker.onrender.com
- Backend: https://malker-backend.onrender.com

> [!TIP]
> We recommend using GitHub deployment instead of OnRender. OnRender [puts the server to sleep](https://docs.render.com/free#free-web-services) and has to wake up, which worsens the user experience.

## What is *malker*?

It is a web application to manage the social plan with your friends. It does not require login, it works using cookies and sharing the URL.

It uses React as frontend, Flask as backend and Firebase as database.

## How it works?

![diagram](/images/diagram.png)

## Requirements

Make sure you have the following software installed on your system before running the project:

- **Node.js and npm**: Required for managing and installing JavaScript packages.

  Install Node.js and npm by following the instructions on [the official Node.js website](https://nodejs.org/).

- **Python 3**: Required for the backend.

  Install Python 3 by following the instructions on [the official Python website](https://www.python.org/).

- **Vite**: Required for the frontend.

  Install Vite globally using npm:

```sh
npm install -g create-vite
```

> [!IMPORTANT]
> We have been using Python 3.10, Node 18 and Node 21. So if your current version does not work, we recommend installing one of these versions.

## Setup

You can setup both frontend and backend using Makefile:

```sh
make deps
```

> [!WARNING]
> Makefiles work for MacOS and Windows. You have to do the manual configuration for Linux.

### Setup frontend

Using Makefile:

```sh
make setup-frontend
```

Or manually:

```sh
npm install
```

### Set-up backend

Using Makefile:

```sh
make setup-backend
```

Or manually:

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

#### On MacOS

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

You have to download these files:

- [Firebase key](https://drive.google.com/file/d/1nPYWyNK5Ssrp9ks0aGVi7NDksAjxPrw_/view?usp=sharing)
- [.env file](https://drive.google.com/file/d/1E8fmx5yGL719LYT_6fa87_bCAJsCDi4F/view?usp=drive_link)

> [!NOTE]
> Only JAM-Productions members have access to these sensitive files.

Put them on `backend` directory.

## Run the app

### Run frontend

Using Makefile:

```sh
make frontend
```

Or manually:

```sh
npm run dev
```

### Run backend

Using Makefile:

```sh
make backend
```

Or manually:

```sh
npm run start-api
```

Or:

```sh
cd backend
python app.py
```

## Test

### Frontend

[TODO]

### Backend

Using Makefile:

```sh
make backend-test
```

Or manually:

```sh
cd backend
python -m pytest
```

## Linter

Run the following command:

```sh
npm run lint
```

## Format

Run the following command:

```sh
make fmt
```
