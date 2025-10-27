import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';

// Base URL comes from Vite env at build time
const rawBase = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
const normBase = rawBase.replace(/\/+$/, "");
const BASE_URL = normBase; // use like `${BASE_URL}/api/...`

export default function FileClipboard() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [pin, setPin] = useState("");
  const [enteredPin, setEnteredPin] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  // --- Handle file select / drag-drop ---
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // --- Upload file ---
  const handleUpload = async () => {
      if (!file) {
        toast.error("Please select a file first");
        return;
      }
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${BASE_URL}/file`, formData);
      const data = res.data;
      setPin(data.pin);
      setFile(null);
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // --- Retrieve file ---
  const handleRetrieve = async () => {
      if (!enteredPin) {
        toast.error("Enter a PIN");
        return;
      }
    try {
      const res = await axios.get(`${BASE_URL}/file/${enteredPin}`, {
        responseType: "blob",
      });
      const blob = res.data;
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      console.error(err);
      const message =
        err?.response?.data?.error ||
        err.message ||
        "File not found or expired";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf0] text-gray-800 font-sans p-6 flex justify-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-6 sm:p-10 border border-[#f5deb3]">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-800">
          📂 Temporary File Share
        </h1>

        {/* --- Upload Section --- */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="w-full p-8 border-2 border-dashed border-[#f5deb3] rounded-2xl text-center mb-6 bg-[#fffaf0]"
        >
          <p className="text-gray-700 mb-2">Drag & Drop your file here</p>
          <input
            type="file"
            onChange={handleFileChange}
            className="block mx-auto mb-4"
          />
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-[#f5deb3] hover:bg-[#f1d19b] px-4 py-2 rounded-lg text-gray-900 font-medium transition-colors"
          >
            {uploading ? "Uploading..." : "Upload File"}
          </button>
        </div>

        {pin && (
          <div className="bg-[#fffaf0] p-4 rounded-xl mb-6 border border-[#f5deb3] text-center">
            <p>
              Your file PIN:{" "}
              <span className="font-bold text-green-600">{pin}</span>
            </p>
            <p className="text-gray-700">
              Share this PIN with another user to download the file.
            </p>
          </div>
        )}

        {/* --- Retrieve Section --- */}
        <div className="w-full bg-[#fffaf0] p-6 rounded-2xl mt-6 border border-[#f5deb3]">
          <h2 className="text-xl mb-4 font-semibold text-gray-800 text-center">
            Retrieve File
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <input
              type="text"
              placeholder="Enter PIN"
              value={enteredPin}
              onChange={(e) => setEnteredPin(e.target.value)}
              className="p-3 flex-1 rounded-lg bg-white border border-[#f5deb3] focus:outline-none focus:ring-2 focus:ring-[#f5deb3] placeholder-gray-500"
            />
            <button
              onClick={handleRetrieve}
              className="bg-[#f5deb3] hover:bg-[#f1d19b] px-5 py-2 rounded-lg text-gray-900 font-medium transition-colors"
            >
              Get File
            </button>
          </div>

          {downloadUrl && (
            <div className="mt-4 text-center">
              <a
                href={downloadUrl}
                download="shared_file"
                className="text-blue-600 underline"
              >
                ⬇️ Download File
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
