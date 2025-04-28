import React from 'react';

export default function BioSection() {
  // Calculate age dynamically
  const calculateAge = () => {
    const birthYear = 2004;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    
    // Assuming birthday is December 31 (most conservative estimate)
    // For a more accurate calculation, you could include the exact birth month and day
    let age = currentYear - birthYear;
    
    // If we haven't reached the birthday this year yet, subtract 1
    if (currentMonth < 11 || (currentMonth === 11 && currentDay < 31)) {
      age--;
    }
    
    return age;
  };

  return (
    <div className="swiss-card relative">
      <div className="absolute top-0 left-0 w-1/3 h-1 bg-[var(--accent)]"></div>
      
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
      
      {/* Swiss style skills display */}
      <div className="mt-12 pt-8 border-t border-[var(--border)]">
        <h4 className="text-lg font-bold uppercase tracking-wider mb-4">KEY SKILLS</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
          {["REACT", "NEXT.JS", "TYPESCRIPT", "TAILWIND", "UI/UX", "RESPONSIVE"].map(skill => (
            <div key={skill} className="flex items-center">
              <div className="w-2 h-2 bg-[var(--accent)] mr-2"></div>
              <span className="text-sm uppercase tracking-wide">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}