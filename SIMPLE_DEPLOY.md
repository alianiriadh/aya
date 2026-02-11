# Simplest Deployment - Render.com

## ⚠️ Important Limitation

Render free tier has ephemeral storage - uploaded videos will be deleted when:

- Server restarts (every ~15 min of inactivity)
- You redeploy

**For testing only!** But it's the easiest to set up.

## Steps (2 Minutes):

### 1. Go to Render

- Visit [render.com](https://render.com)
- Click "Get Started for Free"
- Sign up with GitHub

### 2. Deploy Your App

1. Click "New +" button (top right)
2. Select "Web Service"
3. Click "Connect Account" to connect GitHub
4. Find and select your repo: `aya`
5. Configure:
   - **Name:** `content-hub` (or any name)
   - **Region:** Choose closest to you
   - **Branch:** `master`
   - **Root Directory:** (leave blank)
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free`
6. Click "Create Web Service"

### 3. Wait for Deploy

- First deploy takes 2-3 minutes
- Watch the logs until you see "Deploy live"
- Your URL: `https://content-hub.onrender.com` (or your chosen name)

### 4. Test Your App

- Click the URL in Render dashboard
- You should see your index.html page
- Test uploading a video

## That's It!

Your app is now live. Videos will work but will be deleted on restart.

---

## For Permanent Storage: Use Cloudinary (Recommended)

Instead of saving videos on the server, use **Cloudinary** (free tier):

- 25GB storage free
- 25GB bandwidth/month free
- Videos stay forever

Want me to update your code to use Cloudinary instead?

---

## OR: Quick Fix - Use External Video URLs

Simplest solution: Don't upload videos at all!

- Just paste YouTube/Vimeo URLs
- Or use free video hosting like **Streamja.com** or **Imgur** to host videos
- Paste the URLs in admin panel

This way you don't need persistent storage!
