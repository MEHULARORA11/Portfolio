import { Navbar } from "@/components/navbar";
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
      <Navbar />
      <main className="mx-auto w-full max-w-5xl px-6 md:px-12 pb-24">
        <Hero />
        <About />
        <Projects />
        <Certificates />
        <Videos />
        <GitHubGraph />
        <Skills />
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
