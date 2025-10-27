import React, { useState } from "react";
import { toast } from 'react-hot-toast';

const UrlDecode = () => {
  const [input, setInput] = useState("");
  const [decoded, setDecoded] = useState("");

  const handleDecode = () => {
    try {
      const result = decodeURIComponent(input);
      setDecoded(result);
    } catch (err) {
      toast.error("Invalid encoded text");
      console.error(err);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(decoded);
    toast.success("Decoded text copied!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFBEA] text-gray-800 p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-center mb-6">URL Decode Online</h1>

        <textarea
          rows="5"
          placeholder="Enter encoded text to decode"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 bg-[#FFFDF2] mb-4 resize-none"
        />

        <button
          onClick={handleDecode}
          className="w-full bg-[#F8C471] hover:bg-[#F5B041] text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
        >
          Decode
        </button>

        {decoded && (
          <div className="mt-5">
            <label className="block text-sm font-medium mb-1">Decoded Result:</label>
            <textarea
              rows="5"
              value={decoded}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-3 bg-[#FFFDF2] resize-none"
            />
            <button
              onClick={handleCopy}
              className="mt-3 bg-[#D35400] hover:bg-[#E67E22] text-white py-2 px-5 rounded-lg"
            >
              Copy Decoded Text
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlDecode;
