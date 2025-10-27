import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';

const Image = () => {
  const [imageFile, setImageFile] = useState(null);
  const [pin, setPin] = useState("");
  const [createdPin, setCreatedPin] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [retrievedImage, setRetrievedImage] = useState(null);
  const [loading, setLoading] = useState(false);
const rawBase = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
// Normalize: remove trailing slash if present
const BASE_URL = `${rawBase}/image`;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      toast.error("Please upload a valid image file.");
    }
  };

  const handleUpload = async () => {
    if (!imageFile) {
      toast.error("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setCreatedPin(res.data.pin);
      setPreviewUrl("");
      setImageFile(null);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleRetrieve = async () => {
    if (!pin.trim()) {
      toast.error("Enter a PIN first.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/${pin}`, {
        responseType: "blob",
      });

      const blob = new Blob([res.data]);
      const url = URL.createObjectURL(blob);
      setRetrievedImage(url);
      setPin("");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Invalid or expired PIN.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FFFBEA] text-gray-800 p-6">
      <h1 className="text-3xl font-bold text-center mb-10">Send Image Online</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {/* ===== Upload Section ===== */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 w-full">
          <h2 className="text-xl font-semibold mb-4 text-[#D35400]">Upload Image</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-lg p-2 bg-[#FFFDF2]"
          />

          {previewUrl && (
            <div className="mt-4 flex flex-col items-center">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-72 rounded-lg border border-gray-300"
              />
              <button
                onClick={handleUpload}
                disabled={loading}
                className="mt-4 bg-[#F8C471] hover:bg-[#F5B041] text-white font-semibold py-2 px-6 rounded-lg transition duration-200 w-full"
              >
                {loading ? "Uploading..." : "Upload & Get PIN"}
              </button>
            </div>
          )}

          {createdPin && (
            <div className="mt-5 text-center bg-[#FFF6E5] p-4 rounded-lg border border-[#F8C471]">
              <p className="font-semibold text-gray-700">
                Image PIN:{" "}
                <span className="text-[#D35400] text-xl font-bold">
                  {createdPin}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Share this PIN (expires in 5 minutes)
              </p>
            </div>
          )}
        </div>

        {/* ===== Retrieve Section ===== */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 w-full">
          <h2 className="text-xl font-semibold mb-4 text-[#D35400]">Retrieve Image</h2>

          <input
            type="text"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter 4-digit PIN"
            className="w-full border border-gray-300 rounded-lg p-2 bg-[#FFFDF2] mb-3"
          />

          <button
            onClick={handleRetrieve}
            disabled={loading}
            className="w-full bg-[#F8C471] hover:bg-[#F5B041] text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
          >
            {loading ? "Fetching..." : "Retrieve Image"}
          </button>

          {retrievedImage && (
            <div className="mt-5 flex flex-col items-center">
              <img
                src={retrievedImage}
                alt="Retrieved"
                className="max-h-72 rounded-lg border border-gray-300"
              />
              <a
                href={retrievedImage}
                download="shared_image.jpg"
                className="mt-4 bg-[#D35400] hover:bg-[#E67E22] text-white py-2 px-5 rounded-lg"
              >
                Download Image
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Image;
