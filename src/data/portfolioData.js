export const certificates = [
  {
    id: "cert-1",
    title: "Zenith 5.0",
    issuer: "unstop.com",
    date: "May 2026",
    tags: ["Zenith 5.0", "hackathon", "jcbust"],
    thumbnail: "https://images.unsplash.com/photo-1782038793351-ee4fed3b14a4?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    credentialLink: "https://unstop.com/certificate-preview/0716ff08-88eb-4294-b510-6e150945774c?utm_campaign=site-emails&utm_medium=d2c-automated&utm_source=wow-look-at-your-certificate-zenith-50",
  },
  // below is the dummy certs
  ];

export const youtubeVideos = [
  // below is the dummy vidios data
  // {
  //   id: "yt-1",
  //   title: "Building an Award-Winning 3D Developer Portfolio with R3F & GSAP",
  //   description: "Learn how to build immersive 3D web experiences using React Three Fiber, Drei, and GSAP. Step-by-step shading, lighting, and ScrollTrigger physics setup.",
  //   duration: "24:15",
  //   thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
  //   videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  //   tags: ["React Three Fiber", "3D Web", "GSAP", "Tutorial"],
  // },
];

export const instagramReels = [
  // below is the dummy video data
  // {
  //   id: "ig-1",
  //   title: "3 UI Hacks to Make Your Site Feel Apple-Level Premium",
  //   description: "Quick look at glassmorphic border gradients, inner shadow lighting, and spring-based tactile active states. Master the detail physics.",
  //   duration: "0:59",
  //   thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
  //   videoUrl: "https://www.instagram.com/reels/videos",
  //   tags: ["UI Hacks", "Web Design", "CSS"],
  // },
];

export const blogs = [
  // below is the dummy blog data
//   {
//     id: "blog-1",
//     title: "Deep Diving into React 19 Compiler: The Death of useMemo?",
//     date: "Jun 15, 2026",
//     readTime: "6 min read",
//     description: "An in-depth look at how the React Compiler (React Forget) automatically memoizes hooks, states, and components, optimizing render loops under the hood.",
//     content: `React 19 introduces a revolutionary build-time tool: the **React Compiler** (previously known as *React Forget*). For years, React developers have spent hours writing hooks like \`useMemo\` and \`useCallback\` to prevent unnecessary component re-renders. 

// While manual memoization works, it adds visual clutter, increases code complexity, and is prone to stale dependencies bugs.

// ## How the React Compiler Works

// The compiler operates at the build step (integrating directly with Babel, Vite, or Next.js bundlers). It parses your JavaScript AST (Abstract Syntax Tree) to trace dependency bounds automatically:

// 1. **Dynamic Dependency Detection**: The compiler determines if values or functions depend on variables in scope.
// 2. **Auto-Memoization**: It wraps components and child hierarchies in conditional memo blocks dynamically, injecting code to check values in-memory.
// 3. **No Code Overhead**: You write standard JavaScript. No hooks needed.

// > "The React Compiler changes the mental model from 'opt-in performance' to 'performant by default'."
// > — *React Core Team*

// ---

// ### Features Roadmap

// - [x] Auto-memoize standard hooks & components
// - [x] Track dependencies dynamically
// - [ ] Support custom hook memoization overrides

// ---

// ### React 18 vs. React 19 Comparison

// | Metric | React 18 (Manual Memoization) | React 19 (React Compiler) |
// | :--- | :--- | :--- |
// | **Boilerplate** | High (\`useMemo\`, \`useCallback\` + deps) | **Zero** (Automated compile step) |
// | **Render overhead** | Prone to human deps errors | Fully optimized AST-driven |
// | **Bundle footprint** | Standard runtime overhead | Compile-time static analysis |

// ---

// ### Code Migration Example

// Here is a comparison of how you used to write components versus how the compiler handles them under the hood:

// \`\`\`javascript
// // 🛑 React 18: Manual memoization to prevent child re-renders
// const ExpensiveComponent = ({ data, filter }) => {
//   const filteredList = useMemo(() => {
//     return data.filter(item => item.value === filter);
//   }, [data, filter]);

//   return <List items={filteredList} />;
// };
// \`\`\`

// With React 19, you write simple, native JavaScript:

// \`\`\`javascript
// // ✅ React 19: The compiler handles memoization automatically!
// const ExpensiveComponent = ({ data, filter }) => {
//   const filteredList = data.filter(item => item.value === filter);
//   return <List items={filteredList} />;
// };
// \`\`\`

// For details, visit the official [React Compiler Docs](https://react.dev/learn/react-compiler).`,
//     thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop",
//     tags: ["React 19", "Compiler", "Web Performance"],
//   },
//   {
//     id: "blog-2",
//     title: "Building My Own Styling Engine: Lessons from 'Talwinder CSS'",
//     date: "May 28, 2026",
//     readTime: "8 min read",
//     description: "Behind the scenes of writing a lightweight, utility-first CSS preprocessor from scratch. We discuss AST parsing, stylesheet maps, and publishing packages to npm.",
//     content: `Writing your own styling engine is one of the most rewarding ways to learn how browsers parse and render sheets. I built **Talwinder CSS** as a lightweight compiler that converts utility classes into statically optimized stylesheet rules.

// ### The Compiler Pipeline
// A CSS preprocessor follows a classic compiler design:
// * **Lexer**: Tokenizes class strings.
// * **Parser**: Builds a Map of styles matching active utilities.
// * **Code Generator**: Generates minified stylesheets and injects them.

// ### Key Takeaways
// 1. **Performance Matters**: Static extraction during build saves browser runtime cycles.
// 2. **File Size Optimization**: Stripping unused rules is critical.
// 3. **Flexibility**: Designing custom color hooks that adapt to dark/light modes seamlessly requires careful variable mappings.`,
//     thumbnail: "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=600&auto=format&fit=crop",
//     tags: ["npm", "Compiler Design", "CSS Engine"],
//   },
//   {
//     id: "blog-3",
//     title: "How to Scale WebSockets to 1 Million Concurrent Connections",
//     date: "Apr 12, 2026",
//     readTime: "10 min read",
//     description: "An architectural guide to deploying highly concurrent real-time services. We cover horizontal scaling, Redis adapter states, and garbage collection fine-tuning.",
//     content: `Scaling HTTP is easy: spin up more instances and stick a load balancer in front. Scaling WebSockets is hard because connections are stateful and persistent. 

// If you have 1 million users connected via sockets, how do you handle pub/sub routing across 50 server nodes?

// ### 1. The Redis Adapter Layer
// To coordinate messages across servers, we implement a Redis Pub/Sub adapter. When Server A needs to broadcast to a room, it publishes to Redis, which notifies Servers B through Z.

// ### 2. Node.js Memory Limits
// Node processes limit heap sizes. We configure memory allocations, close stale links, and implement heartbeat protocols to clean up ghost connections.

// ### 3. Load Balancer Configuration
// Ensure your reverse proxy (Nginx, AWS ALB, Cloudflare) supports HTTP upgrading, sticky sessions, and long-timeout keep-alives.`,
//     thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop",
//     tags: ["WebSockets", "Redis", "System Design"],
//   },
//   {
//     id: "blog-4",
//     title: "Core Web Vitals: Targeting 100/100 Lighthouse Performance",
//     date: "Mar 10, 2026",
//     readTime: "5 min read",
//     description: "Stop letting slow assets tank your search engine rankings. A step-by-step audit of reflow cycles, critical CSS, dynamic bundling, and layouts.",
//     content: `Google's Core Web Vitals (LCP, FID, CLS) are crucial ranking factors. If your site takes more than 2.5 seconds to load, you are losing users.

// ### The Metrics That Matter
// * **LCP (Largest Contentful Paint)**: How fast the primary visual renders.
// * **INP (Interaction to Next Paint)**: Measures user inputs delay.
// * **CLS (Cumulative Layout Shift)**: Layout shifting during load.

// ### Key Optimization Steps
// 1. **Dynamic Imports**: Lazy-load everything below the hero section.
// 2. **Modern Image Formats**: Deliver WebP/AVIF images with predefined dimensions to prevent layout shifts.
// 3. **Preload Critical Assets**: Font files and primary script assets should be fetched early.`,
//     thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
//     tags: ["Lighthouse", "Performance", "Web Dev"],
//   },
//   {
//     id: "blog-5",
//     title: "Mastering Scroll Animations without Layout Thrashing",
//     date: "Feb 18, 2026",
//     readTime: "7 min read",
//     description: "Why updating scroll coordinates in React states causes layout thrashing, and how to build fluid animations with Lenis and CSS properties.",
//     content: `Scroll animations make websites feel alive, but poorly built scroll listeners can crash mobile browsers. 

// Let's look at why layout thrashing happens and how to build high-performance scrolling.

// ### The Problem: React Render Loops
// If you bind a scroll listener to React state:
// \`\`\`javascript
// window.addEventListener("scroll", () => setY(window.scrollY));
// \`\`\`
// React will re-render your component on every single frame. This triggers recalculations that choke the browser thread.

// ### The Solution: CSS Custom Properties & GSAP
// By using engines like GSAP ScrollTrigger or updating CSS variables directly inside a ref, we keep the calculations on the GPU layer. This keeps animations running smoothly at 60fps on mobile.`,
//     thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop",
//     tags: ["Animations", "GSAP", "Performance"],
//   },
//   {
//     id: "blog-6",
//     title: "Bento Grid Layouts: Responsive Design Best Practices",
//     date: "Jan 30, 2026",
//     readTime: "4 min read",
//     description: "Designing the popular Apple-style bento box tile layout. We examine auto-fit columns, span grid definitions, and responsive cell wraps.",
//     content: `Bento grids (named after Japanese lunch boxes) have become the default layout for creative portfolios and landing pages. 

// Here is how to build them cleanly using CSS Grid.

// ### Responsive Coordinates
// Avoid rigid percentage widths. Use dynamic columns:
// \`\`\`css
// .bento-grid {
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//   gap: 1.5rem;
// }
// \`\`\`
// This ensures cells wrap naturally on mobile without breaking layouts. Use grid-span rules to stretch hero tiles across columns on larger viewports.`,
//     thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=600&auto=format&fit=crop",
//     tags: ["CSS Grid", "Responsive", "UI/UX"],
//   },
//   {
//     id: "blog-7",
//     title: "The Accessibility Outlines You Shouldn't Hide",
//     date: "Dec 14, 2025",
//     readTime: "5 min read",
//     description: "Hiding browser outlines for visual cleanliness creates navigation barriers for keyboard users. How to style premium focus rings that pass WCAG.",
//     content: `Many designers hide browser outline rings:
// \`\`\`css
// *:focus {
//   outline: none; /* Banned! */
// }
// \`\`\`
// This makes it impossible for keyboard users to navigate.

// ### Designing Premium Outlines
// Instead of hiding rings, design custom outlines using \`:focus-visible\`:
// \`\`\`css
// button:focus-visible {
//   outline: 2px solid var(--accent);
//   outline-offset: 4px;
// }
// \`\`\`
// This ensures focus rings only show up for keyboard users, maintaining accessibility while keeping the interface clean for mouse users.`,
//     thumbnail: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop",
//     tags: ["Accessibility", "A11y", "CSS"],
//   },
//   {
//     id: "blog-8",
//     title: "Microservices vs Monoliths: A Backend Perspective",
//     date: "Nov 02, 2025",
//     readTime: "9 min read",
//     description: "Debunking microservices hype. When you should stick with a modular monolith, and how microservices affect communication complexities.",
//     content: `In modern development, microservices are often treated as the default architecture. But for 90% of apps, a monolith is faster, cheaper, and less complex.

// ### Monolith Complexity
// A modular monolith keeps code logically separated within a single project, simplifying testing and database migrations.

// ### When to Migrate
// Only split into microservices when team sizes exceed coordination boundaries, or when specific services require vastly different resource scales.`,
//     thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=600&auto=format&fit=crop",
//     tags: ["Architecture", "Backend", "Microservices"],
  // }
];

