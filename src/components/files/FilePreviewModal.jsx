import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Star, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CATEGORIES } from '@/constants';

const FilePreviewModal = ({ file, onClose, onDeleteFile, onToggleStar }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (file) {
      setIsLoading(true);
      setError(null);
      
      // Simulate loading time for preview
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [file]);

  if (!file) return null;

  const handleDelete = () => {
    onDeleteFile?.(file.id);
    onClose();
  };

  const handleToggleStar = () => {
    onToggleStar?.(file.id);
  };

  const handleDownload = () => {
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const categoryInfo = CATEGORIES[file.category] || CATEGORIES.notes;
  const isVideo = file.type.startsWith('video/');
  const isAudio = file.type.startsWith('audio/');
  const isPdf = file.type === 'application/pdf';
  const isImage = file.type.startsWith('image/');
  const isText = file.type === 'text/plain';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-900 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-lg ${categoryInfo.bgColor} flex items-center justify-center mr-3`}>
                {React.createElement(categoryInfo.icon, { className: categoryInfo.color })}
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">{file.name}</h3>
                <p className="text-sm text-gray-400">
                  {new Intl.DateTimeFormat('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  }).format(new Date(file.uploadDate))}
                  {' · '}
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-black/30">
            {isLoading ? (
              <div className="animate-pulse text-gray-400">Loading preview...</div>
            ) : error ? (
              <div className="text-red-400">{error}</div>
            ) : (
              <>
                {isVideo && (
                  <video 
                    controls 
                    className="max-h-[60vh] max-w-full" 
                    src={file.url}
                    onError={() => setError("Failed to load video")}
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
                {isAudio && (
                  <audio 
                    controls 
                    className="w-full" 
                    src={file.url}
                    onError={() => setError("Failed to load audio")}
                  >
                    Your browser does not support the audio tag.
                  </audio>
                )}
                {isPdf && (
                  <iframe 
                    src={file.url} 
                    className="w-full h-[60vh]"
                    title={file.name}
                    onError={() => setError("Failed to load PDF")}
                  />
                )}
                {isImage && (
                  <img 
                    src={file.url} 
                    alt={file.name} 
                    className="max-h-[60vh] max-w-full object-contain"
                    onError={() => setError("Failed to load image")}
                  />
                )}
                {isText && (
                  <pre className="bg-gray-800 p-4 rounded-lg w-full h-[60vh] overflow-auto text-gray-300 whitespace-pre-wrap">
                    {/* Text content would be loaded here */}
                    Loading text content...
                  </pre>
                )}
                {!isVideo && !isAudio && !isPdf && !isImage && !isText && (
                  <div className="text-center">
                    <p className="text-gray-400 mb-4">Preview not available for this file type</p>
                    <Button onClick={handleDownload}>
                      <Download className="w-4 h-4 mr-2" />
                      Download File
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-800 flex justify-between">
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" onClick={handleToggleStar}>
                <Star className={`w-4 h-4 mr-2 ${file.starred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                {file.starred ? 'Starred' : 'Star'}
              </Button>
              <Button variant="ghost" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2 text-gray-400" />
                Download
              </Button>
            </div>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FilePreviewModal;
