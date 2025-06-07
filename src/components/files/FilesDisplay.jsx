import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FileCard from './FileCard';
import FileListItem from './FileListItem';
import { Upload } from 'lucide-react';

const FilesDisplay = ({ files, viewMode, onSelectFile, onDeleteFile, onToggleStar, searchTerm, selectedCategory }) => {
  if (files.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
          <Upload className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          {searchTerm || selectedCategory !== 'all' ? 'No files match your criteria' : 'Your RILLKILL is empty'}
        </h3>
        <p className="text-gray-400">
          {searchTerm || selectedCategory !== 'all' 
            ? 'Try adjusting your search or filters, or upload some files!'
            : 'Drag & drop or choose files to start organizing your production day!'}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      className={viewMode === 'grid' ? 'file-grid' : 'space-y-4'}
    >
      <AnimatePresence>
        {files.map(file => (
          viewMode === 'grid' ? (
            <FileCard 
              key={file.id} 
              file={file} 
              onSelectFile={onSelectFile} 
              onDeleteFile={onDeleteFile}
              onToggleStar={onToggleStar}
            />
          ) : (
            <FileListItem
              key={file.id}
              file={file}
              onSelectFile={onSelectFile}
              onDeleteFile={onDeleteFile}
              onToggleStar={onToggleStar}
            />
          )
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default FilesDisplay;