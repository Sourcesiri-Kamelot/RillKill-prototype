import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CATEGORIES, ICONS } from '@/constants';

const FileListItem = ({ file, onSelectFile, onDeleteFile, onToggleStar }) => {
  const categoryInfo = CATEGORIES[file.category] || {};
  const CategoryIcon = categoryInfo.icon || ICONS.FileText;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={`glass-effect rounded-lg p-3 hover:neon-glow transition-all duration-300 cursor-pointer flex items-center space-x-4 ${categoryInfo.borderColor} border-l-4`}
      onClick={() => onSelectFile(file)}
    >
      <div className={`p-2 rounded-lg ${categoryInfo.bgColor}`}>
        <CategoryIcon className={`w-5 h-5 ${categoryInfo.color}`} />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-white truncate" title={file.name}>{file.name}</h3>
        <div className="flex flex-wrap gap-1 mt-1">
          {file.tags && file.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-1.5 py-0.5 bg-primary/20 text-primary text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {file.tags && file.tags.length > 3 && (
            <span className="px-1.5 py-0.5 bg-gray-700 text-gray-300 text-xs rounded-full">
              +{file.tags.length - 3}
            </span>
          )}
        </div>
      </div>
      
      <div className="text-sm text-gray-400 hidden md:block">{(file.size / 1024 / 1024).toFixed(1)} MB</div>
      <div className="text-sm text-gray-400 hidden lg:block">{new Date(file.uploadDate).toLocaleDateString()}</div>
      
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
    </motion.div>
  );
};

export default FileListItem;