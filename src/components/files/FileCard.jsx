import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CATEGORIES, ICONS } from '@/constants';

const FileCard = ({ file, onSelectFile, onDeleteFile, onToggleStar }) => {
  const categoryInfo = CATEGORIES[file.category] || {};
  const CategoryIcon = categoryInfo.icon || ICONS.FileText;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`glass-effect rounded-lg p-4 hover:neon-glow transition-all duration-300 cursor-pointer ${categoryInfo.borderColor} border-l-4`}
      onClick={() => onSelectFile(file)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg ${categoryInfo.bgColor}`}>
          <CategoryIcon className={`w-5 h-5 ${categoryInfo.color}`} />
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              onToggleStar(file.id);
            }}
            aria-label={file.starred ? "Unstar file" : "Star file"}
          >
            <ICONS.Star className={`w-4 h-4 ${file.starred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-400 hover:text-red-300"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteFile(file.id);
            }}
            aria-label="Delete file"
          >
            <ICONS.Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <h3 className="font-medium text-white mb-2 truncate" title={file.name}>{file.name}</h3>
      
      <div className="flex flex-wrap gap-1 mb-3 h-12 overflow-y-auto scrollbar-thin">
        {file.tags && file.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>{(file.size / 1024 / 1024).toFixed(1)} MB</span>
        <span>{new Date(file.uploadDate).toLocaleDateString()}</span>
      </div>
    </motion.div>
  );
};

export default FileCard;