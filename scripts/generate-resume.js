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

// ─── PATCH: force every link annotation to open in a new tab/window ───
// PDFKit's built-in `link()` (used internally whenever `doc.text(str, { link })`
// is called) builds a bare `{ S: 'URI', URI: url }` action. Most viewers/browsers
// will still respect a `NewWindow` flag on that action dictionary, so we override
// `doc.link` once, on this instance, to inject it automatically. Because `text()`
// calls `this.link(...)` internally, every existing call site below (which just
// passes `{ link: url }`) picks this up for free — no other code changes needed.
const _originalLink = doc.link.bind(doc);
doc.link = function (x, y, width, height, url, options = {}) {
  if (typeof url === 'string') {
    options.Subtype = 'Link';
    const action = this.ref({
      S: 'URI',
      URI: new String(url),
      NewWindow: true
    });
    action.end();
    options.A = action;
    return this.annotate(x, y, width, height, options);
  }
  // Fall back to default behavior for non-URL links (e.g. internal page/goTo links)
  return _originalLink(x, y, width, height, url, options);
};

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

// Contact Info Line (With YouTube added)
doc.fontSize(9).font('Helvetica');

const parts = [
  { text: 'Faridabad, India', color: COLOR_MUTED },
  { text: 'mehularora505@gmail.com', color: COLOR_LINK, link: 'mailto:mehularora505@gmail.com' },
  { text: 'GitHub', color: COLOR_LINK, link: 'https://github.com/MEHULARORA11' },
  { text: 'Twitter', color: COLOR_LINK, link: 'https://x.com/MehulArora121' },
  { text: 'LinkedIn', color: COLOR_LINK, link: 'https://www.linkedin.com/in/mehul-arora-32674b238/' },
  { text: 'YouTube', color: COLOR_LINK, link: 'https://youtube.com/@Mehul_Arora' }, // <-- Added YouTube Channel
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
  .text('Full Stack Developer specializing in backend engineering, scalable systems, and real-time architectures. Experienced in building high-performance web applications using Node.js, Express, Redis, and WebSockets while optimizing database queries for high efficiency.');
doc.moveDown(0.85);

// ─── TECHNICAL SKILLS ───
drawSectionHeader('Technical Skills');
const skills = [
  { category: 'Languages', items: 'JavaScript (ES6+), SQL, HTML5, CSS3' },
  { category: 'Backend & Tools', items: 'Node.js, Express, Redis, WebSockets, REST APIs, Git, npm' },
  { category: 'Frontend', items: 'React.js, Tailwind CSS, HTML, CSS' },
  { category: 'Databases', items: 'PostgreSQL, MongoDB' }
];

skills.forEach(skillGroup => {
  doc.fontSize(9.5).font('Helvetica-Bold').fillColor(COLOR_PRIMARY).text(`•  ${skillGroup.category}: `, { underline: false, continued: true })
     .font('Helvetica').fillColor(COLOR_PRIMARY).text(skillGroup.items);
  doc.moveDown(0.25);
});
doc.moveDown(0.6);

// ─── PROJECTS ───
drawSectionHeader('Projects');

// Project 1: Arbiter
doc.fontSize(10.5).font('Helvetica-Bold').fillColor(COLOR_PRIMARY).text('Arbiter', { continued: true })
   .font('Helvetica-Oblique').fillColor(COLOR_MUTED).text('  |  PostgreSQL, Node.js, NextJS, OAuth, OpenAI, Gemini SDK', { continued: true })
   .font('Helvetica').fillColor(COLOR_LINK).text('  [GitHub]', { link: 'https://github.com/MEHULARORA11/Arbiter.git', continued: true })
   .text('  [Live]', { link: 'https://arbiter.mehularora.dev/' });
doc.moveDown(0.25);

doc.fontSize(9).font('Helvetica').fillColor(COLOR_PRIMARY);
const p1Bullets = [
  'Architected a multi-model Self-Consistency LLM Agent that evaluates responses across diverse AI engines to generate optimized user answers.',
  'Implemented completely isolated contextual conversational history threads, ensuring distinct memory boundaries per active session.'
];
p1Bullets.forEach(bullet => {
  doc.text(`   -  ${bullet}`, { lineGap: 1.5 });
});
doc.moveDown(0.45);

// Project 2: Personic 
doc.fontSize(10.5).font('Helvetica-Bold').fillColor(COLOR_PRIMARY).text('Personic', { continued: true })
   .font('Helvetica-Oblique').fillColor(COLOR_MUTED).text('  |  OpenAI Agent SDK, HTML5, CSS3, JavaScript', { continued: true })
   .font('Helvetica').fillColor(COLOR_LINK).text('  [Live]', { link: 'https://personic.mehularora.dev/', continued: true })
   .text('  [GitHub]', { link: 'https://github.com/MEHULARORA11/PersonicAi.git' });
doc.moveDown(0.25);

doc.fontSize(9).font('Helvetica').fillColor(COLOR_PRIMARY);
const p2Bullets = [
  'Built responsive, interactive web games using vanilla JavaScript, engineering localized algorithms for win-path validation and optimized engine loops.',
  'Designed UI architecture leveraging dynamic CSS custom properties and flexible grids for multi-platform device alignment.'
];
p2Bullets.forEach(bullet => {
  doc.text(`   -  ${bullet}`, { lineGap: 1.5 });
});
doc.moveDown(0.45);


// Project 3: TalwinderCSS - Custom Tailwind (Fixed duplicate p3Bullets bug)
doc.fontSize(10.5).font('Helvetica-Bold').fillColor(COLOR_PRIMARY).text('TalwinderCSS', { continued: true })
   .font('Helvetica-Oblique').fillColor(COLOR_MUTED).text('  |  NPM Engine, HTML5, CSS3, JavaScript', { continued: true })
   .font('Helvetica').fillColor(COLOR_LINK).text('  [Live]', { link: 'https://talwinder.mehularora.dev/', continued: true })
   .font('Helvetica').fillColor(COLOR_LINK).text('  [GitHub]', { link: 'https://github.com/MEHULARORA11/TalwinderCSS', continued: true })
   .text('  [NPM]', { link: 'https://www.npmjs.com/package/talwinder-ji-ki-css' });
doc.moveDown(0.25);

doc.fontSize(9).font('Helvetica').fillColor(COLOR_PRIMARY);
const p3Bullets = [
  'Engineered a highly customized, humor-infused open-source functional utility CSS tool published directly onto the public NPM dependency registry.',
  'Mapped customized utility structures using explicit alias classes targeting cross-browser style components.'
];
p3Bullets.forEach(bullet => {
  doc.text(`   -  ${bullet}`, { lineGap: 1.5 });
});
doc.moveDown(0.45);

// Project 4: 1 Million Checkboxes
doc.fontSize(10.5).font('Helvetica-Bold').fillColor(COLOR_PRIMARY).text('1 Million Checkboxes', { continued: true })
   .font('Helvetica-Oblique').fillColor(COLOR_MUTED).text('  |  React, Node, Express, Redis, WebSockets', { continued: true })
   .font('Helvetica').fillColor(COLOR_LINK).text('  [GitHub]', { link: 'https://github.com/MEHULARORA11/1-Million-CheckBoxes', continued: true })
   .text('  [Live Demo]', { link: 'https://checkboxes.mehularora.dev/' });
doc.moveDown(0.25);

doc.fontSize(9).font('Helvetica').fillColor(COLOR_PRIMARY);
const p4Bullets = [
  'Scaled a collaborative real-time grid application supporting 1 million checkboxes concurrently with sub-millisecond updates.',
  'Integrated Redis for memory-efficient state management, pub-sub messaging, and rapid atomic key-value operations.',
  'Architected WebSockets connection pooling and broadcast pipelines to manage thousands of concurrent client updates with minimal latency.'
];
p4Bullets.forEach(bullet => {
  doc.text(`   -  ${bullet}`, { lineGap: 1.5 });
});
doc.moveDown(0.7);


// ─── EDUCATION ───
drawSectionHeader('Education');
doc.fontSize(10.5).font('Helvetica-Bold').fillColor(COLOR_PRIMARY).text('JC Bose UST (YMCA)', { continued: true })
   .font('Helvetica').fillColor(COLOR_MUTED).text('  |  Bachelor of Technology (B.Tech) in CSE', { continued: true })
   .font('Helvetica-Bold').fillColor(COLOR_ACCENT).text('  [Expected Graduation: June 2029]');
doc.moveDown(0.25);
doc.fontSize(9).font('Helvetica').fillColor(COLOR_PRIMARY).text('Faridabad, India  |  Second-year coursework focuses on Computer Science foundations, database engineering, and algorithms.');
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