import React from 'react';
import Image from 'next/image';
import SwissMotion from '@/components/SwissMotion';
import TextAnimation from '@/components/TextAnimation';
import ShapeAnimation from '@/components/ShapeAnimation';
import { useIsMobile } from '@/hooks/useIsMobile';
import { SKILLS_BY_CATEGORY } from './types';

// Constants
const BIRTH_YEAR = 2004;
const BIRTH_MONTH = 4; // May (0-indexed)
const BIRTH_DAY = 25;

// Get a flattened array of skills with relevant categories
const SKILLS = Object.entries(SKILLS_BY_CATEGORY)
  .flatMap(([category, skills]) => 
    skills.map(skill => ({
      ...skill,
      category
    }))
  )
  .slice(0, 6); // Limit to 6 skills

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
  const isMobile = useIsMobile();
  
  // Optimize animations for mobile
  const getOptimizedDelay = (baseDelay: number) => isMobile ? baseDelay * 0.7 : baseDelay;
  const getOptimizedDuration = (baseDuration: number) => isMobile ? baseDuration * 0.6 : baseDuration;
  
  return (
    <SwissMotion
      type="fade"
      delay={getOptimizedDelay(0.2)}
      duration={getOptimizedDuration(0.6)}
      className="swiss-card relative"
      mobileOptimized={true}
    >
      {/* Decorative accent line with animation */}
      <SwissMotion 
        type="reveal" 
        delay={getOptimizedDelay(0.4)} 
        duration={getOptimizedDuration(0.6)}
        mobileOptimized={true}
      >
        <div className="absolute top-0 left-0 w-1/3 h-1 bg-[var(--accent)]" />
      </SwissMotion>
      
      {/* Decorative shape in top-right corner - conditionally rendered on desktop */}
      {!isMobile && (
        <div className="absolute top-4 right-4">
          <ShapeAnimation 
            type="square" 
            size={20} 
            color="var(--accent-secondary)" 
            variant="rotate"
            delay={0.7}
            loop={true}
            mobileOptimized={true}
          />
        </div>
      )}

      <TextAnimation
        text="MY STORY"
        variant={isMobile ? "reveal" : "reveal"}
        delay={getOptimizedDelay(0.5)}
        className="swiss-heading-3 mb-8"
        mobileOptimized={true}
      />
      
      <SwissMotion 
        type="stagger" 
        delay={getOptimizedDelay(0.6)} 
        className="space-y-6"
        mobileOptimized={true}
      >
        <SwissMotion 
          type="fade" 
          delay={getOptimizedDelay(0.1)}
          mobileOptimized={true}
        >
          <div className="swiss-body">
            I am a <span className="font-semibold text-[var(--accent)]">
              <TextAnimation 
                text="passionate web developer" 
                variant="reveal"
                mobileOptimized={true} 
              />
            </span> with expertise in modern frontend technologies.
            At {calculateAge()} years old and based in <span className="font-semibold">Thessaloniki, Greece</span>, my journey in coding began with a curiosity about how digital experiences are created,
            and has evolved into a professional path focused on building <span className="font-semibold">elegant, user-centered solutions</span>.
          </div>
        </SwissMotion>
        
        <SwissMotion 
          type="fade" 
          delay={getOptimizedDelay(0.2)}
          mobileOptimized={true}
        >
          <div className="swiss-body">
            With a strong foundation in <span className="font-semibold text-[var(--accent)]">
              <TextAnimation 
                text="React" 
                variant="reveal" 
                mobileOptimized={true}
              />
            </span>, <span className="font-semibold text-[var(--accent)]">
              <TextAnimation 
                text="NextJS" 
                variant="reveal" 
                mobileOptimized={true}
              />
            </span>, and <span className="font-semibold text-[var(--accent)]">
              <TextAnimation 
                text="TypeScript" 
                variant="reveal" 
                mobileOptimized={true}
              />
            </span>, I create responsive
            web applications that balance aesthetic appeal with technical performance.
            I&apos;m constantly exploring new technologies and design approaches to enhance the
            digital experiences I build.
          </div>
        </SwissMotion>
        
        <SwissMotion 
          type="fade" 
          delay={getOptimizedDelay(0.3)}
          mobileOptimized={true}
        >
          <p className="swiss-body">
            When I&apos;m not coding, you can find me exploring design trends, reading about user experience,
            or experimenting with creative coding projects that push the boundaries of web development.
          </p>
        </SwissMotion>
      </SwissMotion>
      
      {/* Skills section - Updated with icons */}
      <SwissMotion 
        type="fade" 
        delay={getOptimizedDelay(0.8)} 
        className="mt-12 pt-8 border-t border-[var(--border)]"
        mobileOptimized={true}
      >
        <TextAnimation
          text="KEY SKILLS"
          variant="reveal"
          delay={getOptimizedDelay(0.2)}
          className="text-lg font-bold uppercase tracking-wider mb-4"
          mobileOptimized={true}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6">
          {SKILLS.map((skill, i) => (
            <SwissMotion
              key={skill.name}
              type={isMobile ? "fade" : "slide"}
              delay={getOptimizedDelay(0.9 + i * (isMobile ? 0.02 : 0.05))}
              duration={getOptimizedDuration(0.4)}
              className="flex items-center"
              whileHover={isMobile ? undefined : "lift"}
              mobileOptimized={true}
            >
              <div className="relative mr-3 flex items-center justify-center">
                {/* Icon container with Swiss-style square border */}
                <div className="w-8 h-8 border border-[var(--border)] bg-[var(--card-secondary)] flex items-center justify-center p-1.5">
                  <Image 
                    src={skill.icon} 
                    alt={skill.name} 
                    width={24} 
                    height={24}
                    className="object-contain"
                  />
                </div>
                {/* Swiss-style accent decoration */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--accent)]" />
              </div>
              <span className="text-sm uppercase tracking-wide">{skill.name}</span>
            </SwissMotion>
          ))}
        </div>
      </SwissMotion>
    </SwissMotion>
  );
}