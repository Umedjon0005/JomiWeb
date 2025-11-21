# How to Run - Simple Explanation

## ✅ Simple Answer: Just Run ONE Command!

You **DON'T need to open or run each service separately**. Docker Compose does everything for you!

## One Command to Run Everything:

```bash
cd ~/JomiWeb
docker compose up -d
```

That's it! This **ONE command** will:
1. ✅ Build all 3 services (backend, frontend, admin) automatically
2. ✅ Start all 3 services automatically
3. ✅ Connect them together automatically
4. ✅ Make them all work together automatically

## What Happens Automatically:

When you run `docker compose up -d`:

1. **Backend** starts first (because frontend/admin depend on it)
   - Runs on port 5000
   - Connects to your database
   - Runs migrations automatically

2. **Frontend** starts after backend is ready
   - Runs on port 8834
   - Automatically connects to backend

3. **Admin** starts after backend is ready
   - Runs on port 8833
   - Automatically connects to backend

## You DON'T Need To:

❌ Open backend folder and run docker separately  
❌ Open frontend folder and run docker separately  
❌ Open admin folder and run docker separately  
❌ Manually connect them together  
❌ Configure networking manually  

## You Just Need To:

✅ Run `docker compose up -d` from the `JomiWeb` folder  
✅ That's it! Everything works automatically  

## Full Workflow on Server:

```bash
# 1. Go to project folder
cd ~/JomiWeb

# 2. Build everything (first time only, or when code changes)
docker compose build

# 3. Start everything
docker compose up -d

# 4. Check if everything is running
docker compose ps

# You should see all 3 services running:
# - school_backend
# - school_frontend  
# - school_admin
```

## Access Your Services:

After running `docker compose up -d`, open your browser:

- **Website**: `http://your-server-ip:8834`
- **Admin Panel**: `http://your-server-ip:8833`
- **API**: `http://your-server-ip:5000`

## Stop Everything:

```bash
docker compose down
```

This stops all 3 services at once.

## Restart Everything:

```bash
docker compose restart
```

This restarts all 3 services at once.

## Summary:

**One command = Everything runs together automatically!**

You don't need to do anything special for each service. Docker Compose handles it all! 🎉

