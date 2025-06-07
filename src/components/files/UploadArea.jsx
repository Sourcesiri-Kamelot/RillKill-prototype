import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { ACCEPTED_FILE_EXTENSIONS } from '@/constants';

const UploadArea = ({ onFileUpload, isDragging, onDrop, onDragOver, onDragLeave }) => {
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(e.target.files);
      e.target.value = null; 
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-effect rounded-lg p-8 mb-8 text-center transition-all duration-300 ${
        isDragging ? 'drag-overlay' : ''
      }`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      aria-label="File upload area"
    >
      <div className="animate-float">
        <Upload className="w-16 h-16 text-primary mx-auto mb-4" />
      </div>
      <h2 className="text-2xl font-semibold text-white mb-2">
        {isDragging ? 'Drop your files here!' : 'Drag & Drop Your Production Files'}
      </h2>
      <p className="text-gray-400 mb-6">
        MP4, TXT, PDF, JPG, MP3 - Auto-organized by AI
      </p>
      <input
        type="file"
        multiple
        accept={ACCEPTED_FILE_EXTENSIONS}
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
        aria-describedby="file-upload-description"
      />
      <label htmlFor="file-upload">
        <Button className="cursor-pointer">
          <Upload className="w-4 h-4 mr-2" />
          Choose Files
        </Button>
      </label>
      <p id="file-upload-description" className="sr-only">
        Supported file types: {ACCEPTED_FILE_EXTENSIONS.replaceAll(',', ', ')}
      </p>
    </motion.div>
  );
};

export default UploadArea;