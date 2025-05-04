import React from 'react';

// Constants
const BIRTH_YEAR = 2004;
const BIRTH_MONTH = 4; // May (0-indexed)
const BIRTH_DAY = 25;
const SKILLS = ["REACT", "NEXT.JS", "TYPESCRIPT", "TAILWIND", "UI/UX", "RESPONSIVE"];

const calculateAge = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDay = now.getDate();
  
  let age = currentYear - BIRTH_YEAR;
  
  // Adjust age if birthday hasn't occurred yet this year
  if (currentMonth < BIRTH_MONTH || (currentMonth === BIRTH_MONTH && currentDay < BIRTH_DAY)) {
    age--;
  }
  
  return age;
};

export default function BioSection() {
  return (
    <div className="swiss-card relative">
      {/* Decorative accent line */}
      <div className="absolute top-0 left-0 w-1/3 h-1 bg-[var(--accent)]" />

      <h3 className="swiss-heading-3 mb-8">MY STORY</h3>
      
      <div className="space-y-6">
        <p className="swiss-body">
          I am a <span className="font-semibold text-[var(--accent)]">passionate web developer</span> with expertise in modern frontend technologies.
          At {calculateAge()} years old and based in <span className="font-semibold">Thessaloniki, Greece</span>, my journey in coding began with a curiosity about how digital experiences are created,
          and has evolved into a professional path focused on building <span className="font-semibold">elegant, user-centered solutions</span>.
        </p>
        
        <p className="swiss-body">
          With a strong foundation in <span className="font-semibold text-[var(--accent)]">React</span>, <span className="font-semibold text-[var(--accent)]">Next.js</span>, and <span className="font-semibold text-[var(--accent)]">TypeScript</span>, I create responsive
          web applications that balance aesthetic appeal with technical performance.
          I&apos;m constantly exploring new technologies and design approaches to enhance the
          digital experiences I build.
        </p>
        
        <p className="swiss-body">
          When I&apos;m not coding, you can find me exploring design trends, reading about user experience,
          or experimenting with creative coding projects that push the boundaries of web development.
        </p>
      </div>
      
      {/* Skills section */}
      <div className="mt-12 pt-8 border-t border-[var(--border)]">
        <h4 className="text-lg font-bold uppercase tracking-wider mb-4">KEY SKILLS</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
          {SKILLS.map(skill => (
            <div key={skill} className="flex items-center">
              <div className="w-2 h-2 bg-[var(--accent)] mr-2" />
              <span className="text-sm uppercase tracking-wide">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}