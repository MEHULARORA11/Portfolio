import { SpotlightNavbar } from "@/components/ui/spotlight-navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Certificates } from "@/components/certificates";
import { Videos } from "@/components/videos";
import { GitHubGraph } from "@/components/github-graph";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

export default function Home() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-auto">
        <SpotlightNavbar 
          items={[
            { label: "Skills", href: "#skills" },
            { label: "Projects", href: "#projects" },
            { label: "Videos", href: "#videos" },
            { label: "Certificates", href: "#certificates" },
            { label: "Contact", href: "#contact" },
          ]}
        />
      </div>
      <main className="mx-auto w-full max-w-5xl px-6 md:px-12 pb-24">
        <Hero />
        <About />
        <Skills />
        <GitHubGraph />
        <Projects />
        <Videos />
        <Certificates />
        <Contact />
      </main>

      <div className="mx-auto w-full max-w-5xl px-6 md:px-12 pb-20">
        <Footer />
      </div>

      {/* Progressive blur at bottom — polished scroll fade */}
      <ProgressiveBlur
        className="fixed bottom-0 left-0 right-0 z-30"
        position="bottom"
        height="80px"
      />
    </>
  );
}
