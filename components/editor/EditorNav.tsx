import React from 'react';
import { BsBell, BsThreeDots } from 'react-icons/bs';
import Image from 'next/image';

const EditorNav = () => {
  return (
    <nav className="bg-white py-3 px-4 fixed top-0 left-0 w-full z-50 flex justify-between items-center h-16">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold">Medium</h1>
        <span className="text-sm text-gray-500">Draft in Gkiptoo</span>
      </div>
      <div className="flex items-center space-x-4">
        <button
          className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold hover:bg-green-200"
          disabled
          title="Publishing will become available after you start writing."
        >
          Publish
        </button>
        <BsBell className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700" />
        <BsThreeDots className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700" />
        <div className="relative w-8 h-8 rounded-full overflow-hidden cursor-pointer">
          <Image
            src="/logo.jpg" // Replace with your image path
            alt="User Avatar"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </nav>
  );
};

export default EditorNav;
