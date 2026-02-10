# Multi-stage Dockerfile for NYU Bobcat Search
# Stage 1: Build the React frontend
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy package files and install dependencies
COPY frontend/package*.json ./
RUN npm ci

# Copy frontend source and build
COPY frontend/ ./
RUN npm run build

# Stage 2: Setup Python backend and serve the application
FROM python:3.13-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install uv for Python package management
RUN curl -LsSf https://astral.sh/uv/install.sh | sh
ENV PATH="/root/.cargo/bin:$PATH"

# Copy backend files
COPY backend/requirements.txt ./backend/
COPY backend/pyproject.toml ./backend/

# Install Python dependencies
WORKDIR /app/backend
RUN uv pip install --system -r requirements.txt

# Copy the rest of the backend code
COPY backend/ ./

# Copy the built frontend from the previous stage
COPY --from=frontend-builder /app/frontend/build /app/frontend/build

# Create directory for database if it doesn't exist
RUN mkdir -p /app/backend/data

# Expose port
EXPOSE 8000

# Set working directory to backend
WORKDIR /app/backend

# Command to run the FastAPI application
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
