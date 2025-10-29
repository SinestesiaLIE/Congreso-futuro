import React from 'react';

interface TagCloudProps {
  tags: string[];
}

const TagCloud: React.FC<TagCloudProps> = ({ tags }) => {
  // Pre-defined styles for variety to make the cloud more dynamic
  const styles = [
    'text-cyan-300 text-lg hover:text-cyan-200',
    'text-purple-300 text-sm hover:text-purple-200',
    'text-teal-300 text-md hover:text-teal-200',
    'text-cyan-400 text-xl font-bold hover:text-cyan-300',
    'text-purple-400 text-base hover:text-purple-300',
    'text-teal-400 text-sm font-light hover:text-teal-300',
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 p-4 bg-gray-900/30 rounded-lg">
      {tags.map((tag, index) => (
        <span
          key={index}
          className={`
            bg-gray-800/70 border border-gray-700/50 rounded-full px-5 py-2
            cursor-default transition-all duration-300 ease-in-out
            transform hover:bg-gray-700 hover:border-cyan-500/50 hover:scale-110
            ${styles[index % styles.length]}
          `}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default TagCloud;
