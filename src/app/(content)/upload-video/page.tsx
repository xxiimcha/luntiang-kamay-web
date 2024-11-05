"use client";

import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig"; // Adjust the path as needed
import { useRouter } from "next/navigation";
import { Tabs, useTabs } from "@/stores/sidebar-store";

export default function UploadVideoPage() {
  const [title, setTitle] = useState("");
  const [part, setPart] = useState("");
  const [seedType, setSeedType] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const updateTab = useTabs((state) => state.updateTab);

  useEffect(() => {
    // Set the current tab to UploadVideo when the component loads
    updateTab(Tabs.UploadVideo);
  }, [updateTab]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setUploading(true);

    try {
      // Create a storage reference in Firebase
      const storageRef = ref(storage, `videos/${file.name}`);
      // Upload file
      await uploadBytes(storageRef, file);
      // Get file URL
      const fileUrl = await getDownloadURL(storageRef);

      console.log("File uploaded successfully. URL:", fileUrl);

      // Save video details to database (optional)
      await saveVideoDetails({
        title,
        part,
        seedType,
        link,
        fileUrl,
      });

      // Clear the form fields
      setTitle("");
      setPart("");
      setSeedType("");
      setLink("");
      setFile(null);
      alert("Video uploaded successfully!");
      router.push("/videos"); // Redirect to videos page if you have one
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Placeholder function for saving video details to the database
  const saveVideoDetails = async (videoData) => {
    // Implement saving to your database
    console.log("Saving video details to database:", videoData);
    // For example, you could send a POST request to an API
  };

  return (
    <main className="flex justify-center items-center min-h-screen p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-semibold mb-6">Upload Video</h1>

        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Part</label>
          <input
            type="text"
            value={part}
            onChange={(e) => setPart(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Seed Type</label>
          <input
            type="text"
            value={seedType}
            onChange={(e) => setSeedType(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Link</label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Video File</label>
          <input type="file" onChange={handleFileChange} accept="video/*" className="w-full p-2" required />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </main>
  );
}
