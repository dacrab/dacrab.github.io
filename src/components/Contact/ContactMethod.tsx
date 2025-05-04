"use client";

import React from 'react';
import { ContactMethod as ContactMethodType } from './contactData';
import SwissMotion from '@/components/SwissMotion';
import TextAnimation from '@/components/TextAnimation';

interface ContactMethodProps {
  method: ContactMethodType;
  index: number;
}

export default function ContactMethod({ method, index }: ContactMethodProps) {
  return (
    <SwissMotion
      type="slide"
      delay={0.3 + index * 0.1}
      duration={0.5}
      whileHover="lift"
      className="flex flex-col items-start bg-[var(--card)] border border-[var(--border)] p-6 rounded-sm"
    >
      <SwissMotion 
        type="scale" 
        delay={0.4 + index * 0.1} 
        className="mb-4 text-[var(--accent)]"
      >
        {method.icon}
      </SwissMotion>
      
      <TextAnimation
        text={method.title}
        variant="reveal"
        delay={0.5 + index * 0.1}
        className="font-semibold text-lg mb-1"
      />
      
      <SwissMotion type="fade" delay={0.6 + index * 0.1} className="mb-4">
        <a 
          href={method.link} 
          className="text-[var(--foreground-secondary)] hover:text-[var(--accent)] transition-colors duration-200"
        >
          {method.value}
        </a>
      </SwissMotion>
    </SwissMotion>
  );
}