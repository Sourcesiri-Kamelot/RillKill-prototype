import React from 'react';
import { Video, FileText, Music, StickyNote, Download, Eye, Trash2, Star, Upload, Search, Filter, Grid, List, Settings, Zap, ChevronDown, ChevronUp, Columns } from 'lucide-react';

export const CATEGORIES = {
  video: { name: 'Video Files', icon: Video, color: 'text-red-400', bgColor: 'bg-red-500/10', borderColor: 'border-red-500/50' },
  script: { name: 'Scripts', icon: FileText, color: 'text-green-400', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/50' },
  audio: { name: 'Audio Files', icon: Music, color: 'text-yellow-400', bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-500/50' },
  notes: { name: 'Notes & Lists', icon: StickyNote, color: 'text-purple-400', bgColor: 'bg-purple-500/10', borderColor: 'border-purple-500/50' }
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