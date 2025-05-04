import React from 'react';
import SwissMotion from '@/components/SwissMotion';
import TextAnimation from '@/components/TextAnimation';
import ShapeAnimation from '@/components/ShapeAnimation';

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
    <SwissMotion
      type="fade"
      delay={0.2}
      duration={0.6}
      className="swiss-card relative"
    >
      {/* Decorative accent line with animation */}
      <SwissMotion type="reveal" delay={0.4} duration={0.6}>
        <div className="absolute top-0 left-0 w-1/3 h-1 bg-[var(--accent)]" />
      </SwissMotion>
      
      {/* Decorative shape in top-right corner */}
      <div className="absolute top-4 right-4">
        <ShapeAnimation 
          type="square" 
          size={20} 
          color="var(--accent-secondary)" 
          variant="rotate"
          delay={0.7}
          loop={true}
        />
      </div>

      <TextAnimation
        text="MY STORY"
        variant="reveal"
        delay={0.5}
        className="swiss-heading-3 mb-8"
      />
      
      <SwissMotion type="stagger" delay={0.6} className="space-y-6">
        <SwissMotion type="fade" delay={0.1}>
          <div className="swiss-body">
            I am a <span className="font-semibold text-[var(--accent)]">
              <TextAnimation 
                text="passionate web developer" 
                variant="reveal" 
              />
            </span> with expertise in modern frontend technologies.
            At {calculateAge()} years old and based in <span className="font-semibold">Thessaloniki, Greece</span>, my journey in coding began with a curiosity about how digital experiences are created,
            and has evolved into a professional path focused on building <span className="font-semibold">elegant, user-centered solutions</span>.
          </div>
        </SwissMotion>
        
        <SwissMotion type="fade" delay={0.2}>
          <div className="swiss-body">
            With a strong foundation in <span className="font-semibold text-[var(--accent)]">
              <TextAnimation text="React" variant="reveal" />
            </span>, <span className="font-semibold text-[var(--accent)]">
              <TextAnimation text="Next.js" variant="reveal" />
            </span>, and <span className="font-semibold text-[var(--accent)]">
              <TextAnimation text="TypeScript" variant="reveal" />
            </span>, I create responsive
            web applications that balance aesthetic appeal with technical performance.
            I&apos;m constantly exploring new technologies and design approaches to enhance the
            digital experiences I build.
          </div>
        </SwissMotion>
        
        <SwissMotion type="fade" delay={0.3}>
          <p className="swiss-body">
            When I&apos;m not coding, you can find me exploring design trends, reading about user experience,
            or experimenting with creative coding projects that push the boundaries of web development.
          </p>
        </SwissMotion>
      </SwissMotion>
      
      {/* Skills section */}
      <SwissMotion 
        type="fade" 
        delay={0.8} 
        className="mt-12 pt-8 border-t border-[var(--border)]"
      >
        <TextAnimation
          text="KEY SKILLS"
          variant="reveal"
          delay={0.2}
          className="text-lg font-bold uppercase tracking-wider mb-4"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
          {SKILLS.map((skill, i) => (
            <SwissMotion
              key={skill}
              type="slide"
              delay={0.9 + i * 0.05}
              duration={0.4}
              className="flex items-center"
              whileHover="lift"
            >
              <ShapeAnimation
                type="square"
                size={8}
                delay={1.1 + i * 0.05}
                color="var(--accent)"
                className="mr-2"
              />
              <span className="text-sm uppercase tracking-wide">{skill}</span>
            </SwissMotion>
          ))}
        </div>
      </SwissMotion>
    </SwissMotion>
  );
}