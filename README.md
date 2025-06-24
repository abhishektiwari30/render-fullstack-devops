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
