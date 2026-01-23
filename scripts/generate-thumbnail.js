const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to match LinkedIn thumbnail ratio
  await page.setViewport({ width: 1200, height: 630 });
  
  // Navigate to your site
  await page.goto('https://sudip2607.vercel.app', { waitUntil: 'networkidle2' });
  
  // Create public/images directory if it doesn't exist
  const dir = path.join(__dirname, '../public/images');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Screenshot
  const screenshotPath = path.join(dir, 'thumbnail.png');
  await page.screenshot({ path: screenshotPath, fullPage: false });
  
  console.log(`✅ Thumbnail saved to: ${screenshotPath}`);
  
  await browser.close();
})();
