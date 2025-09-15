import React, { useState } from "react";
import { Link, Copy, Download } from "lucide-react"; // Icons

// A simple QR Code Generator App
export default function QrGenerator() {
  // State variables
  const [userInput, setUserInput] = useState(""); // Stores the text/URL entered by the user
  const [qrImageUrl, setQrImageUrl] = useState(""); // Stores the generated QR code image URL

  // Function to generate a QR code
  const handleGenerateQr = () => {
    if (!userInput.trim()) {
      alert("⚠️ Please enter some text or a valid URL!");
      return;
    }

    // API link that generates QR codes
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
      userInput
    )}`;

    setQrImageUrl(apiUrl); // Update state with QR code link
  };

  // Function to copy the entered text/URL
  const handleCopy = () => {
    if (!userInput) return;
    navigator.clipboard.writeText(userInput).then(() => {
      alert("✅ Text copied to clipboard!");
    });
  };

  // Function to download the QR code image
  const handleDownload = () => {
    if (!qrImageUrl) return;

    const link = document.createElement("a"); // Create a hidden download link
    link.href = qrImageUrl;
    link.download = "qrcode.png"; // File name
    link.click(); // Simulate click to start download
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-8 w-full max-w-md">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          🎉 QR Code Generator
        </h1>

        {/* Input field with icon */}
        <div className="flex items-center border rounded-lg overflow-hidden mb-4 shadow-sm">
          <span className="px-3 text-gray-500">
            <Link size={20} /> {/* Icon */}
          </span>
          <input
            type="text"
            placeholder="Enter a URL or any text..."
            className="flex-1 px-3 py-2 outline-none bg-transparent text-gray-700"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
        </div>

        {/* Generate button */}
        <button
          onClick={handleGenerateQr}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-600 transition"
        >
          Generate QR Code
        </button>

        {/* Show QR code only if generated */}
        {qrImageUrl && (
          <div className="mt-6 flex flex-col items-center">
            {/* QR Code Image */}
            <img
              src={qrImageUrl}
              alt="Generated QR Code"
              className="w-56 h-56 rounded-lg shadow-md mb-4"
            />

            {/* Action buttons */}
            <div className="flex gap-3">
              {/* Copy button */}
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                <Copy size={18} /> Copy Text
              </button>

              {/* Download button */}
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                <Download size={18} /> Download
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
