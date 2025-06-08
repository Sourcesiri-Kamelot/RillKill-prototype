import React, { useState, useEffect, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { categorizeFile, generateAITags } from '@/utils/fileUtils';

export const useFiles = () => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  // Load files from localStorage on component mount
  useEffect(() => {
    const savedFiles = localStorage.getItem('rillkill-files');
    if (savedFiles) {
      try {
        const parsedFiles = JSON.parse(savedFiles);
        // Properly restore files with their dataUrls
        setFiles(parsedFiles.map(file => ({
          ...file, 
          url: file.dataUrl || (file.url || '')
        })));
      } catch (error) {
        console.error("Failed to parse files from localStorage", error);
        localStorage.removeItem('rillkill-files'); 
      }
    }
  }, []);

  // Save files to localStorage whenever they change
  useEffect(() => {
    if (files.length > 0) {
      const filesToSave = files.map(file => {
        // Ensure we're storing the dataUrl for persistence
        return {
          ...file,
          dataUrl: file.url, // Store the dataUrl for later retrieval
        };
      });
      localStorage.setItem('rillkill-files', JSON.stringify(filesToSave));
    } else {
      // If no files, clear storage
      localStorage.removeItem('rillkill-files');
    }
  }, [files]);

  // Convert file to data URL for storage and preview
  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  // Handle file upload with proper error handling
  const handleFileUpload = useCallback(async (uploadedFilesArray) => {
    if (!uploadedFilesArray || uploadedFilesArray.length === 0) {
      toast({
        title: "Upload Error",
        description: "No files selected for upload.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Processing files...",
      description: "Please wait while we organize your files.",
    });

    const newFilesPromises = Array.from(uploadedFilesArray).map(async (file) => {
      try {
        const category = categorizeFile(file);
        const tags = generateAITags(file.name, category);
        const dataUrl = await readFileAsDataURL(file);
        
        return {
          id: Date.now() + Math.random().toString(36).substring(2, 15),
          name: file.name,
          size: file.size,
          type: file.type,
          category,
          tags,
          uploadDate: new Date().toISOString(),
          url: dataUrl,
          dataUrl: dataUrl, // Store dataUrl explicitly for persistence
          starred: false,
        };
      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error);
        throw new Error(`Failed to process ${file.name}`);
      }
    });

    try {
      const newFiles = await Promise.all(newFilesPromises);
      setFiles(prev => [...prev, ...newFiles]);
      toast({
        title: "Files uploaded successfully!",
        description: `${newFiles.length} file(s) added and auto-categorized.`,
        variant: "default",
      });
    } catch (error) {
      console.error("Error processing files:", error);
      toast({
        title: "Upload Error",
        description: error.message || "Could not process some files. Please try again.",
        variant: "destructive",
      });
    }
  }, []);

  // Handle drag and drop functionality
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFileUpload(droppedFiles);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    if (e.currentTarget && !e.currentTarget.contains(e.relatedTarget)) {
      setIsDragging(false);
    }
  }, []);

  // Delete file with proper cleanup
  const deleteFile = useCallback((fileId) => {
    setFiles(prev => {
      const fileToDelete = prev.find(f => f.id === fileId);
      if (fileToDelete && fileToDelete.url && fileToDelete.url.startsWith('blob:')) {
        URL.revokeObjectURL(fileToDelete.url);
      }
      return prev.filter(f => f.id !== fileId);
    });
    toast({
      title: "File deleted",
      description: "File removed from your collection.",
    });
  }, []);

  // Toggle star status for a file
  const toggleStar = useCallback((fileId) => {
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, starred: !f.starred } : f
    ));
  }, []);

  return {
    files,
    setFiles,
    isDragging,
    handleFileUpload,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    deleteFile,
    toggleStar,
  };
};