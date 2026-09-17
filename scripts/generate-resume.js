import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const htmlPath = path.join(__dirname, 'resume-template.html');
const outputPath = path.join(__dirname, '..', 'public', 'Mehul_Arora_Resume.pdf');

(async () => {
  console.log("Starting PDF generation...");

  if (!fs.existsSync(htmlPath)) {
    console.error(`❌ Resume template not found at: ${htmlPath}`);
    process.exit(1);
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    console.log(`Loading HTML template from: ${htmlPath}`);
    await page.goto(`file://${htmlPath}`, {
      waitUntil: 'networkidle0',
    });

    console.log("Generating PDF...");
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      tagged: true,
      margin: {
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    });

    const { size } = fs.statSync(outputPath);
    console.log(`✅ Resume successfully generated at: ${outputPath} (${(size / 1024).toFixed(1)} KB)`);
  } catch (error) {
    console.error("❌ Error generating PDF:", error);
    process.exitCode = 1;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
})();
