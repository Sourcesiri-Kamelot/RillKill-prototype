import React, { useMemo } from 'react';
import { useFiles } from '@/hooks/useFiles';
import UploadArea from '@/components/files/UploadArea';
import FilterControls from '@/components/files/FilterControls';
import CategoryStats from '@/components/files/CategoryStats';
import FilesDisplay from '@/components/files/FilesDisplay';
import FilePreviewModal from '@/components/files/FilePreviewModal';

const FileManagerPage = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, selectedFile, setSelectedFile }) => {
  const {
    files,
    isDragging,
    handleFileUpload,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    deleteFile,
    toggleStar,
  } = useFiles();

  const filteredFiles = useMemo(() => {
    return files.filter(file => {
      const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (file.tags && file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      const matchesCategory = selectedCategory === 'all' || file.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }).sort((a,b) => new Date(b.uploadDate) - new Date(a.uploadDate)); 
  }, [files, searchTerm, selectedCategory]);

  // This component now expects viewMode from App.jsx (passed via MainLayout context or props if needed)
  // For simplicity, I'm assuming viewMode is managed at App level and passed down if FilesDisplay needs it.
  // If viewMode is specific to this page, it should be managed here.
  // For now, I'll pass a default or assume it's handled by FilesDisplay if not passed.

  return (
    <>
      <UploadArea
        onFileUpload={handleFileUpload}
        isDragging={isDragging}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      />

      <FilterControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <CategoryStats files={files} />

      <FilesDisplay
        files={filteredFiles}
        // viewMode={viewMode} // This would come from App.jsx state
        onSelectFile={setSelectedFile}
        onDeleteFile={deleteFile}
        onToggleStar={toggleStar}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
      />

      <FilePreviewModal
        file={selectedFile}
        onClose={() => setSelectedFile(null)}
      />
    </>
  );
};

export default FileManagerPage;
