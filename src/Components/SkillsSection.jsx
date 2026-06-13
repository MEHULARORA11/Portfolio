import React from "react";
import SkillsCard from "./SkillsCard";

const SkillsSection = () => {
  return (
    <div data-aos="fade-right" className="mb-20 lg:mb-36">
      <h1 className="text-5xl lg:text-7xl gradient-text mb-10">My Skills</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 lg:gap-6 select-none">
        <SkillsCard title={"Redis"} value={55} />
        <SkillsCard title={"ReactJs"} value={85} />
        <SkillsCard title={"Express"} value={80} />
        <SkillsCard title={"NodeJs"} value={90} />
        <SkillsCard title={"Postgres"} value={58} />
        <SkillsCard title={"MongoDB"} value={58} />
        <SkillsCard title={"SQL"} value={50} />
        <SkillsCard title={"JavaScript"} value={95} />
        <SkillsCard title={"Tailwind css"} value={38} />
        <SkillsCard title={"HTML"} value={30} />
        <SkillsCard title={"CSS"} value={10} />
      </div>
    </div>
  );
};

export default SkillsSection;