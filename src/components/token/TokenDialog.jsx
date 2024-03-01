import React, { useState } from 'react';
import { MdClose, MdContentCopy } from 'react-icons/md';

const TokenDialog = ({ onClose }) => {
  const [token, setToken] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToken = () => {
    navigator.clipboard.writeText(token);
    setIsCopied(true);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg w-full max-w-md">
        <div className="flex justify-end">
          <MdClose
            className="text-gray-500 cursor-pointer"
            size={24}
            onClick={onClose}
          />
        </div>
        <p>Your token is: </p>
        <div className="flex items-center">
          <span>{token}</span>
          <MdContentCopy
            className="ml-2 text-gray-500 cursor-pointer"
            size={20}
            onClick={handleCopyToken}
          />
          {isCopied && <p className="text-green-500 ml-2">Copied!</p>}
        </div>
        <p>
          Do you want to import a token from another device? (You will lose
          your current data)
        </p>
        <input
          type="text"
          placeholder="Enter token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="w-full mt-2 p-2 border border-gray-300 rounded"
        />
        <button className="w-full bg-blue-500 text-white p-2 mt-4 rounded">
          Import
        </button>
      </div>
    </div>
  );
};

export default TokenDialog;
