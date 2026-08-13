"use client";

import { motion } from "motion/react";
import { skillCategories } from "@/lib/data";

export function Skills() {
  return (
    <section id="skills" className="space-y-5">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Skills</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Technologies I work with day-to-day.
        </p>
      </motion.div>

      <div className="space-y-5">
        {skillCategories.map((category, catIdx) => (
          <motion.div
            key={category.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: catIdx * 0.07, ease: "easeOut" }}
          >
            <p className="mb-2 text-xs font-medium text-muted-foreground/70">
              {category.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIdx) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.93 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.25,
                    delay: catIdx * 0.07 + skillIdx * 0.035,
                    ease: "easeOut",
                  }}
                  className="rounded-lg border border-border bg-card px-3 py-1.5 text-[12px] font-medium text-foreground/80 transition-colors duration-150 hover:bg-muted hover:text-foreground cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
