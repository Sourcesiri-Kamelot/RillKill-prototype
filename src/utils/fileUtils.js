import React from 'react';
import { CATEGORIES } from '@/constants';

export const categorizeFile = (file) => {
  const extension = file.name.split('.').pop().toLowerCase();
  for (const categoryKey in CATEGORIES) {
    if (CATEGORIES[categoryKey].acceptedTypes.includes(extension)) {
      return categoryKey;
    }
  }
  return 'notes'; 
};

export const generateAITags = (fileName, category) => {
  const tags = [];
  const name = fileName.toLowerCase();
  
  if (category === 'video') {
    if (name.includes('take') || name.includes('shot')) tags.push('Take');
    if (name.includes('master') || name.includes('wide')) tags.push('Master Shot');
    if (name.includes('close') || name.includes('cu')) tags.push('Close-up');
    if (name.includes('b-roll') || name.includes('broll')) tags.push('B-Roll');
    if (name.includes('interview')) tags.push('Interview');
    if (name.includes('vfx')) tags.push('VFX');
  }
  
  if (category === 'script') {
    if (name.includes('final') || name.includes('v')) tags.push('Final Draft');
    if (name.includes('scene')) tags.push('Scene');
    if (name.includes('treatment')) tags.push('Treatment');
    if (name.includes('storyboard')) tags.push('Storyboard');
    if (name.includes('shotlist')) tags.push('Shotlist');
  }
  
  if (category === 'audio') {
    if (name.includes('music') || name.includes('track') || name.includes('score')) tags.push('Music');
    if (name.includes('sfx') || name.includes('sound')) tags.push('SFX');
    if (name.includes('dialogue') || name.includes('adr')) tags.push('Dialogue');
    if (name.includes('ambience') || name.includes('atmos')) tags.push('Ambience');
  }

  if (category === 'notes') {
    if (name.includes('moodboard')) tags.push('Moodboard');
    if (name.includes('reference')) tags.push('Reference');
    if (name.includes('contact')) tags.push('Contact Sheet');
  }
  
  return tags.length > 0 ? tags : ['Untagged'];
};