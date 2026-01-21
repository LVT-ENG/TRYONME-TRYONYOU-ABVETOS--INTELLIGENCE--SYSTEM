# 🚀 DEPLOYMENT GUIDE FOR LAFALLET

## Quick Deployment Checklist

### Before Deployment
- [ ] Test application locally (frontend + backend)
- [ ] Review product catalog data
- [ ] Verify all environment variables
- [ ] Test API endpoints
- [ ] Check multi-language support
- [ ] Review analytics/logging

### Deployment Steps
- [ ] Choose deployment platform
- [ ] Configure environment variables
- [ ] Deploy backend API
- [ ] Deploy frontend application
- [ ] Configure custom domain (optional)
- [ ] Set up SSL certificate
- [ ] Test production deployment
- [ ] Monitor initial usage

---

## 🎯 Recommended Deployment: Vercel + Railway

This is the simplest and fastest deployment option.

### Step 1: Deploy Backend (Railway)

1. **Sign up at** [railway.app](https://railway.app)

2. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your repository
   - Select the repository

3. **Configure Backend**:
   - Root directory: `codigo_backend`
   - Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

4. **Add Environment Variables**:
   ```
   APP_MODE=production
   PILOT_NAME=galeries_lafayette
   PILOT_CLIENT=lafallet
   CORS_ORIGINS=https://your-frontend-domain.vercel.app
   LOG_LEVEL=INFO
   ```

5. **Deploy**: Railway will automatically deploy
   - Note your backend URL (e.g., `https://tryonyou-backend.railway.app`)

### Step 2: Deploy Frontend (Vercel)

1. **Sign up at** [vercel.com](https://vercel.com)

2. **Import Project**:
   - Click "New Project"
   - Import from GitHub
   - Select your repository

3. **Configure Build Settings**:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Environment Variables**:
   ```
   VITE_API_URL=https://tryonyou-backend.railway.app
   ```

5. **Update Result.tsx**:
   Before deploying, update the API URL in `Result.tsx`:
   ```typescript
   const response = await fetch(`${import.meta.env.VITE_API_URL}/api/matching`, {
   ```

6. **Deploy**: Click "Deploy"
   - Your app will be live at `https://your-project.vercel.app`

---

## 🐳 Docker Deployment

### Backend Dockerfile

Create `codigo_backend/Dockerfile`:
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Build and Run:
```bash
# Backend
cd codigo_backend
docker build -t tryonyou-backend .
docker run -p 8000:8000 \
  -e APP_MODE=production \
  -e PILOT_NAME=galeries_lafayette \
  -e PILOT_CLIENT=lafallet \
  tryonyou-backend

# Frontend (build static files)
cd ..
npm run build
# Serve 'dist' folder with any static file server
```

---

## ☁️ AWS Deployment

### Backend (AWS Elastic Beanstalk)

1. **Install EB CLI**:
   ```bash
   pip install awsebcli
   ```

2. **Initialize**:
   ```bash
   cd codigo_backend
   eb init -p python-3.9 tryonyou-backend
   ```

3. **Create Environment**:
   ```bash
   eb create production-env
   ```

4. **Set Environment Variables**:
   ```bash
   eb setenv APP_MODE=production PILOT_CLIENT=lafallet
   ```

5. **Deploy**:
   ```bash
   eb deploy
   ```

### Frontend (AWS S3 + CloudFront)

1. **Build**:
   ```bash
   npm run build
   ```

2. **Create S3 Bucket**:
   ```bash
   aws s3 mb s3://tryonyou-frontend
   ```

3. **Upload Files**:
   ```bash
   aws s3 sync dist/ s3://tryonyou-frontend --delete
   ```

4. **Configure S3 for Static Website**:
   - Enable static website hosting
   - Set index.html as index document

5. **Create CloudFront Distribution**:
   - Origin: S3 bucket
   - Enable HTTPS
   - Set custom domain (optional)

---

## 🔧 Environment Configuration by Stage

### Development
```bash
APP_MODE=dev
PILOT_NAME=dev_test
PILOT_CLIENT=demo
CORS_ORIGINS=*
LOG_LEVEL=DEBUG
```

### Staging
```bash
APP_MODE=staging
PILOT_NAME=galeries_lafayette_staging
PILOT_CLIENT=lafallet
CORS_ORIGINS=https://staging.tryonyou.app
LOG_LEVEL=INFO
```

### Production
```bash
APP_MODE=production
PILOT_NAME=galeries_lafayette
PILOT_CLIENT=lafallet
CORS_ORIGINS=https://tryonyou.galerielafayette.com
LOG_LEVEL=WARNING
```

---

## 🔒 Security Considerations

### Before Going Live:

1. **API Security**:
   - [ ] Set specific CORS origins (not `*`)
   - [ ] Add rate limiting
   - [ ] Implement API authentication
   - [ ] Enable HTTPS only

2. **Data Protection**:
   - [ ] Don't log sensitive user data
   - [ ] Encrypt data in transit (HTTPS)
   - [ ] Regular security audits

3. **Environment Variables**:
   - [ ] Never commit `.env` files
   - [ ] Use secret management (AWS Secrets Manager, etc.)
   - [ ] Rotate secrets regularly

---

## 📊 Monitoring Setup

### Recommended Tools:

1. **Application Monitoring**:
   - Sentry (error tracking)
   - DataDog (performance)
   - New Relic (APM)

2. **Analytics**:
   - Google Analytics
   - Mixpanel
   - Custom dashboard (using `/api/metrics`)

3. **Uptime Monitoring**:
   - Pingdom
   - UptimeRobot
   - StatusCake

### Basic Health Check:
```bash
# Add to your monitoring
curl https://your-api.com/status
```

Expected response:
```json
{
  "ok": true,
  "service": "tryonyou",
  "version": "1.0.0-pilot"
}
```

---

## 🔄 CI/CD Pipeline (Optional)

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
        run: |
          npm i -g @railway/cli
          railway up

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
        run: |
          npm i -g vercel
          vercel --prod --token=$VERCEL_TOKEN
```

---

## 🧪 Post-Deployment Testing

### 1. Smoke Tests

```bash
# Health check
curl https://your-api.com/status

# Catalog check
curl https://your-api.com/api/catalog

# Test matching
curl -X POST https://your-api.com/api/matching \
  -H "Content-Type: application/json" \
  -d '{
    "height": 170,
    "weight": 70,
    "chest": 96,
    "waist": 86,
    "hips": 100,
    "shoulder_width": 42,
    "arm_length": 62,
    "leg_length": 84,
    "torso_length": 66,
    "size_preference": "M"
  }'
```

### 2. Frontend Tests

- [ ] Open homepage
- [ ] Navigate to pilot
- [ ] Enter measurements
- [ ] Submit form
- [ ] Verify results page
- [ ] Test all language switches
- [ ] Test responsive design (mobile/tablet/desktop)

### 3. Performance Tests

- [ ] Page load time < 3s
- [ ] API response time < 500ms
- [ ] Images load properly
- [ ] No console errors

---

## 📞 Support Checklist

Before handoff to Lafallet:

- [ ] Provide all credentials securely
- [ ] Share deployment URLs
- [ ] Document any custom configurations
- [ ] Set up monitoring alerts
- [ ] Create admin access (if needed)
- [ ] Provide maintenance schedule
- [ ] Set up backup procedures

---

## 🆘 Troubleshooting

### Common Issues:

**Issue**: CORS errors in browser
- **Solution**: Update `CORS_ORIGINS` in backend environment variables

**Issue**: API not connecting
- **Solution**: Check backend URL in frontend environment variables

**Issue**: 500 errors on backend
- **Solution**: Check logs, verify catalog file exists

**Issue**: Styling broken
- **Solution**: Ensure Tailwind CSS is properly built

---

## 📝 Deployment Success Criteria

✅ **Backend**:
- `/status` endpoint returns 200 OK
- `/api/catalog` returns product list
- `/api/matching` successfully processes requests
- No 500 errors in logs

✅ **Frontend**:
- Homepage loads in < 3 seconds
- Pilot form works correctly
- Results page displays properly
- All language options work
- Mobile responsive

✅ **Integration**:
- Frontend can call backend APIs
- CORS configured correctly
- SSL/HTTPS working
- Analytics logging events

---

## 🎯 Next Steps After Deployment

1. **Monitor** for 24-48 hours
2. **Collect** user feedback
3. **Analyze** metrics from `/api/metrics`
4. **Iterate** based on findings
5. **Plan** Phase 2 features

---

**Need Help?** Contact the development team.

**Deployment Status**: Ready for Production Pilot ✅
