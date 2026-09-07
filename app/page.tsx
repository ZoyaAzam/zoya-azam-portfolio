import HeroHeader from "../components/hero-header";
import BentoMatrix from "../components/bento-matrix";
import ProjectsGrid from "../components/projects-grid";
import ExperienceFooter from "../components/experience-footer";
import SystemRail from "../components/system-rail";
import { ViewModeProvider } from "../lib/view-mode-context";

export default function Home() {
  return (
    <ViewModeProvider>
      <SystemRail />
      <main className="min-h-screen bg-[#0d0d0d] lg:pl-14">
        <div id="section-hero">
          <HeroHeader />
        </div>
        <div id="section-matrix">
          <BentoMatrix />
        </div>
        <div id="section-projects">
          <ProjectsGrid />
        </div>
        <div id="section-contact">
          <ExperienceFooter />
        </div>
      </main>
    </ViewModeProvider>
  );
}