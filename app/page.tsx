import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Socials } from "@/components/socials";
import { Projects } from "@/components/projects";
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
      <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-10">
        <div className="space-y-16">

          {/* ── Intro block ─── */}
          <div className="space-y-6">
            <Hero />
            <About />
            <Socials />
          </div>

          <hr className="border-dashed border-border/15" />

          {/* ── Work ─── */}
          <Projects />

          {/* ── Videos ─── */}
          <Videos />

          {/* ── Activity ─── */}
          <GitHubGraph />


          <hr className="border-dashed border-border/15" />

          {/* ── Skills + Contact ─── */}
          <Skills />
          <Contact />
        </div>
      </main>

      <div className="mx-auto w-full max-w-3xl px-6 pb-20">
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
