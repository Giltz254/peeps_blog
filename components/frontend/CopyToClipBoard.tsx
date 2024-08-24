"use client";
import { useState } from 'react';
import { FiClipboard, FiCheck } from 'react-icons/fi';

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      return
    }
  };

  return (
    <button
      className="relative w-9 h-9 bg-secondary z-10 text-gray-300 rounded-lg outline-none border-none cursor-pointer focus:outline-none hover:bg-secondary/90"
      onClick={handleCopy}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className={`absolute left-1/2 transform -translate-x-1/2 top-full mt-2 whitespace-nowrap text-xs p-2 bg-white text-black capitalize font-light 
          ${copied ? 'opacity-100 visible' : hovered ? 'opacity-100 visible' : 'opacity-0 invisible'} 
          transition-all duration-300`}
      >
        {copied ? 'Copied!' : 'Copy to clipboard'}
      </span>
      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {copied ? <FiCheck size={18} /> : <FiClipboard size={20} />}
      </span>
    </button>
  );
};

export default CopyButton;
