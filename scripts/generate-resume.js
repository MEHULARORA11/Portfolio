import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve directory paths in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure public/resume directory exists
const outputDir = path.join(__dirname, '..', 'public', 'resume');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'Mehul_Arora_Resume.pdf');

// Initialize PDF Document (A4 size with standard margins)
const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 40, bottom: 40, left: 45, right: 45 }
});

const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

// Theme Colors
const COLOR_PRIMARY = '#111827'; // Dark Slate/Off-black for text
const COLOR_ACCENT = '#059669';  // Emerald Green for headers
const COLOR_MUTED = '#4b5563';   // Slate Grey for secondary text/subtitles
const COLOR_LIGHT = '#e5e7eb';   // Light Grey for dividers
const COLOR_LINK = '#0f766e';    // Teal for clickable links

// ─── HEADER SECTION ───
doc.fontSize(24).font('Helvetica-Bold').fillColor(COLOR_PRIMARY).text('MEHUL ARORA', { align: 'center' });
doc.moveDown(0.15);

doc.fontSize(10.5).font('Helvetica-Bold').fillColor(COLOR_ACCENT).text('SOFTWARE ENGINEER', { align: 'center', characterSpacing: 1.5 });
doc.moveDown(0.35);

// Contact Info Line
doc.fontSize(9).font('Helvetica');

const parts = [
  { text: 'Faridabad, India', color: COLOR_MUTED },
  { text: 'mehularora505@gmail.com', color: COLOR_LINK, link: 'mailto:mehularora505@gmail.com' },
  { text: 'GitHub', color: COLOR_LINK, link: 'https://github.com/MEHULARORA11' },
  { text: 'LinkedIn', color: COLOR_LINK, link: 'https://www.linkedin.com/in/mehul-arora-32674b238/' },
  { text: 'mehularora.dev', color: COLOR_LINK, link: 'https://mehularora.dev' }
];

const separator = '  |  ';
let totalWidth = 0;
parts.forEach((part, index) => {
  totalWidth += doc.widthOfString(part.text);
  if (index < parts.length - 1) {
    totalWidth += doc.widthOfString(separator);
  }
});

const startX = (595.28 - totalWidth) / 2;

parts.forEach((part, index) => {
  doc.fillColor(part.color);
  const options = { continued: index < parts.length - 1 };
  if (part.link) {
    options.link = part.link;
    options.underline = true;
  }
  
  if (index === 0) {
    doc.text(part.text, startX, doc.y, options);
  } else {
    doc.text(part.text, options);
  }
  
  if (index < parts.length - 1) {
    doc.fillColor(COLOR_MUTED).text(separator, { continued: true, link: null, underline: false });
  }
});

doc.x = 45; // Reset X position to default margin
doc.moveDown(0.6);

// Top Divider Line
doc.moveTo(45, doc.y).lineTo(550, doc.y).strokeColor(COLOR_LIGHT).lineWidth(0.75).stroke();
doc.moveDown(0.75);

// Helper function to draw Section Headers
function drawSectionHeader(title) {
  doc.fontSize(11).font('Helvetica-Bold').fillColor(COLOR_ACCENT).text(title.toUpperCase(), { characterSpacing: 0.75 });
  doc.moveDown(0.15);
  doc.moveTo(45, doc.y).lineTo(550, doc.y).strokeColor(COLOR_ACCENT).lineWidth(1.2).stroke();
  doc.moveDown(0.4);
}

// ─── PROFESSIONAL SUMMARY ───
drawSectionHeader('Professional Summary');
doc.fontSize(9.5).font('Helvetica').fillColor(COLOR_PRIMARY).lineGap(2.5)
  .text('Detail-oriented Full Stack Developer specializing in backend engineering, scalable systems, and real-time architectures. Experienced in building high-performance web applications using Node.js, Express, Redis, and WebSockets. Passionate about solving complex system-design problems, optimizing database queries, and creating modern, responsive user interfaces.');
doc.moveDown(0.85);

// ─── TECHNICAL SKILLS ───
drawSectionHeader('Technical Skills');
const skills = [
  { category: 'Languages', items: 'JavaScript (ES6+), SQL, HTML5, CSS3' },
  { category: 'Backend & Tools', items: 'Node.js, Express, Redis, WebSockets, REST APIs, Git, npm' },
  { category: 'Frontend', items: 'React.js, Tailwind CSS, Framer Motion, HTML, CSS' },
  { category: 'Databases', items: 'PostgreSQL, MongoDB, SQL' }
];

skills.forEach(skillGroup => {
  doc.fontSize(9.5).font('Helvetica-Bold').fillColor(COLOR_PRIMARY).text(`•  ${skillGroup.category}: `, { underline: false, continued: true })
     .font('Helvetica').fillColor(COLOR_PRIMARY).text(skillGroup.items);
  doc.moveDown(0.25);
});
doc.moveDown(0.6);

// ─── PROJECTS ───
drawSectionHeader('Projects');

// Project 1: 1 Million Checkboxes
doc.fontSize(10.5).font('Helvetica-Bold').fillColor(COLOR_PRIMARY).text('1 Million Checkboxes', { continued: true })
   .font('Helvetica-Oblique').fillColor(COLOR_MUTED).text('  |  React, Node, Express, Redis, WebSockets', { continued: true })
   .font('Helvetica').fillColor(COLOR_LINK).text('  [GitHub]', { link: 'https://github.com/MEHULARORA11/1-Million-CheckBoxes', continued: true })
   .text('  [Live Demo]', { link: 'https://checkboxes.mehularora.dev/' });
doc.moveDown(0.25);

doc.fontSize(9).font('Helvetica').fillColor(COLOR_PRIMARY);
const p1Bullets = [
  'Scaled a collaborative real-time grid application supporting 1 million checkboxes concurrently with sub-millisecond updates.',
  'Integrated Redis for memory-efficient state management, pub-sub messaging, and rapid atomic key-value operations.',
  'Architected WebSockets connection pooling and broadcast pipelines to manage thousands of concurrent client updates with minimal latency.'
];
p1Bullets.forEach(bullet => {
  doc.text(`   -  ${bullet}`, { lineGap: 1.5 });
});
doc.moveDown(0.45);

// Project 2: Custom Tailwind Compiler
doc.fontSize(10.5).font('Helvetica-Bold').fillColor(COLOR_PRIMARY).text('Custom Tailwind Compiler', { continued: true })
   .font('Helvetica-Oblique').fillColor(COLOR_MUTED).text('  |  Node.js, npm, JavaScript, CSS', { continued: true })
   .font('Helvetica').fillColor(COLOR_LINK).text('  [npm Package]', { link: 'https://www.npmjs.com/package/talwinder-ji-ki-css', continued: true })
   .text('  [GitHub]', { link: 'https://github.com/MEHULARORA11/My-Custom-Tailwind' });
doc.moveDown(0.25);

doc.fontSize(9).font('Helvetica').fillColor(COLOR_PRIMARY);
const p2Bullets = [
  'Developed and published talwinder-ji-ki-css on npm, a lightweight, utility-first CSS preprocessor.',
  'Engineered an AST-like parser to compile dynamic utility classes into highly optimized static stylesheet maps.',
  'Optimized asset sizes by purging unused classes, reducing compiled CSS bundles by over 40%.'
];
p2Bullets.forEach(bullet => {
  doc.text(`   -  ${bullet}`, { lineGap: 1.5 });
});
doc.moveDown(0.45);

// Project 3: Tic Tac Toe / Web Games
doc.fontSize(10.5).font('Helvetica-Bold').fillColor(COLOR_PRIMARY).text('Tic Tac Toe & Web Games', { continued: true })
   .font('Helvetica-Oblique').fillColor(COLOR_MUTED).text('  |  HTML5, CSS3, JavaScript (ES6)', { continued: true })
   .font('Helvetica').fillColor(COLOR_LINK).text('  [Tic-Tac-Toe Live]', { link: 'https://tic-tac-toe-game-nine-puce.vercel.app/', continued: true })
   .text('  [Guessing Game]', { link: 'https://guessinggame.mehularora.dev/' });
doc.moveDown(0.25);

doc.fontSize(9).font('Helvetica').fillColor(COLOR_PRIMARY);
const p3Bullets = [
  'Built responsive interactive web games in vanilla JavaScript, implementing custom logic for winning-path validation and optimized state flow.',
  'Designed clean UI layouts utilizing CSS variables and modern responsive grids for seamless mobile and desktop cross-compatibility.'
];
p3Bullets.forEach(bullet => {
  doc.text(`   -  ${bullet}`, { lineGap: 1.5 });
});
doc.moveDown(0.7);

// ─── EDUCATION ───
drawSectionHeader('Education');
doc.fontSize(10.5).font('Helvetica-Bold').fillColor(COLOR_PRIMARY).text('JC Bose UST (YMCA)', { continued: true })
   .font('Helvetica').fillColor(COLOR_MUTED).text('  |  Bachelor of Technology (B.Tech) in CSE', { continued: true })
   .font('Helvetica-Bold').fillColor(COLOR_ACCENT).text('  [Expected Graduation: June 2029]');
doc.moveDown(0.25);
doc.fontSize(9).font('Helvetica').fillColor(COLOR_PRIMARY).text('Faridabad, India  |  First-year coursework focuses on Computer Science foundations, database engineering, and algorithms.');
doc.moveDown(0.75);

// ─── CERTIFICATIONS ───
drawSectionHeader('Certifications & Achievements');
doc.fontSize(10.5).font('Helvetica-Bold').fillColor(COLOR_PRIMARY).text('Zenith 5.0 Hackathon Certificate', { continued: true })
   .font('Helvetica-Oblique').fillColor(COLOR_MUTED).text('  |  unstop.com', { continued: true })
   .font('Helvetica').fillColor(COLOR_LINK).text('  [Verify Credential]', { link: 'https://unstop.com/certificate-preview/0716ff08-88eb-4294-b510-6e150945774c?utm_campaign=site-emails&utm_medium=d2c-automated&utm_source=wow-look-at-your-certificate-zenith-50' });
doc.moveDown(0.25);
doc.fontSize(9).font('Helvetica').fillColor(COLOR_PRIMARY).text('Participated in the Zenith 5.0 hackathon at JC Bose UST, building real-time collaboration tools.');

// End the PDF generation
doc.end();

writeStream.on('finish', () => {
  console.log('Resume PDF compiled successfully.');
});
