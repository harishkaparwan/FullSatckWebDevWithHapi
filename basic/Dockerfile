# Stage 1: Build React frontend
FROM node:18-alpine AS frontend-build

WORKDIR /usr/local/hck/frontend

# Install frontend dependencies and build the React app
COPY frontend/package.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build

# Stage 2: Set up Node.js backend
FROM node:18-alpine AS backend

WORKDIR /usr/local/lowes/backend

# Install backend dependencies
COPY backend/package.json ./
RUN npm install

# Copy backend code
COPY backend/ ./

# Copy the built React frontend from the frontend-build stage
COPY --from=frontend-build /usr/local/hck/frontend/build /usr/local/lowes/backend/public

# Expose the port the backend will run on
EXPOSE 3000

# Stage 3: Pull Python image and set up the Python environment
FROM python:3.10-slim AS python-env

WORKDIR /usr/local/lowes

# Copy the Python script into the container
COPY backend/requirements.txt /usr/local/lowes/requirements.txt

# Install any Python dependencies if needed
RUN pip install -r requirements.txt

# Final Stage: Combine backend and Python environments
FROM node:18-alpine

WORKDIR /usr/local/lowes/backend

# Copy the backend and frontend setup from the backend stage
COPY --from=backend /usr/local/lowes/backend /usr/local/lowes/backend

# Copy the Python script from the python-env stage
#COPY --from=python-env /usr/local/lowes/script.py /usr/local/lowes/backend/script.py

# Expose the port the backend will run on
EXPOSE 3000

# Start the Node.js server and the Python script
CMD ["sh", "-c", "node server.js"]