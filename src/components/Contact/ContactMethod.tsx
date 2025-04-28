"use client";

import React from 'react';

interface ContactMethodProps {
  title: string;
  value: string;
  link: string;
  icon: React.ReactNode;
}

export default function ContactMethod({ title, value, link, icon }: ContactMethodProps) {
  return (
    <div className="flex">
      <div className="mr-4 mt-1">
        <div className="w-6 h-6 bg-[var(--card-hover)] flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div>
        <h4 className="font-bold uppercase tracking-wide mb-2">
          {title}
        </h4>
        <a 
          href={link} 
          className="text-[var(--accent)] hover:underline"
          target={title === "Email" ? "_self" : "_blank"}
          rel="noopener noreferrer"
        >
          {value}
        </a>
      </div>
    </div>
  );
}