import React from 'react';
import Image from 'next/image';
import { Skill } from './types';

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <a
      href={skill.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-2 p-3 rounded-sm hover:bg-[var(--card-hover)] transition-colors"
    >
      <div className="w-10 h-10 flex items-center justify-center">
        <Image 
          src={skill.icon} 
          alt={`${skill.name} logo`}
          width={28} 
          height={28} 
          className="w-7 h-7 object-contain"
        />
      </div>
      
      <span className="text-sm font-medium text-center">
        {skill.name}
      </span>
    </a>
  );
}