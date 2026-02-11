# Dev-style single container running FastAPI dev + React dev server
FROM ghcr.io/astral-sh/uv:python3.12-bookworm-slim

WORKDIR /app

# Install Node.js and npm
RUN apt-get update \
    && apt-get install -y --no-install-recommends nodejs npm \
    && rm -rf /var/lib/apt/lists/*

# Python dependencies
# We keep these build steps to cache dependencies in the image layers
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen

# Frontend dependencies
# We run install here to cache node_modules in the image...
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

# Copy App source
COPY . .

EXPOSE 8000 3000

# MODIFIED CMD:
# 1. Groups the frontend commands in parentheses (cd -> install -> start)
# 2. Groups the backend commands in parentheses (cd -> uv run)
# 3. Uses '&' to put the first group in the background so both run at once
# 4. Added --host 0.0.0.0 to fastapi so it is accessible outside the container
CMD ["sh", "-c", "(cd frontend && npm install && npm start) & (cd backend && uv run fastapi dev app.py --host 0.0.0.0 --port 8000)"]