import React from 'react';
import { CATEGORIES, FILE_TYPES } from '@/constants';

export const categorizeFile = (file) => {
  const extension = file.name.split('.').pop().toLowerCase();
  
  // Check file type based on extension
  if (FILE_TYPES.VIDEO.includes(extension)) {
    return 'video';
  } else if (FILE_TYPES.SCRIPT.includes(extension)) {
    return 'script';
  } else if (FILE_TYPES.AUDIO.includes(extension)) {
    return 'audio';
  } else if (FILE_TYPES.IMAGE.includes(extension)) {
    // Images are categorized as notes by default
    return 'notes';
  }
  
  // Default to notes for any other file type
  return 'notes';
};

export const generateAITags = (fileName, category) => {
  const tags = [];
  const name = fileName.toLowerCase();
  
  // Video file tagging
  if (category === 'video') {
    if (name.includes('take') || name.includes('shot')) tags.push('Take');
    if (name.includes('master') || name.includes('wide')) tags.push('Master Shot');
    if (name.includes('close') || name.includes('cu')) tags.push('Close-up');
    if (name.includes('b-roll') || name.includes('broll')) tags.push('B-Roll');
    if (name.includes('interview')) tags.push('Interview');
    if (name.includes('vfx')) tags.push('VFX');
    if (name.includes('final')) tags.push('Final');
    if (name.includes('rough')) tags.push('Rough Cut');
  }
  
  // Script file tagging
  if (category === 'script') {
    if (name.includes('final') || name.includes('v')) tags.push('Final Draft');
    if (name.includes('scene')) tags.push('Scene');
    if (name.includes('treatment')) tags.push('Treatment');
    if (name.includes('storyboard')) tags.push('Storyboard');
    if (name.includes('shotlist')) tags.push('Shotlist');
    if (name.includes('revision')) tags.push('Revision');
    if (name.includes('notes')) tags.push('Notes');
  }
  
  // Audio file tagging
  if (category === 'audio') {
    if (name.includes('music') || name.includes('track') || name.includes('score')) tags.push('Music');
    if (name.includes('sfx') || name.includes('sound')) tags.push('SFX');
    if (name.includes('dialogue') || name.includes('adr')) tags.push('Dialogue');
    if (name.includes('ambience') || name.includes('atmos')) tags.push('Ambience');
    if (name.includes('vo') || name.includes('voice')) tags.push('Voice Over');
    if (name.includes('mix')) tags.push('Mix');
  }

  // Notes & images tagging
  if (category === 'notes') {
    if (name.includes('moodboard')) tags.push('Moodboard');
    if (name.includes('reference')) tags.push('Reference');
    if (name.includes('contact')) tags.push('Contact Sheet');
    if (name.includes('schedule')) tags.push('Schedule');
    if (name.includes('budget')) tags.push('Budget');
    if (name.includes('location')) tags.push('Location');
    if (name.includes('prop')) tags.push('Props');
    if (name.includes('costume')) tags.push('Costume');
    if (name.includes('makeup')) tags.push('Makeup');
  }
  
  // If no tags were assigned, mark as untagged
  return tags.length > 0 ? tags : ['Untagged'];
};

// Helper function to format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Helper function to get file icon based on type
export const getFileIcon = (fileType) => {
  if (fileType.startsWith('video/')) {
    return CATEGORIES.video.icon;
  } else if (fileType.startsWith('audio/')) {
    return CATEGORIES.audio.icon;
  } else if (fileType === 'application/pdf' || fileType.includes('document')) {
    return CATEGORIES.script.icon;
  } else {
    return CATEGORIES.notes.icon;
  }
};