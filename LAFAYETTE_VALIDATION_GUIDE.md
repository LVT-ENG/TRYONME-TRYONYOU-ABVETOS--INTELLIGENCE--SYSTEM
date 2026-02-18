# 🎯 Lafayette Pilot Deployment Validation Guide

## Quick Validation Checklist

Use this guide to validate your production deployment before sending to Galeries Lafayette.

---

## ✅ 1. Visual Identity Validation (The "Divineo" Traffic Light)

### What to Check:
Open your deployment URL (e.g., `https://tryonyou-xxxxx.vercel.app`) and verify:

#### ✨ Color Scheme
- **Background**: Dark anthracite (`#141619`) ✓
- **Accent Gold**: (`#C5A46D`) in buttons and highlights ✓
- **Overall Feel**: Premium, dark luxury aesthetic

#### 🏛️ Lafayette Banner
- **Top Banner**: Gold banner with "🦚 PILOTO LAFAYETTE ACTIVO" visible
- **Hero Image**: Galeries Lafayette gallery image as background
- **Not**: Generic stock photos or blue/white design

#### 🦚 Pau Mascot
- **Location**: Lower left corner of the hero section
- **Image**: Pau wearing a tuxedo (not generic peacock)
- **Visibility**: Clear and prominent with drop shadow

### ✅ PASS Criteria:
- Dark anthracite background
- Gold accents throughout
- Lafayette banner visible
- Pau with tuxedo in lower left corner
- Lafayette gallery hero image

### ❌ FAIL Indicators:
- White screen or 404 errors
- Generic blue/white design
- Stock photos instead of Lafayette imagery
- Missing Pau mascot
- Generic peacock instead of Pau in tuxedo

**If FAIL**: Assets were not properly copied to public folder before build. Run:
```bash
./scripts/supercommit.all.sh
```

---

## 🛡️ 2. Biometric Engine Status

### What to Check:
Look for the status indicator in the top-right corner of the page.

#### ✅ ONLINE Status (Green):
```
✅ BIOMETRIC ENGINE ONLINE
AI recommendations active. System ready for Lafayette pilot.
```

#### ⚠️ OFFLINE Status (Red):
```
⚠️ BIOMETRIC ENGINE OFFLINE
Missing VITE_GOOGLE_API_KEY in environment variables.
```

### How to Fix OFFLINE Status:

1. **Go to Vercel Dashboard**:
   - Navigate to your project
   - Click "Settings" → "Environment Variables"

2. **Add the API Key**:
   - Key: `VITE_GOOGLE_API_KEY`
   - Value: `your_google_api_key_here`
   - Environments: ✓ Production, ✓ Preview, ✓ Development
   
   **Get your API key at:** https://makersuite.google.com/app/apikey

3. **Redeploy**:
   - After saving, go to "Deployments"
   - Click "⋮" on the latest deployment
   - Select "Redeploy"

### Camera Permission Issues:
If the status shows ONLINE but the camera doesn't work:
- This is a **browser security feature**, not a deployment issue
- Users must grant camera permission when prompted
- HTTPS is required for camera access (Vercel provides this automatically)

---

## 🌐 3. Domain Configuration

### Current State:
- ✓ Deployment URL: `https://tryonyou-xxxxx.vercel.app` (functional)
- ⚠️ Custom Domain: `tryonyou.app` (requires setup)

### Why Custom Domain Matters:
The Vercel URL (`...vercel.app`) is functional but not professional for client presentation. Lafayette expects a clean, branded URL.

### How to Configure Custom Domain:

#### Step 1: In Vercel Dashboard
1. Go to your project settings
2. Navigate to "Domains"
3. Click "Add Domain"
4. Enter: `tryonyou.app`
5. Click "Add"

Vercel will provide DNS configuration instructions.

#### Step 2: In Porkbun Dashboard
1. Go to https://porkbun.com/account/domainsSpeedy
2. Select domain: `tryonyou.app`
3. Click "DNS Records"
4. Add the following records:

**A Record:**
- Type: `A`
- Host: `@`
- Answer: `76.76.21.21`
- TTL: `600`

**CNAME Record:**
- Type: `CNAME`
- Host: `www`
- Answer: `cname.vercel-dns.com`
- TTL: `600`

5. Save changes

#### Step 3: Verify
- DNS propagation can take 5-60 minutes
- Check status in Vercel dashboard
- Once verified, `https://tryonyou.app` will load your deployment

---

## 📋 Pre-Client Checklist

Before sending to Galeries Lafayette, confirm:

- [ ] Dark anthracite background (#141619) visible
- [ ] Gold accents (#C5A46D) in buttons and highlights
- [ ] "PILOTO LAFAYETTE ACTIVO" banner visible at top
- [ ] Lafayette gallery image as hero background
- [ ] Pau with tuxedo in lower left corner
- [ ] Biometric engine status showing ONLINE (green)
- [ ] Custom domain `tryonyou.app` configured and working
- [ ] All images and assets loading properly
- [ ] No console errors in browser developer tools
- [ ] Mobile responsive design working
- [ ] Camera permission prompt appears on /demo page

---

## 🚨 Troubleshooting

### Problem: White Screen or 404
**Cause**: Assets not found  
**Fix**: Verify `/public/assets/` contains:
- `ui/lafayette_hero_banner.png`
- `branding/pau_tuxedo_agent.png`
- `catalog/red_dress_minimal.png`

If missing, copy from source and redeploy.

### Problem: Biometric Engine Always OFFLINE
**Cause**: Environment variable not set  
**Fix**: Double-check in Vercel → Settings → Environment Variables that `VITE_GOOGLE_API_KEY` exists for **Production** environment (not just Preview).

### Problem: Build Fails
**Cause**: TypeScript or dependency errors  
**Fix**:
```bash
npm install
npm run build
```
Check console output for specific errors.

### Problem: Domain Not Working
**Cause**: DNS not propagated or misconfigured  
**Fix**:
- Wait 30-60 minutes for DNS propagation
- Verify DNS records in Porkbun match Vercel instructions exactly
- Check domain status in Vercel dashboard

---

## 📊 Success Metrics

### Visual Validation
- ✅ Pau with tuxedo visible
- ✅ Dark luxury aesthetic
- ✅ Lafayette branding prominent

### Technical Validation
- ✅ Build succeeds without errors
- ✅ All assets load in production
- ✅ Biometric engine ONLINE status
- ✅ Environment variables configured

### Business Validation
- ✅ Professional domain active (`tryonyou.app`)
- ✅ No console errors
- ✅ Mobile responsive
- ✅ Ready for client demonstration

---

## 🎉 You Have the Sale When:

**"Si ves a Pau con esmoquin y el fondo oscuro en ese enlace, ya tienes la venta."**

Translation: "If you see Pau with tuxedo and the dark background at that link, you already have the sale."

This means all three critical identity points are validated:
1. ✅ Divineo visual identity (dark + gold + Lafayette)
2. ✅ Biometric engine operational
3. ✅ Professional domain configured

**You're ready for Lafayette! 🦚**
