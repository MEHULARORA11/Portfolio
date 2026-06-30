import React from "react";
import SkillsCard from "./SkillsCard";
import SectionHeading from "./shared/SectionHeading";

const SkillsSection = () => {
  return (
    <div data-aos="fade-right" className="mb-20 lg:mb-36 w-full text-left">
      <SectionHeading title="Technical Skills" subtitle="My Engineering Toolkit" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 lg:gap-6 select-none">
        <SkillsCard title={"Redis"} />
        <SkillsCard title={"ReactJs"} />
        <SkillsCard title={"Express"} />
        <SkillsCard title={"NodeJs"} />
        <SkillsCard title={"Postgres"} />
        <SkillsCard title={"MongoDB"} />
        <SkillsCard title={"SQL"} />
        <SkillsCard title={"JavaScript"} />
        <SkillsCard title={"Tailwind css"} />
        <SkillsCard title={"HTML"} />
        <SkillsCard title={"CSS"} />
      </div>
    </div>
  );
};

export default SkillsSection;