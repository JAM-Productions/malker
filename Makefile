# Makefile for Vite/React frontend and Flask backend

.PHONY: frontend setup-frontend backend setup-backend backend-test deps

# Detect the operating system
ifeq ($(OS),Windows_NT)
    ACTIVATE = venv\Scripts\activate
else
    ACTIVATE = venv/bin/activate
endif

frontend:
	@echo "Running frontend..."
	npm install
	npm run dev

setup-frontend:
	@echo "Setting up frontend..."
	npm install

backend:
	@echo "Running backend..."
	[ -d backend/venv ] || $(MAKE) setup-backend
	cd backend && . $(ACTIVATE) && python app.py

backend-test:
	cd backend && . $(ACTIVATE) && python -m pytest

setup-backend:
	@echo "Setting up backend..."
	[ -d backend/venv ] || $(MAKE) create-venv
	cd backend && . $(ACTIVATE) && pip install -r requirements.txt

create-venv:
	@echo "Creating virtual environment..."
	cd backend && python3 -m venv venv

deps: setup-frontend setup-backend

# Add other targets or commands as needed
