import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CATEGORIES, ICONS } from '@/constants';

const FilePreviewModal = ({ file, onClose }) => {
  if (!file) return null;

  const categoryInfo = CATEGORIES[file.category] || {};
  const isVideo = file.category === 'video';
  const isScript = file.category === 'script';
  const isImage = file.category === 'image';
  const isAudio = file.category === 'audio';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="file-preview-title"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-effect rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 id="file-preview-title" className="text-xl font-semibold text-white truncate" title={file.name}>
            {file.name}
          </h2>
          <Button variant="ghost" onClick={onClose} aria-label="Close preview">
            ✕
          </Button>
        </div>
        
        <div className="mb-4 aspect-video bg-black rounded-lg flex items-center justify-center">
          {isVideo && (
            <video
              controls
              className="w-full h-full max-h-[60vh] rounded-lg object-contain"
              src={file.url}
              aria-label={`Video player for ${file.name}`}
            >
              Your browser does not support video playback.
            </video>
          )}
          
          {isImage && (
             <img-replace src={file.url} alt={`Preview of ${file.name}`} className="w-full h-full max-h-[60vh] rounded-lg object-contain" />
          )}

          {isAudio && (
            <div className="p-4 flex flex-col items-center justify-center w-full h-full">
              <ICONS.Music className="w-24 h-24 text-primary mb-4" />
              <audio controls src={file.url} className="w-full max-w-md" aria-label={`Audio player for ${file.name}`}>
                Your browser does not support audio playback.
              </audio>
            </div>
          )}
          
          {isScript && (file.type === 'application/pdf' || file.type.includes('text')) && (
            <div className="text-center py-8 w-full h-full flex flex-col items-center justify-center">
              <ICONS.FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              {file.type === 'application/pdf' ? (
                <>
                  <p className="text-gray-400">PDF preview not available in browser.</p>
                  <Button className="mt-4" onClick={() => window.open(file.url, '_blank')} aria-label="Download PDF to view">
                    <ICONS.Download className="w-4 h-4 mr-2" />
                    Download to View
                  </Button>
                </>
              ) : (
                 <p className="text-gray-400">Text file preview not available. Download to view.</p>
              )}
            </div>
          )}
          {isScript && !file.type.includes('pdf') && !file.type.includes('text') && (
             <div className="text-center py-8 w-full h-full flex flex-col items-center justify-center">
                <ICONS.FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Preview not available for this file type.</p>
                 <Button className="mt-4" onClick={() => window.open(file.url, '_blank')} aria-label="Download file to view">
                    <ICONS.Download className="w-4 h-4 mr-2" />
                    Download to View
                  </Button>
             </div>
          )}
        </div>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Category:</span>
            <span className="ml-2 text-white">{categoryInfo.name}</span>
          </div>
          <div>
            <span className="text-gray-400">Size:</span>
            <span className="ml-2 text-white">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
          </div>
          <div>
            <span className="text-gray-400">Type:</span>
            <span className="ml-2 text-white">{file.type || 'N/A'}</span>
          </div>
          <div>
            <span className="text-gray-400">Upload Date:</span>
            <span className="ml-2 text-white">{new Date(file.uploadDate).toLocaleDateString()}</span>
          </div>
          <div className="md:col-span-2">
            <span className="text-gray-400">Tags:</span>
            <span className="ml-2 text-white">{file.tags && file.tags.join(', ')}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FilePreviewModal;