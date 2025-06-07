import React, { useState, useEffect, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { categorizeFile, generateAITags } from '@/utils/fileUtils';

export const useFiles = () => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const savedFiles = localStorage.getItem('rillkill-files');
    if (savedFiles) {
      try {
        const parsedFiles = JSON.parse(savedFiles);
        setFiles(parsedFiles.map(file => ({...file, url: file.dataUrl || URL.createObjectURL(new Blob())}))); // Recreate object URLs if necessary
      } catch (error) {
        console.error("Failed to parse files from localStorage", error);
        localStorage.removeItem('rillkill-files'); 
      }
    }
  }, []);

  useEffect(() => {
    const filesToSave = files.map(({ url, ...rest }) => {
      if (url && url.startsWith('blob:')) {
        return { ...rest, dataUrl: null }; 
      }
      return rest;
    });
    localStorage.setItem('rillkill-files', JSON.stringify(filesToSave));
  }, [files]);

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = useCallback(async (uploadedFilesArray) => {
    const newFilesPromises = Array.from(uploadedFilesArray).map(async (file) => {
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
        starred: false,
      };
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
        description: "Could not process some files. Please try again.",
        variant: "destructive",
      });
    }
  }, []);

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