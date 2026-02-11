# Video Upload Server

Node.js server for handling video uploads for the content hub application.

## Features

- Video file uploads with progress tracking
- File size limit: 500MB per video
- CORS enabled for browser uploads
- Static file serving for uploaded videos
- RESTful API endpoints

## Installation

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

## API Endpoints

### Upload Video

- **POST** `/upload`
- Body: FormData with `video` file
- Response:

```json
{
  "success": true,
  "data": {
    "filename": "video-1234567890.mp4",
    "url": "http://localhost:3000/uploads/video-1234567890.mp4",
    "size": 12345678
  }
}
```

### List Videos

- **GET** `/videos`
- Returns list of all uploaded videos

### Access Video

- **GET** `/uploads/:filename`
- Serves the video file

### Delete Video

- **DELETE** `/uploads/:filename`
- Deletes a video file

## Free Hosting Options

### 1. Render.com (Recommended)

- Free tier with 750 hours/month
- Automatic HTTPS
- **Note:** Free tier uses ephemeral storage (files deleted on restart)
- Deploy: Connect your GitHub repo

### 2. Railway.app

- $5 free credit per month
- Persistent storage available
- Deploy: `railway up`

### 3. Fly.io

- Free tier: 3 shared-cpu-1x VMs
- Persistent volumes available (3GB free)
- Deploy: `flyctl launch`

### 4. Glitch.com

- Always-on free projects available
- Limited storage
- Deploy: Import from GitHub

## Important Notes for Free Hosting

⚠️ **Most free hosting services use ephemeral storage** - uploaded files may be deleted when the server restarts.

### Solutions:

1. **Use Fly.io with persistent volumes** (recommended for free hosting with storage)
2. **Upgrade to paid hosting** for reliable persistent storage
3. **Use cloud storage** (AWS S3, Cloudflare R2) instead of server storage

## Deploying to Render.com

1. Create a GitHub repository
2. Push your code to GitHub
3. Go to [render.com](https://render.com)
4. Click "New +" → "Web Service"
5. Connect your GitHub repository
6. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
7. Click "Create Web Service"

Your server URL will be: `https://your-app-name.onrender.com`

## Update Frontend

In `admin.html`, change the upload server URL to your deployed server:

```javascript
const SERVER_URL = "https://your-app-name.onrender.com";
```

## Local Testing

1. Start server: `npm start`
2. Server runs on: `http://localhost:3000`
3. Test upload: Use the admin panel or:

```bash
curl -X POST -F "video=@test.mp4" http://localhost:3000/upload
```
