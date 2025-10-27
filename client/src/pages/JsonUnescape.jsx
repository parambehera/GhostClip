import React, { useState } from "react";
import { toast } from 'react-hot-toast';

const JsonUnescape = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleUnescape = () => {
    try {
      // First parse as normal string → converts escape sequences
      const unescaped = JSON.parse(input);
      // Then format prettily
      const formatted = JSON.stringify(unescaped, null, 2);
      setOutput(formatted);
    } catch (err) {
      setOutput("❌ Invalid JSON or malformed input");
    }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast.success("Copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8e7] flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          JSON Unescape Online
        </h1>

        <textarea
          placeholder="Paste your escaped JSON here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        ></textarea>

        <button
          onClick={handleUnescape}
          className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg w-full"
        >
          Unescape JSON
        </button>

        {output && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">
              Output:
            </h2>
            <pre className="bg-gray-100 p-3 rounded-lg text-sm overflow-auto h-48 border border-gray-300">
              {output}
            </pre>
            <button
              onClick={handleCopy}
              className="mt-3 bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-4 rounded-lg"
            >
              Copy Output
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JsonUnescape;
