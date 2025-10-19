/**
 * TRYONYOU Screenshot Generator
 * Captures screenshots of the deployed application for documentation and monitoring
 */

import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function captureScreenshots() {
  console.log('🚀 Starting screenshot capture...');
  
  const browser = await chromium.launch({
    headless: true
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();

  // Create screenshots directory if it doesn't exist
  const screenshotsDir = join(__dirname, '..', 'screenshots');
  if (!existsSync(screenshotsDir)) {
    mkdirSync(screenshotsDir, { recursive: true });
  }

  try {
    // Capture local build preview
    const localUrl = process.env.PREVIEW_URL || 'http://localhost:4173';
    
    console.log(`📸 Capturing screenshot from ${localUrl}`);
    
    await page.goto(localUrl, { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });

    // Wait a bit for animations to settle
    await page.waitForTimeout(2000);

    // Take full page screenshot
    await page.screenshot({ 
      path: join(screenshotsDir, 'homepage-desktop.png'),
      fullPage: true 
    });

    console.log('✅ Desktop screenshot saved');

    // Mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(1000);

    await page.screenshot({ 
      path: join(screenshotsDir, 'homepage-mobile.png'),
      fullPage: true 
    });

    console.log('✅ Mobile screenshot saved');

  } catch (error) {
    console.error('❌ Screenshot capture failed:', error.message);
    // Don't throw - we want the workflow to continue even if screenshots fail
  } finally {
    await browser.close();
    console.log('🏁 Screenshot capture complete');
  }
}

captureScreenshots().catch(err => {
  console.error('Fatal error:', err);
  // Exit with 0 so workflow continues
  process.exit(0);
});
