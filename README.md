# Fullstack DevOps App on Render

## Project Structure
- `backend/`: Node.js API (`/health`, `/users`)
- `frontend/`: React app
- `.github/workflows/`: GitHub Actions CI/CD
- `.env`: Environment variables for Render

## Deploy Instructions
1. Push this project to GitHub
2. On https://render.com, create two Web Services:
   - One for `backend/`
   - One for `frontend/`
3. Use the `render.yaml` files to configure each service
4. Set environment variables (e.g., `DB_URL`)
5. Enable auto-deploy from GitHub

## Optional
- Add GitHub Actions deploy hook to `.github/workflows/deploy.yml`


---

## 🚀 CI/CD with GitHub Actions + Render Deploy Hooks

Create two deploy hooks from Render for `frontend` and `backend` and store them as GitHub secrets:

- `RENDER_FRONTEND_HOOK`
- `RENDER_BACKEND_HOOK`

GitHub Actions will trigger deployment automatically on push to `main`.

---

## ☁️ MongoDB Atlas Integration

Render does not host databases, so use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas):

1. Create a free cluster
2. Whitelist all IPs or your Render IP
3. Create a DB user and note the password
4. Use this format for your DB_URL:
   ```
   mongodb+srv://<user>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```
5. Add `DB_URL` as an env variable in Render dashboard

---

## 🔧 Optional Extensions

### 🔁 Redis Integration

- Add a Redis instance (e.g., with [Upstash](https://upstash.com/) or a cloud provider)
- Add `REDIS_URL` to env vars
- Use `ioredis` in Node.js

### 🌐 Nginx as Reverse Proxy

- Can be configured locally with Docker, or on a VPS
- Render does not allow custom Nginx, but it’s useful for local staging or Docker testing

### 📊 Monitoring (External)

Render doesn’t run Prometheus/Grafana, but you can:
- Use [Grafana Cloud](https://grafana.com/products/cloud/)
- Integrate with 3rd-party services like LogRocket or Datadog

## Deploy Instructions for Prometheus and Graphana to local
1. Pull this project from GitHub to local using Docker Desktop
2. Navigate to the monitoring folder under this repo
3. Using docker compose run below command to bring up Prometheus and Graphana
   - docker-compose -f docker-compose.monitor.yml up -d
5. Use http://localhost:9090 to access Prometheus server
6. Use http://localhost:3001 to access Graphana Dashboard
   - Username: admin, Password: admin
   - A prompt will appear to change the password.
   - Connect to add data source as prometheus using http://prometheus:9090
   - Create a custom dashboard or Import from Graphana labs ([https://grafana.com](url)) using build ID as shown below

| Dashboard Name                     | Import ID | Description                          |
| ---------------------------------- | --------- | ------------------------------------ |
| Node.js app metrics                |  11074    | Monitors requests, heap, uptime, CPU |
| React health check (blackbox/http) |    587    | If using Blackbox Exporter           |
| Docker Host Metrics                |    893    | General container stats              |

