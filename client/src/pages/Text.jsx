import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { createClip, getClip } from "../api/clipApi";

const Text = () => {
  const [text, setText] = useState("");
  const [createdPin, setCreatedPin] = useState("");
  const [pin, setPin] = useState("");
  const [retrievedText, setRetrievedText] = useState("");

  const handleCreate = async () => {
    if (!text.trim()) return toast.error("Please enter some text");
    try {
      const data = await createClip(text);
      setCreatedPin(data.pin);
      setText("");
      toast.success("Clip created successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create clip");
    }
  };

  const handleGet = async () => {
    if (!pin.trim()) return toast.error("Enter a valid PIN");
    try {
      const data = await getClip(pin);
      if (!data.text) throw new Error();
      setRetrievedText(data.text);
    } catch {
      toast.error("Clip not found or expired");
      setRetrievedText("");
    }
  };

  const copyToClipboard = (content) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-[#fffaf0] flex flex-col items-center  px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-1">
        Send Text Online
      </h1>
      <p className="text-gray-600 mb-10 text-center">
        Create a temporary text clip and share the generated PIN for others to retrieve it.
      </p>

      <div className="flex flex-col lg:flex-row items-stretch gap-8 w-full max-w-8xl">
        {/* Create Clip */}
        <div className="flex-1 bg-white p-8 rounded-2xl shadow-md border border-[#f5deb3]">
          <h2 className="text-xl font-semibold text-[#e66e00] mb-4">
            Create Clip
          </h2>
          <textarea
            rows={5}
            placeholder="Paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#fffaf0] border border-[#f5deb3] focus:outline-none focus:ring-2 focus:ring-[#f1d19b] text-gray-800 resize-none"
          />
          <button
            onClick={handleCreate}
            className="mt-4 w-full bg-[#f5c06a] hover:bg-[#f1b24f] text-white font-medium py-2 rounded-lg transition-colors"
          >
            Create Clip
          </button>

          {createdPin && (
            <div className="mt-5 bg-[#fffaf0] p-4 rounded-lg border border-[#f5deb3]">
              <p className="text-gray-800">
                <strong>PIN:</strong> {createdPin}
                <button
                  onClick={() => copyToClipboard(createdPin)}
                  className="ml-3 px-3 py-1 bg-[#f5deb3] hover:bg-[#f1d19b] rounded text-sm"
                >
                  Copy
                </button>
              </p>
            </div>
          )}
        </div>

        {/* Retrieve Clip */}
        <div className="flex-1 bg-white p-8 rounded-2xl shadow-md border border-[#f5deb3]">
          <h2 className="text-xl font-semibold text-[#e66e00] mb-4">
            Retrieve Clip
          </h2>
          <input
            type="text"
            placeholder="Enter 4-digit PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="p-3 w-full rounded-lg bg-[#fffaf0] border border-[#f5deb3] focus:outline-none focus:ring-2 focus:ring-[#f1d19b] mb-4 text-gray-800"
          />
          <button
            onClick={handleGet}
            className="w-full bg-[#f5c06a] hover:bg-[#f1b24f] text-white font-medium py-2 rounded-lg transition-colors"
          >
            Retrieve Clip
          </button>

          {retrievedText && (
            <div className="mt-5 bg-[#fffaf0] p-4 rounded-lg border border-[#f5deb3]">
              <div className="flex items-center justify-between mb-2">
                <strong className="text-gray-800">Clip Content:</strong>
                <button
                  onClick={() => copyToClipboard(retrievedText)}
                  className="px-3 py-1 bg-[#f5deb3] hover:bg-[#f1d19b] rounded text-sm"
                >
                  Copy
                </button>
              </div>
              <pre className="bg-white p-3 rounded-lg border border-[#f5deb3] whitespace-pre-wrap text-gray-700">
                {retrievedText}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Text;
