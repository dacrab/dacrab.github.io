import React from 'react';

export default function BioSection() {
  return (
    <div className="swiss-card relative">
      <div className="absolute top-0 left-0 w-1/3 h-1 bg-[var(--accent)]"></div>
      
      <h3 className="swiss-heading-3 mb-8">MY STORY</h3>
      
      <div className="space-y-6">
        <p className="swiss-body">
          I am a passionate web developer with expertise in modern frontend technologies.
          My journey in coding began with a curiosity about how digital experiences are created,
          and has evolved into a professional path focused on building elegant, user-centered solutions.
        </p>
        
        <p className="swiss-body">
          With a strong foundation in React, Next.js, and TypeScript, I create responsive
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