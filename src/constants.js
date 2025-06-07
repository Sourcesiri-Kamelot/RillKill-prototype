import React from 'react';
import { Video, FileText, Music, StickyNote, Download, Eye, Trash2, Star, Upload, Search, Filter, Grid, List, Settings, Zap, ChevronDown, ChevronUp, Columns } from 'lucide-react';

export const CATEGORIES = {
  video: { 
    name: 'Video Files', 
    icon: Video, 
    color: 'text-red-400', 
    bgColor: 'bg-red-500/10', 
    borderColor: 'border-red-500/50',
    acceptedTypes: ['mp4', 'mov', 'avi', 'mkv', 'webm']
  },
  script: { 
    name: 'Scripts', 
    icon: FileText, 
    color: 'text-green-400', 
    bgColor: 'bg-green-500/10', 
    borderColor: 'border-green-500/50',
    acceptedTypes: ['pdf', 'txt', 'doc', 'docx']
  },
  audio: { 
    name: 'Audio Files', 
    icon: Music, 
    color: 'text-yellow-400', 
    bgColor: 'bg-yellow-500/10', 
    borderColor: 'border-yellow-500/50',
    acceptedTypes: ['mp3', 'wav', 'aac', 'flac', 'm4a']
  },
  notes: { 
    name: 'Notes & Lists', 
    icon: StickyNote, 
    color: 'text-purple-400', 
    bgColor: 'bg-purple-500/10', 
    borderColor: 'border-purple-500/50',
    acceptedTypes: ['jpg', 'jpeg', 'png', 'gif', 'txt', 'md']
  }
};

export const ICONS = {
  Video,
  FileText,
  Music,
  StickyNote,
  Download,
  Eye,
  Trash2,
  Star,
  Upload,
  Search,
  Filter,
  Grid,
  List,
  Settings,
  Zap,
  ChevronDown,
  ChevronUp,
  Columns,
};

export const FILE_TYPES = {
  VIDEO: ['mp4', 'mov', 'avi', 'mkv', 'webm'],
  SCRIPT: ['pdf', 'txt', 'doc', 'docx'],
  AUDIO: ['mp3', 'wav', 'aac', 'flac', 'm4a'],
  IMAGE: ['jpg', 'jpeg', 'png', 'gif'],
};

export const ACCEPTED_FILE_EXTENSIONS = [
  ...FILE_TYPES.VIDEO,
  ...FILE_TYPES.SCRIPT,
  ...FILE_TYPES.AUDIO,
  ...FILE_TYPES.IMAGE,
].map(ext => `.${ext}`).join(',');

export const PREMIUM_FEATURES_MODAL_ID = 'premium-features-modal';

// App configuration
export const APP_CONFIG = {
  name: 'RILLKILL.APP',
  tagline: 'The Ultimate Production-Day Organizer',
  description: 'The no-bullshit, production-day file manager that keeps everything centralized for directors, crew, and editors.',
  version: '1.0.0',
  maxUploadSize: 100 * 1024 * 1024, // 100MB
  maxFileCount: 100,
  supportEmail: 'support@rillkik.com',
};