import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function takeSnapshots() {
  console.log('📸 Starting screenshot capture...');
  
  const browser = await chromium.launch({
    headless: true
  });

  try {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });
    
    const page = await context.newPage();
    
    // Determine the URL to screenshot
    const url = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';
    
    console.log(`📍 Navigating to: ${url}`);
    
    // For local builds, we'll use the dist folder
    const distPath = join(__dirname, '..', 'dist', 'index.html');
    const fileUrl = `file://${distPath}`;
    
    if (existsSync(distPath)) {
      console.log(`📁 Using local build: ${fileUrl}`);
      await page.goto(fileUrl, { waitUntil: 'networkidle' });
    } else {
      console.log(`⚠️ No local build found, skipping screenshots`);
      await browser.close();
      return;
    }
    
    // Create screenshots directory
    const screenshotsDir = join(__dirname, '..', 'screenshots');
    if (!existsSync(screenshotsDir)) {
      mkdirSync(screenshotsDir, { recursive: true });
    }
    
    // Take desktop screenshot
    console.log('📸 Taking desktop screenshot...');
    await page.screenshot({
      path: join(screenshotsDir, 'desktop.png'),
      fullPage: true
    });
    
    // Take mobile screenshot
    console.log('📱 Taking mobile screenshot...');
    await page.setViewportSize({ width: 375, height: 812 });
    await page.screenshot({
      path: join(screenshotsDir, 'mobile.png'),
      fullPage: true
    });
    
    console.log('✅ Screenshots captured successfully');
    
  } catch (error) {
    console.error('❌ Error taking screenshots:', error.message);
    // Don't throw error - we want the workflow to continue even if screenshots fail
  } finally {
    await browser.close();
  }
}

takeSnapshots().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
