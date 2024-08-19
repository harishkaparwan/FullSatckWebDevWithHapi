# Stage 1: Build React frontend
FROM node:18-alpine AS frontend-build

WORKDIR /app/frontend

# Install frontend dependencies and build the React app
COPY frontend/package.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build

# Stage 2: Set up Node.js backend
FROM node:18-alpine AS backend

WORKDIR /app/backend

# Install backend dependencies
COPY backend/package.json ./
RUN npm install

# Copy backend code
COPY backend/ ./

# Copy the built React frontend from the frontend-build stage
COPY --from=frontend-build /app/frontend/build /app/backend/public

# Expose the port the backend will run on
EXPOSE 3000

# Stage 3: Pull Python image and set up the Python environment
FROM python:3.10-slim AS python-env

WORKDIR /app

# Copy the Python script into the container
#COPY backend/requirements.txt /app/requirements.txt

# Install any Python dependencies if needed
COPY backend/requirements.txt /app/
RUN pip install -r requirements.txt

# Final Stage: Combine backend and Python environments
FROM node:18-alpine

WORKDIR /app/backend

# Copy the backend and frontend setup from the backend stage
COPY --from=backend /app/backend /app/backend

# Copy the Python script from the python-env stage
#COPY --from=python-env /app/script.py /app/backend/script.py

# Expose the port the backend will run on
EXPOSE 3000

# Start the Node.js server and the Python script
CMD ["sh", "-c", "node server.js"]
