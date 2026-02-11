# Quick Start Guide

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Test Locally

```bash
npm start
```

Server will run on `http://localhost:3000`

## Step 3: Deploy to Free Hosting

### Option A: Render.com (Recommended - Easy Setup)

1. **Create a GitHub Repository**
   - Go to [github.com](https://github.com) and create a new repository
   - Push your code:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Deploy on Render**
   - Go to [render.com](https://render.com) and sign up
   - Click "New +" → "Web Service"
   - Connect your GitHub account
   - Select your repository
   - Configure:
     - **Name:** content-hub-server (or any name)
     - **Environment:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Plan:** Free
   - Click "Create Web Service"

3. **⚠️ IMPORTANT: Free Tier Limitation**
   - Render's free tier uses **ephemeral storage**
   - Uploaded videos will be **deleted when the server restarts** (every ~15 minutes of inactivity)
4. **Solution for Persistent Storage:**
   - Upgrade to paid plan ($7/month) for persistent disk, OR
   - Use Fly.io with persistent volumes (see Option B)

### Option B: Fly.io (Has Free Persistent Storage!)

1. **Install Fly CLI**

   ```bash
   # Windows (PowerShell)
   iwr https://fly.io/install.ps1 -useb | iex

   # After install, restart terminal
   ```

2. **Login and Deploy**
   ```bash
   fly auth login
   fly launch
   ```
3. **Add Persistent Volume** (3GB free!)

   ```bash
   fly volumes create uploads --size 3 --region ord
   ```

4. **Update fly.toml** - add this section:

   ```toml
   [mounts]
     source = "uploads"
     destination = "/app/uploads"
   ```

5. **Deploy:**
   ```bash
   fly deploy
   ```

Your server URL: `https://your-app-name.fly.dev`

## Step 4: Update Frontend

In `admin.html`, change line ~215:

```javascript
const SERVER_URL = "https://your-app-name.onrender.com"; // or .fly.dev
```

## Testing Your Server

### Test upload locally:

```bash
# Start server
npm start

# In another terminal, test upload
curl -X POST -F "video=@test-video.mp4" http://localhost:3000/upload
```

### After deployment:

Replace `localhost:3000` with your deployed URL.

## Important Notes

### Free Hosting Comparison:

| Service     | Storage   | Persistent        | Sleep Policy      | Best For       |
| ----------- | --------- | ----------------- | ----------------- | -------------- |
| **Render**  | Ephemeral | ❌ No             | After 15 min idle | Testing only   |
| **Fly.io**  | 3GB free  | ✅ Yes            | Never sleeps      | **Production** |
| **Railway** | Ephemeral | ❌ No (paid only) | After 5 min       | Testing        |

### Recommendation:

- **For testing:** Use Render (easiest setup)
- **For production:** Use Fly.io with persistent volumes (free + persistent storage)

## Need Help?

### Server not starting?

- Check logs in Render/Fly.io dashboard
- Verify `package.json` has correct dependencies

### CORS errors?

- Update `SERVER_URL` in admin.html
- Make sure server allows your frontend domain in CORS

### Videos not playing?

- Check the video URL in browser
- Verify CORS headers allow video playback
- Make sure video format is supported (mp4, webm)

## What's Next?

1. Deploy server to Fly.io (for persistent storage)
2. Update `SERVER_URL` in admin.html
3. Re-deploy your Netlify frontend
4. Test video upload from admin panel
5. Verify video plays correctly on user page
