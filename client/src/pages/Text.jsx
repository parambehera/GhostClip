import React, { useState } from "react";
import { toast } from 'react-hot-toast';
import { createClip, getClip } from "../api/clipApi";

const Text = () => {
  // --- Create clip ---
  const [text, setText] = useState("");
  const [createdPin, setCreatedPin] = useState("");
  const [createdLink, setCreatedLink] = useState("");

  // --- Get clip ---
  const [pin, setPin] = useState("");
  const [retrievedText, setRetrievedText] = useState("");

  const handleCreate = async () => {
    if (!text.trim()) return;
    try {
      const data = await createClip(text);
      setCreatedPin(data.pin);
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleGet = async () => {
    if (!pin.trim()) return;
    try {
      const data = await getClip(pin);
      setRetrievedText(data.text);
    } catch (err) {
      console.error(err);
      setRetrievedText("");
    }
  };

  const copyToClipboard = (content) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-[#fffaf0] text-gray-800 font-sans p-6">
      <div className="w-full bg-white rounded-2xl shadow-lg sm:p-10 border border-[#f5deb3]">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- Create Clip Section (Left) --- */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Create Clip
            </h2>
            <textarea
              rows={5}
              className="w-full p-3 rounded-lg bg-[#fffaf0] border border-[#f5deb3] focus:outline-none focus:ring-2 focus:ring-[#f5deb3] placeholder-gray-500 resize-none"
              placeholder="Paste your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              onClick={handleCreate}
              className="mt-3 px-5 py-2 bg-[#f5deb3] hover:bg-[#f1d19b] rounded-lg text-gray-900 font-medium transition-colors"
            >
              Create Clip
            </button>

            {createdPin && (
              <div className="mt-5 bg-[#fffaf0] p-4 rounded-lg border border-[#f5deb3]">
                <p>
                  <strong>PIN:</strong> {createdPin}{" "}
                  <button
                    onClick={() => copyToClipboard(createdPin)}
                    className="ml-2 px-2 py-1 bg-[#f5deb3] hover:bg-[#f1d19b] rounded text-sm"
                  >
                    Copy
                  </button>
                </p>
              </div>
            )}
          </div>

          {/* --- Retrieve Clip Section (Right) --- */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Retrieve Clip
            </h2>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Enter PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="p-3 w-full rounded-lg bg-[#fffaf0] border border-[#f5deb3] focus:outline-none focus:ring-2 focus:ring-[#f5deb3] placeholder-gray-500"
              />
              <button
                onClick={handleGet}
                className="px-5 py-2 bg-[#f5deb3] hover:bg-[#f1d19b] rounded-lg text-gray-900 font-medium transition-colors"
              >
                Get Clip
              </button>
            </div>

            {retrievedText && (
              <div className="mt-5 bg-[#fffaf0] p-4 rounded-lg border border-[#f5deb3]">
                <p className="mb-2 flex items-center justify-between">
                  <strong>Clip Content:</strong>
                  <button
                    onClick={() => copyToClipboard(retrievedText)}
                    className="ml-2 px-3 py-1 bg-[#f5deb3] hover:bg-[#f1d19b] rounded text-sm"
                  >
                    Copy
                  </button>
                </p>
                <pre className="bg-white p-3 rounded-lg border border-[#f5deb3] whitespace-pre-wrap text-gray-700">
                  {retrievedText}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Text;
