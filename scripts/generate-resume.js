import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  console.log("Starting PDF generation...");

  try {
    // Launch headless Chrome
    const browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    
    // Resolve paths
    const htmlPath = path.join(__dirname, 'resume-template.html');
    const outputPath = path.join(__dirname, '..', 'public', 'Mehul_Arora_Resume.pdf');
    
    console.log(`Loading HTML template from: ${htmlPath}`);

    // Load the local HTML file
    await page.goto(`file://${htmlPath}`, {
      waitUntil: 'networkidle0'
    });

    console.log("Generating PDF...");

    // Generate the PDF
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true, // Ensures CSS background colors are printed
      margin: {
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
      }
    });

    await browser.close();

    console.log(`✅ Resume successfully generated at: ${outputPath}`);
  } catch (error) {
    console.error("❌ Error generating PDF:", error);
    process.exit(1);
  }
})();
