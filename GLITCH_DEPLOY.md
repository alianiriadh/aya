# Deploy to Railway.app (Best Free Alternative)

## Why Railway?
✅ $5 free credit per month (enough for 500+ hours)
✅ Persistent storage with volumes
✅ No credit card needed initially
✅ Very easy GitHub integration
✅ Automatic HTTPS
✅ Never sleeps

## Steps:

### 1. Create Railway Account
- Go to [railway.app](https://railway.app)
- Click "Start a New Project"
- Sign in with GitHub

### 2. Deploy from GitHub
- Click "Deploy from GitHub repo"
- Select your repository: `alianiriadh/aya`
- Railway will auto-detect Node.js and deploy

### 3. Add Persistent Storage (Important!)
- Click on your project
- Go to "Variables" tab
- Railway automatically handles file persistence in deployments

### 4. Get Your URL
- Click "Settings" → "Domains"
- Click "Generate Domain"
- You'll get: `https://your-app.up.railway.app`

### 5. Done!
Your server is live at the generated URL.

## Important Notes:

**Free Tier:**
- $5 credit per month
- Approximately 500 hours of runtime
- Persistent storage included
- No sleep - always online

**Storage:**
- Files in deployment are persistent
- Good for multiple videos

**Advantages:**
- ✅ Very easy setup (3 clicks)
- ✅ Files are persistent
- ✅ Never sleeps
- ✅ Professional grade

---

## Alternative: Cyclic.sh

If Railway doesn't work:

### 1. Go to [cyclic.sh](https://app.cyclic.sh)
- Sign in with GitHub
- Click "Link Your Own" → Select your repo
- Auto-deploys in 30 seconds

### 2. Storage
- Uses AWS S3 for storage (persistent)
- Files never deleted
- Your URL: `https://your-app.cyclic.app`

**Cyclic Free Tier:**
- ✅ Unlimited bandwidth
- ✅ 1GB persistent storage
- ✅ Never sleeps
- ✅ 100% free forever

---

## Alternative: Replit

If you want the simplest option:

### 1. Go to [replit.com](https://replit.com)
- Sign in with GitHub
- Click "Import from GitHub"
- Paste: `https://github.com/alianiriadh/aya`

### 2. Run
- Click "Run" button
- Get your URL: `https://your-repl.username.repl.co`

**Replit Free Tier:**
- ✅ Persistent storage
- ⚠️ Sleeps after inactivity (but keeps files)
- ✅ Very easy to use

---

## Which to Choose?

| Platform | Setup | Storage | Sleep | Best For |
|----------|-------|---------|-------|----------|
| **Railway** | ⭐⭐⭐ | Persistent | Never | **Best Choice** |
| **Cyclic** | ⭐⭐⭐ | Persistent S3 | Never | Production |
| **Replit** | ⭐⭐⭐ | Persistent | After 1hr | Quick Testing |
| Render | ⭐⭐ | Ephemeral | After 15min | Not Recommended |

**Recommendation:** Use **Railway.app** - it's free, never sleeps, and has persistent storage!

## After Deployment

Update `admin.html` with your deployed URL:
```javascript
const SERVER_URL = 'https://your-app.up.railway.app';
```

Or if hosting everything on the same server (recommended), leave it empty:
```javascript
const SERVER_URL = '';
```
