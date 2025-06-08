import React from 'react';
import { motion } from 'framer-motion';
import { CATEGORIES } from '@/constants';

const CategoryStats = ({ files }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {Object.entries(CATEGORIES).map(([key, category]) => {
        const count = files.filter(f => f.category === key).length;
        const Icon = category.icon;
        return (
          <motion.div
            key={key}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-effect rounded-lg p-4 text-center"
            aria-label={`${category.name}: ${count} files`}
          >
            <Icon className={`w-8 h-8 ${category.color} mx-auto mb-2`} aria-hidden="true" />
            <div className="text-2xl font-bold text-white">{count}</div>
            <div className="text-sm text-gray-400">{category.name}</div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default CategoryStats;