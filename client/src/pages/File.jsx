import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const rawBase = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
const BASE_URL = rawBase.replace(/\/+$/, "");

export default function FileClipboard() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [pin, setPin] = useState("");
  const [enteredPin, setEnteredPin] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return toast.error("Please select a file first");
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(`${BASE_URL}/file`, formData);
      setPin(res.data.pin);
      setFile(null);
      toast.success("File uploaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleRetrieve = async () => {
    if (!enteredPin) return toast.error("Enter a PIN");
    try {
      const res = await axios.get(`${BASE_URL}/file/${enteredPin}`, {
        responseType: "blob",
      });
      const blob = res.data;
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      toast.success("File retrieved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("File not found or expired");
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf0] text-gray-800 flex flex-col items-center p-6">
      {/* Header */}
      {/* Main Container */}
      <h1 className="text-3xl font-bold text-center mb-10">Send File Online</h1>
      <p className="text-center text-gray-600 mb-8">
        Upload a file and share the generated PIN for others to download it.
      </p>

      <div className="flex flex-col lg:flex-row  justify-center gap-8 w-full max-w-8xl">
        {/* Upload Section */}
        <div className="flex-2 bg-white shadow-md rounded-xl p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-orange-600 mb-4">
            Upload File
          </h3>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-gray-700 border border-[#f5deb3] rounded-md p-2 mb-4 bg-[#fffaf0] focus:outline-none focus:ring-2 focus:ring-[#f5deb3]"
          />
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full bg-[#f5deb3] hover:bg-[#f1d19b] py-2 rounded-md font-medium text-gray-900 transition"
          >
            {uploading ? "Uploading..." : "Upload File"}
          </button>

          {pin && (
            <div className="mt-5 bg-[#fffaf0] border border-[#f5deb3] p-4 rounded-md text-center">
              <p className="text-gray-700">
                Your file PIN:{" "}
                <span className="font-bold text-green-600 text-lg">{pin}</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Share this PIN to let someone download your file.
              </p>
            </div>
          )}
        </div>

        {/* Retrieve Section */}
        <div className="flex-2 bg-white shadow-md rounded-xl p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-orange-600 mb-4">
            Retrieve File
          </h3>
          <input
            type="text"
            placeholder="Enter 4-digit PIN"
            value={enteredPin}
            onChange={(e) => setEnteredPin(e.target.value)}
            className="w-full p-2 mb-4 rounded-md bg-[#fffaf0] border border-[#f5deb3] focus:outline-none focus:ring-2 focus:ring-[#f5deb3]"
          />
          <button
            onClick={handleRetrieve}
            className="w-full bg-[#f5deb3] hover:bg-[#f1d19b] py-2 rounded-md font-medium text-gray-900 transition"
          >
            Retrieve File
          </button>

          {downloadUrl && (
            <div className="mt-4 text-center">
              <a
                href={downloadUrl}
                download="shared_file"
                className="text-blue-600 underline text-sm"
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
