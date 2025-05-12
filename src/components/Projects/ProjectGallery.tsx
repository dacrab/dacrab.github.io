"use client";

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';


// Types
interface ProjectGalleryProps {
  projectTitle: string;
  accentColor?: 'primary' | 'secondary' | 'tertiary';
  onClose: () => void;
  galleryFolder?: string;
}

type ArgiconPageKeys = 'home' | 'projects' | 'services' | 'contact';
type GSMPageKeys = 'home' | 'about' | 'services' | 'contact' | 'stores' | 'loans' | 'sell' | 'calculator';
type DesignDashPageKeys = 'home' | 'about' | 'projects' | 'services' | 'contact';
type PageKeys = ArgiconPageKeys | GSMPageKeys | DesignDashPageKeys;
type LanguageKeys = 'en' | 'el';

// Constants
const LANGUAGE_OPTIONS: LanguageKeys[] = ['en', 'el'];
const LANGUAGE_LABELS: Record<LanguageKeys, string> = {
  'en': 'English',
  'el': 'Greek'
};

// Define project types and page mapping
type ProjectTypes = 'argicon' | 'gsm' | 'designdash';
type ProjectPageMap = {
  argicon: ArgiconPageKeys[];
  gsm: GSMPageKeys[];
  designdash: DesignDashPageKeys[];
};

const PROJECT_PAGES: ProjectPageMap = {
  'argicon': ['home', 'projects', 'services', 'contact'],
  'gsm': ['home', 'about', 'services', 'contact', 'stores', 'loans', 'sell', 'calculator'],
  'designdash': ['home', 'about', 'projects', 'services', 'contact']
};

// Type-safe helper function to get the index of a page in project pages
function getPageIndex(page: PageKeys, projectType: keyof ProjectPageMap): number {
  // Type assertion to PageKeys[] is safe because we know the structure of PROJECT_PAGES
  const pages = PROJECT_PAGES[projectType] as PageKeys[];
  return pages.indexOf(page);
}

const IMAGE_MAP = {
  'argicon': {
    'en': {
      'home': 'en-home.png',
      'projects': 'en-projects.png',
      'services': 'en-services.png',
      'contact': 'en-contact.png'
    },
    'el': {
      'home': 'el-home.png',
      'projects': 'el-projects.png',
      'services': 'el-services.png',
      'contact': 'el-contact.png'
    }
  },
  'gsm': {
    'en': {
      'home': 'home-en.png',
      'about': 'about-en.png',
      'services': 'services-en.png',
      'contact': 'contact-en.png',
      'stores': 'stores-en.png',
      'loans': 'loans-en.png',
      'sell': 'sell-en.png',
      'calculator': 'calculator-en.png'
    },
    'el': {
      'home': 'home-el.png',
      'about': 'about-el.png',
      'services': 'services-el.png',
      'contact': 'contact-el.png',
      'stores': 'stores-el.png',
      'loans': 'loans-el.png',
      'sell': 'sell-el.png',
      'calculator': 'calculator-el.png'
    }
  },
  'designdash': {
    'en': {
      'home': 'home-en.png',
      'about': 'about-en.png',
      'projects': 'projects-en.png',
      'services': 'services-en.png',
      'contact': 'contact-en.png'
    },
    'el': {
      'home': 'home-el.png',
      'about': 'about-el.png',
      'projects': 'projects-el.png',
      'services': 'services-el.png',
      'contact': 'contact-el.png'
    }
  }
};

const ProjectGallery = ({ 
  projectTitle, 
  accentColor = 'primary', 
  onClose,
  galleryFolder = 'argicon'
}: ProjectGalleryProps) => {
  // State
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageKeys>('en');
  const [selectedPage, setSelectedPage] = useState<PageKeys>('home');
  const [imageInfo, setImageInfo] = useState<{ path: string; alt: string } | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  
  // Get available pages for this project
  const pageTypes = PROJECT_PAGES[galleryFolder as ProjectTypes] || PROJECT_PAGES['argicon'];

  // Get image path from mapping
  const getImagePath = useCallback((language: LanguageKeys, page: PageKeys): string => {
    const folderKey = galleryFolder as keyof typeof IMAGE_MAP;
    const filename = IMAGE_MAP[folderKey][language][page as keyof (typeof IMAGE_MAP)[typeof folderKey][typeof language]];
    return `/${galleryFolder}/${filename}`;
  }, [galleryFolder]);

  // Update selected image
  const updateSelectedImage = useCallback((language: LanguageKeys, page: PageKeys) => {
    setImageInfo({
      path: getImagePath(language, page),
      alt: `${projectTitle} ${language.toUpperCase()} ${page} page screenshot`
    });
    setImageLoading(true);
  }, [getImagePath, projectTitle]);

  // Event handlers
  const handleLanguageChange = useCallback((language: LanguageKeys) => {
    setSelectedLanguage(language);
    updateSelectedImage(language, selectedPage);
  }, [selectedPage, updateSelectedImage]);

  const handlePageChange = useCallback((page: PageKeys) => {
    setSelectedPage(page);
    updateSelectedImage(selectedLanguage, page);
  }, [selectedLanguage, updateSelectedImage]);

  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
  }, []);

  // Handle closing the gallery with proper animation
  const handleClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  // Create portal container element on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Create portal element if it doesn't exist
      let element = document.getElementById('gallery-portal-container');
      if (!element) {
        element = document.createElement('div');
        element.id = 'gallery-portal-container';
        document.body.appendChild(element);
      }
      setPortalContainer(element);
      setMounted(true);
      updateSelectedImage('en', 'home');
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
      setMounted(false);
    };
  }, [updateSelectedImage]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isVisible) return;
      
      switch (e.key) {
        case 'Escape':
          handleClose();
          break;
        case 'ArrowLeft':
          const prevIndex = getPageIndex(selectedPage, galleryFolder as ProjectTypes) - 1;
          if (prevIndex >= 0) {
            handlePageChange(pageTypes[prevIndex] as PageKeys);
          }
          break;
        case 'ArrowRight':
          const nextIndex = getPageIndex(selectedPage, galleryFolder as ProjectTypes) + 1;
          if (nextIndex < pageTypes.length) {
            handlePageChange(pageTypes[nextIndex] as PageKeys);
          }
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, selectedPage, pageTypes, handleClose, handlePageChange, galleryFolder]);

  // If not mounted or no portal container, don't render
  if (!mounted || !portalContainer) return null;

  // Render portal
  return createPortal(
    <AnimatePresence mode="wait" onExitComplete={onClose}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 overflow-hidden flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={handleClose}
          key="gallery-overlay"
        >
          <motion.div
            className="relative bg-[var(--card)] max-w-[92%] lg:max-w-6xl w-full max-h-[92vh] overflow-hidden rounded-md shadow-xl flex flex-col"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.23, 1, 0.32, 1]
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Gallery header */}
            <div className="px-6 py-4 border-b border-[var(--border)] bg-[var(--card)] flex justify-between items-center sticky top-0 z-20">
              <h3 className="text-lg font-medium text-[var(--foreground)] flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-[var(--accent-${accentColor})]`}></div>
                {projectTitle} <span className="text-[var(--muted)] font-normal">/ {selectedPage}</span>
              </h3>
              
              <div className="flex items-center gap-3">
                {/* Language selector */}
                <div className="hidden md:flex items-center text-sm gap-1.5 mr-4">
                  {LANGUAGE_OPTIONS.map(lang => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                        selectedLanguage === lang 
                          ? `text-[var(--accent-${accentColor})] font-medium border border-[var(--accent-${accentColor})]` 
                          : 'text-[var(--muted)] hover:text-[var(--foreground)] border border-transparent'
                      }`}
                    >
                      {LANGUAGE_LABELS[lang]}
                    </button>
                  ))}
                </div>
              
                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="p-2 rounded-full transition-all duration-200 hover:bg-[var(--background)] text-[var(--muted)] hover:text-[var(--foreground)] cursor-pointer"
                  aria-label="Close gallery"
                  type="button"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Main content area */}
            <div className="flex flex-col flex-1 overflow-hidden">
              {/* Image display area */}
              <div className="relative flex-1 overflow-auto flex items-start justify-center bg-[var(--background)]">
                <AnimatePresence mode="wait">
                  {imageInfo && (
                    <motion.div
                      key={`${selectedLanguage}-${selectedPage}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full min-h-full flex items-start justify-center p-6"
                    >
                      {/* Loading state */}
                      {imageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center z-20 bg-[var(--background)]">
                          <div className="flex flex-col items-center">
                            <div className="w-6 h-6 border-2 border-t-[var(--accent-${accentColor})] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                          </div>
                        </div>
                      )}
                      
                      {/* Image - now scrollable */}
                      <div className="relative max-w-full rounded-md overflow-hidden select-none shadow-lg">
                        <Image
                          src={imageInfo.path}
                          alt={imageInfo.alt}
                          width={1600}
                          height={1000}
                          style={{ 
                            width: 'auto',
                            objectFit: 'contain',
                            minHeight: '200px'
                          }}
                          className={`
                            transition-opacity duration-300
                            ${imageLoading ? 'opacity-0' : 'opacity-100'}
                          `}
                          onLoad={handleImageLoad}
                          quality={100}
                          priority
                        />
                        
                        {/* Image indicator overlay */}
                        <div className="absolute top-3 right-3 opacity-60 px-2.5 py-1 rounded bg-black/40 backdrop-blur-md text-white text-xs">
                          {LANGUAGE_LABELS[selectedLanguage]}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Navigation arrows for desktop - these sit on the sides of the image */}
                <button
                  onClick={() => {
                    const prevIndex = getPageIndex(selectedPage, galleryFolder as ProjectTypes) - 1;
                    if (prevIndex >= 0) {
                      handlePageChange(pageTypes[prevIndex] as PageKeys);
                    }
                  }}
                  className={`absolute left-3 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white/90 hover:bg-black/40 transition-all duration-200 cursor-pointer ${
                    getPageIndex(selectedPage, galleryFolder as ProjectTypes) <= 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-60 hover:opacity-100'
                  }`}
                  disabled={getPageIndex(selectedPage, galleryFolder as ProjectTypes) <= 0}
                  aria-label="Previous page"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                
                <button
                  onClick={() => {
                    const nextIndex = getPageIndex(selectedPage, galleryFolder as ProjectTypes) + 1;
                    if (nextIndex < pageTypes.length) {
                      handlePageChange(pageTypes[nextIndex] as PageKeys);
                    }
                  }}
                  className={`absolute right-3 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white/90 hover:bg-black/40 transition-all duration-200 cursor-pointer ${
                    getPageIndex(selectedPage, galleryFolder as ProjectTypes) >= pageTypes.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-60 hover:opacity-100'
                  }`}
                  disabled={getPageIndex(selectedPage, galleryFolder as ProjectTypes) >= pageTypes.length - 1}
                  aria-label="Next page"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              </div>
              
              {/* Bottom navigation */}
              <div className="px-6 py-3 border-t border-[var(--border)] bg-[var(--card)]">
                <div className="flex items-center">
                  {/* Page mini-navigation */}
                  <div className="overflow-x-auto hide-scrollbar flex-1 flex items-center justify-center">
                    <div className="flex gap-2 px-1">
                      {pageTypes.map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page as PageKeys)}
                          className={`
                            px-3 py-1.5 text-xs whitespace-nowrap rounded transition-colors cursor-pointer
                            ${selectedPage === page 
                              ? `bg-[var(--accent-${accentColor})/10] text-[var(--accent-${accentColor})] font-medium` 
                              : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--background)]'
                            }
                          `}
                        >
                          {page.charAt(0).toUpperCase() + page.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Page position */}
                  <div className="text-xs font-mono text-[var(--muted)] ml-3 whitespace-nowrap pl-3 border-l border-[var(--border)]">
                    {getPageIndex(selectedPage, galleryFolder as ProjectTypes) + 1} / {pageTypes.length}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    portalContainer
  );
};

export default ProjectGallery;