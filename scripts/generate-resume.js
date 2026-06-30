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

doc.fontSize(10.5).font('Helvetica-Bold').fillColor(COLOR_ACCENT).text('FULL STACK DEVELOPER // BACKEND ENGINEER', { align: 'center', characterSpacing: 1 });
doc.moveDown(0.35);

// Contact Info Line
doc.fontSize(9).font('Helvetica').fillColor(COLOR_MUTED);
const contactInfo = [
  'Faridabad, Haryana, India',
  'mehularora505@gmail.com',
  'github.com/MEHULARORA11',
  'linkedin.com/in/mehul-arora-32674b238',
  'mehularora.dev'
];

doc.text(contactInfo.join('  |  '), { align: 'center' });
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
  .text('Highly focused and detail-oriented Full Stack Developer specializing in backend engineering, scalable systems, and real-time architectures. Experienced in building high-performance web applications using Node.js, Express, Redis, and WebSockets. Passionate about solving complex system-design problems, optimizing database queries, and creating modern, responsive user interfaces.');
doc.moveDown(0.85);

// ─── TECHNICAL SKILLS ───
drawSectionHeader('Technical Skills');
const skills = [
  { category: 'Languages', items: 'JavaScript (ES6+), SQL, HTML5, CSS3' },
  { category: 'Backend & APIs', items: 'Node.js, Express, Redis, WebSockets, REST APIs' },
  { category: 'Frontend & Styles', items: 'React.js, Tailwind CSS, Framer Motion, HTML, CSS' },
  { category: 'Databases & Tools', items: 'PostgreSQL, MongoDB, SQL, Git, npm' }
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
   .font('Helvetica-Oblique').fillColor(COLOR_MUTED).text('  |  React, Node.js, Express, Redis, WebSockets', { continued: true })
   .font('Helvetica').fillColor(COLOR_LINK).text('  [GitHub]', { link: 'https://github.com/MEHULARORA11/1-Million-CheckBoxes', continued: true })
   .text('  [Live Demo]', { link: 'https://checkboxes.mehularora.dev/' });
doc.moveDown(0.25);

doc.fontSize(9).font('Helvetica').fillColor(COLOR_PRIMARY);
const p1Bullets = [
  'Scaled a collaborative real-time grid application to support 1 million checkboxes concurrently with sub-millisecond updates.',
  'Integrated Redis for memory-efficient state management, state caching, and rapid atomic key-value operations.',
  'Architected WebSockets connection pooling to handle thousands of concurrent client updates with low connection overhead.'
];
p1Bullets.forEach(bullet => {
  doc.text(`   -  ${bullet}`, { lineGap: 1.5 });
});
doc.moveDown(0.45);

// Project 2: Custom Tailwind (Talwinder CSS)
doc.fontSize(10.5).font('Helvetica-Bold').fillColor(COLOR_PRIMARY).text('Custom Tailwind (Talwinder CSS)', { continued: true })
   .font('Helvetica-Oblique').fillColor(COLOR_MUTED).text('  |  Node.js, npm, JavaScript, CSS', { continued: true })
   .font('Helvetica').fillColor(COLOR_LINK).text('  [npm Package]', { link: 'https://www.npmjs.com/package/talwinder-ji-ki-css', continued: true })
   .text('  [GitHub]', { link: 'https://github.com/MEHULARORA11/My-Custom-Tailwind' });
doc.moveDown(0.25);

doc.fontSize(9).font('Helvetica').fillColor(COLOR_PRIMARY);
const p2Bullets = [
  'Developed and published talwinder-ji-ki-css on npm, a lightweight, utility-first CSS preprocessor.',
  'Engineered an AST-like parser to compile dynamic utility classes into highly optimized static stylesheet maps.'
];
p2Bullets.forEach(bullet => {
  doc.text(`   -  ${bullet}`, { lineGap: 1.5 });
});
doc.moveDown(0.45);

// Project 3: Tic Tac Toe / Web Games
doc.fontSize(10.5).font('Helvetica-Bold').fillColor(COLOR_PRIMARY).text('Tic Tac Toe & Web Games', { continued: true })
   .font('Helvetica-Oblique').fillColor(COLOR_MUTED).text('  |  HTML, CSS, JavaScript', { continued: true })
   .font('Helvetica').fillColor(COLOR_LINK).text('  [Tic-Tac-Toe Live]', { link: 'https://tic-tac-toe-game-nine-puce.vercel.app/', continued: true })
   .text('  [Guessing Game]', { link: 'https://guessinggame.mehularora.dev/' });
doc.moveDown(0.25);

doc.fontSize(9).font('Helvetica').fillColor(COLOR_PRIMARY);
const p3Bullets = [
  'Built responsive interactive web games in raw JavaScript, implementing custom logic for winning-path validation and optimized state flow.',
  'Designed clean UI layouts utilizing vanilla CSS responsive grids, CSS variables, and modern visual states.'
];
p3Bullets.forEach(bullet => {
  doc.text(`   -  ${bullet}`, { lineGap: 1.5 });
});
doc.moveDown(0.7);

// ─── EDUCATION ───
drawSectionHeader('Education');
doc.fontSize(10.5).font('Helvetica-Bold').fillColor(COLOR_PRIMARY).text('Bachelor of Technology (B.Tech)', { continued: true })
   .font('Helvetica').fillColor(COLOR_MUTED).text('  |  JC Bose UST (YMCA), Faridabad, India', { continued: true })
   .font('Helvetica-Bold').fillColor(COLOR_ACCENT).text('  [First Year]', { align: 'right' });
doc.moveDown(0.2);
doc.fontSize(9).font('Helvetica').fillColor(COLOR_PRIMARY).text('Focusing on Computer Science foundations, database engineering, and structures.');
doc.moveDown(0.7);

// ─── CERTIFICATIONS ───
drawSectionHeader('Certifications & Achievements');
doc.fontSize(10.5).font('Helvetica-Bold').fillColor(COLOR_PRIMARY).text('Zenith 5.0 Hackathon Certificate', { continued: true })
   .font('Helvetica-Oblique').fillColor(COLOR_MUTED).text('  |  unstop.com', { continued: true })
   .font('Helvetica').fillColor(COLOR_LINK).text('  [Verify Credential]', { link: 'https://unstop.com/certificate-preview/0716ff08-88eb-4294-b510-6e150945774c?utm_campaign=site-emails&utm_medium=d2c-automated&utm_source=wow-look-at-your-certificate-zenith-50' });
doc.moveDown(0.2);
doc.fontSize(9).font('Helvetica').fillColor(COLOR_PRIMARY).text('Participated in the Zenith 5.0 hackathon at JC Bose UST, building real-time collaboration tools.');

// End the PDF generation
doc.end();

writeStream.on('finish', () => {
  console.log('Resume PDF compiled successfully.');
});
